// Cliente HTTP genérico. Centraliza el fetch y el manejo de errores.

const URL_API = "https://fakestoreapi.com/products";

export async function productos() {
  try {
    const response = await fetch(URL_API);

    if (!response.ok) throw new Error("Error al conectar con Fake Store API");

    // Fake Store API devuelve directamente un arreglo (array) con los productos
    const listaProductos = await response.json();

    console.log("Datos de Fake Store API:", listaProductos);

    return listaProductos;
  } catch (error) {
    console.log("Error al buscar los productos", error.message);
    return [];
  }
}

/*
// --- PRUEBA DIRECTA EN EL MISMO ARCHIVO ---
productos().then(lista => {
    console.log('Lista final de productos obtenida:', lista);
});
*/
