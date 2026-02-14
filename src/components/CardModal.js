import { Modal } from "./Modal.js";

export function CardModal(objPalavra, type) {

    //Todo o conteudo do modal (janelaInfo)
    const modal = document.createElement('div');
    modal.setAttribute('class', 'janela-info');
    modal.setAttribute('id', 'info');
    modal.setAttribute('data-id', objPalavra.id);

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
    
    if(type === 'view') {
        //Caixa que contem as opcoes para o card no modo view (caixaOpcoes)
        const botEditar = criarBotEditar();
        const botDeletar = criarBotDelete();
    
        const caixaOpcoes = document.createElement('div');
        caixaOpcoes.setAttribute('class', 'caixa-op');
        caixaOpcoes.setAttribute('id', 'opcoes');
        caixaOpcoes.append(botEditar, botDeletar);
    
        modal.append(caixaOpcoes);
    }
    const backgroundModal = Modal();
    backgroundModal.appendChild(modal);

    return backgroundModal;
}

function criarCard(objPalavra) {
    const conteudoFrag = document.createDocumentFragment();

    //Tirar input
    //Criando titulo card
    const tituloCard = criarTituloCard(objPalavra);

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

    caixaPronuncia.append(labelPronuncia, campoFonetica);

    conteudoFrag.append(tituloCard);
    if(caixaBrevDesc) conteudoFrag.append(caixaBrevDesc);
    conteudoFrag.append(separador, caixaDefinicao, caixaPronuncia);

    return conteudoFrag;
}

//Titulo card
function criarTituloCard(objPalavra) {
    const h2 = document.createElement('h2');
    h2.setAttribute('class', 'title-card')
    h2.setAttribute('data-field', 'nome');
    h2.textContent = objPalavra.nome;

    return h2
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

            const sinonimo = document.createElement('span');
            sinonimo.setAttribute('class', 'sinonimo');
            sinonimo.setAttribute('data-field', 'brevDesc-sinonimo')
            sinonimo.textContent = objPalavra.brevDesc;

            caixaBrevDesc.append(tipo, sinonimo);
        }
        else if(objPalavra.tipo) {
            const tipo = document.createElement('span');
            tipo.setAttribute('class', 'type');
            tipo.setAttribute('data-field', 'brevDesc-tipo')
            tipo.textContent = objPalavra.tipo;

            caixaBrevDesc.appendChild(tipo)
        } else {
            const sinonimo = document.createElement('span');
            sinonimo.setAttribute('class', 'sinonimo');
            sinonimo.setAttribute('data-field', 'brevDesc-sinonimo')
            sinonimo.textContent = objPalavra.brevDesc;

            caixaBrevDesc.appendChild(sinonimo);
        }
        hasConteudo = true;
    }

    return hasConteudo ? caixaBrevDesc : null;
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
        const textDefinicaoOuInput = criarTexSignificado(sig);

        //tipo definicao ou input
        const tipoDefinicaoOuInput = criarTipoDefinicao(sig);

        contDefinicao.append(textDefinicaoOuInput, tipoDefinicaoOuInput);

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

function criarTexSignificado(sig) {
    const textSignificado = document.createElement('span');
    textSignificado.setAttribute('data-field', 'def-texto');
    textSignificado.setAttribute('class', 'def');
    textSignificado.textContent = sig.definicao;

    console.log(`Length da definicao => ${sig.definicao.length}`);

    return textSignificado
}

function criarTipoDefinicao(sig) {
    const tipoDefNormal = document.createElement('span');
    tipoDefNormal.setAttribute('class', `context-tag ${sig.tipoDefinicao}`);
    tipoDefNormal.setAttribute('data-field', 'tipo-def');
    tipoDefNormal.textContent = sig.tipoDefinicao;

    return tipoDefNormal;
}

function criarExemplos(exemplos) {
    //Criando caixa para inserir os exemplos
    const fragElement = document.createDocumentFragment();

    exemplos.forEach((exemplo, index) => {
        const exemploElement = document.createElement('span');
        exemploElement.setAttribute('class', 'exemplo');
        exemploElement.setAttribute('data-field', 'exemplo');
        exemploElement.setAttribute('data-exemplo-index', index);
        exemploElement.textContent = exemplo.exemplo;

        fragElement.appendChild(exemploElement);
    });

    return fragElement;
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