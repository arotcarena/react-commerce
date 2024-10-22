import { CartLine, Product } from "./entityTypes";

export type CartStoreType = {
    addToCart: (product: Product, quantity: number) => void,
    changeQuantity: (product: Product, quantity: number) => void,
    removeLine: (product: Product) => void,
};
