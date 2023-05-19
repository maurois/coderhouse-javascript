let gastos = [
  {id: 1, articulo: "galletitas", precio: 350, fecha: "2023-05-12", detalle: "traviata"},
  {id: 2, articulo: "bananas", precio: 500, fecha: "2023-05-12", detalle: "un kilo"},
  {id: 3, articulo: "jugo", precio: 400, fecha: "2023-05-14", detalle: "1lt naranja"},
  {id: 4, articulo: "empanadas", precio: 1500, fecha: "2023-05-10", detalle: "una docena"},
  {id: 5, articulo: "hockey stick", precio: 150000, fecha: "2023-05-12", detalle: "vlack wit"},
  {id: 6, articulo: "canilleras", precio: 3500, fecha: "2023-05-12", detalle: "un par"},
  {id: 7, articulo: "zapatillas", precio: 45000, fecha: "2023-05-12", detalle: "un par"},
  {id: 8, articulo: "office 365", precio: 9000, fecha: "2023-05-12", detalle: "licencia familiar por un año"},
  {id: 9, articulo: "MacBook Air", precio: 480000, fecha: "2023-05-12", detalle: "M1 gris espacial 😱"},
  {id: 10, articulo: "Smartphone Motorola", precio: 145000, fecha: "2023-05-12", detalle: "Moto G"}
] //gastos puede ser un arreglo vacio inicialmente o traido desde una db.
let key = 11
let aux = [...gastos]
let id_key = 0

const sumarGastos = () => {
  let total = 0
  gastos.forEach(g => {
    total += g.precio
  })
  document.getElementById("titulo").innerHTML = `<i class="bi bi-coin"></i> Gastos <i class="bi bi-currency-dollar"></i>${total}`
}

sumarGastos()

const mostrarGastos = (arr) => {

  const list = document.getElementById("list")
  
  //Vaciamos el contenido del del div "list"
  while (list.hasChildNodes()) {
    list.removeChild(list.firstChild)    
  }
  
  if (arr.length > 0){
    
    list.className = "card-list"

    arr.forEach(gasto => {

      const item = document.createElement("div")
  
      item.className = "card border border-2 m-3 card-item shadow"
      item.innerHTML = `<div class="card-header">
                          <div class="btn-group">
                            <span class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><span>${gasto.articulo}</span></span>
                            <ul class="dropdown-menu shadow">
                              <li><a class="dropdown-item" key=${gasto.id} data-bs-toggle="modal" data-bs-target="#modalEditor" onclick="editarGasto(this)"><i class="bi bi-pen"></i> Editar</a></li>
                              <li><a class="dropdown-item" key=${gasto.id} onclick="eliminarGasto(this)"><i class="bi bi-trash"></i> Eliminar</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="card-body">
                          <h5 class="card-title ms-2"><i class="bi bi-currency-dollar"></i><span>${gasto.precio}</span></h5>
                          <p class="card-text ms-2"><span>${gasto.detalle}</span></p>
                        </div>
                        <div class="card-footer"><span class="mx-2">${gasto.fecha}</span></div>`
  
      if (gasto.precio >= 10000) {
        item.className +=  " border-danger" //" bg-danger text-white"
      } else if (gasto.precio >= 5000) {
        item.className += " border-warning"
      } else {
        item.className += " border-success"
      }

      list.append(item)

    })

  } else {
    const item = document.createElement("div")
    list.className = "card-empty"
    item.className = "no-list"
    item.innerHTML = "<p>👀</p>"
    list.append(item)
    aux = [...gastos]
  }

  sumarGastos()

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
      id:key,
      articulo: articulo.value,
      precio: parseInt(precio.value),
      fecha: fecha.value,
      detalle: detalle.value
    }

    key++
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

const eliminarGasto = (e) => {
  const index = gastos.indexOf(gastos.filter(g => g.id === parseInt(e.getAttribute("key")))[0])
  gastos.splice(index, 1)
  mostrarGastos(gastos)
  aux = [...gastos]
}


const cargarModal = () => {
  const editor = document.getElementById("modalEditorForm")

  editor.innerHTML = `<div class="modal fade" id="modalEditor" tabindex="-1" aria-labelledby="modalEditorLabel" aria-hidden="true">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h1 class="modal-title fs-5" id="modalEditorLabel"><span id="articuloMod"></span></h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div id="modal-form" class="modal-body">
                            
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" class="btn btn-primary" onclick="aplicarCambios()" data-bs-dismiss="modal">Aplicar</button>
                          </div>
                        </div>
                      </div>
                    </div>`
  
}

const editarGasto = (e) => {

  const gasto = gastos.filter(g => g.id === parseInt(e.getAttribute("key")))[0]

  const form = document.getElementById("modal-form")
  form.innerHTML = `<div name="formularioMod" id="card-form-mod">
                      <label for="articulo" class="form-label ">Artículo</label>
                      <input type="text" class="form-control" id="articulo-mod" onkeyup="actualizarTituloMod()" value="${gasto.articulo}" required>
                      <label for="precio" class="form-label mt-3">Precio</label>
                      <input type="number" class="form-control" id="precio-mod" value=${gasto.precio} required></input>
                      <label for="detalle" class="form-label mt-3">Detalle</label>
                      <textarea class="form-control" id="detalle-mod" rows="3" >${gasto.detalle}</textarea>
                      <label for="fecha" class="form-label mt-3">Fecha</label>
                      <input type="date" class="form-control" id="fecha-mod" value=${gasto.fecha} required></input>
                      <span key=${gasto.id} id="span-key"></span>
                    </div>`

  document.getElementById("articuloMod").innerText = gasto.articulo
}

const actualizarTituloMod = () => {

  const tituloMod = document.getElementById("articuloMod")
  tituloMod.innerText = document.getElementById("articulo-mod").value

}

const aplicarCambios = () => {

  const gasto = gastos.filter(g => g.id === parseInt(document.getElementById("span-key").getAttribute("key")) )[0]
  gasto.articulo = document.getElementById("articulo-mod").value
  gasto.precio = parseInt(document.getElementById("precio-mod").value)
  gasto.detalle = document.getElementById("detalle-mod").value
  gasto.fecha = document.getElementById("fecha-mod").value

  mostrarGastos(gastos)
  aux = [...gastos]
}