import { debounce } from "../helpers/Debounce.js";
import { gerarId } from "../helpers/GerarId.js";
import { setArrayDecks, arrayDecks, setStateNavegacao, stateNavegacao } from "./State.js";
import { render } from "../../main.js";
import { renderListaPalavras } from "../components/RenderList.js";

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
            render()
        }
    });

    //Listener para fechar o pop-up com as informacoes do card
    document.getElementById('sair').addEventListener('click', () => {
        setStateNavegacao({cardPanel: {isOpen: !stateNavegacao.cardPanel.isOpen, idCardAtivo: null, mode: ''}})
        render()
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
export function listenerRemoverCard(idDeck) {
    document.getElementById('opcoes').addEventListener('click', (e) => {
        
        let idCardAtual = e.target.closest('.janela-info').dataset.id;

        console.log(`ID CARD ATUAL => ${idCardAtual}`);

        if(e.target.closest('#deletar')) {    
            const novoDecks = arrayDecks.map((dec) => dec.id === idDeck ? {...dec, cards: dec.cards.filter(card => card.id !== idCardAtual)} : dec)

            setArrayDecks(novoDecks)
            setStateNavegacao({cardPanel: {isOpen: !stateNavegacao.cardPanel.isOpen, idCardAtivo: null, mode: ''}})

            setarValorLocalStorage('arrayDecks', novoDecks);
            render();
        }
        
        if(e.target.closest('#editar')) {
            setStateNavegacao({cardPanel: {isOpen: true, idCardAtivo: idCardAtual, mode: 'edit'}})
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
            setStateNavegacao({cardPanel: {mode: 'view', isOpen: stateNavegacao.cardPanel.isOpen, idCardAtivo: stateNavegacao.cardPanel.idCardAtivo}})
            render()
        }
        else if(e.target.id === 'salvar') {
            const nomeEdit = document.getElementById('nome-edit').value;
            const contEdit = document.getElementById('cont-edit').value;

            if(nomeEdit && contEdit) {
                const novoArrayDack = arrayDecks.map((dec) => dec.id === stateNavegacao.idDeck ? {...dec, cards: dec.cards.map(card => card.id === idCard ? {...card, nome: nomeEdit, desc: contEdit} : card)} : dec)
                
                setArrayDecks(novoArrayDack)
                setarValorLocalStorage('arrayDecks', novoArrayDack)

                setStateNavegacao({cardPanel: {isOpen: stateNavegacao.cardPanel.isOpen, idCardAtivo: stateNavegacao.cardPanel.idCardAtivo, mode: 'view'}})

                render();
            }
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

            const novoArrayDack = arrayDecks.map((deck) => deck.id === stateNavegacao.idDeck ? {...deck, cards: [...deck.cards, newCard], dailyWords: {amount: (deck.dailyWords.amount + 1), day: deck.dailyWords.day} } : deck)
            
            setArrayDecks(novoArrayDack)
            setarValorLocalStorage('arrayDecks', novoArrayDack)
            setStateNavegacao({page: 'home', idDeck: null})
            render()
        }
    })
}

function setarValorLocalStorage(chave, valor) {
    localStorage.setItem(chave, JSON.stringify(valor, null, 2));
}