export type Product = {
    id: number,
    title: string,
    price: string,
    category: string,
    description: string,
    image: string,
};

export type CartLine = {
    product: Product,
    quantity: number
};
