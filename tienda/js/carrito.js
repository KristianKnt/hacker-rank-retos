
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

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      cerrarCarrito();
    }
  });
}
