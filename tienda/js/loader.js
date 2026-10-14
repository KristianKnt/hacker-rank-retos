export async function cargarModulos(idContenedor, archivoHTML) {
  try {
    const respuesta = await fetch(archivoHTML);
    const html = await respuesta.text;

    document.getElementById(idContenedor).innerHTML = html;
  } catch (error) {
    console.error("Error al cargar el modulo: " + archivoHTML, error);
  }
}
