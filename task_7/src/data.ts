import { Product, Category } from "./product";

// Inventory by category using Record
export const inventory: Record<Category, Product[]> = {
    electronics: [
        Product.createProduct(1, "Laptop", 1200, "electronics"),
        Product.createProduct(2, "Headphones", 150, "electronics")
    ],
    clothing: [
        Product.createProduct(3, "T-Shirt", 20, "clothing")
    ],
    books: [
        Product.createProduct(4, "TypeScript Guide", 35, "books")
    ]
};