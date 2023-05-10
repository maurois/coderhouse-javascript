// let nombre = prompt("Cual es su nombre?")

// if (nombres.includes(nombre.toLowerCase())) {
// 	alert("Su nombre, "+ nombre +", se encuentra dentro del ranking de los 1000 nombres más utilizados.")
// } else {
// 	alert("Hola, su nombre: " + nombre + ", no es muy común.")
// }

// document.write("<h2>Lo que sigue se imprime con un bucle while.</h2>")
// let i = 0
// while (i < 5) {
// 	document.write("<p>Éste es el párrafo número " + i +".</p>")
// 	i++
// }


let prod_array = [
    {id: "0", art: "a", precio:"10", desc: "Es el producto a", imagen: ""},
    {id: "1", art: "b", precio:"15", desc: "ES un producto b", imagen: ""},
    {id: "2", art: "c", precio:"12", desc: "c es una division", imagen: ""},
    {id: "3", art: "d", precio:"40", desc: "d es el item 3", imagen: ""},
    {id: "4", art: "e", precio:"35", desc: "e, solo e", imagen: ""}
]

let container = document.getElementById("container")

prod_array.forEach(item => {
    let div = document.createElement("div")
    div.innerHTML = `<span>Artículo: ${item.art} Precio: ${item.precio}</span><hr>`
    container.append(div)
})