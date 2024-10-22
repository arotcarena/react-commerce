import { useState } from "react";
import { CartStoreProvider, useCartStore } from "../../Stores/CartStore";
import { createPortal } from "react-dom";
import { CartMenu } from "./CartMenu";
import { CartLine } from "../../types/entityTypes";

type Props= {
    cartLines: CartLine[]
};

const CartControl = ({
    cartLines
}: Props) => {
    const [isOpen, setOpen] = useState<boolean>(false);

    const handleClose = () => setOpen(false);

    let count = 0;
    for(const cartLine of cartLines) {
        count += cartLine.quantity;
    }

    return (
        <>
            <button type="button" onClick={() => setOpen(true)}>
                <span>Panier</span>{' '}
                {
                    count > 0 && '(' + count + ')'
                }
            </button>
            {
                isOpen && (
                    createPortal((
                        <CartMenu onClose={handleClose} cartLines={cartLines} />
                    ), document.body)
                )
            }
        </>
    )
}

export const Cart = () => {
    return (
        <CartStoreProvider renderCart={(cartLines: CartLine[]) => (
            <CartControl cartLines={cartLines} />
        )} />
    )
};
