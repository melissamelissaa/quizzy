import { useEffect, useState } from "react";
import { fetchQuestions } from "~/lib/api";
import { Question } from "~/lib/types";

export function useQuestions({
  category,
  difficulty,
}: {
  category: number;
  difficulty: string;
}) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchQuestions(category, difficulty).then((questions) => {
      if (questions.length > 0) {
        setQuestions(questions);
        setIsLoading(false);
      }
    });
  }, [category, difficulty]);

  return { questions, isLoading };
}
