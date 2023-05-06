let nombre = prompt("Cual es su nombre?")

if (nombres.includes(nombre.toLowerCase())) {
	alert("Su nombre, "+ nombre +", se encuentra dentro del ranking de los 1000 nombres más utilizados.")
} else {
	alert("Hola, su nombre: " + nombre + ", no es muy común.")
}

document.write("<h2>Lo que sigue se imprime con un bucle while.</h2>")
let i = 0
while (i < 5) {
	document.write("<p>Éste es el párrafo número " + i +".</p>")
	i++
}