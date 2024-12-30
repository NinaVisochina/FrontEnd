import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../../env";

const EditSubCategory: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Отримуємо ID підкатегорії з URL
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [categoryId, setCategoryId] = useState<number | "">(""); // Категорія
  const [currentImagePath, setCurrentImagePath] = useState<string>(""); // Поточне зображення
  const [image, setImage] = useState<File | null>(null); // Нове зображення
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSubCategory = async () => {
      try {
        const response = await fetch(`${API_URL}/api/SubCategory/${id}`);
        if (!response.ok) throw new Error("Помилка завантаження підкатегорії");

        const data = await response.json();
        setName(data.name);
        setCategoryId(data.categoryId);
        setCurrentImagePath(data.imageSubCategory);
      } catch (error) {
        console.error("Помилка:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubCategory();
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Id", id || "");
    formData.append("Name", name);
    formData.append("CategoryId", categoryId.toString());
    if (image) {
      formData.append("ImageSubCategory", image);
    }

    try {
      const response = await fetch(`${API_URL}/api/SubCategory`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) throw new Error("Помилка редагування підкатегорії");

      alert("Підкатегорію успішно оновлено!");
      navigate("/"); // Повернення на головну сторінку
    } catch (error) {
      console.error("Помилка:", error);
      alert("Не вдалося оновити підкатегорію.");
    }
  };

  if (loading) return <p>Завантаження...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Редагування підкатегорії</h1>
      <form onSubmit={handleSave} className="max-w-md mx-auto">
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
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Зберегти
        </button>
      </form>
    </div>
  );
};

export default EditSubCategory;
