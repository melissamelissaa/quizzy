import { Difficulty } from "~/lib/types";

export function getDifficultyMultiplier(difficulty: Difficulty) {
  if (difficulty === "easy") {
    return 1;
  } else if (difficulty === "medium") {
    return 2;
  } else {
    return 3;
  }
}
