import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "../pages/Home"
import { Header } from "./Header";
import { ProductShow } from "../pages/ProductShow";
import { Cart } from "./Cart";
import { CategoryShow } from "../pages/CategoryShow";

function Index() {
    return (
        <BrowserRouter basename="/">
            <Header />
            <Routes>
                <Route
                    path="/"
                    element={<Home />}
                />
                <Route
                    path="/product/:id"
                    element={<ProductShow />}
                />
                <Route
                    path="/:category"
                    element={<CategoryShow />}
                />
                <Route
                    path="/cart"
                    element={<Cart />}
                />
            </Routes>
        </BrowserRouter>
    )
}

export default Index;