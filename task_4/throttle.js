// throttle.js

export function throttle(fn, limit) {

    let waiting = false

    return function () {

        if (!waiting) {

            fn()

            waiting = true

            setTimeout(() => {
                waiting = false
            }, limit)

        }

    }

}
const cache = new WeakMap()

function saveCache(key, value) {

    cache.set(key, value)

}

function getCache(key) {

    return cache.get(key)

}

const apiObject = {}

saveCache(apiObject, "users data")

console.log(getCache(apiObject))