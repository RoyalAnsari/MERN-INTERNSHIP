// cart.js

export class Cart {

    constructor() {
        this.items = []
    }

    addItem(product) {

        this.items = [...this.items, product]

        console.log("Product added:", product.name)
    }

    removeItem(id) {

        this.items = this.items.filter(item => item.id !== id)

        console.log("Product removed")
    }

    showCart() {

        this.items.forEach(({name, price}) => {

            console.log(name, price)

        })

    }

}