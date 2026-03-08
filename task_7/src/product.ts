export type Category = "electronics" | "clothing" | "books";

export class Product {
    constructor(
        public id: number,
        public name: string,
        public price: number,
        public category?: Category
    ) {}

    static createProduct(
        id: number,
        name: string,
        price: number,
        category?: Category
    ): Product {
        return new Product(id, name, price, category);
    }
}

// For updates: only name & price can change
export type ProductUpdate = Partial<Pick<Product, "name" | "price">>;