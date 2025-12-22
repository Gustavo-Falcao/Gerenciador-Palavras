import { arrayDecks, estadoModalDeck, stateNavegacao, mostrarOpcoesDeck, setArrayDecks, setStateNavegacao, setStadoModal, salvarDecksLocalStorage } from "../state/State.js";
import { render } from "../../main.js";
import { formatarDataEHoraParaMostrar, getCurrentDate, getCurrentDateTime } from "../helpers/HandlerDailyWords.js";
import { gerarId } from "../helpers/GerarId.js";

// Constroi todos os decks que estiverem no localStorage e junta eles em uma string
// Constroi a janela modal e aplica junto ao elemento de retorno de acordo com o estado do modal
function mostrarDecks () {
    const arrString = arrayDecks.map(deck => 
        `
            <div class="deck" id="${deck.id}">
                <div class ="row-info">
                    <span class="title-deck">${deck.nome}</span>
                    <span class="badge">Total: ${deck.cards.length}</span>
                </div>
                <p>Ultima atualização: <br>${deck.ultimaAtualizacao ? formatarDataEHoraParaMostrar(deck.ultimaAtualizacao.dataFormatada) : ''}</p>
                ${deck.mostrarOpcoes ? 
                    `
                    <div class="opcoes">
                        <button id="add-palavra" class="btn-outline">Add</button>
                        <button id="buscar" class="btn-outline">Find</button>
                    </div>
                    `
                    : 
                    ''
                }
            </div>
        `
    )

    const modal = `
        <div class="janela-pai-popup">
            <div class="janela-criar-deck"> 
                <div class="cont-criar-deck">
                    <h2>Criar Deck</h2>
                    <input type="text" id="nome-deck" placeholder="Nome do deck...">
                </div>
                <div class="opcoes-criar-deck" id="opcoes">
                    <button id="cancel">Cancelar</button>
                    <button id="add-deck">Adicionar</button>
                </div>
            </div>
        </div>
    `

    const decksElement = arrString.join('');

    const elementoRetorno = estadoModalDeck.isModelOpen ? `${decksElement} ${modal}` : decksElement;

    return arrayDecks.length > 0 ? elementoRetorno : '<p> Nenhum deck criado...</p>';
}

// Renderização da página home
export function renderHome(root) {
    console.log(`Id do card: ${stateNavegacao.cardPanel.idCardAtivo}`)
    console.log(`Modo cardPanel: ${stateNavegacao.cardPanel.mode}`)
    console.log(`O card está aberto ? ${stateNavegacao.cardPanel.isOpen}`)
    console.log(`ID do pai para mostrar op => ${mostrarOpcoesDeck.idDeckMostrar}`)
    console.log(`É para mostrar ??? ${mostrarOpcoesDeck.isMostrar}`)
    
    console.log(`Tamanho do array de decks => ${arrayDecks.length}`)

    const decks = mostrarDecks();

    console.log(arrayDecks);
    root.innerHTML = '';

    root.innerHTML = `
        <header class="titulo-home" id="titulo-home">
                <h1>Decks</h1>
                <input type="file" accept=".json" id="file-inserida">
        </header>
        <main class="home-main">
            <section class="main-home" id="conteudo">${decks}</section>
        </main>
        <footer>
            <button class="btn btn-primary" id="open-deck">
                Novo deck
            </button>
            <button class="btn btn-primary" id="atualizar">
                Atualizar
            </button>
            
        </footer>
    `;
    console.log(estadoModalDeck.isModelOpen);
    handlerHome();

}

// Centraliza as funções com listener para a página
function handlerHome() {
    toggleOpecoesAndHandlerOpcoes();
    tratarDadosDoArquivoInserido();
    atualizarCards();

    estadoModalDeck.isModelOpen ? handlerModal() : abrirModal();
}

function tratarDadosDoArquivoInserido() {
    document.getElementById('file-inserida').addEventListener('change', (e) => {
        const file = e.target.files[0];

        if(file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                try {
                    const content = e.target.result;
                    const data = JSON.parse(content);
                    //localStorage.setItem('CARD_BASE', JSON.stringify(data));
                    salvarDecksLocalStorage(data);
                    // setArrayDecks(data)
                    console.log("Dados do JSON:", data);
                    e.target.value = '';
                    render();
                } catch (error) {
                    console.error("Erro no parse do JSON", error);
                }
            };

            reader.readAsText(file);
        }
    });
}

// Controla o display das opções e lida com as ações das opções do deck clicado 
function toggleOpecoesAndHandlerOpcoes() {
    document.getElementById('conteudo').addEventListener('click', (e) => {

        if(e.target.id != 'conteudo' && !e.target.closest('.opcoes') ) {
            let elementoPai = e.target.closest('.deck')
            if(elementoPai) {
                let idDoPai = elementoPai.id 
                if(idDoPai != null) {
                    console.log(`ELEMENTO DO PAI (${idDoPai})`)
                    const novoArr = arrayDecks.map(deck => 
                        deck.id === idDoPai ? {...deck, mostrarOpcoes: !deck.mostrarOpcoes} : deck
                    ) 
                    setArrayDecks(novoArr)
                    salvarDecksLocalStorage(novoArr)
                    render();
                }
            }
        }
        else if(e.target.closest('.opcoes')) {
            const idElemento = e.target.id
            const idDeck = e.target.closest('.deck').id
    
            if(idElemento === 'add-palavra') {
                setStateNavegacao({page: 'add', idDeck: idDeck})
                render()
            }
            else if(idElemento === 'buscar') {
                setStateNavegacao({page: 'buscar', idDeck: idDeck})
                render()
            }
        }
    })
}

// Abre a janela modal a partir do clique
function abrirModal() {
    document.getElementById('open-deck').addEventListener('click', () => {
        estadoModalDeck.isModelOpen = !estadoModalDeck.isModelOpen;
        render()
    })
}

//Funcao para atualizar o objeto dos cards do deck de palavras
function atualizarCards() {
    document.getElementById('atualizar').addEventListener('click', () => {
        const arrayDecks = JSON.parse(localStorage.getItem('arrayDecks'));

        const novoArrayDeck = arrayDecks.map((deck) => 
            deck.nome === "Palavras" ? 
                {...deck, cards: deck.cards.map((card)=> 
                    card.pronuncia ? 
                        {...card, significados: card.significados.map((significado) =>
                            significado.id ? significado :
                                {id: gerarId(), definicao: significado.definicao, tipoDefinicao: significado.tipoDefinicao, exemplos: significado.exemplos.map((exemplo) => 
                                    exemplo.id ? exemplo 
                                    : {id: gerarId(), exemplo: exemplo})})} 
                    : card)} 
                : deck);

        //Salvar no localSotrage
        console.log("ARRAY DECK PALAVRAS MODIFICADO COM OS CARDS ATUALIZADOS!!!!");
        console.log(novoArrayDeck);
        localStorage.setItem('arrayDecks', JSON.stringify(novoArrayDeck));
    });
}

// Lida com as ações das opções do modal
function handlerModal() {
    document.getElementById('opcoes').addEventListener('click', (e) => {
        if(e.target) {
            if(e.target.id === 'cancel') {
                setStadoModal({isModelOpen: !estadoModalDeck.isModelOpen})
                render()
            }
            else if (e.target.id === 'add-deck') {
                const nomeDeck = document.getElementById('nome-deck').value.trim();
                console.log("Entrou no else if e conteudo: ", nomeDeck)
                if(nomeDeck.length > 0) {
                    const newDeck = {
                        id: gerarId(),
                        nome: nomeDeck,
                        ultimaAtualizacao: {
                            dataFormatada: getCurrentDate(),
                            time: getCurrentDateTime()
                        },
                        cards: [],
                        mostrarOpcoes: false
                    }
                    setArrayDecks([...arrayDecks, newDeck])
                    salvarDecksLocalStorage(arrayDecks);
                    setStadoModal({isModelOpen: !estadoModalDeck.isModelOpen})
                }
                render()
            }
            else {
                return
            }
        }
    })
}