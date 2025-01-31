import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, QuestionType } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "Quiz">;

const QuizScreen = ({ navigation, route }: Props) => {
  const { questions, difficulty } = route.params;
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  const handleAnswer = (selectedAnswer: string) => {
    if (selectedAnswer === questions[currentQuestion].correct_answer) {
      setScore(
        (prev) =>
          prev + (difficulty === "hard" ? 3 : difficulty === "medium" ? 2 : 1)
      );
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      navigation.navigate("Results", {
        score,
        totalQuestions: questions.length,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionNumber}>
        Question {currentQuestion + 1}/{questions.length}
      </Text>
      <Text style={styles.questionText}>
        {questions[currentQuestion].question}
      </Text>

      {questions[currentQuestion].incorrect_answers
        .concat(questions[currentQuestion].correct_answer)
        .sort()
        .map((answer: string) => (
          <Button
            key={answer}
            title={answer}
            onPress={() => handleAnswer(answer)}
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  questionNumber: {
    fontSize: 18,
    marginBottom: 10,
  },
  questionText: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
});

export default QuizScreen;
