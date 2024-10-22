import { ReactNode, useState } from "react";
import { CartLine, Product } from "../types/entityTypes";
import { useGlobalStore } from "./GlobalStore";
import { CartStoreType } from "../types/providerTypes";

export const useCartStore = (): CartStoreType => {
    const globalContext = useGlobalStore();
    if (globalContext.cartStore === null) {
        throw new Error('Cart store is not loaded. Cart component must load global store with cart store');
    }
    return globalContext.cartStore;
}

type Props = {
    renderCart: (cartLines: CartLine[]) => ReactNode
};

export const CartStoreProvider = ({renderCart}: Props) => {

    const [cartLines, setCartLines] = useState<CartLine[]>([]);

    const addToCart = (product: Product, quantity: number) => {
        
        setCartLines(prevCartLines => {
            const existingCartLine = prevCartLines.find((cl: CartLine) => cl.product.id === product.id);
            if(existingCartLine) {
                return prevCartLines.map((cl: CartLine) => {
                    let newQuantity = cl.quantity + quantity;
                    if(newQuantity < 1) {
                        newQuantity = 1;
                    }
                    if(cl.product.id === product.id) {
                        return {
                            product,
                            quantity: newQuantity
                        };
                    }
                    return cl;
                });
            }
            return [
                {product, quantity},
                ...prevCartLines
            ];
        });
    };

    const changeQuantity = (product: Product, quantity: number) => {
        setCartLines(prevCartLines => {
            return prevCartLines.map((cl: CartLine) => {
                if(cl.product.id === product.id) {
                    let newQuantity = cl.quantity + quantity;
                    if(newQuantity < 1) {
                        newQuantity = 1;
                    }
                    return {
                        product,
                        quantity: newQuantity
                    };
                }
                return cl;
            });
        });
    };

    const removeLine = (product: Product) => {
        setCartLines(prevCartLines => prevCartLines.filter((cl: CartLine) => cl.product.id !== product.id));
    }

    const globalStore = useGlobalStore();
    globalStore.cartStore = {addToCart, changeQuantity, removeLine};

    return renderCart(cartLines);
};
