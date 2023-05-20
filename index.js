//App para manejo de gastos, por el momento es global, la idea es hacer una solapa para cada mes para ir completandolas

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

//Declaracion de variables globales
let key = 11 //se utiliza para referenciar cada gasto, es el id que se le asigna cada vez que se agrega y debe ser unico.
let aux = [...gastos] // aux se usa para no operar sobre el arreglo de gastos que no se debe perder, salvo que sea necesario eliminar o agregar gastos

// wrapper para document.getElementById
const element = (id) => {
  return document.getElementById(id)
}

// Para obtener la suma de los gastos y agregarla al titulo de la pagina, luego tendra que ser usada por cada tab
const sumarGastos = () => {
  let total = 0
  gastos.forEach(g => {
    total += g.precio
  })
  element("titulo").innerHTML = `<i class="bi bi-coin"></i> Gastos <i class="bi bi-currency-dollar"></i>${total}`
}

sumarGastos() // se carga el titulo por primera vez

//Se encarga de mostrar cada tarjeta para cada gasto que se encuentra en el arreglo arr que es pasado como argumento
const mostrarGastos = (arr) => {

  const list = element("list")
  
  //Vaciamos el contenido del del div "list"
  while (list.hasChildNodes()) {
    list.removeChild(list.firstChild)    
  }
  
  if (arr.length > 0){  // si el arreglo de gastos tiene elementos (gastos) los mostramos
    
    list.className = "card-list"

    arr.forEach(gasto => {

      const item = document.createElement("div")
  
      item.className = "card border border-2 m-3 card-item shadow"
      item.innerHTML = `<div class="card-header">
                          <div class="btn-group">
                            <span class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><span>${gasto.articulo}</span></span>
                            <ul class="dropdown-menu shadow">
                              <li><a class="dropdown-item" data-gasto-id=${gasto.id} onclick="editarGasto(this)" data-bs-toggle="modal" data-bs-target="#modalEditor"><i class="bi bi-pen"></i> Editar</a></li>
                              <li><a class="dropdown-item" data-gasto-id=${gasto.id} onclick="eliminarGasto(this)"><i class="bi bi-trash"></i> Eliminar</a></li>
                            </ul>
                          </div>
                        </div>
                        <div class="card-body">
                          <h5 class="card-title ms-1"><i class="bi bi-currency-dollar"></i><span>${gasto.precio}</span></h5>
                          <p class="card-text ms-1"><span>${gasto.detalle}</span></p>
                        </div>
                        <div class="card-footer"><span class="mx-1">${gasto.fecha}</span></div>`
  
      if (gasto.precio >= 10000) {
        item.className +=  " border-danger" //" bg-danger text-white"
      } else if (gasto.precio >= 5000) {
        item.className += " border-warning"
      } else {
        item.className += " border-success"
      }

      list.append(item)

    })

  } else { // sino (el arr no tiene elementos (no hay gastos que mostrar) mostramos un par de ojos)
    const item = document.createElement("div")
    list.className = "card-empty"
    item.className = "no-list"
    item.innerHTML = "<p>👀</p>"
    list.append(item)
    aux = [...gastos]
  }

  sumarGastos() // actualiazamos el estado del titulo, puede que se haya modificado el arr pasado para mostrar

}

mostrarGastos(gastos) //Se carga la pagina por primera vez


// para validar que el form de agregar gastos este cargado con datos
const esValido = () => {
  if (element("articulo").value === "" || element("precio").value === "" || element("fecha").value === ""  ){
    alert("Debe rellenar los campos Articulo, Precio y Fecha al menos.")
    return false
  } else {
    return true
  }
}

// 
const agregarGasto = () => {

  if (esValido()) {
    const gasto = {
      id:key,
      articulo: element("articulo").value,
      precio: parseInt(element("precio").value),
      fecha: element("fecha").value,
      detalle: element("detalle").value
    }
    key++
    gastos.push(gasto)
  
    element("articulo").value = ""
    element("precio").value = ""
    element("fecha").value = ""
    element("detalle").value = ""
  
    mostrarGastos(gastos)
    aux = [...gastos]

    sumarGastos()

  }

}
element("botonAgregar").addEventListener("click", agregarGasto)

const filtrarPorPrecioMayor = (event) => {
  const p = parseInt(element("precioMayor").value)
  aux = aux.filter(g => g.precio > p)
  mostrarGastos(aux)
}
element("botonFiltrarPrecioMayor").addEventListener("click", filtrarPorPrecioMayor) 

const filtrarPorPrecioMenor = () => {
  const p = parseInt(element("precioMenor").value)
  aux = aux.filter(g => g.precio < p)
  mostrarGastos(aux)
}
element("botonFiltrarPrecioMenor").addEventListener("click", filtrarPorPrecioMenor)

const limpiarFiltroPrecio = () => {
  let precioMayor = element("precioMayor").value = ""
  let precioMenor = element("precioMenor").value = ""
  aux = [...gastos]
  mostrarGastos(gastos)
}
element("botonLimpiarFiltroPrecio").addEventListener("click", limpiarFiltroPrecio)

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
element("botonSortPrecioAscendente").addEventListener("click", sortPrecioAscendente)

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
element("botonSortPrecioDescendente").addEventListener("click", sortPrecioDescendente)

const restaurarOrden = () => {
  aux = [...gastos]
  mostrarGastos(gastos)
}
element("botonRestaurarPrecio").addEventListener("click", restaurarOrden)
element("botonRestaurarFecha").addEventListener("click", restaurarOrden)
element("botonRestaurarTodos").addEventListener("click", restaurarOrden)

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
element("botonSortFechaAscendente").addEventListener("click", sortFechaAscendente)

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
element("botonSortFechaDescendente").addEventListener("click", sortFechaDescendente)

const buscarFecha = () => {
  aux = aux.filter(g => g.fecha === element("fechaInput").value)
  mostrarGastos( aux )
}
element("botonBuscarFecha").addEventListener("click", buscarFecha)

const eliminarGasto = (e) => {

  const index = gastos.indexOf(gastos.filter(g => g.id === parseInt(e.dataset["gastoId"]  ))[0])
  gastos.splice(index, 1)
  mostrarGastos(gastos)
  aux = [...gastos]
}


const cargarModal = () => {
  const editor = element("modalEditorForm")

  editor.innerHTML = `<div class="modal fade" id="modalEditor" tabindex="-1" aria-labelledby="modalEditorLabel" aria-hidden="true">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h1 class="modal-title fs-5" id="modalEditorLabel"><span id="articuloMod"></span></h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div id="modal-form" class="modal-body"></div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                          <button type="button" class="btn btn-primary" onclick="aplicarCambios()" data-bs-dismiss="modal">Aplicar</button>
                        </div>
                        </div>
                      </div>
                    </div>`
  
}

const editarGasto = (e) => {

  const gasto = gastos.filter(g => g.id === parseInt(e.dataset["gastoId"]))[0]

  const form = element("modal-form")
  form.innerHTML = `<div name="formularioMod" id="card-form-mod" data-gasto-id=${gasto.id}>
                      <label for="articulo" class="form-label ">Artículo</label>
                      <input type="text" class="form-control" id="articulo-mod" onkeyup="actualizarTituloMod()" value="${gasto.articulo}" required>
                      <label for="precio" class="form-label mt-3">Precio</label>
                      <input type="number" class="form-control" id="precio-mod" value=${gasto.precio} required></input>
                      <label for="detalle" class="form-label mt-3">Detalle</label>
                      <textarea class="form-control" id="detalle-mod" rows="3" >${gasto.detalle}</textarea>
                      <label for="fecha" class="form-label mt-3">Fecha</label>
                      <input type="date" class="form-control" id="fecha-mod" value=${gasto.fecha} required></input>
                    </div>`

  element("articuloMod").innerText = gasto.articulo
}

const actualizarTituloMod = () => {

  const tituloMod = element("articuloMod")
  tituloMod.innerText = element("articulo-mod").value

}

const aplicarCambios = () => {

  const gasto = gastos.filter(g => g.id === parseInt(element("card-form-mod").dataset["gastoId"]) )[0]
  gasto.articulo = element("articulo-mod").value
  gasto.precio = parseInt(element("precio-mod").value)
  gasto.detalle = element("detalle-mod").value
  gasto.fecha = element("fecha-mod").value

  mostrarGastos(gastos)
  aux = [...gastos]
}