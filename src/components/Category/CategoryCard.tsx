import React from "react";
import { Category } from "../../Interface/Category";
import { API_URL } from "../../env";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  category: Category;
  onDelete: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onDelete }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md">
      <img
        src={`${API_URL}/images/300_${category.imageCategory}`}
        alt={category.name}
        className="w-full h-40 object-cover rounded-t-lg"
        onError={(e) => (e.currentTarget.src = `${API_URL}/images/noimage.jpg`)}
      />
      <Link to={`/category/${category.id}`} className="text-lg font-semibold mt-2 block text-center text-blue-500 hover:underline">
        {category.name}
      </Link>
      <div className="flex justify-between mt-4">
        <button
          onClick={onDelete}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Видалити
        </button>
        <Link
          to={`/edit/${category.id}`}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
        >
          Редагувати
        </Link>
      </div>
    </div>
  );
};

export default CategoryCard;

