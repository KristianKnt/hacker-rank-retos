export function activarNavegacion() {
  const headerContainer = document.getElementById("header-container");
  if (!headerContainer) return;

  headerContainer.addEventListener("click", (evento) => {
    const enlace = evento.target.closest(".nav-links a");
    if (!enlace) return;

    const href = enlace.getAttribute("href");

    if (href.startsWith("#")) {
      evento.preventDefault();
      if (href === "#hero-container") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
        const seccionDestino = document.querySelector(href);
        if (seccionDestino) {
          seccionDestino.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    }
  });
}
