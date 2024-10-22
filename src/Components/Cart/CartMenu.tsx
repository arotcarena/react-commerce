import { formatPrice } from "../../functions/formaters/formatPrice";
import { CartLine as CartLineType } from "../../types/entityTypes";
import { CartLine } from "./CartLine";

type Props = {
    onClose: () => void,
    cartLines: CartLineType[]
}

export const CartMenu = ({
    onClose,
    cartLines,
}: Props) => {

    let count = 0;
    let totalPrice = 0;
    for(const cartLine of cartLines) {
        count += cartLine.quantity;
        totalPrice += parseFloat(cartLine.product.price) * cartLine.quantity;
    }

    return (
        <div className="modal-wrapper aside">
            <div className="modal aside">
                <div className="cart-menu">
                    <div className="cart-menu-header">
                        <h2>
                            <span>Panier</span>
                            {
                                count > 0 && ' (' + count + ')'
                            }
                        </h2>
                        <button type="button" onClick={onClose}>Fermer</button>
                    </div>
                    <div className="cart-line-list">
                        {
                            cartLines.map((cartLine: CartLineType, index: number) => (
                                <CartLine
                                    key={index}
                                    cartLine={cartLine}
                                />
                            ))
                        }
                    </div>
                    <div className="cart-footer">
                        Total : {formatPrice(totalPrice.toString())}
                    </div>
                </div>
            </div>
        </div>
    )
};