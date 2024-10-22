import { customFetch } from "../api/customFetch"

export const loadCategories = (): Promise<string[]> => {
    return customFetch('https://fakestoreapi.com/products/categories');
};
