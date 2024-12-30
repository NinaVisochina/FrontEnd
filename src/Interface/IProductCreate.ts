export interface IProductCreate {
    name: string;
    description?: string;
    price: number;
    quantityInStock: number;
    subCategoryId: number;
    images: File[]; // Необов'язковий масив файлів
}