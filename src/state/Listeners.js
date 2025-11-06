import { debounce } from "../helpers/Debounce.js";
import { gerarId } from "../helpers/GerarId.js";
import { setStatePrincipal, estadoModalDeck, setArrayDecks, arrayDecks, setStadoModal, atualizarDeck, setStateNavegacao, stateNavegacao, mostrarOpcoesDeck, setMostrarOpcoesDeck } from "./State.js";
import { render } from "../../main.js";
import { renderListaPalavras } from "../components/RenderList.js";
import { getCurrentDay } from "../helpers/HandlerDailyWords.js";
export function listenersHome() {

    document.getElementById('my-file').addEventListener('change', (e) => {
        const resultado = document.getElementById('cont');
        const selectedFile = e.target.files;

        if(selectedFile.length > 0) {
            resultado.textContent = " ";
            console.log("Selected files é maior que 0");
            const file = selectedFile[0];
            if(!file) {
                console.error("Nenhum arquivo selecionado")
                return
            }
            const leitor = new FileReader();

            leitor.onload = () => {
                const texto = leitor.result;
                resultado.textContent = texto;
                const dados = JSON.parse(texto);
                console.log("Arquivo lido com sucesso!!");
                setarValorLocalStorage('arrayDecks', dados)
            }

            leitor.readAsText(file);

            render()
        }
    });

    document.getElementById('conteudo').addEventListener('click', (e) => {
        if(e.target.id != 'conteudo' && !e.target.closest('.opcoes') ) {
            let elementoPai = e.target.closest('.deck')
            if(elementoPai) {
                let idDoPai = elementoPai.id 
                console.log(`ELEMENTO DO PAI (${idDoPai})`)
                if(idDoPai != null) {
                    if(mostrarOpcoesDeck.idDeckMostrar.length < 1 || (idDoPai !== mostrarOpcoesDeck.idDeckMostrar && !mostrarOpcoesDeck.isMostrar)) {
                        console.log("111")
                        setMostrarOpcoesDeck({idDeckMostrar: idDoPai, isMostrar: true})
                    }
                    else if(idDoPai === mostrarOpcoesDeck.idDeckMostrar && mostrarOpcoesDeck.isMostrar) {
                        console.log("222")
                        setMostrarOpcoesDeck({idDeckMostrar: idDoPai, isMostrar: false})
                    }
                    else if(idDoPai === mostrarOpcoesDeck.idDeckMostrar && !mostrarOpcoesDeck.isMostrar) {
                        console.log("333")
                        setMostrarOpcoesDeck({idDeckMostrar: mostrarOpcoesDeck.idDeckMostrar, isMostrar: true})
                    }
                    else if(idDoPai !== mostrarOpcoesDeck.idDeckMostrar && mostrarOpcoesDeck.isMostrar){
                        console.log("444")
                        setMostrarOpcoesDeck({idDeckMostrar: idDoPai, isMostrar: true})
                    }
    
                    render()
                }
            }
        }
        else if(e.target.closest('.opcoes')) {
            const idElemento = e.target.id
            const idDeck = e.target.closest('.deck').id

            if(idElemento === 'add-palavra') {
                setStateNavegacao({page: 'add', idDeck: idDeck})
                render()
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
                                day: getCurrentDay()
                            },
                            cards: [],
                            mostrarOpcoes: false
                        }
                        setArrayDecks([...arrayDecks, newDeck])
                        if(arrayDecks.length === 1 ) {
                            atualizarDeck(newDeck.id)
                        }
                        setarValorLocalStorage('arrayDecks', arrayDecks)
                        setStadoModal({isModelOpen: !estadoModalDeck.isModelOpen})
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
        setStateNavegacao({cardPanel: {isOpen: true, idCardAtivo: elementoClicado.id, mode: 'view'}})
        render()
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
            //localStorage.setItem('arrayCards', JSON.stringify(novoCards));
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