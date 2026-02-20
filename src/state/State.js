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

export function salvarDecksLocalStorage(deck) {
    localStorage.setItem('arrayDecks', JSON.stringify(deck));
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



export let scrollySignificados = 0;

export function salvarScrollySignificados() {
    const significados = document.getElementById('senses-container');
    scrollySignificados = significados.scrollTop;
}

export function setScrollySignificados() {
    const significados = document.getElementById('senses-container');
    significados.scrollTop = scrollySignificados;
}

export let scrollyConteudo = 0;

export function zerarScrollyConteudo() {
    scrollyConteudo = 0;
}

export let isCardPreviewOpen = false;

export function setIsCardPreviewOpen(valor) {
    isCardPreviewOpen = valor;
}

export let isModalAtencaoEdicaoOpen = false;

export function setIsModalAtencaoEdicaoOpen(valor) {
    isModalAtencaoEdicaoOpen = valor;
}

export let atualizado = false;

export function setAtualizado(valor) {
    atualizado = valor;
}

export function salvarAtualizadoStorage() {
    localStorage.setItem('atualizado', atualizado);
}

export function getAtualizadoFromStorage() {
    const atualizado = JSON.parse(localStorage.getItem('atualizado'));

    if(atualizado) {
        return atualizado;
    } else {
        return null;
    }
}

export let scrollYBody;

export function setScrollYBody(valor) {
    scrollYBody = valor;
}

export let usarScrollYBodyPersonalizado = false;

export function setUsarScrollYBodyPersonalizado(valor) {
    usarScrollYBodyPersonalizado = valor;
}

export let displayCards = 'dois-por-linha';

export function setDisplayCards(mode) {
    displayCards = mode;
}