import { Category } from "../types/Category";

const API_URL = "http://localhost:5126/api/Category"; 

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Помилка завантаження категорій");
    }
    return await response.json();
  } catch (error) {
    console.error("Помилка під час запиту:", error);
    return [];
  }
};
