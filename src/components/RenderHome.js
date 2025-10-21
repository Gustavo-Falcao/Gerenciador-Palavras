import { listenersHome } from "../state/Listeners.js";
import { estadoModalDeck } from "../state/State.js";
import { handlerModal } from "../state/Listeners.js";
// Renderização da página home
export function renderHome(root) {
    root.innerHTML = '';
    const div = document.createDocumentFragment()
    div.innerHTML = `
        <div class="janela-pai-popup">
            <div class="janela-criar-deck">
                <div class="cont-criar-deck">
                    <h2>Criar Deck</h2>
                    <input type="text" id="nome-palavra" placeholder="Nome do deck...">
                </div>
            <div class="opcoes-criar-deck">
                <button>Cancelar</button>
                <button>Adicionar</button>
            </div>
            </div>
        </div>
    `

    if(estadoModalDeck.isModelOpen) {
        root.innerHTML = `
            <header class="titulo-home">
                <h1>Decks</h1>
            </header>
            <main>
                <section class="main-home" id="conteudo">
                    <div class="deck" id="deck1">
                        <div class="row-info">
                            <span>
                                Nome Deck
                            </span>
                            <small>
                                Quantidade
                            </small>
                        </div>
                        <p>
                            informação sobre o deck
                        </p>
                        <div class="opcoes">
                            <button>Add</button>
                            <button>Buscar</button>
                        </div>
                    </div>
                    <div class="deck" id="deck2">
                        <div class="row-info">
                            <span>
                                Nome Deck
                            </span>
                            <small>
                                Quantidade
                            </small>
                        </div>
                        <p>
                            informação sobre o deck
                        </p>
                        <div class="opcoes">
                            <button>Add</button>
                            <button>Buscar</button>
                        </div>
                    </div>
                    <div class="deck" id="deck3">
                        <div class="row-info">
                            <span>
                                Nome Deck
                            </span>
                            <small>
                                Quantidade
                            </small>
                        </div>
                        <p>
                            informação sobre o deck
                        </p>
                        <div class="opcoes">
                            <button id="add">Add</button>
                            <button id="buscar">Buscar</button>
                        </div>
                    </div>
                </section>
            </main>
            <footer>
                <button class="bot-add-deck" id="open-deck">
                    Novo deck
                </button>
            </footer>
            <div class="janela-pai-popup">
            <div class="janela-criar-deck">
                <div class="cont-criar-deck">
                    <h2>Criar Deck</h2>
                    <input type="text" id="nome-palavra" placeholder="Nome do deck...">
                </div>
            <div class="opcoes-criar-deck">
                <button id="cancel">Cancelar</button>
                <button>Adicionar</button>
            </div>
            </div>
        </div>
        `;
    } else {
        root.innerHTML = `
            <header class="titulo-home">
                <h1>Decks</h1>
            </header>
            <main>
                <section class="main-home" id="conteudo">
                    <div class="deck" id="deck1">
                        <div class="row-info">
                            <span>
                                Nome Deck
                            </span>
                            <small>
                                Quantidade
                            </small>
                        </div>
                        <p>
                            informação sobre o deck
                        </p>
                        <div class="opcoes">
                            <button>Add</button>
                            <button>Buscar</button>
                        </div>
                    </div>
                    <div class="deck" id="deck2">
                        <div class="row-info">
                            <span>
                                Nome Deck
                            </span>
                            <small>
                                Quantidade
                            </small>
                        </div>
                        <p>
                            informação sobre o deck
                        </p>
                        <div class="opcoes">
                            <button>Add</button>
                            <button>Buscar</button>
                        </div>
                    </div>
                    <div class="deck" id="deck3">
                        <div class="row-info">
                            <span>
                                Nome Deck
                            </span>
                            <small>
                                Quantidade
                            </small>
                        </div>
                        <p>
                            informação sobre o deck
                        </p>
                        <div class="opcoes">
                            <button id="add">Add</button>
                            <button id="buscar">Buscar</button>
                        </div>
                    </div>
                </section>
            </main>
            <footer>
                <button class="bot-add-deck" id="open-deck">
                    Novo deck
                </button>
            </footer>`
    }

    
    
    console.log(estadoModalDeck.isModelOpen);
    listenersHome();
    handlerModal();

    // <button id="add">Adicionar Palavra</button>
    // <button id="buscar">Buscar Palavra</button>
}


