// import { getCurrentDate } from "../helpers/HandlerDailyWords.js";
import { listenersBuscarPalavra, listenerRemoverCard, listenersOpcoesEdit, voltarHome, fecharCard, listenerCardEdit} from "../state/Listeners.js";
import {stateNavegacao, arrayDecks } from "../state/State.js";

function criarBotDelete() {
    //Criando o botao para deletar o card
    const botDeletar = document.createElement('button');
    botDeletar.setAttribute('id', 'deletar');
    botDeletar.setAttribute('class', 'delet')
    const iconeDeletar = document.createElement('span');
    iconeDeletar.setAttribute('class', 'material-symbols-outlined');
    iconeDeletar.innerHTML =  "delete";
    botDeletar.appendChild(iconeDeletar);
    
    return botDeletar;
}

function criarBotEditar() {
    //Criando o botao para editar o card
    const botEditar = document.createElement('button');
    botEditar.setAttribute('id', 'editar');
    botEditar.setAttribute('class', 'edit');
    const iconeEditar = document.createElement('span');
    iconeEditar.setAttribute('class','material-symbols-outlined');
    iconeEditar.innerHTML = "edit_note";
    botEditar.appendChild(iconeEditar);
    
    return botEditar;
    
}

function criarInput(card) {
    let input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'nome-edit');
    input.setAttribute('value', `${card.nome}`);
    return input;
}

function criarBotSalvar() {
    const botSalvar = document.createElement('button');
    botSalvar.setAttribute('class', 'save');
    botSalvar.setAttribute('id', 'salvar');
    botSalvar.textContent = "Salvar";
    return botSalvar;
}

function criarBotCancelar() {
    const botCancelar = document.createElement('button');
    botCancelar.setAttribute('class', 'cancel')
    botCancelar.setAttribute('id', 'cancelar');
    botCancelar.textContent = "Cancelar";
    return botCancelar;
}

function criarExemplos(exemplos) {
    //Criando caixa para inserir os exemplos
    const fragElement = document.createDocumentFragment();

    exemplos.forEach(exemplo => {
        const exemploElement = document.createElement('span');
        exemploElement.setAttribute('class', 'exemplo');
        exemploElement.textContent = exemplo;

        fragElement.appendChild(exemploElement);
    });

    return fragElement;
}

function criarSignificados(significados) {
    const fragElement = document.createDocumentFragment();

    significados.forEach((sig, index) => {
        const caixaSig = document.createElement('div');
        caixaSig.setAttribute('class', 'significado');

        //Criando caixa da definicao da palavra e informacoes sobre
        const caixaDef = document.createElement('div');
        caixaDef.setAttribute('class', 'definicao');

        const numeroDefinicao = document.createElement('span');
        numeroDefinicao.setAttribute('class', 'def-numero');
        numeroDefinicao.textContent = index+1;

        const contDefinicao = document.createElement('span');
        contDefinicao.textContent = sig.definicao;

        const tipoDefinicao = document.createElement('span');
        tipoDefinicao.setAttribute('class', `context-tag ${sig.tipoDefinicao}`);
        tipoDefinicao.textContent = sig.tipoDefinicao;

        contDefinicao.appendChild(tipoDefinicao);

        caixaDef.append(numeroDefinicao, contDefinicao);

        //Criando caixa dos exemplos
        const caixaExemplos = document.createElement('div');
        caixaExemplos.setAttribute('class', 'exemplos');

        const exemplos = criarExemplos(sig.exemplos);

        caixaExemplos.appendChild(exemplos);

        caixaSig.append(caixaDef, caixaExemplos);

        fragElement.appendChild(caixaSig);
    });

    return fragElement;
}

function criarCard(objPalavra) {

    const conteudoFrag = document.createDocumentFragment();

    //Criando titulo card
    const h2 = document.createElement('h2');
    h2.setAttribute('data-field', 'nome');
    h2.textContent = objPalavra.nome
   
    //Criando descricao breve da palavra
    const caixaBrevDesc = document.createElement('div');
    let hasConteudo = false
    caixaBrevDesc.setAttribute('class', 'brev-desc');
    if(objPalavra.tipo || objPalavra.brevDesc) {
        
        if(objPalavra.tipo && objPalavra.brevDesc) {
            const tipo = document.createElement('span');
            tipo.setAttribute('class', 'type');
            tipo.textContent = objPalavra.tipo;

            const brevDesc = document.createElement('span');
            brevDesc.setAttribute('class', 'sinonimo');
            brevDesc.textContent = objPalavra.brevDesc;

            caixaBrevDesc.append(tipo, brevDesc)
        }
        else if(objPalavra.tipo) {
            const tipo = document.createElement('span');
            tipo.setAttribute('class', 'type');
            tipo.textContent = objPalavra.tipo;

            caixaBrevDesc.appendChild(tipo)
        } else {
            const brevDesc = document.createElement('span');
            brevDesc.setAttribute('class', 'sinonimo');
            brevDesc.textContent = objPalavra.brevDesc;

            caixaBrevDesc.appendChild(brevDesc);
        }
        hasConteudo = true;
    }

    //Criado separador visual
    const separador = document.createElement('hr');
    
    //Criando caixa para a definicao e exemplos
    const caixaDefinicao = document.createElement('div');
    caixaDefinicao.setAttribute('class', 'def-block');

    const significados = criarSignificados(objPalavra.significados);

    caixaDefinicao.appendChild(significados);

    //Criando caixa para a pronuncia
    const caixaPronuncia = document.createElement('div');
    caixaPronuncia.setAttribute('class', 'pronuncia');

    const labelPronuncia = document.createElement('span');
    labelPronuncia.setAttribute('class', 'label-som');
    labelPronuncia.textContent = 'pronúncia'

    const pronuncia = document.createElement('span');
    pronuncia.setAttribute('class', 'fonetica');
    pronuncia.textContent = `/ ${objPalavra.pronuncia} /`;

    caixaPronuncia.append(labelPronuncia, pronuncia);

    conteudoFrag.append(h2)
    if(hasConteudo) conteudoFrag.append(caixaBrevDesc);
    conteudoFrag.append(separador, caixaDefinicao, caixaPronuncia);

    return conteudoFrag;
}

function criarCardEdit(objPalavra) {
    //const janela = criarJanelaConteudo();

    janela.innerHTML = `
        <h2><input type="text" id="nome-edit" value="${objPalavra.nome}"></h2>
    `

    return janela
}

function encontraDeck(id) {
    return arrayDecks.find((deck) => deck.id === id)   
}

function encontrarCard(id, cards) {
    return cards.find((card) => card.id === id)
}

// Renderização da página de buscar palavra
function criarCards(cards) {
    
    const main = document.createElement('main');
    main.setAttribute('id', 'grid');
    main.setAttribute('class', 'grid');
    main.setAttribute('aria-alive', 'polite');

    if(cards.length > 0) {
        cards.forEach(card => {
            const article = document.createElement('article');
            article.setAttribute('class', 'card');
            article.setAttribute('id', `${card.id}`)
            const h3 = document.createElement('h3');
            h3.innerHTML = `${card.nome}`
            article.appendChild(h3);
            main.appendChild(article);
        });
    } else {
        const article = document.createElement('article');
        article.setAttribute('class', 'card');
        const h3 = document.createElement('h3');
        h3.textContent = 'Sem palavras ainda...'
        article.appendChild(h3);
        main.appendChild(article);
    }

    return main
}

function criarHeader() {
    //Header que tera o botao e o span com o icon 
    const header = document.createElement('header');
    header.setAttribute('class', "menu-bar");

    //Button que tera o icon e o listener no click
    const button = document.createElement('button');
    button.setAttribute('class', 'icone');
    button.setAttribute('id', 'home');

    //Span que tera o icone do home
    const spanHome = document.createElement('span');
    spanHome.setAttribute('class', 'material-symbols-outlined');
    spanHome.textContent = 'home';

    button.appendChild(spanHome);
    header.appendChild(button);

    return header;
}

function criarBuscar(deckAtual) {
    //Caixa principal para os elementos
    const divElemement = document.createElement('div');
    divElemement.setAttribute('class', 'main-buscar');

    //Header que contem o nome do deck em uso
    const header = document.createElement('header');
    header.setAttribute('class', 'titulo-buscar');

    const h1 = document.createElement('h1');
    h1.textContent = deckAtual.nome

    header.appendChild(h1);

    //Section com o input da busca e informarcoes do deck
    const section = document.createElement('section');
    section.setAttribute('class', 'toolbar');
    section.setAttribute('id', 'toolbar');

    const input = document.createElement('input');
    input.setAttribute('type', 'search');
    input.setAttribute('placeholder', 'Busca...');
    input.setAttribute('id', 'q');
    input.setAttribute('autocomplete', 'off');

    const caixaInfo = document.createElement('div');
    caixaInfo.setAttribute('class', 'box-infos');

    const badgeTotal = document.createElement('small');
    badgeTotal.setAttribute('class', 'badge');
    badgeTotal.textContent = `Total: ${deckAtual.cards.length}`

    section.append(input, caixaInfo, badgeTotal);
    divElemement.append(header, section);

    return divElemement;
}

function criarModal(objPalavra, mode) {
    //Background do modal (janelaPai)
    const backgroundModal = document.createElement('div');
    backgroundModal.setAttribute('id', 'janela-pai');
    backgroundModal.setAttribute('class', 'janela-pai-popup');

    //Todo o conteudo do modal (janelaInfo)
    const modal = document.createElement('div');
    modal.setAttribute('class', 'janela-info');
    modal.setAttribute('id', 'info');

    //Caixa que contem o botao para fechar o modal (botSair)
    const caixaBotSair = document.createElement('div');
    caixaBotSair.setAttribute('class', 'caixa-bot-sair')
    
    const botSair = document.createElement('button');
    botSair.setAttribute('class', 'botSair');
    botSair.setAttribute('id', 'sair');
    botSair.innerHTML = `&#x2715`;

    caixaBotSair.appendChild(botSair);

    //Caixa que contem o conteudo principal do card (janelaConteudo > criarCard)
    const conteudoModal = document.createElement('div');
    conteudoModal.setAttribute('class', 'janela-pop');
    conteudoModal.setAttribute('id', 'card');

    const card = criarCard(objPalavra)

    conteudoModal.appendChild(card);

    modal.append(caixaBotSair, conteudoModal);

    if(mode === "edit") {
        //criar opcoes edit
        const botSalvar = criarBotSalvar();
        const botCancelar = criarBotCancelar();

        const caixaOpcoesEditar = document.createElement('div');
        caixaOpcoesEditar.setAttribute('class', 'caixa-op');
        caixaOpcoesEditar.setAttribute('id', 'opcoes-edit');
        caixaOpcoesEditar.appendChild(botSalvar);
        caixaOpcoesEditar.appendChild(botCancelar);

         //Criar caixa de mensagem explicando como editar
        const caixaMsg = document.createElement('div');
        caixaMsg.setAttribute('class', 'caixa-msg')
        caixaMsg.textContent = "Clique no campo desejado para editar."

        modal.append(caixaMsg, caixaOpcoesEditar);
    } else {
        //Caixa que contem as opcoes para o card no modo view (caixaOpcoes)
        const botEditar = criarBotEditar();
        const botDeletar = criarBotDelete();
    
        const caixaOpcoes = document.createElement('div');
        caixaOpcoes.setAttribute('class', 'caixa-op');
        caixaOpcoes.setAttribute('id', 'opcoes');
        caixaOpcoes.append(botEditar, botDeletar);

        modal.append(caixaOpcoes);
    }
    backgroundModal.appendChild(modal);

    return backgroundModal;
}

export function renderBuscarPalavra() {

    const deck = encontraDeck(stateNavegacao.idDeck)

    console.log(`Estado do cardPopUp => ${stateNavegacao.cardPanel.isOpen}`);
    console.log(`Id que está no estado do popup => ${stateNavegacao.cardPanel.idCardAtivo}`)

    let root = document.getElementById('root');

    root.innerHTML = '';

    console.log(`Tamanho do array de cards => ${deck.cards.length}`);

    const header = criarHeader();
    const buscaMenu = criarBuscar(deck);
    const cardsElements = criarCards(deck.cards)
    
    root.innerHTML = '';
    
    root.append(header, buscaMenu, cardsElements);

    if(stateNavegacao.cardPanel.isOpen) {
        const cardAtivo = encontrarCard(stateNavegacao.cardPanel.idCardAtivo, deck.cards)

        const modal = criarModal(cardAtivo, stateNavegacao.cardPanel.mode);
        root.append(modal);
        
        if(stateNavegacao.cardPanel.mode === 'view') {
            
            console.log('view')
            listenerRemoverCard(stateNavegacao.idDeck)
            
        }   
        else if(stateNavegacao.cardPanel.mode === 'edit') {
            console.log('edit')
            listenersOpcoesEdit();
            listenerCardEdit();
    
        }
        fecharCard();
        document.body.classList.add('travar-rolamento');
    } else {
        const modalElement = root.querySelector('#janela-pai');
        if(modalElement) modalElement.remove();
        document.body.classList.remove('travar-rolamento');
    }

    if(deck.cards.length > 0) listenersBuscarPalavra();
    voltarHome()
}
