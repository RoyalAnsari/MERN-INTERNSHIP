import { Product } from "./product";

// Mapped type for readonly cart items
export type ReadonlyCartItem = {
    readonly [K in keyof Product]: Product[K];
} & { readonly quantity: number };

export class Cart {
    items: Product[] = [];

    addItem(product: Product) {
        this.items = [...this.items, product];
        console.log("Product added:", product.name);
    }

    removeItem(id: number) {
        this.items = this.items.filter(item => item.id !== id);
        console.log("Product removed");
    }

    showCart() {
        this.items.forEach(({ name, price }) => {
            console.log(name, price);
        });
    }
}