import { IProductDescImage } from "./IProductDescImage";


export interface IProduct {
    productId: number;
    code: string;
    name: string;
    description?: string;
    manufacturer?: string;
    size?: string;
    color?: string;
    type?: string;
    form?: string;
    price: number;
    quantityInPack?: number;
    quantityInStock: number;
    model?: string;
    subCategoryId: number;
    images: string[];
    productDescImages?: IProductDescImage[];
  }
  