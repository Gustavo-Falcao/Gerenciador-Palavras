import { stateNavegacao, arrayDecks, deckComponent, setDeckComponente } from "./src/state/State.js";
import { renderAddPalavra } from "./src/components/RenderAdd.js";
import { renderBuscarPalavra } from "./src/components/RenderBusca.js";
import { renderHome } from "./src/components/RenderHome.js";
import { handlerDailyWords } from "./src/helpers/HandlerDailyWords.js";

let container = document.getElementById('root');

export function render() {
    console.log("////////////////////////////////////////////////////")
    console.log(`Qual pagina = > ${stateNavegacao.page}`)
    console.log(`Deck já criado ? ${deckComponent.isCriado}`)

    
    if(stateNavegacao.page === 'add') {
        renderAddPalavra(container);
    } 
    if(stateNavegacao.page === 'buscar') {
        renderBuscarPalavra();
    } 
    if(stateNavegacao.page === 'home'){
        if(arrayDecks.length > 0 && !deckComponent.isCriado) {
            console.log("Componente do deck está sendo criado pela primeira vez")
            handlerDailyWords()
            setDeckComponente({isCriado: !deckComponent.isCriado})
            render()
        }
        renderHome(container);
    } 
}

render();


