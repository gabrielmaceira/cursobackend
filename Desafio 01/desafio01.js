class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName = () => {
        return `${this.nombre} ${this.apellido}`
    }

    addMascota = (newMascota) => {
        this.mascotas.push(newMascota)
    }

    countMascotas = () => {
        return this.mascotas.length
    }

    addBook = (bookName, bookAuthor) => {
        this.libros.push({ nombre: bookName, autor: bookAuthor })
    }

    getBookNames = () => {
        return this.libros.map(book => book.nombre)
    }

}

const hugo = new Usuario("Hugo", "Pato", [{ nombre: 'El señor de las moscas', autor: 'William Golding' }, { nombre: 'Fundacion', autor: 'Isaac Asimov' }], ["perro", "gato"])

console.log("****TEST FULL NAME****")
console.log(hugo.getFullName())

console.log("****TEST MASCOTAS****")
console.log(hugo.countMascotas())
hugo.addMascota("loro")
console.log(hugo.countMascotas())

console.log("****TEST LIBROS****")
console.log(hugo.getBookNames())
hugo.addBook("nuevo libro", "de algun autor")
console.log(hugo.getBookNames())