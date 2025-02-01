import { useEffect, useState } from "react";
import { fetchCategories } from "~/lib/api";
import { Item } from "~/lib/types";

export function useCategories() {
  const [categories, setCategories] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchCategories()
      .then((c) => c.map((cat) => ({ label: cat.name, value: cat.id })))
      .then((c) => setCategories(c))
      .finally(() => setIsLoading(false));
  }, []);

  return { categories, isLoading };
}
