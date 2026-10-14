import { productos } from "../services/apiService.js";

export async function iniciarCatalogo() {
  const contenedor = document.getElementById("contenedor-productos");

  if (!contenedor) {
    console.error("No se encontró el contenedor de productos");
    return;
  }

  const listaProductos = await productos();

  const primerosDiez = listaProductos.slice(0, 10);

  console.log("Productos del catálogo:", primerosDiez);
}
