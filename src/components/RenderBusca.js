// import { getCurrentDate } from "../helpers/HandlerDailyWords.js";
import { debounce } from "../helpers/Debounce.js";
import { listenersBuscarPalavra, listenerRemoverCard, listenersOpcoesEdit, voltarHome, fecharCard} from "../state/Listeners.js";
import {stateNavegacao, setStateNavegacao, arrayDecks, valorSerEditado, setValorSerEditado, scrollyConteudo, setScrollyConteudo } from "../state/State.js";

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

function criarInput(valor, style) {
    const inputEdit = document.createElement('input');
    inputEdit.setAttribute('type', 'text');
    inputEdit.setAttribute('id', 'valor-edit');
    inputEdit.setAttribute('class', `input-edit ${valorSerEditado.dataField === "exemplo" ? 'campo-exemplo' : ''} ${style}` );
    inputEdit.setAttribute('value', valor);
    inputEdit.style.borderColor = valorSerEditado.color;
    //if(!valorSerEditado.dataField === "exemplo") 
    inputEdit.setAttribute('size', valor.length);
    //campo-exemplo
    return inputEdit;
}

function criarTextArea(valor, style) {
    const textAreaEdit = document.createElement('textarea');
    textAreaEdit.setAttribute('id', 'valor-edit');
    textAreaEdit.setAttribute('class', `textarea-edit ${valorSerEditado.dataField === "exemplo" ? "campo-exemplo" : "campo-sig"} ${style}`);
    if(valor.length > 35) {
        const valorRows = valor.length / 35
        const valorFinal = parseFloat(valorRows) ? parseInt(valorRows)+1 : parseInt(valorRows);
        console.log(`Valor bruto de linhas ${valorRows}`);
        console.log(`Valor liquido de linhas ${valorFinal}`);

        textAreaEdit.setAttribute('rows', valorFinal);
    }
    textAreaEdit.value = valor;

    return textAreaEdit;
}

function criarInputEdit(valor, style) {
    if(valorSerEditado.dataField === "def-texto") {
        if(valorSerEditado.height > 20) {
            return criarTextArea(valor, style);
        } 
        return criarInput(valor, style);
    } else if(valorSerEditado.dataField === "exemplo") {
        console.log(`Altura do campo do exemplo clicado => ${valorSerEditado.height}`);
        //const quantEspacoBranco = valor.split(" ").length - 1;
        if(valorSerEditado.height > 18) {
            return criarTextArea(valor, style);
        }
        return criarInput(valor, style);
    } else {
        return criarInput(valor, style);
    }
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

function criarExemplos(exemplos, indexSignificado) {
    //Criando caixa para inserir os exemplos
    const fragElement = document.createDocumentFragment();

    exemplos.forEach((exemplo, index) => {
        const exemploElement = document.createElement('span');
        exemploElement.setAttribute('class', 'exemplo');
        exemploElement.setAttribute('data-field', 'exemplo');
        exemploElement.setAttribute('data-exemplo-index', index);
        exemploElement.textContent = exemplo;

        let exemploOuInput

        if(exemploElement.dataset.field === valorSerEditado.dataField && indexSignificado === Number(valorSerEditado.indexSignificado) && index === Number(valorSerEditado.indexExemplo)) {
            exemploOuInput = criarInputEdit(exemploElement.textContent, `${exemploElement.className} input-edit-sem-zoom-exemplo`);
        } else {
            exemploOuInput = exemploElement;
        }

        fragElement.appendChild(exemploOuInput);
    });

    return fragElement;
}

function criarTexSignificadoOuInput(sig, index) {
    const textSignificado = document.createElement('span');
    textSignificado.setAttribute('data-field', 'def-texto');
    textSignificado.setAttribute('class', 'def');
    textSignificado.textContent = sig.definicao;

    console.log(`Length da definicao => ${sig.definicao.length}`);

    if(textSignificado.dataset.field === valorSerEditado.dataField && index === Number(valorSerEditado.indexSignificado)) {
        console.log("Entrou para criar o input do significado");
        return criarInputEdit(textSignificado.textContent, textSignificado.className);
    } else {
        return textSignificado;
    }
}

function criarTipoDefinicaoOuInput(sig, index) {
    const tipoDefNormal = document.createElement('span');
    tipoDefNormal.setAttribute('class', `context-tag ${sig.tipoDefinicao}`);
    tipoDefNormal.setAttribute('data-field', 'tipo-def');
    tipoDefNormal.textContent = sig.tipoDefinicao;

    if(tipoDefNormal.dataset.field === valorSerEditado.dataField && index === Number(valorSerEditado.indexSignificado)) {
        console.log("Entrou para criar o input do tipo definição");
        return criarInput(tipoDefNormal.textContent, `${tipoDefNormal.className} input-edit-sem-zoom-tag-brev-desc-sig`);
    } else {
        return tipoDefNormal;
    }
}

function criarSignificados(significados) {
    const fragElement = document.createDocumentFragment();

    significados.forEach((sig, index) => {
        const caixaSig = document.createElement('div');
        caixaSig.setAttribute('class', 'significado');
        caixaSig.setAttribute('data-field', 'significado');
        caixaSig.setAttribute('data-significado-index', index);

        //Criando caixa da definicao da palavra e informacoes sobre
        const caixaDef = document.createElement('div');
        caixaDef.setAttribute('class', 'definicao');

        const numeroDefinicao = document.createElement('span');
        numeroDefinicao.setAttribute('class', 'def-numero');
        numeroDefinicao.textContent = index+1;

        const contDefinicao = document.createElement('span');
        
        //text significado ou input
        const textDefinicaoOuInput = criarTexSignificadoOuInput(sig, index);

        //tipo definicao ou input
        const tipoDefinicaoOuInput = criarTipoDefinicaoOuInput(sig, index);

        contDefinicao.append(textDefinicaoOuInput, tipoDefinicaoOuInput);

        caixaDef.append(numeroDefinicao, contDefinicao);

        //Criando caixa dos exemplos
        const caixaExemplos = document.createElement('div');
        caixaExemplos.setAttribute('class', 'exemplos');

        const exemplos = criarExemplos(sig.exemplos, index);

        caixaExemplos.appendChild(exemplos);

        caixaSig.append(caixaDef, caixaExemplos);

        fragElement.appendChild(caixaSig);
    });

    return fragElement;
}

function criarBrevDescPalavra(objPalavra) {
    //Criando descricao breve da palavra
    const caixaBrevDesc = document.createElement('div');
    caixaBrevDesc.setAttribute('class', 'brev-desc');
    caixaBrevDesc.setAttribute('data-field', 'brevDesc');
    let hasConteudo = false
    if(objPalavra.tipo || objPalavra.brevDesc) {
        
        if(objPalavra.tipo && objPalavra.brevDesc) {
            const tipo = document.createElement('span');
            tipo.setAttribute('class', 'type');
            tipo.setAttribute('data-field', 'brevDesc-tipo')
            tipo.textContent = objPalavra.tipo;

            const tipoBrevDesc = valorSerEditado.dataField === tipo.dataset.field ? criarInputEdit(tipo.textContent, tipo.className) : tipo;

            const brevDesc = document.createElement('span');
            brevDesc.setAttribute('class', 'sinonimo');
            brevDesc.setAttribute('data-field', 'brevDesc-sinonimo')
            brevDesc.textContent = objPalavra.brevDesc;

            const sinonimoBrevDesc = valorSerEditado.dataField === brevDesc.dataset.field ? criarInputEdit(brevDesc.textContent, `${brevDesc.className} input-edit-sem-zoom-tag-sinonimo`) : brevDesc;

            caixaBrevDesc.append(tipoBrevDesc, sinonimoBrevDesc)
        }
        else if(objPalavra.tipo) {
            const tipo = document.createElement('span');
            tipo.setAttribute('class', 'type');
            tipo.setAttribute('data-field', 'brevDesc-tipo')
            tipo.textContent = objPalavra.tipo;

            const tipoBrevDesc = valorSerEditado.dataField === tipo.dataset.field ? criarInputEdit(tipo.textContent, tipo.className) : tipo;

            caixaBrevDesc.appendChild(tipoBrevDesc)
        } else {
            const brevDesc = document.createElement('span');
            brevDesc.setAttribute('class', 'sinonimo');
            brevDesc.setAttribute('data-field', 'brevDesc-sinonimo')
            brevDesc.textContent = objPalavra.brevDesc;

            const sinonimoBrevDesc = valorSerEditado.dataField === brevDesc.dataset.field ? criarInputEdit(brevDesc.textContent, `${brevDesc.className} input-edit-sem-zoom-tag-sinonimo`) : brevDesc;

            caixaBrevDesc.appendChild(sinonimoBrevDesc);
        }
        hasConteudo = true;
    }

    return hasConteudo ? caixaBrevDesc : null;
}

//Titulo card
function criarTituloCard(objPalavra) {
    const h2 = document.createElement('h2');
    h2.setAttribute('class', 'title-card')
    h2.setAttribute('data-field', 'nome');
    h2.textContent = objPalavra.nome;

    return h2
}

function criarCard(objPalavra) {


    const conteudoFrag = document.createDocumentFragment();

    //Criando titulo card
    const h2 = criarTituloCard(objPalavra);
    const tituloCard = h2.dataset.field === valorSerEditado.dataField ? criarInputEdit(h2.textContent, h2.className) : h2;

    //Verificar o nome do campo da variavel global com o data-field do elemento.
    const caixaBrevDesc = criarBrevDescPalavra(objPalavra);

    //Criado separador visual
    const separador = document.createElement('hr');
    
    //Criando caixa para a definicao e exemplos
    const caixaDefinicao = document.createElement('div');
    caixaDefinicao.setAttribute('class', 'def-block');
    caixaDefinicao.setAttribute('data-field', 'significados');

    const significados = criarSignificados(objPalavra.significados);

    caixaDefinicao.appendChild(significados);

    //Criando caixa para a pronuncia
    const caixaPronuncia = document.createElement('div');
    caixaPronuncia.setAttribute('class', 'pronuncia');

    const labelPronuncia = document.createElement('span');
    labelPronuncia.setAttribute('class', 'label-som');
    labelPronuncia.textContent = 'pronúncia'

    const campoFonetica = document.createElement('span');
    campoFonetica.setAttribute('class', 'fonetica');
    campoFonetica.setAttribute('data-field', 'fonetica');
    campoFonetica.textContent = `/ ${objPalavra.pronuncia} /`;

    const pronuncia = campoFonetica.dataset.field === valorSerEditado.dataField ? criarInputEdit(campoFonetica.textContent, campoFonetica.className) : campoFonetica;

    caixaPronuncia.append(labelPronuncia, pronuncia);

    conteudoFrag.append(tituloCard);
    if(caixaBrevDesc) conteudoFrag.append(caixaBrevDesc);
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
    input.setAttribute('class', 'input-busca');
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

function criarModal(objPalavra, mode, isEditando) {
    //Background do modal (janelaPai)
    const backgroundModal = document.createElement('div');
    backgroundModal.setAttribute('id', 'janela-pai');
    backgroundModal.setAttribute('class', 'janela-pai-popup alinhar-centro');

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
        if(isEditando) caixaOpcoesEditar.appendChild(botSalvar);
        caixaOpcoesEditar.append(botCancelar);

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

    pegarValorScroll();

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

        const modal = criarModal(cardAtivo, stateNavegacao.cardPanel.mode, stateNavegacao.cardPanel.isEditando);
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
        const contCard = document.querySelector('.def-block');
        contCard.scrollTop = scrollyConteudo;
        //document.body.classList.add('travar-rolamento');
        travarScrollBody();
        travarRoot();
    } else {
        const modalElement = root.querySelector('#janela-pai');
        if(modalElement) modalElement.remove();
        destravarScrollBody();
        destravarRoot();
        //document.body.classList.remove('travar-rolamento');
    }

    if(deck.cards.length > 0) listenersBuscarPalavra();
    voltarHome()
}

// criar um objeto temporario para guardar o elemento clicado para usar o input
function listenerCardEdit() {
    document.getElementById('card').addEventListener('click', (e) => {
        const temAlgumData = Object.keys(e.target.dataset).length > 0;
        
        if(!e.target || !temAlgumData) return;

        console.log(`Nome campo clicado => ${e.target.dataset.field}`)

        handlerDataSets(e.target.dataset, e.target)

        setStateNavegacao({cardPanel: {isOpen: true, idCardAtivo: stateNavegacao.cardPanel.idCardAtivo, mode: stateNavegacao.cardPanel.mode, isEditando: true}});

        setScrollyConteudo();

        renderBuscarPalavra();
    });
}

function handlerDataSets({field, significadoIndex, exemploIndex}, alvo) {
    
    //Separa quando for do tipo (def-texto), (tipo-def) e (exemplo)
    
    if(field === "def-texto" || field === "tipo-def" || field === "exemplo") {
        handlerCamposDentroDeArrays(field, alvo);
    } else {
        const styleElement = getComputedStyle(alvo);
        switch(field) {
            case "nome":
                console.log(`Clicou no nome | valor aqui => ${alvo.textContent}`);
                setValorSerEditado({dataField: "nome", color: styleElement.color});
                break;
            case "brevDesc-tipo":
                console.log(`Clicou no tipo do brevDesc | valor aqui => ${alvo.textContent}`);
                console.log(`Clicou no tipo do brevDesc | font size => ${styleElement.fontSize}`);
                setValorSerEditado({dataField: "brevDesc-tipo", color: styleElement.color});
                break;
            case "brevDesc-sinonimo":
                console.log(`Clicou no sinonimo do brevDesc | valor aqui => ${alvo.textContent}`);
                console.log(`Clicou no tipo do sinonimo | font size => ${styleElement.fontSize}`);
                setValorSerEditado({dataField: "brevDesc-sinonimo", color: styleElement.color});
                break;
            case "fonetica":
                console.log(`Clicou na pronuncia | valor aqui => ${alvo.textContent}`);
                console.log(`Clicou na fonetica | font size => ${styleElement.fontSize}`);
                setValorSerEditado({dataField: "fonetica", color: styleElement.color});
                break;
            default:
                console.log("erro no switch");
                break;
        }
    }
}

function handlerCamposDentroDeArrays(field, alvo) {
    const blocoSignificado = alvo.closest('[data-significado-index]');
    const styleElement = getComputedStyle(alvo);
    if(field === "def-texto" || field === "tipo-def") {
        console.log(`Clicou no ${alvo.dataset.field} do bloco ${blocoSignificado.dataset.significadoIndex} | valor aqui => ${alvo.textContent}`);
        console.log(`Altura => ${styleElement.height}`);
        //alvo.offsetHeig
        setValorSerEditado({dataField: alvo.dataset.field, color: styleElement.color, indexSignificado: blocoSignificado.dataset.significadoIndex, height: alvo.offsetHeight});
    } else {
        console.log(`Clicou no ${alvo.dataset.field} de numero ${alvo.dataset.exemploIndex} do bloco ${blocoSignificado.dataset.significadoIndex} | valor aqui => ${alvo.textContent}`);
        console.log(`Altura do exemplo => ${styleElement.height}`);
        const alturaFormatada = parseFloat(styleElement.height);
        setValorSerEditado({dataField: alvo.dataset.field, color: styleElement.color, indexSignificado: blocoSignificado.dataset.significadoIndex, indexExemplo: alvo.dataset.exemploIndex, height: alturaFormatada});
    }
}

// Funcao para travar rolamento body
function travarScrollBody() {
    
    
  const scrollY = window.scrollY || document.documentElement.scrollTop;

  document.body.dataset.scrollY = scrollY; // guarda pra depois
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollY}px`;
  document.body.style.left = '0';
  document.body.style.right = '0';
  document.body.style.width = '100%';

}

// Funcao para destravar o rolamento body
function destravarScrollBody() {
    
  const scrollY = parseInt(document.body.dataset.scrollY || '0', 10);

  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';
  document.body.style.width = '';
  delete document.body.dataset.scrollY;

  window.scrollTo(0, scrollY);
}

function travarRoot() {
    const root = document.getElementById('root');
    const scrollY = root.scrollY || root.scrollTop;

    root.dataset.scrollY = scrollY;
    root.style.position = 'fixed';
    root.style.top = `-${scrollY}px`;
    root.style.left = '0';
    root.style.right = '0';
    root.style.width = '100%';
}

function destravarRoot() {
    const root = document.getElementById('root');
    const scrollY = parseInt(root.dataset.scrollY || '0', 10);

    root.style.position = '';
    root.style.top = '';
    root.style.left = '';
    root.style.right = '';
    root.style.width = '';
    delete root.dataset.scrollY;

    root.scrollTo(0, scrollY);
}

function pegarValorScroll() {
    const valorEdit = document.getElementById('valor-edit');
    const backgroundModal = document.getElementById('janela-pai');

    if(valorEdit) {

        valorEdit.addEventListener('focus', () => {
            if(backgroundModal.classList.contains('alinhar-centro'))
                backgroundModal.classList.remove('alinhar-centro');
            backgroundModal.classList.add('alinhar-top');
        });

        valorEdit.addEventListener('blur', () => {
            if(backgroundModal.classList.contains('alinhar-top'))
                backgroundModal.classList.remove('alinhar-top');
            backgroundModal.classList.add('alinhar-centro');
        })
    }
}