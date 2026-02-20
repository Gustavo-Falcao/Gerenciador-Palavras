import { debounce } from "../helpers/Debounce.js";
import { gerarId } from "../helpers/GerarId.js";
import { setArrayDecks, arrayDecks, setStateNavegacao, stateNavegacao , salvarDecksLocalStorage, zerarScrollyConteudo, setUsarScrollYBodyPersonalizado} from "./State.js";
import { render } from "../../main.js";
import { renderListaPalavras } from "../components/RenderList.js";
import { getCurrentDate, getCurrentDateTime } from "../helpers/HandlerDailyWords.js";
import { destravarScrollBody, destravarScrollBodySemAlterarValorScroll, renderBuscarPalavra } from "../components/RenderBusca.js";

export function listenersBuscarPalavra() {
    //Listener para o input de buscar palavra
    document.getElementById('q').addEventListener('input', debounce((e)=> {
        console.log(`Palavra para buscar => ${e.target.value}`);
        setStateNavegacao({query: e.target.value})
        renderListaPalavras();
    }, 250));

    //Listener para mostrar as informacoes do card
    document.getElementById('grid').addEventListener('click', (e) => {
        let elementoClicado = e.target.closest('.card')
        if(elementoClicado) {
            console.log(`Id do elemento clicado => ${elementoClicado.id}`);
            setStateNavegacao({cardPanel: {isOpen: true, idCardAtivo: elementoClicado.id, mode: 'view'}})
            renderBuscarPalavra();
        }
    });
}

export function fecharCard() {
    //Listener para fechar o pop-up com as informacoes do card
    document.getElementById('sair').addEventListener('click', () => {
        setStateNavegacao({cardPanel: {...stateNavegacao.cardPanel, isOpen: false, idCardAtivo: null, mode: ''}})
        setUsarScrollYBodyPersonalizado(false);
        console.log("Entrou no fechar card")
        zerarScrollyConteudo();
        renderBuscarPalavra();
    });
}

export function voltarHome() {
    //Listener para o botão home da página de buscar palavra
    document.getElementById('home').addEventListener('click', () => {
       // setStateNavegacao({page: 'home'});
        setStateNavegacao({page: 'home', idDeck: null})
        render()
    });
}

//Listener para tratar opçoes do card
//Mudar nome da funçao para handlerModeView
export function listenersOpcoesViewCard(idDeck) {
    document.getElementById('opcoes').addEventListener('click', (e) => {
        
        let idCardAtual = e.target.closest('.janela-info').dataset.id;

        console.log(`ID CARD ATUAL => ${idCardAtual}`);

        if(e.target.closest('#deletar')) {    
            const novoDecks = arrayDecks.map((dec) => dec.id === idDeck ? {...dec, cards: dec.cards.filter(card => card.id !== idCardAtual), ultimaAtualizacao: {dataFormatada: getCurrentDate(), time: getCurrentDateTime()}} : dec)

            setArrayDecks(novoDecks)
            setStateNavegacao({cardPanel: {isOpen: !stateNavegacao.cardPanel.isOpen, idCardAtivo: null, mode: ''}})

            salvarDecksLocalStorage(novoDecks)
            render();
        }
        
        //aqui deve ser chamado a função para mostrar a pagina de criar deck mas com modo de editar
        if(e.target.closest('#editar')) {
            setStateNavegacao({page:'add', cardPanel: {isOpen: true, idCardAtivo: stateNavegacao.cardPanel.idCardAtivo, mode: 'editar', isEditando: stateNavegacao.cardPanel.isEditando}});

            //setScrollyConteudo();
            //destravarScrollBody();
            destravarScrollBodySemAlterarValorScroll();
            render();
        }
    });
}

// Listener para o botão que irá adicionar palavra
export function listenerAddPalavra() {
    //const cards = statePrincipal.entidades.cards;
    document.getElementById('bot-add').addEventListener('click', () => {
        const nomePalavra = document.getElementById('nome-palavra').value;
        const descPalavra = document.getElementById('cont-palavra').value;

        if(nomePalavra && descPalavra) {
            const newCard = {id: gerarId(), nome: nomePalavra, desc: descPalavra};

            const novoArrayDack = arrayDecks.map((deck) => deck.id === stateNavegacao.idDeck ? {...deck, cards: [...deck.cards, newCard], ultimaAtualizacao: {dataFormatada: getCurrentDate(), time: getCurrentDateTime()}, mostrarOcoes: false } : deck)
            
            setArrayDecks(novoArrayDack)
            salvarDecksLocalStorage(novoArrayDack)
            setStateNavegacao({page: 'home', idDeck: null})
            render()
        }
    })
}
