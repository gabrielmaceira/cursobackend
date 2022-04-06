const isValidHttpUrl = require('../helpers/isValidHttpUrl')
const { mariaDBOptions } = require('../options/mariaDB')

module.exports = class Container {
    async getAllProducts() {
        const knexMariaDB = require('knex')(mariaDBOptions)
        try {
            const allProducts = await knexMariaDB.from("productos").select("*")
            knexMariaDB.destroy()
            return allProducts
        }
        catch (err) {
            throw new Error(err.message)
        }
    }

    async getProduct(id) {
        const knexMariaDB = require('knex')(mariaDBOptions)
        if (id < 1 || isNaN(id)) {
            throw new Error("{ error: 'ID no es un numero valido' }")
        }
        else {
            try {
                const foundItem = await knexMariaDB("productos").select("*").where({ id: id })
                /* knexMariaDB.destroy() */
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

    async addProduct(product) {
        const knexMariaDB = require('knex')(mariaDBOptions)
        try {
            if (typeof product.title === "string" &&
                product.title.length > 0 &&
                !isNaN(Number(product.price)) &&
                isValidHttpUrl(product.thumbnail)
            ) {
                const inserted = await knexMariaDB("productos")
                    .insert({ title: product.title, price: Number(product.price), thumbnail: product.thumbnail })
                console.log(`Added product with id ${inserted}`)
                knexMariaDB.destroy()
            }
            else {
                throw new Error("{ error: 'Revisar los datos ingresados!' }")
            }
        }
        catch (err) {
            throw new Error(err.message)
        }
    }

    async updateProduct(id, productData) {
        const knexMariaDB = require('knex')(mariaDBOptions)
        if (isNaN(id)) {
            throw new Error("{ error: 'ID no es un numero valido' }")
        }
        else {
            try {
                const dataToUpdate = []
                if (typeof productData.title === "string" && productData.title.length > 0) {
                    dataToUpdate.push({ title: productData.title })
                }
                if (!isNaN(Number(productData.price))) {
                    dataToUpdate.push({ price: Number(productData.price) })
                }
                if (isValidHttpUrl(productData.thumbnail)) {
                    dataToUpdate.push({ thumbnail: productData.thumbnail })
                }

                if (dataToUpdate.length > 0) {
                    const updated = await knexMariaDB("productos")
                        .update(...dataToUpdate)
                    console.log(updated)
                    knexMariaDB.destroy()
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

    async deleteProduct(id) {
        const knexMariaDB = require('knex')(mariaDBOptions)
        if (isNaN(id)) {
            throw new Error("{ error: 'ID no es un numero valido' }")
        }
        else {
            try {
                const deletedItem = await knexMariaDB("productos").del().where({ id: id })
                console.log(deletedItem)
                knexMariaDB.destroy()
            }
            catch (err) {
                throw new Error(err.message)
            }
        }
    }
}