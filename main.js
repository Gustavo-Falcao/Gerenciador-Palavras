import { getStateNavegacao } from "./src/state/State.js";
import { renderAddPalavra } from "./src/components/RenderAdd.js";
import { renderBuscarPalavra } from "./src/components/RenderBusca.js";
import { renderHome } from "./src/components/RenderHome.js";
import { carregarCards } from "./src/storage/Dados.js";

let container = document.getElementById('root');

export function render() {
    const stateNavegacao = getStateNavegacao();
    console.log(`Qual pagina = > ${stateNavegacao.page}`)

    if(stateNavegacao.page === 'add') {
        renderAddPalavra(container);
    } 
    if(stateNavegacao.page === 'buscar') {
        carregarCards();
        renderBuscarPalavra(container);
    } 
    if(stateNavegacao.page === 'home'){
        renderHome(container);
    } 
}

render();


