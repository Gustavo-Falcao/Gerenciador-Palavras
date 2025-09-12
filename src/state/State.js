import { renderBuscarPalavra } from "../components/RenderBusca.js";
import { renderListaPalavras } from "../components/RenderList.js";
import { render } from "../../main.js";
// Estado da lista de cards
let stateBusca = {
    cards: [],
    busca: '',
    edit: false,
    idEdit: ''
}
// Estado do popUp do card
let stateCardPopUp = {
    aberto: false,
    idCard: '',
    page: ''
}

// Estado navegação entre páginas
let stateNavegacao = {
    page: 'home'
}

export function getStateBusca() {
    return stateBusca;
}

export function getStateCardPopUp() {
    return stateCardPopUp;
}

export function getStateNavegacao() {
    return stateNavegacao;
}

// Mudança de estado do card popUp
export function setStateCardPopUp(newState) {
    stateCardPopUp = {...stateCardPopUp, ...newState};
    renderBuscarPalavra();
}

// Mudança de estado da lista de cards
export function setStateBusca(newState) {
    stateBusca = {...stateBusca, ...newState};
    renderListaPalavras();
}

export function setStatePagBusca(newState) {
    stateBusca = {...stateBusca, ...newState};
    renderBuscarPalavra();
}

export function setStateCards(newState) {
    stateBusca.cards = newState;
    renderListaPalavras();
}

// Mudança de estado da navegação entre páginas
export function setStateNavegacao(newState) {
    stateNavegacao = {...stateNavegacao, ...newState};
    render();
}