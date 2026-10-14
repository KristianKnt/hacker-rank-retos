import { productos } from "../services/apiService.js";

// Variable global para almacenar la lista completa de productos
let todosLosProductos = [];

export async function iniciarCatalogo() {
  const contenedor = document.getElementById("contenedor-productos");

  if (!contenedor) {
    console.error("No se encontró el contenedor de productos");
    return;
  }

  try {
    contenedor.innerHTML = "<p>Cargando productos...</p>";

    todosLosProductos = await productos();

    renderizarProductos(todosLosProductos.slice(0, 10));

    // inicializamos los filtros de los botonoes
    inicializarFiltros();
  } catch (error) {
    console.error("Hubo un error al renderizar el catálogo:", error);
    contenedor.innerHTML =
      "<p>Ocurrió un error al mostrar el catálogo. Intenta recargar la página.</p>";
  }
}

// Función auxiliar para pintar las tarjetas en el DOM
function renderizarProductos(lista) {
  const contenedor = document.getElementById("contenedor-productos");
  contenedor.innerHTML = "";

  lista.forEach((producto) => {
    const card = document.createElement("div");
    card.className = "producto-card";

    card.innerHTML = `
      <div class="producto-imagen">
        <img src="${producto.image}" alt="${producto.title}">
        <button class="producto-agregar" type="button" title="Agregar al carrito">
          <i class="bi bi-cart-plus"></i>
        </button>
      </div>
      <div class="producto-info">
        <span class="producto-categoria">${producto.category}</span>
        <h3 class="producto-titulo" title="${producto.title}">${producto.title}</h3>
        <p class="producto-precio">$${producto.price}</p>
      </div>
    `;

    contenedor.appendChild(card);
  });
}

// Función para manejar los clics en los botones de filtro
function inicializarFiltros() {
  const botonesFiltro = document.querySelectorAll(".catalogo-filtros .filtro");

  botonesFiltro.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      // Recorre los botones para quitar la clase 'activo'
      botonesFiltro.forEach((b) => b.classList.remove("activo"));

      // Al botón que le dimos clic, le agregamos la clase 'activo'
      e.target.classList.add("activo");

      // Obtener la categoría del atributo data-categoria
      const categoriaSeleccionada = e.target.getAttribute("data-categoria");

      // Filtrar los productos
      if (categoriaSeleccionada === "all") {
        renderizarProductos(todosLosProductos.slice(0, 10));
      } else {
        const productosFiltrados = todosLosProductos.filter(
          (producto) => producto.category === categoriaSeleccionada,
        );
        renderizarProductos(productosFiltrados);
      }
    });
  });
}
