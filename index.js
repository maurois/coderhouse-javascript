let gastos = [
  {articulo: "galletitas", precio: 350, fecha: "2023-05-12", detalle: "traviata"},
  {articulo: "bananas", precio: 500, fecha: "2023-05-12", detalle: "un kilo"},
  {articulo: "jugo", precio: 400, fecha: "2023-05-12", detalle: "1lt naranja"},
  {articulo: "empanadas", precio: 1500, fecha: "2023-05-12", detalle: "una docena"},
  {articulo: "hockey stick", precio: 150000, fecha: "2023-05-12", detalle: "vblack wit"},
  {articulo: "canilleras", precio: 3500, fecha: "2023-05-12", detalle: "un par"},
  {articulo: "zapatillas", precio: 45000, fecha: "2023-05-12", detalle: "un par"},
  {articulo: "office 365", precio: 9000, fecha: "2023-05-12", detalle: "licencia familiar por un año"},
  {articulo: "MacBook Air", precio: 480000, fecha: "2023-05-12", detalle: "M1 gris espacial 😱"},
  {articulo: "Smartphone Motorola", precio: 145000, fecha: "2023-05-12", detalle: "Moto G"},
  
] //gastos puede ser un arreglo vacio inicialmente o traido desde una db.

const mostrarGastos = (gastos) => {

  const list = document.getElementById("list")
  
  //Vaciamos el contenido del del div "list"
  while (list.hasChildNodes()) {
    list.removeChild(list.firstChild)    
  }

  gastos.forEach(gasto => {
    const item = document.createElement("div")

    item.className = "card border-dark m-3 card-item"
    item.innerHTML = `<div class="card-header border-dark">${gasto.articulo}</div>
                      <div class="card-body">
                        <h5 class="card-title">$${gasto.precio}</h5>
                        <p class="card-text">${gasto.detalle}</p>
                      </div>
                      <div class="card-footer border-dark">${gasto.fecha}</div>`

    if (gasto.precio >= 10000) {
      item.className += " bg-danger text-white"
    } else if (gasto.precio >= 5000) {
      item.className += " bg-warning"
    }

    list.append(item)
  })

}

mostrarGastos(gastos)

const esValido = () => {
  if (document.getElementById("articulo").value === "" || document.getElementById("precio").value === "" || document.getElementById("fecha").value === ""  ){
    alert("Debe rellenar los campos Articulo, Precio y Fecha al menos.")
    return false
  } else {
    return true
  }
}

const eventoAgregar = (event) => {

  if (esValido()) {
    const gasto = {
      articulo: articulo.value,
      precio: precio.value,
      fecha: fecha.value,
      detalle: detalle.value
    }

    gastos.push(gasto)
  
    articulo.value = ""
    precio.value = ""
    fecha.value = ""
    detalle.value = ""
  
    mostrarGastos(gastos)
  }

}
document.getElementById("botonAgregar").onclick = eventoAgregar

const eventoFiltrarPorPrecio = (event) => {
  const p = parseInt(document.getElementById("price").value)
  mostrarGastos(gastos.filter(g => g.precio >= p))
}
document.getElementById("botonFiltrarPrecio").onclick = eventoFiltrarPorPrecio

const eventoLimpiarFiltroPrecio = (event) => {
  let price = document.getElementById("price").value = ""
  mostrarGastos(gastos)
}
document.getElementById("botonLimpiarFiltroPrecio").onclick = eventoLimpiarFiltroPrecio

const precioSort = (a, b) =>  {
  // 
  if (a.precio > b.precio) {
    return 1
  }
  if (a.precio < b.precio){
    return -1
  }
  return 0
}

const eventoSortPrecio = (evento) => {
  const copia = [...gastos]
  mostrarGastos(copia.sort(precioSort))
}
document.getElementById("botonSortPrecio").onclick = eventoSortPrecio

const eventoRestaurarOrden = (evento) => {
  mostrarGastos(gastos)
}
document.getElementById("botonRestaurar").onclick = eventoRestaurarOrden