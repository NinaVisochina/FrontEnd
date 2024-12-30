import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../env";

const CreateSubCategory: React.FC = () => {
  const [name, setName] = useState<string>("");
  // const [description, setDescription] = useState<string>("");
  const [categoryId, setCategoryId] = useState<number | "">(""); // Вибір категорії
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Name", name);
    //formData.append("Description", description);
    formData.append("CategoryId", categoryId.toString());
    if (image) {
      formData.append("ImageSubCategory", image);
    }

    try {
      const response = await fetch(`${API_URL}/api/SubCategory`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Помилка створення підкатегорії");

      alert("Підкатегорію успішно створено!");
      navigate("/"); // Повернення на головну сторінку
    } catch (error) {
      console.error("Помилка:", error);
      alert("Не вдалося створити підкатегорію.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Створення підкатегорії</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <label className="block mb-2 text-sm font-medium text-gray-700">Назва</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded-lg mb-4"
          required
        />

        {/* <label className="block mb-2 text-sm font-medium text-gray-700">Опис</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded-lg mb-4"
          required
        /> */}

        <label className="block mb-2 text-sm font-medium text-gray-700">Категорія</label>
        <input
          type="number"
          value={categoryId}
          onChange={(e) => setCategoryId(Number(e.target.value))}
          className="w-full p-2 border rounded-lg mb-4"
          required
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">Фото</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border rounded-lg mb-4"
        />

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Створити
        </button>
      </form>
    </div>
  );
};

export default CreateSubCategory;
