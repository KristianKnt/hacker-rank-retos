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

function enviarFormulario() {
  const formulario = document.querySelector(".contact-form");
  if (!formulario) return;

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const datos = {
      nombre: document.querySelector("#name").value,
      email: document.querySelector("#email").value,
      mensaje: document.querySelector("#message").value,
    };

    console.log("Datos de formulario:", datos);
    alert(`¡Gracias ${datos.nombre}! Tu mensaje ha sido enviado.`);
    formulario.reset();
  });
}