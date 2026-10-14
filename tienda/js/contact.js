export function enviarFormulario() {
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
