import React from "react";
import { Category } from "../types/Category";
import { API_URL } from "../env";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md">
      <img
        src={`${API_URL}/images/300_${category.imageCategory}`} // Правильний шлях до фото
        alt={category.name}
        className="w-full h-40 object-cover rounded-t-lg"
        onError={(e) => (e.currentTarget.src = `${API_URL}/images/noimage.jpg`)} // Заглушка
      />
      <h2 className="text-lg font-semibold mt-2 text-center">{category.name}</h2>
    </div>
  );
};

export default CategoryCard;

