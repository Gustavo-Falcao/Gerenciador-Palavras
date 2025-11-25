import { getCurrentDate } from "../helpers/HandlerDailyWords.js";
import { listenersBuscarPalavra, listenerRemoverCard, listenersOpcoesEdit, voltarHome} from "../state/Listeners.js";
import {stateNavegacao, arrayDecks } from "../state/State.js";

function criarMainList() {
    const main = document.createElement('main');
    main.setAttribute('id', 'grid');
    main.setAttribute('class', 'grid');
    main.setAttribute('aria-alive', 'polite');
    return main;
}

function criarJanelaPai() {
    //Criando a janela de fundo que irá cobrir a página inteira
    let janelaPai = document.createElement('div');
    janelaPai.setAttribute('id', 'janela-pai');
    janelaPai.setAttribute('class', 'janela-pai-popup');

    return janelaPai;
}

function criarBotSair() {
    //Criando o botao para sair da visualizacao do card
    let botSair = document.createElement('button');
    botSair.setAttribute('class', 'botSair');
    botSair.setAttribute('id', 'sair');
    botSair.innerHTML = `&#x2715`;
    return botSair;
}

function criarJanelaInfo() {
    //Criando a janela que terá o conteudo do card e as opcoes para o card
    let janelaInfo = document.createElement('div');
    janelaInfo.setAttribute('class', 'janela-info');
    janelaInfo.setAttribute('id', 'info');
    return janelaInfo;
}

function criarJanelaConteudo() {
    //Criando a janela que terá o conteudo do card
    let janelaConteudo = document.createElement('div');
    janelaConteudo.setAttribute('class', 'janela-pop');
    return janelaConteudo;
}

function criarBotDelete() {
    //Criando o botao para deletar o card
    let botDeletar = document.createElement('button');
    botDeletar.setAttribute('id', 'deletar');
    let iconeDeletar = document.createElement('span');
    iconeDeletar.setAttribute('class', 'material-symbols-outlined');
    iconeDeletar.innerHTML = "delete";
    botDeletar.appendChild(iconeDeletar);
    return botDeletar;
}

function criarBotEditar() {
    //Criando o botao para editar o card
    let botEditar = document.createElement('button');
    botEditar.setAttribute('id', 'editar');
    let iconeEditar = document.createElement('span');
    iconeEditar.setAttribute('class','material-symbols-outlined');
    iconeEditar.innerHTML = "edit_note";
    botEditar.appendChild(iconeEditar);
    return botEditar;
    
}

function criarCaixaOpcoes() {
    let botEditar = criarBotEditar();
    let botDeletar = criarBotDelete();
    //Criando um caixa para as opcoes com o card
    let caixaOpcoes = document.createElement('div');
    caixaOpcoes.setAttribute('class', 'caixa-op');
    caixaOpcoes.setAttribute('id', 'opcoes');
    caixaOpcoes.appendChild(botEditar);
    caixaOpcoes.appendChild(botDeletar);
    return caixaOpcoes;
}

function criarInput(card) {
    let input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'nome-edit');
    input.setAttribute('value', `${card.nome}`);
    return input;
}

function criarTextArea(card) {
    //<textarea id="cont-palavra" rows="10" cols="35" placeholder="Digite o conteúdo aqui..."></textarea>
    let textArea = document.createElement('textarea');
    textArea.setAttribute('id', 'cont-edit');
    textArea.setAttribute('rows', '10');
    textArea.setAttribute('cols', '30');
    //textArea.setAttribute('value', `${card.desc}`);
    textArea.innerHTML = `${card.desc}`
    return textArea;
}

function criarBotSalvar() {
    let botSalvar = document.createElement('button');
    botSalvar.setAttribute('id', 'salvar');
    botSalvar.textContent = "Salvar";
    return botSalvar;
}

function criarBotCancelar() {
    let botCancelar = document.createElement('button');
    botCancelar.setAttribute('id', 'cancelar');
    botCancelar.textContent = "Cancelar";
    return botCancelar;
}

function criarCaixaOpcoesEditar() {
    let botSalvar = criarBotSalvar();
    let botCancelar = criarBotCancelar();

    let caixaOpcoesEditar = document.createElement('div');
    caixaOpcoesEditar.setAttribute('class', 'caixa-op');
    caixaOpcoesEditar.setAttribute('id', 'opcoes-edit');
    caixaOpcoesEditar.appendChild(botSalvar);
    caixaOpcoesEditar.appendChild(botCancelar);
    return caixaOpcoesEditar;
}
// Renderização da página de buscar palavra

function encontraDeck(id) {
    const deckFind = arrayDecks.find((deck) => deck.id === id)
    return deckFind
}

export function renderBuscarPalavra() {

    const deck = encontraDeck(stateNavegacao.idDeck)
    const cardsDeck = deck.cards
    console.log(cardsDeck)
    console.log(`Quantidade palavras: ${deck.dailyWords.amount}`)
    console.log(`Dia: ${deck.dailyWords.day}`)

    console.log(`Estado do cardPopUp => ${stateNavegacao.cardPanel.isOpen}`);
    console.log(`Id que está no estado do popup => ${stateNavegacao.cardPanel.idCardAtivo}`)

    let root = document.getElementById('root');

    root.innerHTML = '';
    // const cardsDeck = state.entidades.cards;
    
    const frag = document.createDocumentFragment();

    console.log(`Tamanho do array de cards => ${cardsDeck.length}`);
    
    //usar cardes
    if(cardsDeck.length > 0) {
        cardsDeck.forEach(card => {
            const article = document.createElement('article');
            article.setAttribute('class', 'card');
            article.setAttribute('id', `${card.id}`)
            const h3 = document.createElement('h3');
            h3.innerHTML = `${card.nome}`
            article.appendChild(h3);
            frag.appendChild(article);
        });
    } else {
        const article = document.createElement('article');
        article.setAttribute('class', 'card');
        const h3 = document.createElement('h3');
        h3.textContent = 'Sem palavras ainda...'
        article.appendChild(h3);
        frag.appendChild(article);
    }
    
    const main = criarMainList();

    main.appendChild(frag);

    const totalPalavras = cardsDeck.length;
    const totalPalavrasDia = deck.dailyWords.amount
    //colocar value no input
    root.innerHTML = `
        <header class="menu-bar">
            <button class="icone" id="home">
                <span class="material-symbols-outlined">
                    home
                </span>
            </button>
        </header>
        <div class="main-buscar">
            <header class="titulo-buscar">
                <h1>${deck.nome}</h1>
            </header>
            <section class="toolbar" id="toolbar">
                <input type="search" placeholder="Busca..." id="q" autocomplete="off">
                <div class="box-infos"> 
                    <small class="badge">Total: ${totalPalavras}</small>
                    <small class="ok">Hoje: ${totalPalavrasDia}</small>
                </div>
                </section>
        </div>
    `;
    root.appendChild(main);
    
    let janelaPai = criarJanelaPai();
    let botSair = criarBotSair();    
    let janelaInfo = criarJanelaInfo();
    let janelaConteudo = criarJanelaConteudo();
    let caixaOpcoes = criarCaixaOpcoes();

    let nomePalavra = document.createElement('h2');
    let desc = document.createElement('pre')
    desc.setAttribute('class', 'alinhar-conteudo');
    desc.setAttribute('wrap', 'hard');
    const caixaPaiPre = document.createElement('div');
    caixaPaiPre.setAttribute('class', 'caixa-pre');
    caixaPaiPre.appendChild(desc);

    // usar satate principal
    if(stateNavegacao.cardPanel.isOpen) {
        if(janelaPai.classList.contains('esconder-janela')) {
            janelaPai.classList.remove('esconder-janela');
        }
        if(stateNavegacao.cardPanel.mode === 'view') {
            let cardPalavra = cardsDeck.find((element) => element.id === stateNavegacao.cardPanel.idCardAtivo);

            nomePalavra.innerHTML = `${cardPalavra.nome}`;
            desc.innerHTML = `${cardPalavra.desc}`;
            janelaInfo.dataset.id = cardPalavra.id
            janelaConteudo.appendChild(nomePalavra);
            janelaConteudo.appendChild(caixaPaiPre);
            janelaInfo.appendChild(janelaConteudo);
            janelaInfo.appendChild(caixaOpcoes);
        }   
        else if(stateNavegacao.cardPanel.mode === 'edit') {
            let palavraMostrar = cardsDeck.find((element) => element.id === stateNavegacao.cardPanel.idCardAtivo);

            let input = criarInput(palavraMostrar);
            let textArea = criarTextArea(palavraMostrar);
            let caixaOpcoesEditar = criarCaixaOpcoesEditar();
            
            janelaConteudo.appendChild(input);
            janelaConteudo.appendChild(textArea);
            janelaInfo.appendChild(janelaConteudo);
            janelaInfo.appendChild(caixaOpcoesEditar);
            janelaInfo.dataset.id = palavraMostrar.id;
            
        }
        janelaPai.classList.add('mostrar-janela');
    } else {
        if(janelaPai.classList.contains('mostrar-janela')) {
            janelaPai.classList.remove('mostrar-janela');
        }
        janelaPai.classList.add('esconder-janela');
    }
    janelaPai.appendChild(janelaInfo);
    janelaPai.appendChild(botSair);
    root.appendChild(janelaPai);
    console.log(`Situação do card => ${stateNavegacao.cardPanel.mode}`);
    if(stateNavegacao.cardPanel.isOpen) {
        stateNavegacao.cardPanel.mode === 'view' ? listenerRemoverCard(stateNavegacao.idDeck) : listenersOpcoesEdit();
        root.classList.add('travar-rolamento');
    } else {
        root.classList.remove('travar-rolamento');
    }

    if(cardsDeck.length > 0) listenersBuscarPalavra();
    voltarHome()
}