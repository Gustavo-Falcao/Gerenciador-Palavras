import { listenersHome } from "../state/Listeners.js";
import { arrayDecks, estadoModalDeck, stateNavegacao, mostrarOpcoesDeck } from "../state/State.js";
import { handlerModal } from "../state/Listeners.js";

//criar janela modal
function janelaModal() {
    let janelPai = document.createElement('div')
    janelPai.setAttribute('class', 'janela-pai-popup');

    let janelaCriarDeck = document.createElement('div')
    janelaCriarDeck.setAttribute('class', 'janela-criar-deck')

    let contCriarDeck = document.createElement('div')
    contCriarDeck.setAttribute('class', 'cont-criar-deck')

    let titulo = document.createElement('h2')
    titulo.innerHTML = 'Criar Deck'

    let input = document.createElement('input')
    input.setAttribute('type', 'text')
    input.setAttribute('id', 'nome-deck')
    input.setAttribute('placeholder', 'Nome do deck...')

    let opcoesCriarDeck = document.createElement('div')
    opcoesCriarDeck.setAttribute('class', 'opcoes-criar-deck')
    opcoesCriarDeck.setAttribute('id', 'opcoes')

    let botCancel = document.createElement('button')
    botCancel.setAttribute('id', 'cancel')
    botCancel.innerHTML = 'Cancelar'

    let botCriar = document.createElement('button')
    botCriar.setAttribute('id', 'add-deck')
    botCriar.innerHTML = 'Adicionar'


    contCriarDeck.appendChild(titulo)
    contCriarDeck.appendChild(input)

    opcoesCriarDeck.appendChild(botCancel)
    opcoesCriarDeck.appendChild(botCriar)

    janelaCriarDeck.appendChild(contCriarDeck)
    janelaCriarDeck.appendChild(opcoesCriarDeck)

    janelPai.appendChild(janelaCriarDeck)

    return janelPai
}

//gerar deck
function gerarDeck(nome, id, tamanhoDeck, dailyWords) {
    let deck = document.createElement('div')
    deck.setAttribute('class', 'deck')
    deck.setAttribute('id', id)

    let rowInfo = document.createElement('div')
    rowInfo.setAttribute('class','row-info')

    let nomeDeck = document.createElement('span')
    nomeDeck.innerHTML = nome

    let quantNoDeck = document.createElement('small')
    quantNoDeck.innerHTML = `Total: ${tamanhoDeck}`

    let infoDeck = document.createElement('p')
    infoDeck.innerHTML = `Add no dia ${dailyWords.day}: ${dailyWords.amount}`

    let opcoesDeck = document.createElement('div')
    opcoesDeck.setAttribute('class', 'opcoes')

    let botAdicionar = document.createElement('button')
    botAdicionar.setAttribute('id', 'add-palavra')
    botAdicionar.innerHTML = 'Add'

    let botBuscar = document.createElement('button')
    botBuscar.setAttribute('id', 'buscar')
    botBuscar.innerHTML = 'Find'

    opcoesDeck.appendChild(botAdicionar)
    opcoesDeck.appendChild(botBuscar)

    rowInfo.appendChild(nomeDeck)
    rowInfo.appendChild(quantNoDeck)

    deck.appendChild(rowInfo)
    deck.appendChild(infoDeck)
    if(id === mostrarOpcoesDeck.idDeckMostrar) {
        if(mostrarOpcoesDeck.isMostrar) {
            deck.appendChild(opcoesDeck)
        }
    }

    return deck
}

function nenhumDeckCriado() {
    let frase = document.createElement('p')
    frase.innerHTML = 'Nenhum deck criando ainda...'
    
    return frase
}

// Renderização da página home
export function renderHome(root) {
    console.log(`Id do card: ${stateNavegacao.cardPanel.idCardAtivo}`)
    console.log(`Modo cardPanel: ${stateNavegacao.cardPanel.mode}`)
    console.log(`O card está aberto ? ${stateNavegacao.cardPanel.isOpen}`)
    console.log(`ID do pai para mostrar op => ${mostrarOpcoesDeck.idDeckMostrar}`)
    console.log(`É para mostrar ??? ${mostrarOpcoesDeck.isMostrar}`)
    

    console.log(`Tamanho do array de decks => ${arrayDecks.length}`)
    root.innerHTML = '';

    root.innerHTML = `
        <header class="titulo-home" id="titulo-home">
                <h1>Decks</h1>
        </header>
        <main>
            <section class="main-home" id="conteudo"> </section>
        </main>
        <footer>
            <button class="bot-add-deck" id="open-deck">
                Novo deck
            </button>
        </footer>
    `;


    let sectionElement = document.getElementById('conteudo');

    let frag = document.createDocumentFragment();

    if(arrayDecks.length < 1) {
        sectionElement.appendChild(nenhumDeckCriado())
    } else {
        arrayDecks.forEach(deck => {
            const deckElement = gerarDeck(deck.nome, deck.id, deck.cards.length, deck.dailyWords)
            frag.appendChild(deckElement)
        });
    }
    
    if(estadoModalDeck.isModelOpen) {
        frag.appendChild(janelaModal())
    }

    sectionElement.appendChild(frag)
    
    console.log(estadoModalDeck.isModelOpen);
    listenersHome();
    handlerModal();

}


