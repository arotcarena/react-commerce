import { useQuery } from "@tanstack/react-query"
import { loadProducts } from "../functions/queries/productQueries"
import { Product } from "../types/entityTypes";
import { ProductCard } from "../UI/ProductCard";

export const Home = () => {

    const {data: products, isFetching} = useQuery({
        queryKey: ['products_index'],
        queryFn: loadProducts,
        initialData: []
    });

    return (
        <div className="page">
            <div className="product-list">
                {
                    isFetching && <div>Chargement...</div>
                }
                {
                    products.map((product: Product, index: number) => (
                        <ProductCard
                            key={index}
                            product={product}
                        />
                    ))
                }
            </div>
        </div>
    )
}
