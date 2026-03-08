// Update product using Partial<Pick<>>
import { Product, ProductUpdate } from "./product";

// Update only name or price
export function updateProduct(product: Product, updates: ProductUpdate): Product {
    return { ...product, ...updates };
}

// Validate products using generics with constraints
export function validateProduct<T extends Product>(product: T): boolean {
    return product.name !== "" && product.price > 0;
}

// Sort products by price
export function sortProducts(products: Product[]): Product[] {
    return [...products].sort((a, b) => a.price - b.price);
}

// Group products by price
export function groupByPrice(products: Product[]): Map<number, Product[]> {
    const map = new Map<number, Product[]>();
    products.forEach(product => {
        const price = product.price;
        if (!map.has(price)) map.set(price, []);
        map.get(price)!.push(product);
    });
    return map;
}

// Example of using ReturnType
export function addToCartHandler(product: Product, quantity: number) {
    return { product, quantity };
}

export type AddToCartReturn = ReturnType<typeof addToCartHandler>;