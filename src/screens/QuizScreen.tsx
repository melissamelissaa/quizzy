import { useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { ScreenProps } from "~/lib/types";
import { useQuestions } from "~/lib/hooks/use-questions";
import { getDifficultyMultiplier } from "~/lib/utils/difficulty-multiplier";
import Markdown from "react-native-markdown-display";
import { Answer } from "~/components/Answer";

export function QuizScreen({ navigation, route }: ScreenProps<"Quiz">) {
  const { category, difficulty } = route.params;
  const { questions, isLoading } = useQuestions({ category, difficulty });
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleAnswer = (answer: string) => {
    if (selectedAnswer) return;

    setSelectedAnswer(answer);
    const { correct_answer: correctAnswer } = questions[currentQuestion];
    const isCorrect = answer === correctAnswer;
    const isLastQuestion = currentQuestion === questions.length - 1;

    const scoreChange = isCorrect ? getDifficultyMultiplier(difficulty) : 0;
    const newScore = score + scoreChange;

    setScore(newScore);

    setTimeout(() => {
      if (isLastQuestion) {
        navigation.navigate("Results", {
          score: newScore,
          totalQuestions: questions.length,
          difficulty,
        });
      } else {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
      }
    }, 1000);
  };

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
      <Text style={styles.questionNumber}>
        QUESTION {currentQuestion + 1}/{questions.length}
      </Text>
      <Markdown style={{ body: styles.questionText }}>
        {questions[currentQuestion].question}
      </Markdown>

      {questions[currentQuestion].incorrect_answers
        .concat(questions[currentQuestion].correct_answer)
        .sort()
        .map((answer) => (
          <Answer
            key={answer}
            answer={answer}
            selectedAnswer={selectedAnswer}
            correctAnswer={questions[currentQuestion].correct_answer}
            onPress={handleAnswer}
          />
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
    fontSize: 13,
    marginBottom: 10,
    color: "#888",
    fontWeight: "bold",
  },
  questionText: {
    fontSize: 26,
    marginBottom: 20,
    fontWeight: "500",
    color: "#222",
  },
});
