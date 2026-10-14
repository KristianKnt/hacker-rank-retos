import { inicializarCarrito } from "./carrito.js";
import { enviarFormulario } from './contact.js';

async function loadComponent(containerId, filePath) {
    const container = document.getElementById(containerId);

    if (!container) {
        return;
    }

    try {
        const response = await fetch(filePath);

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        container.innerHTML = await response.text();

    } catch (error) {
        console.error(`Error cargando ${filePath}:`, error);
    }
}

async function initializeApp() {
    await loadComponent(
        'header-container',
        './components/header.html'
    );

    await loadComponent('contact-container',
        './contactos/index.html'
    );

    await loadComponent(
        'footer-container',
        './components/footer.html'
    );

    await loadComponent(
        "panel-lateral-carrito",
        "./carrito/index.html"
    );

     await loadComponent(
        "div-quienes",
        "./quienes-somos/quienes-somos.html"
    );

    inicializarCarrito();
    enviarFormulario()
}

initializeApp();
