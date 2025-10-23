//Estado principal
import { handlerDailyWordsFirstDeck } from "../helpers/HandlerDailyWords.js";
const savedDailyWords = JSON.parse(localStorage.getItem('infoDailyWords')) || {};
export let statePrincipal = {
    entidades: {
        cards: JSON.parse(localStorage.getItem('arrayCards')) || []
    },
    navegacao: {
        page: 'home'
    },
    busca: {
        query: ''
    },
    cardPanel: {
        isOpen: false,
        idCardAtivo: null,
        mode: 'view'
    },
    dailyWords: {
        amount: savedDailyWords.amount || 0,
        day: savedDailyWords.day || 0
    }

};

export let stateNavegacao = {
    page: 'home',
    idDeck: null,
    query: '',
    cardPanel: {
        isOpen: false,
        idCardAtivo: null,
        mode: ''
    }
}

export function setStateNavegacao(newState) {
    stateNavegacao = {...stateNavegacao, ...newState}
}

export let arrayDecks = JSON.parse(localStorage.getItem('arrayDecks')) || []

export function setArrayDecks(newDeck) {
    arrayDecks = newDeck
}

export function atualizarDeck(idDeck) {
    //let cardsAnts = JSON.parse(localStorage.getItem('arrayCards'))

    let newArray = arrayDecks.map(deck => 
        deck.id === idDeck ? {...deck, ...{dailyWords: handlerDailyWordsFirstDeck(savedDailyWords.day, savedDailyWords.amount), cards: statePrincipal.entidades.cards}} : deck
    )
    setArrayDecks(newArray)
    //localStorage.setItem('arrayDecks', JSON.stringify(arrayDecks))
}

export let mostrarOpcoesDeck = {
    idDeckMostrar: '',
    isMostrar: false
}

export function setMostrarOpcoesDeck(newState) {
    mostrarOpcoesDeck = {...mostrarOpcoesDeck, ...newState}
}

export let deckComponent = {isCriado: false}

export function setDeckComponente(newState) {
    deckComponent = {...deckComponent, ...newState}
}
// {
//     id: gerarId(),
//     nome: nomeDeck,
//     navegacao: {
//         page: '',
//         mostrar: false
//     },
//     busca: {
//         query: ''
//     },
//     dailyWords: {
//         amount: 0,
//         day: 0
//     },
//     cards: []
// }

export let estadoModalDeck = {isModelOpen: false}

export function setStadoModal(newState) {
    estadoModalDeck = {...estadoModalDeck, ... newState}
}

export function getStatePrincipal() {
    return statePrincipal;
}

export function setStatePrincipal(newState) {
    statePrincipal = {...statePrincipal, ...newState};
}
