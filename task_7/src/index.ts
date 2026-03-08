import { Product } from "./product";
import { Cart } from "./cart";
import { sortProducts, groupByPrice, updateProduct, validateProduct } from "./utils";
import { inventory } from "./data";

const cart = new Cart();

// Create products
const p1 = Product.createProduct(1, "Laptop", 1000, "electronics");
const p2 = Product.createProduct(2, "Phone", 700, "electronics");
const p3 = Product.createProduct(3, "Mouse", 50, "electronics");

// Add to cart
cart.addItem(p1);
cart.addItem(p2);
cart.addItem(p3);

// Show cart
cart.showCart();

// Update product using Partial<Pick<>>
const updatedLaptop = updateProduct(p1, { price: 900 });
cart.addItem(updatedLaptop);

// Validate product
console.log("Is valid:", validateProduct(updatedLaptop));

// Sort products
const sorted = sortProducts(cart.items);
console.log("Sorted products:", sorted);

// Group products
const grouped = groupByPrice(cart.items);
console.log("Grouped products:", grouped);