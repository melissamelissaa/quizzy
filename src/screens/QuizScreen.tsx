import { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { ScreenProps } from "~/lib/types";
import { useQuestions } from "~/lib/hooks/use-questions";
import { getDifficultyMultiplier } from "~/lib/utils/difficulty-multiplier";

const QuizScreen = ({ navigation, route }: ScreenProps<"Quiz">) => {
  const { category, difficulty } = route.params;

  const { questions, isLoading } = useQuestions({ category, difficulty });

  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  const handleAnswer = (selectedAnswer: string) => {
    const correctAnswer = questions[currentQuestion].correct_answer;
    const isCorrect = selectedAnswer === correctAnswer;

    if (isCorrect) {
      setScore((prev) => prev + getDifficultyMultiplier(difficulty));
    }

    const isLastQuestion = currentQuestion === questions.length - 1;

    if (isLastQuestion) {
      navigation.navigate("Results", {
        score,
        totalQuestions: questions.length,
        difficulty,
      });
    } else {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

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
