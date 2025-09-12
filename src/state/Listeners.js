import { debounce } from "../helpers/Debounce.js";
import { gerarId } from "../helpers/GerarId.js";
import { setStateNavegacao, setStateBusca, setStateCardPopUp, setStatePagBusca, getStateBusca } from "./State.js";
import {atualizarCards} from "../storage/Dados.js";
export function listenersHome() {
    // Listener para o botão que irá para a página de add palavra
    document.getElementById('add').addEventListener('click', () => {
        setStateNavegacao({page: 'add'});
    });

    // Listener para o botão que irá direcionar para a página de buscar palavar
    document.getElementById('buscar').addEventListener('click', () => {
        setStateNavegacao({page: 'buscar'});
    });
}

export function listenersBuscarPalavra() {
    //Listener para o input de buscar palavra
    document.getElementById('q').addEventListener('input', debounce((e)=> {
        console.log(`Palavra para buscar => ${e.target.value}`);
        setStateBusca({busca: e.target.value});
        console.log('Entrou no debounceee')
    }, 250));

    //Listener para mostrar as informacoes do card
    document.getElementById('grid').addEventListener('click', (e) => {
        let elementoClicado = e.target.closest('.card')
        console.log(`Id do elemento clicado => ${elementoClicado.id}`);
        setStateCardPopUp({aberto: true, idCard: elementoClicado.id, page: 'info'});
    });

    //Listener para fechar o pop-up com as informacoes do card
    document.getElementById('sair').addEventListener('click', () => {
        setStateCardPopUp({aberto: false, idCard: '', page: ''});
    });

    //Listener para o botão home da página de buscar palavra
    document.getElementById('home').addEventListener('click', () => {
        setStateNavegacao({page: 'home'});
    });
}

//Listener para remover um card
export function listenerRemoverCard(stateBusca) {
    document.getElementById('opcoes').addEventListener('click', (e) => {
        
        let idCardAtual = e.target.closest('.janela-info').id;

        console.log(`ID CARD ATUAL => ${idCardAtual}`);

        if(e.target.closest('#deletar')) {    
            let novoCards = stateBusca.cards.filter(card => card.id !== idCardAtual);
            localStorage.setItem('arrayCards', JSON.stringify(novoCards));
            setStateCardPopUp({aberto: false, idCard: ''});
            atualizarCards();
        }
        
        if(e.target.closest('#editar')) {
            setStateCardPopUp({page: 'edit'});
        }
    });
}

export function listenersOpcoesEdit() {
    document.getElementById('opcoes-edit').addEventListener('click', (e) => {
        let elemento = e.target;
        if(!elemento) return;
        if(elemento.id === 'cancelar') {
            setStateCardPopUp({page: 'info'});
        }
    });
}

// Listener para o botão que irá adicionar palavra
export function listenerAddPalavra() {
    const stateBusca = getStateBusca();
    document.getElementById('bot-add').addEventListener('click', () => {
    const nomePalavra = document.getElementById('nome-palavra').value;
    const descPalavra = document.getElementById('cont-palavra').value;

    if(nomePalavra && descPalavra) {
        const newCard = {id: gerarId(), nome: nomePalavra, desc: descPalavra};
        if(stateBusca.cards) {
            localStorage.setItem('arrayCards', JSON.stringify([...stateBusca.cards, newCard]));
        } else {
            console.log('Deu ruim');
            console.log(`${stateBusca.cards}`);
        }
        setStateNavegacao({page: 'home'});
    }
});
}