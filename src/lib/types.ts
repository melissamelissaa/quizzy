import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type ScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type RootStackParamList = {
  Setup: undefined;
  Quiz: { category: number; difficulty: Difficulty };
  Results: { score: number; totalQuestions: number; difficulty: Difficulty };
};

export type Difficulty = "easy" | "medium" | "hard";

export interface Item {
  label: string;
  value: string | number;
}

export interface CategoryResponse {
  trivia_categories: TriviaCategory[];
}

export interface TriviaCategory {
  id: number;
  name: string;
}

export interface QuestionsResponse {
  response_code: number;
  results: Question[];
}

export interface Question {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}
