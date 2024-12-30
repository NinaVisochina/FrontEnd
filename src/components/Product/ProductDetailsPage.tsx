import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IProduct } from "../../Interface/IProduct";
import { API_URL } from "../../env";

const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_URL}/api/product/${productId}`);
        if (!response.ok) throw new Error("Продукт не знайдено");
        const data: IProduct = await response.json();
        setProduct(data);
      } catch (err) {
        console.error("Помилка:", err);
        setError("Не вдалося завантажити продукт.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <p>Завантаження...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Продукт не знайдено.</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <p className="mb-4">{product.description}</p>
      <p className="mb-4">Ціна: ${product.price.toFixed(2)}</p>
      <p className="mb-4">Кількість на складі: {product.quantityInStock}</p>
      <img
        src={`${API_URL}/images/300_${product.images?.[0]}`}
        alt={product.name}
        className="w-full h-auto"
      />
    </div>
  );
};

export default ProductDetailsPage;
