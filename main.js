import { getStatePrincipal, statePrincipal } from "./src/state/State.js";
import { renderAddPalavra } from "./src/components/RenderAdd.js";
import { renderBuscarPalavra } from "./src/components/RenderBusca.js";
import { renderHome } from "./src/components/RenderHome.js";

let container = document.getElementById('root');

export function render() {
    console.log(`Modo do cardPopUp => ${statePrincipal.cardPanel.mode}`);
    console.log(`Qual pagina = > ${statePrincipal.navegacao.page}`)

    if(statePrincipal.navegacao.page === 'add') {
        renderAddPalavra(container);
    } 
    if(statePrincipal.navegacao.page === 'buscar') {
        renderBuscarPalavra();
    } 
    if(statePrincipal.navegacao.page === 'home'){
        renderHome(container);
    } 
}

render();


