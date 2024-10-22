import { Link } from "react-router-dom";
import { CartLine as CartLineType } from "../../types/entityTypes"
import { formatPrice } from "../../functions/formaters/formatPrice";
import { useCartStore } from "../../Stores/CartStore";

type Props = {
    cartLine: CartLineType
};

export const CartLine = ({
    cartLine
}: Props) => {
    const {changeQuantity, removeLine} = useCartStore();

    const handleChangeQuantity = (newQuantity: number) => changeQuantity(cartLine.product, newQuantity);
    const handleRemove = () => removeLine(cartLine.product);

    const {product, quantity} = cartLine;

    return (
        <div className="cart-line">
            <div className="img-wrapper">
                <Link to={'/product/' + product.id}>
                    <img src={product.image} alt={product.title} />
                </Link>
            </div>
            <div className="body">
                <h3>
                    <Link to={'/product/' + product.id}>
                        {product.title}
                    </Link>
                </h3>
                <div className="price">{formatPrice(product.price)}</div>
                <QuantityInput
                    quantity={quantity}
                    changeQuantity={handleChangeQuantity}
                />
            </div>
            <button style={{alignSelf: 'center'}} onClick={handleRemove}>X</button>
        </div>
    )
};

type QuantityInputProps = {
    quantity: number,
    changeQuantity: (newQuantity: number) => void,
}

const QuantityInput = ({
    quantity,
    changeQuantity
}: QuantityInputProps) => {
    return (
        <div className="quantity-input">
            <button type="button" onClick={() => changeQuantity(-1)}>
                <span style={{fontSize: '1.2em'}}>-</span>
            </button>
            <div>
                {quantity}
            </div>
            <button type="button" onClick={() => changeQuantity(1)}>
                +
            </button>
        </div>
    )
}