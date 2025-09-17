import { debounce } from "../helpers/Debounce.js";
import { gerarId } from "../helpers/GerarId.js";
import { getStatePrincipal, setStatePrincipal, statePrincipal } from "./State.js";
import { render } from "../../main.js";
import { renderListaPalavras } from "../components/RenderList.js";
export function listenersHome() {
    // Listener para o botão que irá para a página de add palavra
    document.getElementById('add').addEventListener('click', () => {
       setStatePrincipal({navegacao: {page: 'add'}});
       render();
    });

    // Listener para o botão que irá direcionar para a página de buscar palavar
    document.getElementById('buscar').addEventListener('click', () => {
        setStatePrincipal({navegacao: {page: 'buscar'}});
        render()
    });
}

export function listenersBuscarPalavra() {
    //Listener para o input de buscar palavra
    document.getElementById('q').addEventListener('input', debounce((e)=> {
        console.log(`Palavra para buscar => ${e.target.value}`);
        setStatePrincipal({busca: {query: e.target.value}});
        renderListaPalavras();
        console.log('Entrou no debounceee')
    }, 250));

    //Listener para mostrar as informacoes do card
    document.getElementById('grid').addEventListener('click', (e) => {
        let elementoClicado = e.target.closest('.card')
        console.log(`Id do elemento clicado => ${elementoClicado.id}`);
        //setStateCardPopUp({aberto: true, idCard: elementoClicado.id, page: 'info'});
        setStatePrincipal({cardPanel: {isOpen: true, idCardAtivo: elementoClicado.id, mode: 'view'}});
        render()
    });

    //Listener para fechar o pop-up com as informacoes do card
    document.getElementById('sair').addEventListener('click', () => {
       // setStateCardPopUp({aberto: false, idCard: '', page: ''});
        setStatePrincipal({cardPanel: {isOpen: false, idCardAtivo: statePrincipal.cardPanel.idCardAtivo, mode: statePrincipal.cardPanel.mode}});
        render()
    });

    //Listener para o botão home da página de buscar palavra
    document.getElementById('home').addEventListener('click', () => {
       // setStateNavegacao({page: 'home'});
        setStatePrincipal({navegacao: {page: 'home'}});
        render()
    });
}

//Listener para remover um card
export function listenerRemoverCard(state) {
    document.getElementById('opcoes').addEventListener('click', (e) => {
        
        let idCardAtual = e.target.closest('.janela-info').dataset.id;

        console.log(`ID CARD ATUAL => ${idCardAtual}`);

        if(e.target.closest('#deletar')) {    
            let novoCards = state.entidades.cards.filter(card => card.id !== idCardAtual);
            //setStateCardPopUp({aberto: false, idCard: ''});
            setStatePrincipal({entidades: {cards: novoCards}, cardPanel: {isOpen: false, idCardAtivo: statePrincipal.cardPanel.idCardAtivo, mode: statePrincipal.cardPanel.mode}});
            localStorage.setItem('arrayCards', JSON.stringify(novoCards));
            //atualizarCards();
            render();
        }
        
        if(e.target.closest('#editar')) {
            //setStateCardPopUp({page: 'edit'});
            setStatePrincipal({cardPanel: {isOpen: true, idCardAtivo: idCardAtual, mode: 'edit'}});
            render();
        }
    });
}

//Listeners para a edicao do card
export function listenersOpcoesEdit() {
    document.getElementById('opcoes-edit').addEventListener('click', (e) => {
        const idCard = e.target.closest('.janela-info').dataset.id;
        console.log(`Id que está para ser editado => ${idCard}`);
        if(e.target.id === 'cancelar') {
           // setStateCardPopUp({page: 'info'});
            setStatePrincipal({cardPanel: {mode: 'view', isOpen: true, idCardAtivo: statePrincipal.cardPanel.idCardAtivo}});
            render()
        }
        else if(e.target.id === 'salvar') {
            const nomeEdit = document.getElementById('nome-edit').value;
            const contEdit = document.getElementById('cont-edit').value;

            if(nomeEdit && contEdit) {
                const cards = statePrincipal.entidades.cards;
                const cardEditado = {nome: nomeEdit, desc: contEdit};
                const novoCards = cards.map(card => card.id === idCard ? {...card, ...cardEditado} : card);
                //atualizarCards();
                //setStateCardPopUp({page: 'info'});
                setStatePrincipal({entidades: {cards: novoCards}, cardPanel: {mode: 'view', isOpen: true, idCardAtivo: statePrincipal.cardPanel.idCardAtivo}});
                localStorage.setItem('arrayCards', JSON.stringify(novoCards));
                render();
            }
        }
    });
}

// Listener para o botão que irá adicionar palavra
export function listenerAddPalavra() {
    const cards = statePrincipal.entidades.cards;
    document.getElementById('bot-add').addEventListener('click', () => {
    const nomePalavra = document.getElementById('nome-palavra').value;
    const descPalavra = document.getElementById('cont-palavra').value;

    if(nomePalavra && descPalavra) {
        const newCard = {id: gerarId(), nome: nomePalavra, desc: descPalavra};
        if(cards) {
            setStatePrincipal({entidades: {cards: [...cards, newCard]}, navegacao: {page: 'home'}});
            localStorage.setItem('arrayCards', JSON.stringify(statePrincipal.entidades.cards));
            render();
        } else {
            console.log('Deu ruim');
        }
    }
});
}