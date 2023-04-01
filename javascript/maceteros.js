
document.addEventListener('DOMContentLoaded', () => {
    // Variables
    const baseDeDatos = [
        {
            id: 0,
            nombre: 'Colgante',
            precio: 10000,
            imagen: 'https://cdnx.jumpseller.com/tomomi/image/12284792/Captura_de_Pantalla_2020-06-16_a_la_s__17.02.57.jpg?1654212831',
            width: '230px',
            height: '230px'
        },
        {
            id: 1,
            nombre: 'Madera',
            precio: 10000,
            imagen: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/outsunny-huerto-urbano-jardinera-macetero-de-madera-amazon-1659957924.jpg?crop=0.838xw:0.838xh;0,0.162xh&resize=1200:*',
            width: '230px',
            height: '230px'
        },
        {
            id: 2,
            nombre: 'Cemento',
            precio: 10000,
            imagen: 'https://mundopaisaje.cl/wp-content/uploads/2021/06/freddie-marriage-UcfKYTan-LU-unsplash-1-scaled.jpg',
            width: '230px',
            height: '230px'
        },
        {
            id: 3,
            nombre: 'Plastico',
            precio: 10000,
            imagen: 'https://www.jardineriaon.com/wp-content/uploads/2019/04/haworthia-en-maceta-de-plastico-830x553.jpg',
            width: '230px',
            height: '230px'
        },

        {
            id: 4,
            nombre: 'Resina',
            precio: 10000,
            imagen: 'https://www.conchidecoracion.com/galeria/categorias/de-resina_496_1.jpg',
            width: '230px',
            height: '230px'
        },
        {
            id: 5,
            nombre: 'Vidrio',
            precio: 10000,
            imagen: 'https://www.elblogdelatabla.com/wp-content/uploads/2020/12/maceta-terrario-cristal-soplado-boca2B42B1000px.jpg',
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
