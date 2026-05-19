// =========================
// VARIABLES GLOBALES
// =========================

let carrito = [];

let productosGlobal = [];

// =========================
// CARGAR PRODUCTOS JSON
// =========================

fetch("productos.json")

.then(res => res.json())

.then(productos => {

    // GUARDAR PRODUCTOS

    productosGlobal = productos;

    // CONTENEDORES

    const newIn =
    document.getElementById("new-in");

    const hombres =
    document.getElementById("productos-hombre");

    const mujeres =
    document.getElementById("productos-mujer");

    const deporte =
    document.getElementById("productos-deporte");

    // RECORRER PRODUCTOS

    productos.forEach((p, index) => {

        // =========================
        // TALLAS
        // =========================

        let tallasHTML = "";

        if(p.tallas){

            p.tallas.forEach(talla => {

                tallasHTML += `
                
                    <option value="${talla}">
                        ${talla}
                    </option>

                `;

            });

        }

        // =========================
        // TARJETA PRODUCTO
        // =========================

        const tarjeta = `
        
            <div class="tarjeta">

                <div class="producto">

                    <!-- IMAGEN -->

                    <img src="${p.imagen}"
                    alt="${p.nombre}">

                    <!-- NOMBRE -->

                    <h3>
                        ${p.nombre.toUpperCase()}
                    </h3>

                    <!-- PRECIO -->

                    <p class="precio">

                        $${p.precio.toLocaleString()}

                    </p>

                    <!-- TALLAS -->

                    <select
                    id="talla-${p.id}"
                    class="select-talla">

                        ${tallasHTML}

                    </select>

                    <!-- CANTIDAD -->

                    <div class="cantidad">

                        <button
                        onclick="cambiarCantidad(${p.id}, -1)">

                            -

                        </button>

                        <span id="cantidad-${p.id}">
                            1
                        </span>

                        <button
                        onclick="cambiarCantidad(${p.id}, 1)">

                            +

                        </button>

                    </div>

                    <!-- BOTON -->

                    <button
                    class="btn-agregar"

                    onclick="agregarCarrito(${p.id})">

                        Agregar al carrito

                    </button>

                </div>

            </div>

        `;

        // =========================
        // NEW IN
        // =========================

        if(index < 5){

            newIn.innerHTML += tarjeta;

        }

        // =========================
        // HOMBRES
        // =========================

        if(p.seccion === "Hombre"){

            hombres.innerHTML += tarjeta;

        }

        // =========================
        // MUJERES
        // =========================

        if(p.seccion === "Mujer"){

            mujeres.innerHTML += tarjeta;

        }

        // =========================
        // DEPORTE
        // =========================

        if(p.seccion === "Deporte"){

            deporte.innerHTML += tarjeta;

        }

    });

});

// =========================
// CAMBIAR CANTIDAD
// =========================

function cambiarCantidad(id, cambio){

    const cantidadHTML =
    document.getElementById(`cantidad-${id}`);

    let cantidad =
    parseInt(cantidadHTML.innerText);

    cantidad += cambio;

    // MINIMO 1

    if(cantidad < 1){

        cantidad = 1;

    }

    cantidadHTML.innerText = cantidad;

}

// =========================
// AGREGAR AL CARRITO
// =========================

function agregarCarrito(id){

    // BUSCAR PRODUCTO

    const producto =
    productosGlobal.find(p => p.id === id);

    // TALLA

    const talla =
    document.getElementById(`talla-${id}`).value;

    // CANTIDAD

    const cantidad =
    parseInt(
      document.getElementById(`cantidad-${id}`).innerText
    );

    // AGREGAR

    carrito.push({

        ...producto,

        talla: talla,

        cantidad: cantidad

    });

    // MOSTRAR

    mostrarCarrito();

}

// =========================
// MOSTRAR CARRITO
// =========================

function mostrarCarrito(){

    const lista =
    document.getElementById("lista-carrito");

    const totalHTML =
    document.getElementById("total");

    const contador =
    document.getElementById("contador-carrito");

    // LIMPIAR

    lista.innerHTML = "";

    let total = 0;

    // CONTADOR

    contador.innerText = carrito.length;

    // RECORRER CARRITO

    carrito.forEach((p, index) => {

        const subtotal =
        p.precio * p.cantidad;

        total += subtotal;

        lista.innerHTML += `
        
            <div class="item-carrito">

                <!-- IMAGEN -->

                <img src="${p.imagen}">

                <!-- INFO -->

                <div class="info-carrito">

                    <h4>${p.nombre}</h4>

                    <p>

                        Talla:
                        <strong>${p.talla}</strong>

                    </p>

                    <p>

                        Cantidad:
                        <strong>${p.cantidad}</strong>

                    </p>

                    <p>

                        $${subtotal.toLocaleString()}

                    </p>

                </div>

                <!-- ELIMINAR -->

                <button
                onclick="eliminarProducto(${index})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>

        `;

    });

    // TOTAL

    totalHTML.innerHTML =

    `Total: $${total.toLocaleString()}`;

}

// =========================
// ELIMINAR PRODUCTO
// =========================

function eliminarProducto(index){

    carrito.splice(index, 1);

    mostrarCarrito();

}

// =========================
// ABRIR / CERRAR CARRITO
// =========================

function toggleCarrito(){

    const carritoHTML =
    document.getElementById("carrito");

    carritoHTML.classList.toggle("activo");

}

// =========================
// ENVIAR A WHATSAPP
// =========================

function enviarWhatsApp(){

    // CARRITO VACIO

    if(carrito.length === 0){

        alert("El carrito está vacío");

        return;

    }

    // MENSAJE

    let mensaje =
    "Hola, quiero comprar:%0A%0A";

    let total = 0;

    // PRODUCTOS

    carrito.forEach((p, index) => {

        const subtotal =
        p.precio * p.cantidad;

        mensaje +=
        `🛒 Producto ${index + 1}%0A`;

        mensaje +=
        `📌 ${p.nombre}%0A`;

        mensaje +=
        `📏 Talla: ${p.talla}%0A`;

        mensaje +=
        `🔢 Cantidad: ${p.cantidad}%0A`;

        mensaje +=
        `💰 Subtotal: $${subtotal.toLocaleString()}%0A%0A`;

        total += subtotal;

    });

    // TOTAL FINAL

    mensaje +=
    `🔥 TOTAL: $${total.toLocaleString()}`;

    // TU NUMERO

    const numero = "573234107526";

    // ABRIR WHATSAPP

    window.open(

      `https://wa.me/${numero}?text=${mensaje}`

    );

}

// =========================
// MENU MOBILE
// =========================

function toggleMenu(){

    const menu =
    document.getElementById("menuMobile");

    const overlay =
    document.getElementById("overlay");

    menu.classList.toggle("activo");

    overlay.classList.toggle("activo");

}