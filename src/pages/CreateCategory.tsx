import React, { useState } from "react";
import axios from "axios";
import { ICategoryCreate } from "../types/CategoryCreate";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../env";

const CreateCategory: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [imageCategory, setImageCategory] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageCategory(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageCategory) {
      alert("Будь ласка, виберіть фото.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("Name", name);
      formData.append("ImageCategory", imageCategory); // Має відповідати назві у DTO

      await axios.post(`${API_URL}/api/category/create`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Категорію успішно створено!");
      navigate("/"); // Повернення на головну сторінку
    } catch (error) {
      console.error("Помилка при створенні категорії:", error);
      alert("Помилка при створенні категорії");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Створення категорії</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Назва категорії</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="Введіть назву категорії"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Фото категорії</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Створення..." : "Створити"}
        </button>
      </form>
    </div>
  );
};

export default CreateCategory;
