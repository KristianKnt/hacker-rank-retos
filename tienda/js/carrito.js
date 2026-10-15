
const CLAVE_CARRITO = "trendyshop-carrito";

function obtenerCarrito() {
  try {
    const carritoGuardado = localStorage.getItem(CLAVE_CARRITO);

    if (!carritoGuardado) {
      return [];
    }

    const carrito = JSON.parse(carritoGuardado);

    return Array.isArray(carrito) ? carrito : [];
  } catch (error) {
    console.error("No se pudo leer el carrito:", error);
    return [];
  }
}

function guardarCarrito(carrito) {
  try {
    localStorage.setItem(
      CLAVE_CARRITO,
      JSON.stringify(carrito)
    );
  } catch (error) {
    console.error("No se pudo guardar el carrito:", error);
  }
}

export function agregarProducto(producto) {
  const carrito = obtenerCarrito();

  const productoExistente = carrito.find(
    (item) => item.id === producto.id
  );

  if (productoExistente) {
    productoExistente.quantity += 1;
  } else {
    carrito.push({
      id: producto.id,
      title: producto.title,
      price: Number(producto.price),
      image: producto.image,
      category: producto.category,
      quantity: 1
    });
  }

  guardarCarrito(carrito);
  actualizarVistaCarrito();
}

function eliminarProducto(id) {
  const carritoActualizado = obtenerCarrito().filter(
    (producto) => producto.id !== id
  );

  guardarCarrito(carritoActualizado);
  actualizarVistaCarrito();
}

function cambiarCantidad(id, cambio) {
  const carrito = obtenerCarrito();

  const producto = carrito.find(
    (item) => item.id === id
  );

  if (!producto) {
    return;
  }

  producto.quantity += cambio;

  if (producto.quantity <= 0) {
    eliminarProducto(id);
    return;
  }

  guardarCarrito(carrito);
  actualizarVistaCarrito();
}

function actualizarContador(carrito) {
  const contador = document.getElementById("cart-count");

  if (!contador) {
    return;
  }

  const totalUnidades = carrito.reduce(
    (total, producto) => total + producto.quantity,
    0
  );

  contador.textContent = totalUnidades;
}

function renderizarCarrito(carrito) {
  const cuerpo = document.getElementById("cuerpo-carrito");
  const subtitulo = document.getElementById("subtitulo-carrito");
  const precioTotal = document.getElementById("precio-total-carrito");

  if (!cuerpo || !subtitulo || !precioTotal) {
    console.error("Faltan elementos del carrito en el DOM.");
    return;
  }

  const totalUnidades = carrito.reduce(
    (total, producto) => total + producto.quantity,
    0
  );

  const totalPrecio = carrito.reduce(
    (total, producto) =>
      total + producto.price * producto.quantity,
    0
  );

  subtitulo.textContent =
    `${totalUnidades} ${
      totalUnidades === 1 ? "producto" : "productos"
    }`;

  precioTotal.textContent =
    `$${totalPrecio.toFixed(2)}`;

  if (carrito.length === 0) {
    cuerpo.innerHTML =
      `<p class="carrito-vacio">Tu carrito está vacío.</p>`;

    return;
  }

  cuerpo.innerHTML = carrito.map((producto) => `
    <article class="item-carrito">
      <img
        src="${producto.image}"
        alt="${producto.title}"
        class="imagen-item-carrito">

      <div class="info-item-carrito">
        <h3>${producto.title}</h3>
        <span>$${Number(producto.price).toFixed(2)}</span>

        <div class="controles-cantidad">
          <button
            type="button"
            data-accion="disminuir"
            data-id="${producto.id}">
            −
          </button>

          <span>${producto.quantity}</span>

          <button
            type="button"
            data-accion="aumentar"
            data-id="${producto.id}">
            +
          </button>
        </div>
      </div>

      <button
        type="button"
        data-accion="eliminar"
        data-id="${producto.id}"
        aria-label="Eliminar producto">
        ×
      </button>
    </article>
  `).join("");
}

export function actualizarVistaCarrito() {
  const carrito = obtenerCarrito();

  actualizarContador(carrito);
  renderizarCarrito(carrito);
}
export function inicializarCarrito() {
  const contenedor = document.getElementById(
    "panel-lateral-carrito"
  );

  const panel = document.getElementById("panel-carrito");
  const backdrop = document.getElementById("backdrop-carrito");
  const botonAbrir = document.getElementById("boton-abrir-carrito");
  const botonCerrar = document.getElementById("boton-cerrar-carrito");

  const elementos = {
    contenedor,
    panel,
    backdrop,
    botonAbrir,
    botonCerrar
  };

  console.table(
    Object.entries(elementos).map(([nombre, elemento]) => ({
      elemento: nombre,
      encontrado: elemento !== null
    }))
  );

  if (Object.values(elementos).some(elemento => !elemento)) {
    console.error("Faltan elementos del carrito en el DOM.");
    return;
  }

  function abrirCarrito() {
    contenedor.classList.add("abierto");
    panel.setAttribute("aria-hidden", "false");
    botonAbrir.setAttribute("aria-expanded", "true");
  }

  function cerrarCarrito() {
    contenedor.classList.remove("abierto");
    panel.setAttribute("aria-hidden", "true");
    botonAbrir.setAttribute("aria-expanded", "false");
  }

  botonAbrir.addEventListener("click", abrirCarrito);
  botonCerrar.addEventListener("click", cerrarCarrito);
  backdrop.addEventListener("click", cerrarCarrito);
  
  const cuerpo = document.getElementById("cuerpo-carrito");

  cuerpo.addEventListener("click", (evento) => {
    const boton = evento.target.closest("[data-accion]");

    if (!boton) {
      return;
    }

    const id = Number(boton.dataset.id);
    const accion = boton.dataset.accion;

    if (accion === "aumentar") {
      cambiarCantidad(id, 1);
    }

    if (accion === "disminuir") {
      cambiarCantidad(id, -1);
    }

    if (accion === "eliminar") {
      eliminarProducto(id);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      cerrarCarrito();
    }
  });

  actualizarVistaCarrito();
}
