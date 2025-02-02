import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { ScreenProps } from "~/lib/types";
import { useQuestions } from "~/lib/hooks/use-questions";
import { getDifficultyMultiplier } from "~/lib/utils/difficulty-multiplier";
import Markdown from "react-native-markdown-display";

export function QuizScreen({ navigation, route }: ScreenProps<"Quiz">) {
  const { category, difficulty } = route.params;

  const { questions, isLoading } = useQuestions({ category, difficulty });

  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  const handleAnswer = (selectedAnswer: string) => {
    const { correct_answer: correctAnswer } = questions[currentQuestion];
    const isCorrect = selectedAnswer === correctAnswer;
    const isLastQuestion = currentQuestion === questions.length - 1;

    const scoreChange = isCorrect ? getDifficultyMultiplier(difficulty) : 0;
    const newScore = score + scoreChange;

    setScore(newScore);

    if (isLastQuestion) {
      navigation.navigate("Results", {
        score: newScore,
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
        <Markdown>{questions[currentQuestion].question}</Markdown>
      </Text>

      {/* TODO: use a shuffle utility function to shuffle questions beforehand  */}
      {questions[currentQuestion].incorrect_answers
        .concat(questions[currentQuestion].correct_answer)
        // .sort()
        .map((answer) => (
          <TouchableOpacity key={answer} onPress={() => handleAnswer(answer)}>
            <Markdown>{answer}</Markdown>
          </TouchableOpacity>
        ))}
    </View>
  );
}

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
