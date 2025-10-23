import { debounce } from "../helpers/Debounce.js";
import { gerarId } from "../helpers/GerarId.js";
import { setStatePrincipal, statePrincipal, estadoModalDeck, setArrayDecks, arrayDecks, setStadoModal, atualizarDeck, setStateNavegacao } from "./State.js";
import { render } from "../../main.js";
import { renderListaPalavras } from "../components/RenderList.js";
export function listenersHome() {

    document.getElementById('conteudo').addEventListener('click', (e) => {
        if(e.target.id != 'conteudo' && !e.target.closest('.opcoes') ) {
            let elementoPai = e.target.closest('.deck')
            if(elementoPai) {
                let idDoPai = elementoPai.id 
                if(idDoPai != null) {
                    let novoDecks = arrayDecks.map(
                        deck => deck.id === idDoPai ? {...deck,...{mostrarOpcoes: !deck.mostrarOpcoes, }}: deck)
                    setArrayDecks(novoDecks)
                    render()
                }
            }
        }
        else if(e.target.closest('.opcoes')) {
            const idElemento = e.target.id
            const idDeck = e.target.closest('.deck').id

            if(idElemento === 'add-palavra') {
                alert("CLicou para add palavar")
            }
            else if(idElemento === 'buscar') {
                setStateNavegacao({page: 'buscar', idDeck: idDeck})
                render()
            }
        }
    })

    // Listener para o botão que irá para a página de add palavra
    // document.getElementById('add').addEventListener('click', () => {
    //    setStatePrincipal({navegacao: {page: 'add'}});
    //    render();
    // });

    // Listener para o botão que irá direcionar para a página de buscar palavar
    // document.getElementById('buscar').addEventListener('click', () => {
    //     setStatePrincipal({navegacao: {page: 'buscar'}});
    //     render()
    // });

    //Abrir opcoes do deck
    // document.getElementById('conteudo').addEventListener('click', (e) => {
    //     if(e.target) {
    //         let pai = e.target.closest('.deck');
    //         let cont = pai.getElementByClass('opcoes')
            
    //     }
    // })
}

export function handlerModal() {

    if(estadoModalDeck.isModelOpen) {
        document.getElementById('opcoes').addEventListener('click', (e) => {
            if(e.target) {
                if(e.target.id === 'cancel') {
                    setStadoModal({isModelOpen: !estadoModalDeck.isModelOpen})
                    render()
                }
                else if (e.target.id === 'add-deck') {
                    const nomeDeck = document.getElementById('nome-deck').value.trim();
                    console.log("Entrou no else if e conteudo: ", nomeDeck)
                    if(nomeDeck.length > 0) {
                        const newDeck = {
                            id: gerarId(),
                            nome: nomeDeck,
                            dailyWords: {
                                amount: 0,
                                day: 0
                            },
                            cards: [],
                            mostrarOpcoes: false
                        }
                        setArrayDecks([...arrayDecks, newDeck])
                        localStorage.setItem('arrayDecks', JSON.stringify(arrayDecks))
                        setStadoModal({isModelOpen: !estadoModalDeck.isModelOpen})
                        if(arrayDecks.length === 1 ) {
                            atualizarDeck(newDeck.id)
                        }
                    }
                    render()
                }
                else {
                    return
                }
                
            }
        })
    } else {
        document.getElementById('open-deck').addEventListener('click', () => {
        estadoModalDeck.isModelOpen = !estadoModalDeck.isModelOpen;
        render()
    })
    }
}

export function listenersBuscarPalavra() {
    //Listener para o input de buscar palavra
    document.getElementById('q').addEventListener('input', debounce((e)=> {
        console.log(`Palavra para buscar => ${e.target.value}`);
        setStatePrincipal({busca: {query: e.target.value}});
        renderListaPalavras();
    }, 250));

    //Listener para mostrar as informacoes do card
    document.getElementById('grid').addEventListener('click', (e) => {
        let elementoClicado = e.target.closest('.card')
        console.log(`Id do elemento clicado => ${elementoClicado.id}`);
        //setStateCardPopUp({aberto: true, idCard: elementoClicado.id, page: 'info'});
        setStatePrincipal({cardPanel: {isOpen: true, idCardAtivo: elementoClicado.id, mode: 'view'}});
        setStateNavegacao({cardPanel: {isOpen: true, idCardAtivo: elementoClicado.id, mode: 'view'}})
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
        setStateNavegacao({page: 'home'})
        render()
    });
}

//Listener para remover um card
export function listenerRemoverCard(idDeck) {
    document.getElementById('opcoes').addEventListener('click', (e) => {
        
        let idCardAtual = e.target.closest('.janela-info').dataset.id;

        console.log(`ID CARD ATUAL => ${idCardAtual}`);

        if(e.target.closest('#deletar')) {    
            const deck = arrayDecks.find(dec => dec.id === idDeck)
            //const novoDeck = deck.filter(card => card.id !== idCardAtual)
            //let novoCards = state.entidades.cards.filter(card => card.id !== idCardAtual);
            //setStateCardPopUp({aberto: false, idCard: ''});
            const novoDecks = arrayDecks.map(dec => dec.id === idDeck ? dec.cards.filter(card => card.id !== idCardAtual) : dec)
            setArrayDecks(novoDecks)
            
            // setStatePrincipal({entidades: {cards: novoCards}, cardPanel: {isOpen: false, idCardAtivo: statePrincipal.cardPanel.idCardAtivo, mode: statePrincipal.cardPanel.mode}});
            //localStorage.setItem('arrayCards', JSON.stringify(novoCards));
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
            setStatePrincipal({entidades: {cards: [...cards, newCard]}, navegacao: {page: 'home'}, dailyWords: {amount: statePrincipal.dailyWords.amount + 1, day: statePrincipal.dailyWords.day}});
            localStorage.setItem('arrayCards', JSON.stringify(statePrincipal.entidades.cards));
            localStorage.setItem('infoDailyWords', JSON.stringify(statePrincipal.dailyWords));
            render();
        } else {
            console.log('Deu ruim');
        }
    }
});
}