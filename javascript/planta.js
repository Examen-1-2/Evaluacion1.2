
document.addEventListener('DOMContentLoaded', () => {
    // Variables
    const baseDeDatos = [
        {
            id: 1,
            nombre: 'Nardo',
            precio: 10000,
            imagen: 'https://cdn0.ecologiaverde.com/es/posts/3/5/9/nardo_cuidados_3953_orig.jpg',
            width: '230px',
            height: '230px'
        },
        {
            id: 2,
            nombre: 'Petunia',
            precio: 10000,
            imagen: 'https://www.elmueble.com/medio/2022/05/13/sonja-kalee-from-pixabay-petunia-5395231_1920_f88b6540_1000x644.jpg',
            width: '230px',
            height: '230px'
        },
        {
            id: 3,
            nombre: 'Romero',
            precio: 10000,
            imagen: 'https://www.diet-health.info/images/recipes/main_view/1280px-rosemary-7560.jpg',
            width: '230px',
            height: '230px'
        },
        {
            id: 4,
            nombre: 'Aloe Vera',
            precio: 10000,
            imagen: 'https://s03.s3c.es/imag/_v0/770x420/b/4/4/aloe-vera-dreamstime.jpg',
            width: '230px',
            height: '230px'
        },

        {
            id: 5,
            nombre: 'Glicinia',
            precio: 10000,
            imagen: 'https://images.hola.com/imagenes/decoracion/20220603211032/como-cultivar-glicinia-plantas-exterior-il/1-96-649/como-cultivar-glicinia-08a-a.jpg',
            width: '230px',
            height: '230px'
        },
        {
            id: 6,
            nombre: 'Albahaca',
            precio: 10000,
            imagen: 'https://cdn.portalfruticola.com/2020/04/7e2db098-albahaca-basil-adobestock_81129315-scaled.jpeg',
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
            miNodo.classList.add('card', 'col-md-3','col-sm-8');
            miNodo.style.backgroundColor = 'rgb(54, 173, 173)';
            miNodo.style.borderRadius = '10px';
            miNodo.style.margin = '45px';
            
            // Body
            const miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body');
            // Titulo
            const miNodoTitle = document.createElement('h5');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.textContent = info.nombre;
            miNodoTitle.style.color = '#ffff';
            // Imagen
            const miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('col-md-12','col-sm-12');
            miNodoImagen.setAttribute('src', info.imagen);
            miNodoImagen.setAttribute('width', info.width)
            miNodoImagen.setAttribute('height', info.height)
            miNodoImagen.style.borderRadius = '10px';
            miNodoImagen.style.paddingRight = '20px';
            // Precio
            const miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            
            miNodoPrecio.textContent = `${info.precio}${divisa}`;
            
            // Boton agregar
            const miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn');
            miNodoBoton.textContent = '+';
            miNodoBoton.setAttribute('marcador', info.id);
            miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
            miNodoBoton.style.background = 'rgb(35, 116, 116)';
            //Boton restar
            const miNodoBotonR = document.createElement('button');
            miNodoBotonR.classList.add('btn', 'm-2');
            miNodoBotonR.textContent = '-';
            miNodoBotonR.setAttribute('marcador', info.id);
            miNodoBotonR.addEventListener('click', restarProductoAlCarrito);
            miNodoBotonR.style.background = 'rgb(35, 116, 116)';
            // Insertamos
            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodoCardBody.appendChild(miNodoBotonR);
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

    function restarProductoAlCarrito(evento) {
        // Anyadimos el Nodo a nuestro carrito
        carrito.pop(evento.target.getAttribute('marcador'))
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
