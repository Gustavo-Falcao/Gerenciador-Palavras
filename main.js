import { getStateNavegacao, setStateCards } from "./src/state/State.js";
import { renderAddPalavra } from "./src/components/RenderAdd.js";
import { renderBuscarPalavra } from "./src/components/RenderBusca.js";
import { renderHome } from "./src/components/RenderHome.js";

let container = document.getElementById('root');

function atualizarCards() {
    const listStorage = localStorage.getItem('arrayCards');
    if(listStorage) {
    let cardsCarregados = JSON.parse(listStorage);
        setStateCards(cardsCarregados);
    }
}

export function render() {
    const stateNavegacao = getStateNavegacao();
    console.log(`Qual pagina = > ${stateNavegacao.page}`)

    if(stateNavegacao.page === 'add') {
        atualizarCards();
        renderAddPalavra(container);
    } 
    if(stateNavegacao.page === 'buscar') {
        atualizarCards();
        renderBuscarPalavra(container);
    } 
    if(stateNavegacao.page === 'home'){
        renderHome(container);
    } 
}

render();


