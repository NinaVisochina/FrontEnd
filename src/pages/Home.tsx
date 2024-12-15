import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoryCard from "../components/CategoryCard";
import { fetchCategories } from "../services/categoryService";
import { Category } from "../types/Category";

const Home: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchCategories()
      .then((data) => setCategories(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Категорії</h1>
        <Link to="/create" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Додати категорію
        </Link>
      </div>

      {loading ? (
        <p>Завантаження категорій...</p>
      ) : categories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      ) : (
        <p>Категорій не знайдено.</p>
      )}
    </div>
  );
};

export default Home;

