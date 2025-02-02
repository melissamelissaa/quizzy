import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Difficulty, Item, ScreenProps } from "~/lib/types";
import { useCategories } from "~/lib/hooks/use-categories";
import { difficulties } from "~/lib/consts";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";

type PickerType = "category" | "difficulty";

export function SetupScreen({ navigation }: ScreenProps<"Setup">) {
  const { categories, isLoading } = useCategories();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [category, setCategory] = useState<number | null>(null);
  const [currentPicker, setCurrentPicker] = useState<PickerType | null>(null);

  useEffect(() => {
    if (currentPicker) bottomSheetModalRef.current?.present();
  }, [currentPicker]);

  const startQuiz = useCallback(() => {
    if (!category) {
      console.warn("No category selected");
      return;
    }

    navigation.navigate("Quiz", { category, difficulty });
  }, [category, difficulty, navigation]);

  const renderItem = useCallback(
    ({ item }: { item: Item }) => (
      <TouchableOpacity
        style={styles.modalItem}
        onPress={() => {
          if (currentPicker === "category") {
            setCategory(item.value as number);
          } else {
            setDifficulty(item.value as Difficulty);
          }

          bottomSheetModalRef.current?.dismiss();
        }}
      >
        <Text style={styles.modalItemText}>{item.label}</Text>
      </TouchableOpacity>
    ),
    [currentPicker]
  );

  if (isLoading) {
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
        onPress={() => setCurrentPicker("category")}
      >
        <Text style={styles.label}>Category</Text>
        <Text style={styles.selectedValue}>
          {categories.find((c) => c.value === category)?.label ||
            "Select Category"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.pickerButton}
        onPress={() => setCurrentPicker("difficulty")}
      >
        <Text style={styles.label}>Difficulty</Text>
        <Text style={styles.selectedValue}>
          {difficulties.find((d) => d.value === difficulty)?.label ||
            "Select Difficulty"}
        </Text>
      </TouchableOpacity>

      <Button title="Start Quiz" onPress={startQuiz} disabled={!category} />

      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={["50%"]}
        onDismiss={() => setCurrentPicker(null)}
        backgroundStyle={styles.modalBackground}
        handleIndicatorStyle={styles.indicator}
      >
        <BottomSheetView style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            Select {currentPicker === "category" ? "Category" : "Difficulty"}
          </Text>
          <FlatList
            data={currentPicker === "category" ? categories : difficulties}
            renderItem={renderItem}
            keyExtractor={(item) => item.value.toString()}
            contentContainerStyle={styles.listContainer}
          />
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  pickerButton: {
    borderWidth: 1,
    borderColor: "#e9ecef",
    borderRadius: 16,
    padding: 15,
    marginBottom: 20,
    backgroundColor: "#fff",
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
  modalBackground: {
    backgroundColor: "#fff",
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  indicator: {
    backgroundColor: "#dee2e6",
    width: 40,
  },
  modalContent: {
    flex: 1,
    paddingVertical: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 16,
    color: "#000",
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  modalItem: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: "#fff",
    borderWidth: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  modalItemText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
  },
});
