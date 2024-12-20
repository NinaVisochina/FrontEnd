import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../../env";


const EditCategory: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Отримуємо ID з URL
  const navigate = useNavigate();

  const [name, setName] = useState<string>(""); // Стан для імені категорії
  const [ImageCategory, setImage] = useState<File | null>(null); // Стан для нового фото
  const [currentImagePath, setCurrentImagePath] = useState<string>(""); // Шлях до поточного фото
  const [loading, setLoading] = useState<boolean>(true);

  // Завантаження категорії
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`${API_URL}/api/Category/${id}`);
        if (!response.ok) throw new Error("Помилка завантаження категорії");
        const data = await response.json();
        setName(data.name);
        setCurrentImagePath(data.imageCategory);
      } catch (error) {
        console.error("Помилка:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [id]);

  // Обробка зміни фото
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  // Збереження змін
  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("Id", id || ""); // Обов'язково передати ID
      formData.append("Name", name);
      if (ImageCategory) formData.append("ImageCategory", ImageCategory); // Додаємо фото, якщо вибрано

      const response = await fetch(`${API_URL}/api/Category/Edit`, {
        method: "PUT",
        body: formData, // Відправляємо FormData
      });

      if (!response.ok) throw new Error("Помилка при збереженні категорії");
      alert("Категорію успішно оновлено!");
      navigate("/"); // Повернення на головну сторінку
    } catch (error) {
      console.error("Помилка під час збереження:", error);
      alert("Не вдалося зберегти зміни.");
    }
  };

  if (loading) return <p>Завантаження...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Редагування категорії</h1>
      <div className="max-w-md mx-auto">
        <label className="block mb-2 text-sm font-medium text-gray-700">Назва категорії</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded-lg mb-4"
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">Поточне фото</label>
        <img
          src={`${API_URL}/images/300_${currentImagePath}`}
          alt="Поточне фото"
          className="w-full h-40 object-cover rounded-lg mb-4"
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">Нове фото</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border rounded-lg mb-4"
        />

        <button
          onClick={handleSave}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Зберегти
        </button>
      </div>
    </div>
  );
};

export default EditCategory;
