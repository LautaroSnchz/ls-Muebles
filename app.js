// js para q se vea la lista 

const contenedorProductos = document.getElementById('contenedor-productos')

const contenedorCarrito = document.getElementById('carrito-contenedor')

const cantidad = document.getElementById('cantidad')


let carrito = []

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})


stockProductos.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <img src=${producto.img} alt= "">
    <h3>${producto.nombre}</h3>
    <p>${producto.desc}</p>
    <p class="precioProducto">Precio:$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>

    `
    contenedorProductos.appendChild(div)

    
    const boton = document.getElementById(`agregar${producto.id}`)
    

    boton.addEventListener('click', () => {
        
        agregarAlCarrito(producto.id)
    })
})


//--------------------------------------------
//js para el formu 
function Controlar(event) {
    event.preventDefault();
    var Enviar;
    Enviar = true;
    let aux = "";

    if (document.getElementById('nombre').value == '') {
        aux += "- nombre\n";
        Enviar = false;
    }
    if (document.getElementById('email').value == '') {
        aux += "- email\n";
        Enviar = false;
    }

    if (Enviar) {
        document.getElementById('miFormulario').submit();
    }
    else {
        alert("Faltan completar los campos:\n" + aux);
        document.getElementById('btnform').innerHTML = 'Reintentar';
        return false;
    }

}


