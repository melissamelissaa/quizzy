import { TouchableOpacity, StyleSheet } from "react-native";
import Markdown from "react-native-markdown-display";

interface AnswerProps {
  answer: string;
  selectedAnswer: string | null;
  correctAnswer: string;
  onPress: (answer: string) => void;
}

export function Answer({
  answer,
  selectedAnswer,
  correctAnswer,
  onPress,
}: AnswerProps) {
  const getAnswerStyle = (answer: string) => {
    if (!selectedAnswer) return styles.answerContainer;

    const isCorrect = answer === correctAnswer;

    return [
      styles.answerContainer,
      answer === selectedAnswer &&
        (isCorrect ? styles.correctAnswer : styles.incorrectAnswer),
      answer === correctAnswer && selectedAnswer && styles.correctAnswer,
    ];
  };

  return (
    <TouchableOpacity
      style={getAnswerStyle(answer)}
      onPress={() => onPress(answer)}
    >
      <Markdown style={{ body: styles.answerText }}>{answer}</Markdown>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  answerContainer: {
    marginTop: 8,
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
  answerText: {
    fontSize: 20,
    color: "#555",
  },
  correctAnswer: {
    backgroundColor: "#90EE90",
  },
  incorrectAnswer: {
    backgroundColor: "#FFB6C1",
  },
});
