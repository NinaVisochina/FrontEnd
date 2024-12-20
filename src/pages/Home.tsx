import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoryCard from "../components/Category/CategoryCard";
import { fetchCategories, deleteCategory } from "../services/categoryService";
import { Category } from "../Interface/Category";

const Home: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Функція для завантаження категорій
  const loadCategories = () => {
    setLoading(true);
    fetchCategories()
      .then((data) => setCategories(data))
      .catch((error) => console.error("Помилка завантаження категорій:", error))
      .finally(() => setLoading(false));
  };

  // Завантаження категорій при монтуванні компонента
  useEffect(() => {
    loadCategories();
  }, []);

  // Видалення категорії та оновлення списку
  const handleDelete = async (id: number, name: string) => {
    const confirmDelete = window.confirm(`Ви справді бажаєте видалити категорію "${name}"?`);
    if (confirmDelete) {
      try {
        await deleteCategory(id);
        setCategories(categories.filter((category) => category.id !== id)); // Оновлюємо стан
      } catch (error) {
        console.error("Помилка під час видалення категорії:", error);
        alert("Не вдалося видалити категорію.");
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Категорії</h1>
        <Link to="/create" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Додати категорію
        </Link>
      </div>

      {/* Відображення категорій */}
      {loading ? (
        <p>Завантаження категорій...</p>
      ) : categories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} onDelete={()=>handleDelete(category.id, category.name)} />
          ))}
        </div>
      ) : (
        <p>Категорій не знайдено.</p>
      )}
    </div>
  );
};

export default Home;
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import CategoryCard from "../components/Category/CategoryCard";
// import { fetchCategories } from "../services/categoryService";
// import { Category } from "../Interface/Category";

// const Home: React.FC = () => {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     fetchCategories()
//       .then((data) => setCategories(data))
//       .catch((error) => console.error(error))
//       .finally(() => setLoading(false));
//   }, []);

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Категорії</h1>
//         <Link to="/create" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
//           Додати категорію
//         </Link>
//       </div>

//       {loading ? (
//         <p>Завантаження категорій...</p>
//       ) : categories.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {categories.map((category) => (
//             <CategoryCard key={category.id} category={category} />
//           ))}
//         </div>
//       ) : (
//         <p>Категорій не знайдено.</p>
//       )}
//     </div>
//   );
// };

// export default Home;

