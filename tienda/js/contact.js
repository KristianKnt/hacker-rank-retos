const URL_CONTACTO = new URL('../contactos/index.html', import.meta.url);

export async function rederizarContacto() {
  const contactContainer = document.querySelector(".contact-container");
  if (!contactContainer) return;

  try {
    const respuesta = await fetch(URL_CONTACTO);
    if (!respuesta.ok) {
      throw new Error("No se pudo acceder al archivo de la seccion de contacto");
    }

    const htmlContacto = await respuesta.text();
    contactContainer.innerHTML = htmlContacto;
    enviarFormulario();
  } catch (error) {
    console.error("Error al renderizar el componente:", error);
  }
}
