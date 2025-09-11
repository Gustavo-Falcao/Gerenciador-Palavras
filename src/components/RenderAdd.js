import { listenerAddPalavra } from "../state/Listeners.js";
// Renderização da página de add palavra
export function renderAddPalavra(root) {
    root.innerHTML = '';
    
    root.innerHTML = `
        <main class="main-add">
            <header class="titulo-add"><h1>Adicionar Palavra</h1></header>
            <form>
            <input type="text" id="nome-palavra" placeholder="Nome da palvra...">
            <textarea id="cont-palavra" rows="10" cols="35" placeholder="Digite o conteúdo aqui..."></textarea>
            </form>
            <button id="bot-add">Adicionar</button>
        </main>
    `;

    listenerAddPalavra();
}