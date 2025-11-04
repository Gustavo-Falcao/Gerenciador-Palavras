import { listenerAddPalavra, voltarHome } from "../state/Listeners.js";
import { stateNavegacao, arrayDecks} from "../state/State.js";
// Renderização da página de add palavra

function encontraDeck(id) {
    const deckFind = arrayDecks.find((deck) => deck.id === id)
    return deckFind
}

export function renderAddPalavra(root) {
    root.innerHTML = '';

    const deck = encontraDeck(stateNavegacao.idDeck)
    
    root.innerHTML = `
        <main class="main-add">
            <header class="titulo-add">
                 <button class="icone" id="home">
                <span class="material-symbols-outlined">
                    home
                </span>
            </button>
                <h1>Add em ${deck.nome}</h1>
            </header>
            <form>
            <input type="text" id="nome-palavra" placeholder="Nome da palvra...">
            <textarea id="cont-palavra" rows="10" cols="35" placeholder="Digite o conteúdo aqui..."></textarea>
            </form>
            <button id="bot-add">Adicionar</button>
        </main>
    `;

    listenerAddPalavra();
    voltarHome()
}