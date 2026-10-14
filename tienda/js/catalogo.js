import { productos } from "../services/apiService.js";

export async function iniciarCatalogo() {
  const contenedor = document.getElementById("contenedor-productos");

  if (!contenedor) {
    console.error("No se encontró el contenedor de productos");
    return;
  }
  try {
    const listaProductos = await productos();

    const primerosDiez = listaProductos.slice(0, 10);

    console.log("Productos del catálogo:", primerosDiez);

    primerosDiez.forEach((producto) => {
      const card = document.createElement("div");
      card.className = "producto-card";

      card.innerHTML = `
        <div class="producto-imagen">
          <img src="${producto.image}" alt="${producto.title}">
        </div>
        <div class="producto-info">
          <span class="producto-categoria">${producto.category}</span>
          <h3 class="producto-titulo">${producto.title}</h3>
          <p class="producto-precio">$${producto.price}</p>
          <button class="producto-agregar" type="button">Agregar al carrito</button>
        </div>
      `;

      contenedor.appendChild(card);
    });
  } catch (error) {
    console.error("Hubo un error al renderizar el catálogo:", error);
    contenedor.innerHTML =
      "<p>Ocurrió un error al mostrar el catálogo. Intenta recargar la página.</p>";
  }
}
