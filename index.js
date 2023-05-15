let gastos = [
  {articulo: "galletitas", precio: 350, fecha: "2023-05-12", detalle: "traviata"},
  {articulo: "bananas", precio: 500, fecha: "2023-05-12", detalle: "un kilo"},
  {articulo: "jugo", precio: 400, fecha: "2023-05-14", detalle: "1lt naranja"},
  {articulo: "empanadas", precio: 1500, fecha: "2023-05-10", detalle: "una docena"},
  {articulo: "hockey stick", precio: 150000, fecha: "2023-05-12", detalle: "vlack wit"},
  {articulo: "canilleras", precio: 3500, fecha: "2023-05-12", detalle: "un par"},
  {articulo: "zapatillas", precio: 45000, fecha: "2023-05-12", detalle: "un par"},
  {articulo: "office 365", precio: 9000, fecha: "2023-05-12", detalle: "licencia familiar por un año"},
  {articulo: "MacBook Air", precio: 480000, fecha: "2023-05-12", detalle: "M1 gris espacial 😱"},
  {articulo: "Smartphone Motorola", precio: 145000, fecha: "2023-05-12", detalle: "Moto G"}
] //gastos puede ser un arreglo vacio inicialmente o traido desde una db.

let aux = [...gastos]

const sumarGastos = () => {
  let total = 0
  gastos.forEach(g => {
    total += g.precio
  })
  document.getElementById("titulo").innerHTML = `Gastos = $${total}`
}

sumarGastos()

const mostrarGastos = (gastos) => {

  const list = document.getElementById("list")
  
  //Vaciamos el contenido del del div "list"
  while (list.hasChildNodes()) {
    list.removeChild(list.firstChild)    
  }
  
  if (gastos.length > 0){
    
    list.className = "card-list"

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

  } else {
    const item = document.createElement("div")
    list.className = "card-empty"
    item.className = "no-list"
    item.innerHTML = "<p>👀</p>"
    list.append(item)
  }
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

const agregarGasto = () => {

  if (esValido()) {
    const gasto = {
      articulo: articulo.value,
      precio: parseInt(precio.value),
      fecha: fecha.value,
      detalle: detalle.value
    }

    gastos.push(gasto)
  
    articulo.value = ""
    precio.value = ""
    fecha.value = ""
    detalle.value = ""
  
    mostrarGastos(gastos)
    aux = [...gastos]

    sumarGastos()

  }

}
document.getElementById("botonAgregar").onclick = agregarGasto

const filtrarPorPrecioMayor = (event) => {
  const p = parseInt(document.getElementById("precioMayor").value)
  aux = aux.filter(g => g.precio > p)
  mostrarGastos(aux)
}
document.getElementById("botonFiltrarPrecioMayor").onclick = filtrarPorPrecioMayor

const filtrarPorPrecioMenor = () => {
  const p = parseInt(document.getElementById("precioMenor").value)
  aux = aux.filter(g => g.precio < p)
  mostrarGastos(aux)
}
document.getElementById("botonFiltrarPrecioMenor").onclick = filtrarPorPrecioMenor

const limpiarFiltroPrecio = () => {
  let precioMayor = document.getElementById("precioMayor").value = ""
  let precioMenor = document.getElementById("precioMenor").value = ""
  aux = [...gastos]
  mostrarGastos(gastos)
}
document.getElementById("botonLimpiarFiltroPrecio").onclick = limpiarFiltroPrecio

const precioSortAscendente = (a, b) =>  { 
  if (a.precio > b.precio) {
    return 1
  }
  if (a.precio < b.precio){
    return -1
  }
  return 0
}

const sortPrecioAscendente = () => {
  aux.sort(precioSortAscendente)
  mostrarGastos(aux)
}
document.getElementById("botonSortPrecioAscendente").onclick = sortPrecioAscendente

const precioSortDescendente = (a, b) =>  {
  if (a.precio > b.precio) {
    return -1
  }
  if (a.precio < b.precio){
    return 1
  }
  return 0
}

const sortPrecioDescendente = () => {
  aux.sort(precioSortDescendente)
  mostrarGastos(aux)
}
document.getElementById("botonSortPrecioDescendente").onclick = sortPrecioDescendente

const restaurarOrden = () => {
  aux = [...gastos]
  mostrarGastos(gastos)
}
document.getElementById("botonRestaurarPrecio").onclick = restaurarOrden
document.getElementById("botonRestaurarFecha").onclick = restaurarOrden
document.getElementById("botonRestaurarTodos").onclick = restaurarOrden

const fechaSortAscendente = (a, b) => {
  const da = new Date(a.fecha)
  const db = new Date(b.fecha)
  if (da > db) {
    return 1
  }
  if (da < db){
    return -1
  }
  return 0
}

const sortFechaAscendente = () => {
  aux.sort(fechaSortAscendente)
  mostrarGastos(aux)
}
document.getElementById("botonSortFechaAscendente").onclick = sortFechaAscendente

const fechaSortDescendente = (a, b) => {
  const da = new Date(a.fecha)
  const db = new Date(b.fecha)
  if (da > db) {
    return -1
  }
  if (da < db){
    return 1
  }
  return 0
}

const sortFechaDescendente = () => {
  aux.sort(fechaSortDescendente)
  mostrarGastos(aux)
}
document.getElementById("botonSortFechaDescendente").onclick = sortFechaDescendente

const buscarFecha = () => {
  aux = aux.filter(g => g.fecha === document.getElementById("fechaInput").value)
  mostrarGastos( aux )
}
document.getElementById("botonBuscarFecha").onclick = buscarFecha