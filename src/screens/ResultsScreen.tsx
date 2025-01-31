import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "Results">;

const ResultsScreen = ({ navigation, route }: Props) => {
  const { score, totalQuestions } = route.params;

  const restart = () => {
    navigation.navigate("Setup");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Completed!</Text>
      <Text style={styles.score}>
        You scored {score} out of {totalQuestions * 3} possible points
      </Text>
      <Button title="Restart Quiz" onPress={restart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  score: {
    fontSize: 18,
    marginBottom: 30,
  },
});

export default ResultsScreen;
