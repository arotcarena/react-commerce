import { useQuery } from "@tanstack/react-query"
import { loadProducts } from "../functions/queries/productQueries"
import { ReactNode, useMemo, useState } from "react";
import { Product } from "../types/entityTypes";
import { Link } from "react-router-dom";
import { formatPrice } from "../functions/formaters/formatPrice";

export const SearchTool = () => {

    const {data: products, isFetching} = useQuery({
        queryKey: ['product_index'],
        queryFn: loadProducts,
        initialData: []
    });

    const [q, setQ] = useState<string>('');
    const suggests: Product[] = useMemo(() => {
        return products.filter((product: Product) => {
            if(q !== '' && product.title.toLowerCase().includes(q.toLowerCase())) {
                return true;
            }
        })
    }, [q, products]);

    const handleChange = (e: any) => setQ(e.target.value);

    const handleClose = () => setQ('');

    return (
        <div className="search-tool">
            <input className={suggests.length > 0 ? 'is-open': ''} type="text" value={q} onChange={handleChange} placeholder="Rechercher un produit..." />
            {
                suggests.length > 0 && (
                    <div className="suggest-list">
                        {
                            suggests.map((product: Product) => {
                                const titleHtml = prepareLightedString(q, product.title);
                                return (
                                    <div className="suggest-item">
                                        <div className="img-wrapper">
                                            <Link onClick={handleClose} to={'/product/' + product.id}>
                                                <img src={product.image} alt={product.title} />
                                            </Link>
                                        </div>
                                        <div className="body">
                                            <h3>
                                                <Link onClick={handleClose} to={'/product/' + product.id}>
                                                    {titleHtml}
                                                </Link>
                                            </h3>
                                            <div className="price">{formatPrice(product.price)}</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }
        </div>
    )
}

const prepareLightedString = (q: string, text: string): ReactNode => {
    
    const qLower = q.toLowerCase();
    const textLower = text.toLowerCase();

    if(!textLower.includes(qLower)) {
        return <span>{text}</span>
    }

    const parts = textLower.split(qLower);
    const beforeLength = parts[0].length;
    const afterLength = parts[1].length;

    const before = text.substring(0, beforeLength);
    const searched = text.substring(beforeLength, beforeLength + q.length);
    const after = text.substring(beforeLength + q.length, beforeLength + q.length + afterLength);

    console.log(before, searched, after);
    const html = before + '<span style="color: #afaf2b;">' + searched + '</span>' + after;

    return (
        <span dangerouslySetInnerHTML={{__html: html}}>
        </span>
    )
}