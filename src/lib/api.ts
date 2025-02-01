import {
  CategoryResponse,
  TriviaCategory,
  Question,
  QuestionsResponse,
} from "~/lib/types";

export async function fetchCategories(): Promise<TriviaCategory[]> {
  const response = await fetch("https://opentdb.com/api_category.php");

  const data = (await response.json()) as CategoryResponse;

  return data.trivia_categories;
}

export async function fetchQuestions(
  category: number,
  difficulty: string
): Promise<Question[]> {
  const response = await fetch(
    `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
  );

  const data = (await response.json()) as QuestionsResponse;

  return data.results;
}
