let gastos = [
  {articulo: "galletitas", precio: 350, fecha: "2023-05-12", detalle: "traviata"},
  {articulo: "bananas", precio: 500, fecha: "2023-05-12", detalle: "un kilo"},
  {articulo: "jugo", precio: 400, fecha: "2023-05-12", detalle: "1lt naranja"},
  {articulo: "empanadas", precio: 1500, fecha: "2023-05-12", detalle: "una docena"},
] //gastos puede ser un arreglo vacio inicialmente o traido desde una db.

function mostrarGastos(gastos){

  const list = document.getElementById("list")
  
  //Vaciamos el contenido del del div "list"
  while (list.hasChildNodes()) {
    list.removeChild(list.firstChild)    
  }

  gastos.forEach(gasto => {
    const item = document.createElement("span")

    item.className = "card border-dark m-3 card-item"
    item.innerHTML = `<div class="card-header border-dark">${gasto.articulo}</div>
                      <div class="card-body text-dark">
                        <h5 class="card-title">$${gasto.precio}</h5>
                        <p class="card-text">${gasto.detalle}</p>
                      </div>
                      <div class="card-footer bg-transparent border-success">${gasto.fecha}</div>`

    if (gasto.precio >= 10000) {
      item.className += " bg-danger"
    } else if (gasto.precio >= 5000) {
      item.className += " bg-warning"
    }

    list.append(item)
  })

}

mostrarGastos(gastos)

function esValido(){
  if (document.getElementById("articulo").value === "" || document.getElementById("precio").value === "" || document.getElementById("fecha").value === ""  ){
    alert("Debe rellenar los campos Articulo, Precio y Fecha al menos.")
    return false
  } else {
    return true
  }
}

function eventoAgregar(event) {

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

function eventoFiltrarPorPrecio(event) {
  mostrarGastos(gastos.filter(g => g.precio >= document.getElementById("price").value))
}
document.getElementById("botonFiltrarPrecio").onclick = eventoFiltrarPorPrecio

const eventoLimpiarFiltroPrecio = (event) => {
  let price = document.getElementById("price").value = ""
  mostrarGastos(gastos)
}
document.getElementById("botonLimpiarFiltroPrecio").onclick = eventoLimpiarFiltroPrecio

console.log(gastos);