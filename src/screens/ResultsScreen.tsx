import { View, Text, Button, StyleSheet } from "react-native";
import { ScreenProps } from "~/lib/types";
import { getDifficultyMultiplier } from "~/lib/utils/difficulty-multiplier";

export function ResultsScreen({ navigation, route }: ScreenProps<"Results">) {
  const { score, totalQuestions, difficulty } = route.params;

  const multiplier = getDifficultyMultiplier(difficulty);

  const restart = () => {
    navigation.navigate("Setup");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Completed!</Text>
      <Text style={styles.score}>
        You scored {score} out of {totalQuestions * multiplier} possible points
      </Text>
      <Button title="Restart Quiz" onPress={restart} />
    </View>
  );
}

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
