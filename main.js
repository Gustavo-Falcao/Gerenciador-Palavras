import { statePrincipal, stateNavegacao } from "./src/state/State.js";
import { renderAddPalavra } from "./src/components/RenderAdd.js";
import { renderBuscarPalavra } from "./src/components/RenderBusca.js";
import { renderHome } from "./src/components/RenderHome.js";
import { handlerDailyWords } from "./src/helpers/HandlerDailyWords.js";

let container = document.getElementById('root');

export function render() {
    console.log(`Modo do cardPopUp => ${statePrincipal.cardPanel.mode}`);
    console.log(`Qual pagina = > ${stateNavegacao.page}`)

    handlerDailyWords();

    if(stateNavegacao.page === 'add') {
        renderAddPalavra(container);
    } 
    if(stateNavegacao.page === 'buscar') {
        renderBuscarPalavra();
    } 
    if(stateNavegacao.page === 'home'){
        renderHome(container);
    } 
}

render();


