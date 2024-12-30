import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "../../env";
import { ISubcategory } from "../../Interface/ISubcategory";

const SubcategoriesPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>(); // Отримуємо ID категорії з URL
  const [subcategories, setSubcategories] = useState<ISubcategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await fetch(`${API_URL}/api/SubCategory/search/${categoryId}`);
        if (!response.ok) throw new Error("Помилка завантаження підкатегорій");
        const data = await response.json();
        setSubcategories(data);
      } catch (error) {
        console.error("Помилка:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubcategories();
  }, [categoryId]);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Ви впевнені, що хочете видалити цю підкатегорію?")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/SubCategory/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Помилка видалення підкатегорії");

      alert("Підкатегорію успішно видалено!");
      setSubcategories((prev) => prev.filter((subcategory) => subcategory.id !== id));
    } catch (error) {
      console.error("Помилка:", error);
      alert("Не вдалося видалити підкатегорію.");
    }
  };

  if (loading) return <p>Завантаження...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Підкатегорії</h1>
      <Link
        to="/create-subcategory"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mb-4 inline-block"
      >
        Додати підкатегорію
      </Link>
      {subcategories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {subcategories.map((subcategory) => (
            <div key={subcategory.id} className="p-4 border rounded-lg shadow-md">
              <img
                src={`${API_URL}/images/300_${subcategory.imageSubCategory}`}
                alt={subcategory.name}
                className="w-full h-40 object-cover rounded-t-lg"
                onError={(e) => (e.currentTarget.src = `${API_URL}/images/noimage.jpg`)} // Заглушка
              />
              <h2 className="text-lg font-semibold mt-2">
                <Link
                  to={`/products/subcategory/${subcategory.id}`} // Посилання на сторінку продуктів
                  className="text-blue-500 hover:underline"
                >
                  {subcategory.name}
                </Link>
              </h2>
              <div className="flex justify-between mt-4">
                <Link
                  to={`/edit-subcategory/${subcategory.id}`} // Посилання на сторінку редагування
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                >
                  Редагувати
                </Link>
                <button
                  onClick={() => handleDelete(subcategory.id)} // Виклик функції видалення
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Видалити
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Підкатегорій не знайдено.</p>
      )}
    </div>
  );
};

export default SubcategoriesPage;
// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { API_URL } from "../../env";
// import { Subcategory } from "../../Interface/Subcategory";

// const SubcategoriesPage: React.FC = () => {
//   const { categoryId } = useParams<{ categoryId: string }>(); // Отримуємо ID категорії з URL
//   const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchSubcategories = async () => {
//       try {
//         // Запит до API з передачею categoryId
//         const response = await fetch(`${API_URL}/api/SubCategory/search/${categoryId}`);
//         if (!response.ok) throw new Error("Помилка завантаження підкатегорій");
//         const data = await response.json();
//         setSubcategories(data);
//       } catch (error) {
//         console.error("Помилка:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSubcategories();
//   }, [categoryId]);
//   const handleDelete = async (id: number) => {
//     if (!window.confirm("Ви впевнені, що хочете видалити цю підкатегорію?")) {
//       return;
//     }

//     try {
//       const response = await fetch(`${API_URL}/api/SubCategory/${id}`, {
//         method: "DELETE",
//       });

//       if (!response.ok) throw new Error("Помилка видалення підкатегорії");

//       alert("Підкатегорію успішно видалено!");
//       // Оновлення списку підкатегорій після видалення
//       setSubcategories((prev) => prev.filter((subcategory) => subcategory.id !== id));
//     } catch (error) {
//       console.error("Помилка:", error);
//       alert("Не вдалося видалити підкатегорію.");
//     }
//   };
//   if (loading) return <p>Завантаження...</p>;

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Підкатегорії</h1>
//       <Link
//         to="/create-subcategory"
//         className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mb-4 inline-block"
//       >
//         Додати підкатегорію
//       </Link>
//       {subcategories.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {subcategories.map((subcategory) => (
//             <div key={subcategory.id} className="p-4 border rounded-lg shadow-md">
//               <img
//                 src={`${API_URL}/images/300_${subcategory.imageSubCategory}`}
//                 alt={subcategory.name}
//                 className="w-full h-40 object-cover rounded-t-lg"
//                 onError={(e) => (e.currentTarget.src = `${API_URL}/images/noimage.jpg`)} // Заглушка
//               />
//               <h2 className="text-lg font-semibold mt-2">{subcategory.name}</h2>
//               <div className="flex justify-between mt-4">
//                 <Link
//                   to={`/edit-subcategory/${subcategory.id}`} // Посилання на сторінку редагування
//                   className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
//                 >
//                   Редагувати
//                 </Link> 
//                 <button
//                   onClick={() => handleDelete(subcategory.id)} // Виклик функції видалення
//                   className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
//                 >
//                   Видалити
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>Підкатегорій не знайдено.</p>
//       )}
//     </div>
//   );
// };

// export default SubcategoriesPage;
