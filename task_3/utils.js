// utils.js

export function sortProducts(products) {

    return products.sort((a,b) => a.price - b.price)

}

export function groupByPrice(products) {

    const map = new Map()

    products.forEach(product => {

        const price = product.price

        if(!map.has(price)) {
            map.set(price, [])
        }

        map.get(price).push(product)

    })

    return map
}