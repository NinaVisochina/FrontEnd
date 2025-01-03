export interface IProductCreate {
    name: string;
    description?: string;
    price: number;
    quantityInStock: number;
    subCategoryId: number;
    images: File[]; 
    //images: File[]|null// Необов'язковий масив файлів
}