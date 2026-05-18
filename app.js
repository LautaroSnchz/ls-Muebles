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

const agregarAlCarrito = (prodId) => {
    const existe = carrito.some(prod => prod.id === prodId);
    if (existe) {
        carrito.forEach(prod => {
            if (prod.id === prodId) {
                prod.cantidad++;
            }
        });
    } else {
        const item = stockProductos.find((prod) => prod.id === prodId);
        if (item) {
            carrito.push({...item, cantidad: 1});
        }
    }
    actualizarCarrito();
}

const actualizarCarrito = () => {
    const contenedorCarrito = document.getElementById('carrito-contenedor');
    if (contenedorCarrito) {
        contenedorCarrito.innerHTML = '';
        carrito.forEach((prod) => {
            const div = document.createElement('div');
            div.className = 'productoEnCarrito';
            div.innerHTML = `
                <p>${prod.nombre}</p>
                <p>Precio: $${prod.precio}</p>
                <p>Cantidad: <span>${prod.cantidad}</span></p>
                <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
            `;
            contenedorCarrito.appendChild(div);
        });
    }

    const contadorCarrito = document.getElementById('contadorCarrito');
    if (contadorCarrito) {
        contadorCarrito.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
    }
    
    const precioTotal = document.getElementById('precioTotal');
    if (precioTotal) {
        precioTotal.innerText = carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
    }
    
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId);
    const indice = carrito.indexOf(item);
    carrito.splice(indice, 1);
    actualizarCarrito();
}

const botonCarrito = document.getElementById('boton-carrito');
const modalCarrito = document.getElementById('modal-carrito');
const botonCerrar = document.getElementById('carritoCerrar');
const vaciarCarrito = document.getElementById('vaciar-carrito');

if (botonCarrito && modalCarrito) {
    botonCarrito.addEventListener('click', () => {
        modalCarrito.classList.add('modal-active');
    });
}
if (botonCerrar && modalCarrito) {
    botonCerrar.addEventListener('click', () => {
        modalCarrito.classList.remove('modal-active');
    });
}
if (vaciarCarrito) {
    vaciarCarrito.addEventListener('click', () => {
        carrito.length = 0;
        actualizarCarrito();
    });
}

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


