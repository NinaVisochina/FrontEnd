// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { API_URL } from "../../env";
// import { IProduct } from "../../Interface/IProduct";

// const ProductsPage: React.FC = () => {
//   const { subCategoryId } = useParams<{ subCategoryId: string }>();
//   const [products, setProducts] = useState<IProduct[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch(`${API_URL}/api/product/subcategory/${subCategoryId}`);
//         if (!response.ok) throw new Error("Помилка завантаження продуктів");
//         const data: IProduct[] = await response.json();
//         setProducts(data);
//       } catch (error) {
//         console.error("Помилка:", error);
//         setError("Не вдалося завантажити продукти.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [subCategoryId]);

//   // const getImageUrl = (imageName: string | undefined, size: number = 300) => {
//   //   if (!imageName) {
//   //     return `${API_URL}/images/noimage.jpg`;
//   //   }
//   //   return `${API_URL}/images/${size}_${imageName}`;
//   // };

//   if (loading) return <p>Завантаження...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Продукти</h1>
//       <Link
//         to="/create-product"
//         className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mb-4 inline-block"
//       >
//         Додати продукт
//       </Link>
//       {products.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {products.map((product) => (
//             <div key={product.productId} className="p-4 border rounded-lg shadow-md">
//               <img
//               src={`${API_URL}/images/300_${product.images?.[0]}`}
//                 //src={getImageUrl(product.images?.[0])}
//                 alt={product.name}
//                 className="w-full h-40 object-cover rounded-t-lg"
//                 onError={(e) => (e.currentTarget.src = `${API_URL}/images/noimage.jpg`)}
//               />
//               <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
//               <p className="text-lg font-bold mt-2">Ціна: ${product.price.toFixed(2)}</p>
//               <Link
//                 to={`/edit-product/${product.productId}`}
//                 className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
//               >
//                 Редагувати
//               </Link>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>Продуктів не знайдено.</p>
//       )}
//     </div>
//   );
// };

// export default ProductsPage;

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API_URL } from "../../env";
import { IProductItem } from "../../Interface/IProductItem";

const ProductsPage: React.FC = () => {
  const { subCategoryId } = useParams<{ subCategoryId: string }>();
  const [product, setProduct] = useState<IProductItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/product/subcategory/${subCategoryId}`);
        if (!response.ok) throw new Error("Помилка завантаження продуктів");
        const data: IProductItem[] = await response.json();
        setProduct(data);
      } catch (err) {
        console.error("Помилка:", err);
        setError("Не вдалося завантажити продукти.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [subCategoryId]);

  if (loading) return <p>Завантаження...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Продукти</h1>
      {/* Додано кнопку для переходу */}
      <Link
        to="/create-product"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mb-4 inline-block"
      >
        Створити продукт
      </Link>
      {product.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {product.map((product) => (
            <div key={product.id} className="p-4 border rounded-lg shadow-md">
              <img
                src={`${API_URL}/images/300_${product.images?.[0]}`}
                alt={product.name}
                className="w-full h-40 object-cover rounded-t-lg"
                onError={(e) => (e.currentTarget.src = `${API_URL}/images/noimage.jpg`)}
              />
              <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
              <p className="text-lg font-bold mt-2">${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Продуктів не знайдено.</p>
      )}
    </div>
  );
};

export default ProductsPage;
