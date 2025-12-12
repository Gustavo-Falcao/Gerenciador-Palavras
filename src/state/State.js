//Estado principal
import { handlerDailyWordsFirstDeck } from "../helpers/HandlerDailyWords.js";
const savedDailyWords = JSON.parse(localStorage.getItem('infoDailyWords')) || {};

export let stateNavegacao = {
    page: 'home',
    idDeck: null,
    query: '',
    cardPanel: {
        isOpen: false,
        idCardAtivo: null,
        mode: '',
        isEditando: false
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
//     mostrarOpcoes: false,
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

export function salvarDecksLocalStorage(deck) {
    localStorage.setItem('arrayDecks', JSON.stringify(deck));
}

export let valorSerEditado = {
    dataField: null,
    color: null,
    indexSignificado: null,
    indexExemplo: null,
    height: null
};

export let scrollyConteudo = 0;

export function setScrollyConteudo() {
    const divConteudo = document.querySelector('.def-block');
    scrollyConteudo = divConteudo.scrollTop;
}

export function zerarScrollyConteudo() {
    scrollyConteudo = 0;
}

export function setValorSerEditado(newValue) {
    valorSerEditado = {...valorSerEditado, ...newValue};
}