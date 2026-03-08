// product.js

export class Product {

    constructor(id, name, price) {
        this.id = id
        this.name = name
        this.price = price
    }

    static createProduct(id, name, price) {
        return new Product(id, name, price)
    }

}