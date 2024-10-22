import { Product } from "../../types/entityTypes";
import { customFetch } from "../api/customFetch";

export const loadProducts = (): Promise<Product[]> => {
    return customFetch('https://fakestoreapi.com/products');
};

export const showProduct = (id: number): Promise<Product> => {
    return customFetch('https://fakestoreapi.com/products/' + id);
};

export const loadCategoryProducts = (category: string): Promise<Product[]> => {
    return customFetch('https://fakestoreapi.com/products/category/' + category + '?limit=5');
};
