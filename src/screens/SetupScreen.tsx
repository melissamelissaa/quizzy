import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

interface Category {
  label: string;
  value: number;
}

interface Difficulty {
  label: string;
  value: string;
}

type PickerType = "category" | "difficulty";

type Props = NativeStackScreenProps<RootStackParamList, "Setup">;

const SetupScreen: React.FC<Props> = ({ navigation }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [difficulty, setDifficulty] = useState<string>("easy");
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [currentPicker, setCurrentPicker] = useState<PickerType | null>(null);

  const difficulties: Difficulty[] = [
    { label: "Easy", value: "easy" },
    { label: "Medium", value: "medium" },
    { label: "Hard", value: "hard" },
  ];

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async (): Promise<void> => {
    try {
      const response = await fetch("https://opentdb.com/api_category.php");
      const data = await response.json();
      const formattedCategories: Category[] = data.trivia_categories.map(
        (cat: { id: number; name: string }) => ({
          label: cat.name,
          value: cat.id,
        })
      );
      setCategories(formattedCategories);
      setSelectedCategory(formattedCategories[0]?.value || null);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const startQuiz = async (): Promise<void> => {
    if (!selectedCategory) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=10&category=${selectedCategory}&difficulty=${difficulty}&type=multiple`
      );
      const data = await response.json();
      setLoading(false);
      navigation.navigate("Quiz", { questions: data.results, difficulty });
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const openPicker = (pickerType: PickerType): void => {
    setCurrentPicker(pickerType);
    setModalVisible(true);
  };

  const renderItem: ListRenderItem<Category | Difficulty> = ({ item }) => (
    <TouchableOpacity
      style={styles.modalItem}
      onPress={() => {
        if (currentPicker === "category") {
          setSelectedCategory((item as Category).value);
        } else {
          setDifficulty((item as Difficulty).value);
        }
        setModalVisible(false);
      }}
    >
      <Text style={styles.modalItemText}>{item.label}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <ActivityIndicator
        style={styles.container}
        size="large"
        color="#0000ff"
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Setup</Text>

      <TouchableOpacity
        style={styles.pickerButton}
        onPress={() => openPicker("category")}
      >
        <Text style={styles.label}>Category</Text>
        <Text style={styles.selectedValue}>
          {categories.find((c) => c.value === selectedCategory)?.label ||
            "Select Category"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.pickerButton}
        onPress={() => openPicker("difficulty")}
      >
        <Text style={styles.label}>Difficulty</Text>
        <Text style={styles.selectedValue}>
          {difficulties.find((d) => d.value === difficulty)?.label ||
            "Select Difficulty"}
        </Text>
      </TouchableOpacity>

      <Button
        title="Start Quiz"
        onPress={startQuiz}
        disabled={!selectedCategory}
      />

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={currentPicker === "category" ? categories : difficulties}
              renderItem={renderItem}
              keyExtractor={(item) => item.value.toString()}
            />
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  pickerButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  selectedValue: {
    fontSize: 16,
    color: "#000",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    maxHeight: "70%",
  },
  modalItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalItemText: {
    fontSize: 16,
  },
});

export default SetupScreen;
