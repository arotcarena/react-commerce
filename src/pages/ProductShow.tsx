import { useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate, useParams } from "react-router"
import { showProduct } from "../functions/queries/productQueries";
import { formatPrice } from "../functions/formaters/formatPrice";
import { AddToCart } from "../UI/AddToCart";

export const ProductShow = () => {

    const {id} = useParams();
    const navigate = useNavigate();

    const {data: product, isFetching} = useQuery({
        queryKey: ['product_show', id],
        queryFn: () => {
            if(!id) {
                navigate('/');
                return;
            }
            return showProduct(parseInt(id));
        },
        initialData: null,
    });

    if(isFetching) {
        return (
            <div className="page">
                <h3>Chargement...</h3>
            </div>
        )
    } else if(!product) {
        return <Navigate to="/" />
    }

    return (
        <div className="page">
            <div className="product-show">
                <div className="img-wrapper">
                    <img src={product.image} alt={product.title} />
                </div>
                <div className="body">
                    <h1>{product.title}</h1>
                    <div className="price">
                        {formatPrice(product.price)}
                    </div>
                    <div>
                        {product.description}
                    </div>
                    <AddToCart product={product} />
                </div>
            </div>
        </div>
    )
}