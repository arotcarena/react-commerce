import { Link, useLocation, useParams } from "react-router-dom"
import { Cart } from "./Cart"
import { useQuery } from "@tanstack/react-query"
import { loadCategories } from "../functions/queries/categoryQueries"
import { SearchTool } from "./SearchTool"

export const Header = () => {
    const {pathname: currentPath} = useLocation();

    const {data: categories, isFetching} = useQuery({
        queryKey: ['categories'],
        queryFn: loadCategories,
        initialData: []
    });

    return (
        <header>
            <Link to="/" className={'/' === currentPath ? 'active': ''}>Homepage</Link>
            {
                isFetching && <span>Chargement...</span>
            }
            {
                categories.map((category: string, index: number) => {
                    const path = '/' + category;
                    return (
                        <Link className={path === decodeURIComponent(currentPath) ? 'active': ''} key={index} to={path}>{category}</Link>
                    )
                })
            }
            <SearchTool />
            <div style={{marginLeft: 'auto'}}>
                <Cart />
            </div>
        </header>
    )
}
