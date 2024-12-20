import { Category } from "../Interface/Category";

const API_URL = "http://localhost:5126/api/Category";

// Функція для отримання списку категорій
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

// Функція для видалення категорії
export const deleteCategory = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Помилка при видаленні категорії: ${response.status}`);
    }
  } catch (error) {
    console.error("Помилка під час видалення категорії:", error);
    throw error;
  }
};
// import { Category } from "../Interface/Category";

// const API_URL = "http://localhost:5126/api/Category"; 

// export const fetchCategories = async (): Promise<Category[]> => {
//   try {
//     const response = await fetch(API_URL);
//     if (!response.ok) {
//       throw new Error("Помилка завантаження категорій");
//     }
//     return await response.json();
//   } catch (error) {
//     console.error("Помилка під час запиту:", error);
//     return [];
//   }
// };
