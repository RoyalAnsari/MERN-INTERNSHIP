import { Product } from "./product.js"
import { Cart } from "./cart.js"
import { sortProducts, groupByPrice } from "./utils.js"

const cart = new Cart()

// create products

const p1 = Product.createProduct(1,"Laptop",1000)
const p2 = Product.createProduct(2,"Phone",700)
const p3 = Product.createProduct(3,"Mouse",50)

// add to cart

cart.addItem(p1)
cart.addItem(p2)
cart.addItem(p3)

// show cart

cart.showCart()

// sort products

const sorted = sortProducts(cart.items)

console.log("Sorted products")
console.log(sorted)

// group products

const grouped = groupByPrice(cart.items)

console.log("Grouped products")
console.log(grouped)