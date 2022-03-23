const isValidHttpUrl = require('../helpers/isValidHttpUrl')

module.exports = class Products {
    constructor() {
        this.products = [{
            title: 'sdfsf',
            price: '21312',
            thumbnail: 'https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Viking-512.png'
          }, {
            title: 'sdfsf',
            price: '21312',
            thumbnail: 'https://cdn3.iconfinder.com/data/icons/fantasy-and-role-play-game-adventure-quest/512/Viking-512.png'
          }]
        this.counter = 1
    }

    getAllProducts() {
        return this.products;
    }

    getProduct(id) {
        if (id < 1 || isNaN(id)) {
            throw new Error("{ error: 'ID no es un numero valido' }")
        }
        else {
            try {
                const foundItem = this.products.find(el => el.id === id)
                if (foundItem !== undefined) {
                    return foundItem
                }
                else {
                    throw new Error("{error: 'producto no encontrado'}")
                }
            }
            catch (err) {
                throw new Error(err.message)
            }
        }
    }

    addProduct(product) {
        try {
            if (typeof product.title === "string" &&
                product.title.length > 0 &&
                !isNaN(Number(product.price)) &&
                isValidHttpUrl(product.thumbnail)
            ) {
                const newProduct = { ...product, price: Number(product.price), id: this.counter }
                this.counter++
                this.products.push(newProduct)
                return newProduct
            }
            else {
                throw new Error("{ error: 'Revisar los datos ingresados!' }")
            }
        }
        catch (err) {
            throw new Error(err.message)
        }
    }

    updateProduct(id, productData) {
        if (isNaN(id)) {
            throw new Error("{ error: 'ID no es un numero valido' }")
        }
        else {
            try {
                const foundProduct = this.getProduct(id)

                if (((typeof productData.title === "string" && productData.title.length > 0) || productData === undefined) &&
                    (!isNaN(Number(productData.price)) || productData.price === undefined) &&
                    (isValidHttpUrl(productData.thumbnail) || productData.thumbnail === undefined)
                ) {
                    const idx = this.products.indexOf(foundProduct)
                    if (productData.price !== undefined) {

                        this.products[idx] = { ...foundProduct, ...productData, price: Number(productData.price) }
                    }
                    else {
                        this.products[idx] = { ...foundProduct, ...productData }
                    }
                }
                else {
                    throw new Error("{ error: 'Revisar los datos ingresados!' }")
                }
            }
            catch (err) {
                throw new Error(err.message)
            }
        }
    }

    deleteProduct(id) {
        if (isNaN(id)) {
            throw new Error("{ error: 'ID no es un numero valido' }")
        }
        else {
            try {
                this.getProduct(id)
                this.products = this.products.filter(el => el.id !== id)
            }
            catch (err) {
                throw new Error(err.message)
            }
        }
    }
}