import { useQuery } from "@tanstack/react-query"
import { loadCategoryProducts } from "../functions/queries/productQueries"
import { Product } from "../types/entityTypes";
import { ProductCard } from "../UI/ProductCard";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";

export const CategoryShow = () => {
    const {category} = useParams();
    const navigate = useNavigate();

    const {data: products, isFetching, refetch} = useQuery({
        queryKey: ['products_index'],
        queryFn: () => {
            if(!category) {
                navigate('/');
                return [];
            }
            return loadCategoryProducts(category);
        },
        initialData: [],
    });

    useEffect(() => {
        refetch();
    }, [category]);

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
