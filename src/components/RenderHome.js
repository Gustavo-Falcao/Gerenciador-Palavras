import { listenersHome } from "../state/Listeners.js";
// Renderização da página home
export function renderHome(root) {
    root.innerHTML = '';

    root.innerHTML = `
        <header class="titulo-home">
            <h1>Palavras</h1>
        </header>
        <main class="main-home">
        <button id="add">Adicionar Palavra</button>
        <button id="buscar">Buscar Palavra</button>
        </main>
    `;
    listenersHome();
}


