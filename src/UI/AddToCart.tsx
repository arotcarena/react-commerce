import { MouseEvent } from "react";
import { Button } from "../styles/styledComponents";
import { Product } from "../types/entityTypes"
import { useCartStore } from "../Stores/CartStore";

type Props = {
    product: Product
};

export const AddToCart = ({
    product
}: Props) => {
    const {addToCart} = useCartStore();

    const handleClick = (e: MouseEvent) => {
        e.preventDefault();
        addToCart(product, 1);
    }

    return (
        <Button onClick={handleClick} className="add-to-cart-button">
            Ajouter au panier
        </Button>
    )
}