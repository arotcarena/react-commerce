import { Link } from "react-router-dom";
import { formatPrice } from "../functions/formaters/formatPrice";
import { Button } from "../styles/styledComponents";
import { Product } from "../types/entityTypes"
import { useState } from "react";
import { AddToCart } from "./AddToCart";

type Props = {
    product: Product
};

export const ProductCard = ({
    product
}: Props) => {

    const [isOver, setIsOver] = useState<boolean>(false);

    return (
        <div className="product-card" onMouseOver={() => setIsOver(true)} onMouseLeave={() => setIsOver(false)}>
            <Link to={'/product/' + product.id}>
                <img src={product.image} alt={product.title} />
            </Link>
            <div className="body">
                <h3>
                    <Link to={'/product/' + product.id}>
                        {product.title}
                    </Link>
                </h3>
                <div className="price">{formatPrice(product.price)}</div>
                <div style={{
                    opacity: isOver ? 1: 0,
                    transition: 'opacity .3s'
                }}>
                    <AddToCart
                        product={product}
                    />
                </div>
            </div>
        </div>
    )
}