
document.addEventListener('DOMContentLoaded', () => {
    // Variables
    const baseDeDatos = [
        {
            id: 0,
            nombre: 'Tierra Negra',
            precio: 10000,
            imagen: 'imag/tierranegra.jpg',
            width: '230px',
            height: '230px'
        },
        {
            id: 1,
            nombre: 'Tierra Hojas',
            precio: 10000,
            imagen: 'imag/tierrahoja.webp',
            width: '230px',
            height: '230px'
        },
        {
            id: 2,
            nombre: 'Organica',
            precio: 10000,
            imagen: 'imag/tierraorganica.webp',
            width: '230px',
            height: '230px'
        },
        {
            id: 3,
            nombre: 'Profesional',
            precio: 10000,
            imagen: 'imag/tierrapro.jpg',
            width: '230px',
            height: '230px'
        },

        {
            id: 4,
            nombre: 'Tierra Maceta',
            precio: 10000,
            imagen: 'imag/tierramaceta.jpg',
            width: '230px',
            height: '230px'
        },
        {
            id: 5,
            nombre: 'Preparada',
            precio: 10000,
            imagen: 'imag/tierrapreparada.jpg',
            width: '230px',
            height: '230px'
        }

    ];

    let carrito = [];
    const divisa = '$';
    const DOMitems = document.querySelector('#items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');

    // Funciones

    /**
    * Dibuja todos los productos a partir de la base de datos. No confundir con el carrito
    */
    function renderizarProductos() {
        baseDeDatos.forEach((info) => {
            // Estructura
            const miNodo = document.createElement('div');
            miNodo.classList.add('card', 'col-md-5','col-sm-8','col-xs-12');
            miNodo.style.backgroundColor = 'rgb(54, 173, 173)';
            miNodo.style.borderRadius = '10px';
            miNodo.style.margin = '45px';
            miNodo.style.backgroundImage = `url(${info.imagen})`;
            
            
            // Body
            const miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body');
            // Titulo
            const miNodoTitle = document.createElement('h5');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.textContent = info.nombre;
            miNodoTitle.classList.add('col-md-3');
            miNodoTitle.style.backgroundColor = 'rgba(255,255,255,0.7';
            miNodoTitle.style.color = 'black';
            // Imagen
            const miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('col-md-12','col-sm-12','w-100','d-block');
            miNodoImagen.setAttribute('src', info.imagen);
            miNodoImagen.setAttribute('height', info.height)
            miNodoImagen.style.borderRadius = '10%';
            miNodoImagen.style.paddingRight = '20px';
            miNodoImagen.style.opacity = '0.0';
            // Precio
            
            const miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('col-md-2');
            miNodoPrecio.style.backgroundColor = 'rgba(255,255,255,0.7';
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent = `${info.precio}${divisa}`;
            
            // Boton agregar
            const miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn');
            
            miNodoBoton.textContent = '+';
            miNodoBoton.setAttribute('marcador', info.id);
            miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
            miNodoBoton.style.backgroundColor = 'rgba(255,255,255,0.7';
            miNodoBoton.style.color = 'black';

            // Insertamos
            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodo.appendChild(miNodoCardBody);
            DOMitems.appendChild(miNodo);
        });
    }

    /**
    * Evento para añadir un producto al carrito de la compra
    */
    function anyadirProductoAlCarrito(evento) {
        // Anyadimos el Nodo a nuestro carrito
        carrito.push(evento.target.getAttribute('marcador'))
        // Actualizamos el carrito 
        renderizarCarrito();
    }

    /**
    * Dibuja todos los productos guardados en el carrito
    */
    function renderizarCarrito() {
        // Vaciamos todo el html
        DOMcarrito.textContent = '';
        // Quitamos los duplicados
        const carritoSinDuplicados = [...new Set(carrito)];
        // Generamos los Nodos a partir de carrito
        carritoSinDuplicados.forEach((item) => {
            // Obtenemos el item que necesitamos de la variable base de datos
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                // ¿Coincide las id? Solo puede existir un caso
                return itemBaseDatos.id === parseInt(item);
            });
            // Cuenta el número de veces que se repite el producto
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
                return itemId === item ? total += 1 : total;
            }, 0);

            // Creamos el nodo del item del carrito
            const miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
            miNodo.style.backgroundColor = 'rgba(54, 173, 173,0.2)';
            miNodo.style.color = 'white';
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
            
            // Boton de borrar

            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarItemCarrito);
            
            // Mezclamos nodos
            miNodo.appendChild(miBoton);
            DOMcarrito.appendChild(miNodo);
        });
        // Renderizamos el precio total en el HTML
        DOMtotal.textContent = calcularTotal();
    }

    /**
    * Evento para borrar un elemento del carrito
    */
    function borrarItemCarrito(evento) {
        // Obtenemos el producto ID que hay en el boton pulsado
        const id = evento.target.dataset.item;
        // Borramos todos los productos
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });
        // volvemos a renderizar
        renderizarCarrito();
    }

    /**
     * Calcula el precio total teniendo en cuenta los productos repetidos
     */
    function calcularTotal() {
        // Recorremos el array del carrito 
        return carrito.reduce((total, item) => {
            // De cada elemento obtenemos su precio
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            // Los sumamos al total
            return total + miItem[0].precio;
        }, 0).toFixed(2);
    }

    /**
    * Varia el carrito y vuelve a dibujarlo
    */
    function vaciarCarrito() {
        // Limpiamos los productos guardados
        carrito = [];
        // Renderizamos los cambios
        renderizarCarrito();
    }

    // Eventos
    DOMbotonVaciar.addEventListener('click', vaciarCarrito);

    // Inicio
    renderizarProductos();
    renderizarCarrito();
});
