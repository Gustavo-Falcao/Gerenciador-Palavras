import { render } from "../../main.js";
import { debounce } from "../helpers/Debounce.js";
import { gerarId } from "../helpers/GerarId.js";
import { listenerAddPalavra, voltarHome } from "../state/Listeners.js";
import { stateNavegacao, arrayDecks,  salvarScrollySignificados, salvarDecksLocalStorage, isCardPreviewOpen, setIsCardPreviewOpen, setScrollySignificados, setArrayDecks, setStateNavegacao, setUsarScrollYBodyPersonalizado, isModalAtencaoEdicaoOpen, setIsModalAtencaoEdicaoOpen} from "../state/State.js";
import { AvisoEdicaoModal } from "./AvisoEdicaoModal.js";
import { CardModal } from "./CardModal.js";
import { destravarScrollBodySemAlterarValorScroll } from "./RenderBusca.js";
import { renderHome } from "./RenderHome.js";
// Renderização da página de add palavra

function encontraDeck(id) {
    const deckFind = arrayDecks.find((deck) => deck.id === id)
    return deckFind
}

//Criacao da div e do botao home 
function criarBotHome() {
  const header = document.createElement('div');
  header.setAttribute('class', 'home-icone');

  const button = document.createElement('button');
  button.setAttribute('class', 'icone');
  button.setAttribute('id', 'home');

  const span = document.createElement('span');
  span.setAttribute('class', 'material-symbols-outlined');
  span.textContent = "home";

  button.appendChild(span);
  header.appendChild(button);

  return header;
}

//Criacao do titulo da pagina
function criarTitulo() {
  const h1 = document.createElement('h1');
  h1.setAttribute('class', 'titulo-add');
  h1.textContent = stateNavegacao.cardPanel.mode === 'criar' ? 'Criar card' : 'Editar card';

  return h1;
}

//Label visualmente grande para indicar o deck em que o card está sendo criado
function criarLabelCard(nomeCard) {
  const div = document.createElement('div');
  div.setAttribute('class', 'label-card');
  div.textContent = `Deck: ${nomeCard}`;

  return div;
}

//Campo com a section que tem todo o conteudo de criacao
function criarMain(cardBaseEmMemoria) {
  const main = document.createElement('main');
  main.setAttribute('class', 'page-body');
  main.setAttribute('id', 'main-content');

  //criar editor card
  // append na main

  const editorCard = criarEditorCard(cardBaseEmMemoria);

  const msgSucesso = document.createElement('div');
  msgSucesso.setAttribute('id', 'msg-success');
  msgSucesso.textContent = '✅ Card criado com sucesso!';

  main.append(editorCard, msgSucesso);

  return main;
}

//Campo com todo o conteudo de criacao
function criarEditorCard(cardBaseEmMemoria){
  const section = document.createElement('section');
  section.setAttribute('class', 'editor-card');

  //Primeiro editor section
  const editorSection = criarPrimeiroEditorSection(cardBaseEmMemoria);

  //Divisor
  const divisor = criarDivisor();

  //Segundo editor section
  const segundoEditorSection = criarSegundoEditorSection(cardBaseEmMemoria);

  //Botao pre-visualizacao card
  const buttonPreVisualizacaoCard = criarBotaoPreVisualizacaoCard();

  section.append(editorSection, divisor, segundoEditorSection, buttonPreVisualizacaoCard);

  return section;
}

//Primeira parte do editor antes da linha divisoria
function criarPrimeiroEditorSection(cardBaseEmMemoria) {
  const section = document.createElement('section');
  section.setAttribute('class', 'editor-section');

  //criar campo nome palavra
  //criar chip row
  //criar campo pronuncia

  const campoNomePalavra = criarCampoNomePalavra(cardBaseEmMemoria);
  const chipRow = criarChipRow(cardBaseEmMemoria);
  const campoPronuncia = criarCampoPronuncia(cardBaseEmMemoria);

  section.append(campoNomePalavra, chipRow, campoPronuncia);

  return section;
}
 
//Campo para o nome da palavra
function criarCampoNomePalavra(cardBaseEmMemoria) {
  const label = document.createElement('label');
  label.setAttribute('class', 'field');

  const span = document.createElement('span');
  span.setAttribute('class', 'field-label');
  span.textContent = "palavra";

  const input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('name', 'word');
  input.setAttribute('class', 'word-input');
  cardBaseEmMemoria.nome ? input.value = cardBaseEmMemoria.nome : input.setAttribute('placeholder', 'Ex: Strident')

  label.append(span, input);

  return label;
}

//Div com campos do sinonimo e classe gramatical
function criarChipRow(cardBaseEmMemoria) {
  const chipRow = document.createElement('div');
  chipRow.setAttribute('class', 'chip-row');

  const chipField = document.createElement('div');
  chipField.setAttribute('class', 'chip-field');

  const span = document.createElement('span');
  span.setAttribute('class', 'chip-label');
  span.textContent = "Tipo (opicional)";

  const select = document.createElement('select');
  select.setAttribute('name', 'type');
  select.setAttribute('class', 'chip-input');
  
  // Opitons
  const optionVazia = document.createElement('option');
  optionVazia.setAttribute('value', '');
  optionVazia.textContent = "Selecione...";

  const adjectiveOption = document.createElement('option');
  adjectiveOption.setAttribute('value', 'adjective');
  adjectiveOption.textContent = "adjective";
  
  const nounOption = document.createElement('option');
  nounOption.setAttribute('value', 'noun');
  nounOption.textContent = "noun";
  
  const verbOption = document.createElement('option');
  verbOption.setAttribute('value', 'verb');
  verbOption.textContent = "verb";
  
  const adverbOption = document.createElement('option');
  adverbOption.setAttribute('value', 'adverb');
  adverbOption.textContent = "adverb";

  const slangOption = document.createElement('option');
  slangOption.setAttribute('value', 'slang');
  slangOption.textContent = "slang";

  const optionFormal = document.createElement('option');
  optionFormal.setAttribute('value', 'formal');
  optionFormal.textContent = "formal";
  
  const optionInformal = document.createElement('option');
  optionInformal.setAttribute('value', 'informal');
  optionInformal.textContent = "informal";

  select.append(optionVazia, adjectiveOption, nounOption, verbOption, adverbOption, slangOption, optionFormal, optionInformal);
  
  if(cardBaseEmMemoria.tipo) {
    const values = ["adjective", "noun", "verb", "adverb", "slang", "formal", "informal"];
    select.selectedIndex = values.indexOf(cardBaseEmMemoria.tipo)+1;
  }
  
  //document.getElementById('meuSelect').value = 'valor2';
  //document.getElementById('meuSelect').selectedIndex = 1;

  chipField.append(span, select);

  // chip field sinonimo
  const chipFieldSinonimo = document.createElement('div');
  chipFieldSinonimo.setAttribute('class', 'chip-field');

  const spanSinonimo = document.createElement('span');
  spanSinonimo.setAttribute('class', 'chip-label');
  spanSinonimo.textContent = "Sinônimo (opcional)";

  const inputSinonimo = document.createElement('input');
  inputSinonimo.setAttribute('type', 'text');
  inputSinonimo.setAttribute('name', 'sinonimo');
  inputSinonimo.setAttribute('class', 'chip-input');
  
  cardBaseEmMemoria.brevDesc ? inputSinonimo.value = cardBaseEmMemoria.brevDesc : inputSinonimo.setAttribute('placeholder', 'Ex: loud');

  chipFieldSinonimo.append(spanSinonimo, inputSinonimo);

  //Colocando elementos no chipRow
  chipRow.append(chipField, chipFieldSinonimo);

  return chipRow;
}

//Campo pronuncia
function criarCampoPronuncia(cardBaseEmMemoria) {
  const label = document.createElement('label');
  label.setAttribute('class', 'field');

  const span = document.createElement('span');
  span.setAttribute('class', 'field-label');
  span.textContent = "Pronúncia";

  const input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('name', 'pronuncia');
  input.setAttribute('class', 'pron-input');
  
  cardBaseEmMemoria.pronuncia ? input.value = cardBaseEmMemoria.pronuncia : input.setAttribute('placeholder', '/ STRAI-dãnt /');
    
  label.append(span, input);

  return label;
}

//Linha divisoria
function criarDivisor() {
  const divisor = document.createElement('hr');
  divisor.setAttribute('class', 'section-divider');
  
  return divisor;
}

//Segunda parte da criacao depois do separador
function criarSegundoEditorSection(cardBaseEmMemoria) {
  const section = document.createElement('section');
  section.setAttribute('class', 'editor-section');

  //Section header
  const headerSection = criarSectionHeaderSegundoEditorSection();

  //Campo significados
  const significados = criarCampoSignificados(cardBaseEmMemoria);

  section.append(headerSection, significados);

  return section;
}

//Header para campo dos significados + exemplos
function criarSectionHeaderSegundoEditorSection() {
  const header = document.createElement('div');
  header.setAttribute('class', 'section-header');

  const h2 = document.createElement('h2');
  h2.setAttribute('class', 'section-title');
  h2.textContent = "Significados";

  const button = document.createElement('button');
  button.setAttribute('type', 'button');
  button.setAttribute('class', 'btn-secundario-add');
  button.setAttribute('data-action', 'add-sense');
  button.setAttribute('id', 'add-significado');
  button.textContent = "+ Adicionar significado";

  header.append(h2, button);

  return header;
}

//Campo para significados
function criarCampoSignificados(cardBaseEmMemoria) {
  const significados = document.createElement('div');
  significados.setAttribute('class', 'senses-container');
  significados.setAttribute('id', 'senses-container');
    
  if(cardBaseEmMemoria.significados.length > 0) {
    cardBaseEmMemoria.significados.forEach((significado, index) => {
      
      const significadoElement = criarSignificado(significado, index);
      significados.appendChild(significadoElement);
    });

  } else {
    const msgSemSignificados = criarMsgSemSignificados();
    significados.append(msgSemSignificados);
  }

  return significados
}

function criarMsgSemSignificados() {
  const msgSemSignificados = document.createElement('span');
  msgSemSignificados.setAttribute('class', 'msg-sem-significado');
  msgSemSignificados.textContent = "Nenhum significado adicionado...";

  return msgSemSignificados;
}

//Criar Significado
function criarSignificado(significadoAtual, index) {
  //Elemento contendo todos os elementos do significado
  const article = document.createElement('article');
  article.setAttribute('class', 'sense-card');
  article.setAttribute('data-sense-index', index);
  article.setAttribute('data-id', significadoAtual.id);

  //header significado
  const headerSignificado = criarHeaderSignificado(index);

  //Campo definicao
  const definicaoSignificado = criarCampoDefinicaoSignificado(significadoAtual);

  //Campo contexto
  const contextoSignificado = criarCampoContexto(significadoAtual);

  //Campo exemplos
  const exemplos = criarCampoExemplos(significadoAtual.exemplos);

  article.append(headerSignificado, definicaoSignificado, contextoSignificado, exemplos);

  return article;
}

//Criar header significado
function criarHeaderSignificado(index) {
  const header = document.createElement('header');
  header.setAttribute('class', 'sense-header');

  //Campo label index significado
  const campoLabelNumeroSignificado = document.createElement('div');
  campoLabelNumeroSignificado.setAttribute('class', 'sense-id');

  const numeroSignificado = document.createElement('span');
  numeroSignificado.setAttribute('class', 'sense-number');
  numeroSignificado.textContent = index+1;

  const labelNumeroSignificado = document.createElement('span');
  labelNumeroSignificado.setAttribute('class', 'sense-label');
  labelNumeroSignificado.textContent = `Significado ${index+1}`;

  campoLabelNumeroSignificado.append(numeroSignificado, labelNumeroSignificado);

  //Botao remover significado
  const buttonRemoveSignificado = document.createElement('button');
  buttonRemoveSignificado.setAttribute('class', 'btn-icon-add danger');
  buttonRemoveSignificado.setAttribute('type', 'button');
  buttonRemoveSignificado.setAttribute('data-action', 'remove-sense');
  buttonRemoveSignificado.setAttribute('aria-label', 'Remover significado');
  buttonRemoveSignificado.textContent = "✕";

  header.append(campoLabelNumeroSignificado, buttonRemoveSignificado);

  return header;
}

//Criar campo definicao significado
function criarCampoDefinicaoSignificado(significadoAtual) {
  const label = document.createElement('label');
  label.setAttribute('class', 'field');

  const span = document.createElement('span');
  span.setAttribute('class', 'field-label');
  span.textContent = "Definição";

  const textArea = document.createElement('textarea');
  textArea.setAttribute('name', 'definicao');
  textArea.setAttribute('class', 'def-textarea');
  textArea.setAttribute('rows', '3');
  
  significadoAtual.definicao ? textArea.value = significadoAtual.definicao : textArea.setAttribute('placeholder', 'It means loud, harsh and unpleasant to listen to.');

  label.append(span, textArea);

  return label;
}

//Criar campo contexto
function criarCampoContexto(significadoAtual) {
  const label = document.createElement('label');
  label.setAttribute('class', 'field');

  const span = document.createElement('span');
  span.setAttribute('class', 'field-label');
  span.textContent = "Contexto";

  const select = document.createElement('select');
  select.setAttribute('class', 'chip-input');
  select.setAttribute('name', 'tipoDefinicao');

  const optionVazia = document.createElement('option');
  optionVazia.setAttribute('value', '');
  optionVazia.textContent = "Selecione...";

  const optionLiteral = document.createElement('option');
  optionLiteral.setAttribute('value', 'literal');
  optionLiteral.textContent = "literal";

  const optionFigurative = document.createElement('option');
  optionFigurative.setAttribute('value', 'figurative');
  optionFigurative.textContent = "figurative";
  
  const optionFormal = document.createElement('option');
  optionFormal.setAttribute('value', 'formal');
  optionFormal.textContent = "formal";

  const optionInformal = document.createElement('option');
  optionInformal.setAttribute('value', 'informal');
  optionInformal.textContent = "informal";

  const adjectiveOption = document.createElement('option');
  adjectiveOption.setAttribute('value', 'adjective');
  adjectiveOption.textContent = "adjective";
  
  const nounOption = document.createElement('option');
  nounOption.setAttribute('value', 'noun');
  nounOption.textContent = "noun";
  
  const verbOption = document.createElement('option');
  verbOption.setAttribute('value', 'verb');
  verbOption.textContent = "verb";
  
  const adverbOption = document.createElement('option');
  adverbOption.setAttribute('value', 'adverb');
  adverbOption.textContent = "adverb";

  const slangOption = document.createElement('option');
  slangOption.setAttribute('value', 'slang');
  slangOption.textContent = "slang";

  select.append(optionVazia, optionLiteral, optionFigurative, optionFormal, optionInformal, adjectiveOption, nounOption, verbOption, adverbOption, slangOption);
  
  if(significadoAtual.tipoDefinicao) {
    const values = ["literal", "figurative", "formal", "informal", "adjective", "noun", "verb", "adverb", "slang"];
    select.selectedIndex = values.indexOf(significadoAtual.tipoDefinicao)+1;
  }
  label.append(span, select);

  return label;
}

//Criar campo exemplos
function criarCampoExemplos(exemplos) {
  const campoExemplos = document.createElement('div');
  campoExemplos.setAttribute('class', 'examples-block');

  //Header exemplos
  const headerExemplo = document.createElement('div');
  headerExemplo.setAttribute('class', 'examples-header');

  const spanTituloExemplos = document.createElement('span');
  spanTituloExemplos.setAttribute('class', 'examples-title');
  spanTituloExemplos.textContent = "Exemplos";

  const buttonAddExemplo = document.createElement('button');
  buttonAddExemplo.setAttribute('class', 'btn-mini-add');
  buttonAddExemplo.setAttribute('type', 'button');
  buttonAddExemplo.setAttribute('data-action', 'add-example');
  buttonAddExemplo.setAttribute('data-sense-index', '0');
  buttonAddExemplo.textContent = "+ Adicionar exemplo";

  headerExemplo.append(spanTituloExemplos, buttonAddExemplo);

  //Lista de exemplos
  const divListaExemplos = document.createElement('div');
  divListaExemplos.setAttribute('class', 'examples-list');

  if(exemplos && exemplos.length > 0) {

    exemplos.forEach((exemplo) => {
      const campoExemplo = criarExemplo(exemplo);
      divListaExemplos.appendChild(campoExemplo);
    });
  } else {
    const msgSemExemplo = criarMsgSemExemplo();
    divListaExemplos.appendChild(msgSemExemplo);
  }
  
  campoExemplos.append(headerExemplo, divListaExemplos);

  return campoExemplos;
}

function criarMsgSemExemplo() {
  const msgSemExemplo = document.createElement('span');
  msgSemExemplo.setAttribute('class', 'msg-sem-exemplo');
  msgSemExemplo.textContent = "Nenhum exemplo criado ainda...";

  return msgSemExemplo;
}

function criarExemplo(exemplo) {
  const campoExemplo = document.createElement('div');
  campoExemplo.setAttribute('class', 'example-row');
  campoExemplo.setAttribute('data-example-id', exemplo.id);

  const inputExemplo = document.createElement('input');
  inputExemplo.setAttribute('type', 'text');
  inputExemplo.setAttribute('name', 'example');
  inputExemplo.setAttribute('class', 'example-input');
  
  exemplo.exemplo ? inputExemplo.value = exemplo.exemplo : inputExemplo.setAttribute('placeholder', 'The strident sound of the alarm woke everyone up.');
    
  const buttonRemoveExemplo = document.createElement('button');
  buttonRemoveExemplo.setAttribute('type', 'button');
  buttonRemoveExemplo.setAttribute('class', 'btn-icon-add danger');
  buttonRemoveExemplo.setAttribute('data-action', 'remove-example');
  buttonRemoveExemplo.setAttribute('aria-label', 'Remover exemplo');
  buttonRemoveExemplo.textContent = "−";

  campoExemplo.append(inputExemplo, buttonRemoveExemplo);

  return campoExemplo;
}

//Criar botao pre-visualizacao do card
function criarBotaoPreVisualizacaoCard() {
  const section = document.createElement('section');
  section.setAttribute('class', 'editor-section preview-section');

  const button = document.createElement('button');
  button.setAttribute('type', 'button');
  button.setAttribute('class', 'btn-outline-add');
  button.setAttribute('data-action', 'preview');
  button.setAttribute('id', 'preview-card');
  button.textContent = "Pré-visualizar card";

  return button;
}

//Criar botao para criar card
function criarBotaoCriarCard() {

  const button = document.createElement('button');
  button.setAttribute('class', 'btn btn-primary');
  button.setAttribute('id', 'criarCard');
  button.textContent = 'Criar card';

  return button;
}

//Criar botao para salvar mudancas no card
function criarBotaoSalvarEdicaoCard() {

  const button = document.createElement('button');
  button.setAttribute('class', 'btn btn-primary');
  button.setAttribute('id', 'save-changes');
  button.textContent = 'Aplicar mudanças';

  return button;
}

//Criar botao para voltar ao deck
function criarBotaoVoltarDeck() {
  const button = document.createElement('button');
  button.setAttribute('class', 'btn btn-primary');
  button.setAttribute('id', 'voltar-deck');
  button.textContent = 'Voltar ao deck';

  return button;
}

//Criar footer para opcoes
function criarFooterAction() {
  const footerAction = document.createElement('footer');
  footerAction.setAttribute('id', 'action-bar');

  stateNavegacao.cardPanel.mode === 'criar' ? footerAction.appendChild(criarBotaoCriarCard()) : footerAction.append(criarBotaoSalvarEdicaoCard(), criarBotaoVoltarDeck());

  return footerAction;
}

export function renderAddPalavra() {
  //verifica se ja existe um card que nao foi salvo
  verificarAtencaoEdicao();

  const root = document.getElementById('root');
  const deckAtual = encontraDeck(stateNavegacao.idDeck);
  //recebe o objeto cardbase correspondente
  const cardBaseEmMemoria = carregarCardBaseOuSeNaoTiverCria(deckAtual);
  console.log("State navegacao abaixo");
  console.log(stateNavegacao);
  root.innerHTML = '';
  
  //criar bot home
  const botHome = criarBotHome();

  //criar titulo pagina
  const tituloPagina = criarTitulo();
  
  //criar label card
  const labelCard = criarLabelCard(deckAtual.nome);

  //criar main
  const main = criarMain(cardBaseEmMemoria);

  //Criar footer para botao
  const footerAction = criarFooterAction();

  // append tudo
  if(isCardPreviewOpen) {
    const modal = CardModal(cardBaseEmMemoria);
    root.append(botHome, tituloPagina, labelCard, main, footerAction, modal);
    travarScrollBodyComScrollY0();
    fecharCard();
  } 
  else if(isModalAtencaoEdicaoOpen) {
    const modalAviso = AvisoEdicaoModal(cardBaseEmMemoria);
    root.append(botHome, tituloPagina, labelCard, main, footerAction, modalAviso);
    travarScrollBodyComScrollY0();
    handlerActionsAviso(cardBaseEmMemoria);
  } 
  else {
    root.append(botHome, tituloPagina, labelCard, main, footerAction);
    destravarScrollBodySemAlterarValorScroll();
  }

  // listenerAddPalavra();
  adicionarSignificado(deckAtual);
  listenersSignificado(deckAtual);
  voltarHome();
  listenerSalvamentoAutomatico(deckAtual);
  handlerActionBar(deckAtual);
  preVisualizarCard();
}

function handlerActionsAviso(cardBaseEmMemoria) {
  document.getElementById('actions-aviso').addEventListener('click', (e) => {
    if(!e.target) return;

    if(e.target.id === 'voltar-deck') {
      setStateNavegacao({page: 'buscar', cardPanel: {
        ...stateNavegacao.cardPanel, mode: 'view'}});
      setUsarScrollYBodyPersonalizado(true);
      destravarScrollBodySemAlterarValorScroll();
      setIsModalAtencaoEdicaoOpen(false);
      render();
    }
    else if(e.target.id === 'save') {
      //salvar cardbase no deck principal
      const arrayDeckComCardAtualizado = arrayDecks.map((deck) => deck.id === stateNavegacao.idDeck ? {...deck, cards: deck.cards.map((card) => card.id === cardBaseEmMemoria.id ? cardBaseEmMemoria : card)} : deck);

      //atribuir o card com o id ativo para o cardbase
      const cardEncontrado = encontrarCard(encontraDeck(stateNavegacao.idDeck), stateNavegacao.cardPanel.idCardAtivo);

      const arrayDeckComCardBaseAtualizado = arrayDeckComCardAtualizado.map((deck) => deck.id === stateNavegacao.idDeck ? {...deck, cardBase: {...deck.cardBase, editar: cardEncontrado}} : deck);

      salvarDecksLocalStorage(arrayDeckComCardBaseAtualizado);
      setArrayDecks(arrayDeckComCardBaseAtualizado);
      setIsModalAtencaoEdicaoOpen(false);
      renderAddPalavra();
    }
    else if(e.target.id === 'descartar') {
      //nao salvar no deck principal

      //atribuir o card com id ativo para o cardbase
      //Encontrar card que será atribuido ao cardbase
      const cardEncontrado = encontrarCard(encontraDeck(stateNavegacao.idDeck), stateNavegacao.cardPanel.idCardAtivo);

      //Atualizando o cardbase com o card encontrado
      const arrayDeckComCardBaseAtualizado = arrayDecks.map((deck) => deck.id === stateNavegacao.idDeck ? {...deck, cardBase: {...deck.cardBase, editar: cardEncontrado}} : deck);

      salvarDecksLocalStorage(arrayDeckComCardBaseAtualizado);
      setArrayDecks(arrayDeckComCardBaseAtualizado);
      setIsModalAtencaoEdicaoOpen(false);
      renderAddPalavra();
    }
  })
}

function verificarAtencaoEdicao() {
  //cardidativo é diferente do card já presente no cardbase
    //se sim mostra o modal
    //se nao nada acontece
  if(!isModalAtencaoEdicaoOpen) {
    if(stateNavegacao.cardPanel.mode === 'editar') {
      const deck = encontraDeck(stateNavegacao.idDeck);
  
      if(deck.cardBase.editar && deck.cardBase.editar.id !== stateNavegacao.cardPanel.idCardAtivo) {
        setIsModalAtencaoEdicaoOpen(true);
        renderAddPalavra();
      }
    }
  }
}

function preVisualizarCard() {
  document.getElementById('preview-card').addEventListener('click', () => {
    setIsCardPreviewOpen(true);
    salvarScrollySignificados();
    renderAddPalavra();
  });
}

function fecharCard() {
  document.getElementById('sair').addEventListener('click', () => {
    setIsCardPreviewOpen(false);
    renderAddPalavra();
    setScrollySignificados();
  });
}

function handlerActionBar(deckAtual) {
  document.getElementById('action-bar').addEventListener('click', (e) => {
    if(!e.target)
      return;

    const cardBaseAtual = carregarCardBaseOuSeNaoTiverCria(deckAtual);

    switch (e.target.id) {
      case 'criarCard':
        const novoArrayDeck = arrayDecks.map((deck) => deck.id === deckAtual.id ? {...deck, cards: [...deck.cards, {...cardBaseAtual, id: gerarId()}]} : deck);
  
        const novoArrayDeckComCardBaseNullo = novoArrayDeck.map((deck) => deck.id === deckAtual.id ? {...deck, cardBase: {...deck.cardBase, [stateNavegacao.cardPanel.mode]: null}} : deck);
    
        salvarDecksLocalStorage(novoArrayDeckComCardBaseNullo);
        setArrayDecks(novoArrayDeckComCardBaseNullo);
        renderAddPalavra();
        mostrarMsgSucesso();
      break;
      
      case 'save-changes':
        //salvar alteracoes no card original
        const arrayDeckComCardAtualizado = arrayDecks.map((deck) => deck.id === deckAtual.id ? {...deck, cards: deck.cards.map((card) => card.id === stateNavegacao.cardPanel.idCardAtivo ? deck.cardBase.editar : card)} : deck);

        const arrayDeckComCardBaseEditarZerado = arrayDeckComCardAtualizado.map((deck) => deck.id === deckAtual.id ? {...deck, cardBase: {...deck.cardBase, editar: null}} : deck);
        
        salvarDecksLocalStorage(arrayDeckComCardBaseEditarZerado);
        setArrayDecks(arrayDeckComCardBaseEditarZerado);
        setStateNavegacao({page: 'buscar', cardPanel: {
          ...stateNavegacao.cardPanel, mode: 'view'}});
        setUsarScrollYBodyPersonalizado(true);
        render();
      break;

      case 'voltar-deck':
        setStateNavegacao({page: 'buscar', cardPanel: {
          ...stateNavegacao.cardPanel, mode: 'view'}});
        setUsarScrollYBodyPersonalizado(true);
        render();
      break;

      default: return; 
    }
  })
}

function mostrarMsgSucesso() {
  let timer = null;
  const msg = document.getElementById('msg-success');

  msg.style.display = "block";

  clearTimeout(timer)

  timer = setTimeout(() => {
    msg.style.display = "none";
  }, 4000);

}

function adicionarSignificado(deckAtual) {
  document.getElementById('add-significado').addEventListener('click', () => {
    const cardBase = carregarCardBaseOuSeNaoTiverCria(deckAtual);
    const significadosElement = document.getElementById('senses-container');
    const msgSemSignificado = significadosElement.querySelector('.msg-sem-significado');
    if(msgSemSignificado)
      msgSemSignificado.remove();

    const objSignificado = {id: gerarId(),definicao: null, exemplos: [], tipoDefinicao: null}

    console.log("Card base passado quando adiciona um significado")
    console.log(cardBase);
    const objCardBaseAtualizado = {...cardBase, ...{significados: [...cardBase.significados, objSignificado]}};

    console.log(objCardBaseAtualizado);
    
    console.log(`Tamanho do exemplos do card base => ${cardBase.significados.length}`);

    salvarCardBaseNoDeck(objCardBaseAtualizado, deckAtual);

    salvarScrollySignificados();
    
    const significadoCriado = criarSignificado(objSignificado, cardBase.significados.length);

    significadosElement.append(significadoCriado);
  })
}

function listenersSignificado(deckAtual) {
  document.getElementById('senses-container').addEventListener('click', (e) => {
    //console.log(`Elemento clicado => ${e.target.dataset.action}`);
    const cardBase = carregarCardBaseOuSeNaoTiverCria(deckAtual);
    if(!e.target)
      return
    //Remover significado
    if(e.target.dataset.action === 'remove-sense') {
      const significadoElement = e.target.closest('.sense-card');

      console.log(`Id do significado para deletar => ${significadoElement.dataset.id}`);

      const objCardBaseAtualizado = {...cardBase, ...{significados: cardBase.significados.filter(significado => significado.id !== significadoElement.dataset.id)}} 
      
      salvarCardBaseNoDeck(objCardBaseAtualizado, deckAtual);

      significadoElement.remove();

      if(objCardBaseAtualizado.significados.length === 0) {
        const significados = document.getElementById('senses-container');
        const msgSemSignificados = criarMsgSemSignificados();
        significados.append(msgSemSignificados);
      }

    }
    else if(e.target.dataset.action === "add-example") {
      const significadoElement = e.target.closest('.sense-card');
      const listExemplos = significadoElement.querySelector('.examples-list');
      const msgSemExemplo = listExemplos.querySelector('.msg-sem-exemplo');
      if(msgSemExemplo)
        msgSemExemplo.remove();

      console.log(`Adicionar exemplo no significado com id => ${significadoElement.dataset.id}`);
      console.log(`Nome da tag do elemento clicado => ${e.target.tagName}`)

      const objExemploCriado = {
        id: gerarId(),
        exemplo: null
      }

      const objCardBaseAtualizado = {...cardBase, ...{significados: cardBase.significados.map((significado) => significado.id === significadoElement.dataset.id ? {...significado, ...{exemplos: [...significado.exemplos, objExemploCriado]}} : significado)}};

      salvarCardBaseNoDeck(objCardBaseAtualizado, deckAtual);

      const exemploCriado = criarExemplo(objExemploCriado);
      listExemplos.append(exemploCriado);
      
    }
    else if (e.target.dataset.action === "remove-example") {
      const significadoElement = e.target.closest('.sense-card');
      console.log(`Adicionar exemplo no significado com id => ${significadoElement.dataset.id}`);

      const linhaExemplo = e.target.closest('[data-example-id]');
      const listExemplos = significadoElement.querySelector('.examples-list');

      console.log(`Inde do exemplo que será excluido => ${linhaExemplo.dataset.exampleId}`);

      const objCardBaseAtualizado = {...cardBase, ...{significados: cardBase.significados.map((significado) => significado.id === significadoElement.dataset.id ? {...significado, ...{exemplos: significado.exemplos.filter((exemplo) => exemplo.id !== linhaExemplo.dataset.exampleId)}} : significado)}};

      const significadoAtual = objCardBaseAtualizado.significados.find((significado) => significado.id === significadoElement.dataset.id);

      console.log(significadoAtual.exemplos.length);

      salvarCardBaseNoDeck(objCardBaseAtualizado, deckAtual);

      linhaExemplo.remove();

      if(significadoAtual.exemplos.length === 0) {
        const msgSemExemplo = criarMsgSemExemplo();
        listExemplos.append(msgSemExemplo);
      }
        
    }

  })
}

//retornar o cardbase correspondente
function carregarCardBaseOuSeNaoTiverCria(deckAtual) {
  const deckAtualEmMemoriaAtualizado = arrayDecks.find(deck => deck.id === deckAtual.id);
  const cardBase = stateNavegacao.cardPanel.mode === 'criar' ? deckAtualEmMemoriaAtualizado.cardBase.criar : deckAtualEmMemoriaAtualizado.cardBase.editar; 

  //retornar o cardbase
  
  //card base vazio
  //card base igual card clicado
  //card base diferente card clicado
  if(stateNavegacao.cardPanel.mode === 'editar') {
    if(cardBase) {
      return cardBase;
    } else {
      //retornar card clicado para editar

      const cardParaEdicao = encontrarCard(deckAtualEmMemoriaAtualizado, stateNavegacao.cardPanel.idCardAtivo);
      
      return cardParaEdicao;
    }
  } else {
    return cardBase ? cardBase : criarCardBaseVazio();
  }
}

function encontrarCard(deckAtual, idCard) {
  return deckAtual.cards.find((card) => card.id === idCard);
}


function criarCardBaseVazio() {
  return {
      id: null,
      nome: null, 
      tipo: null, 
      brevDesc: null, 
      significados: [],
      pronuncia: null
    }
}

function listenerSalvamentoAutomatico(deckAtual) {
  const cardEditor = document.querySelector('.editor-card');

  //Funcao para salvar dados de input e select
  function handleAteracao(e) {
    //pode dar erro aqui
    const cardBaseEmMemoria = carregarCardBaseOuSeNaoTiverCria(deckAtual);
    const elemento = e.target.closest("input, select, textarea");
    if(!elemento) return

    //const tagNameElementoClicado = elemento.tagName.toLowerCase();

    console.log(`Nome do card em memoria => ${cardBaseEmMemoria.nome}`);

    const nameElementoClicado = elemento.name;

    if(nameElementoClicado === "definicao" || nameElementoClicado === "tipoDefinicao" || nameElementoClicado === "example") salvarElementosDeArray(nameElementoClicado,cardBaseEmMemoria, elemento, deckAtual);

    let objAtualizado = null;

    switch(nameElementoClicado) {
      case "word": 
        console.log('modificar word');
        console.log("CARD BASE ENTRANDO PARA MUDAR WORD")
        console.log(cardBaseEmMemoria);
        objAtualizado = {...cardBaseEmMemoria, ...{nome: elemento.value.trim()}};
        console.log("CARD BASE ATUALIZADO DEPOIS DE MUDAR WORD")
        console.log(objAtualizado);
        break;

      case "type": 
        console.log('modificar type');
        objAtualizado = {...cardBaseEmMemoria, ...{tipo: elemento.value}};
        break;

      case "sinonimo": 
        console.log('modificar sinonimo');
        objAtualizado = {...cardBaseEmMemoria, ...{brevDesc: elemento.value.trim()}};
        break;

      case "pronuncia": 
        console.log('modificar pronuncia');
        objAtualizado = {...cardBaseEmMemoria, pronuncia: elemento.value.trim()};
        break;
    }

    if(objAtualizado) salvarCardBaseNoDeck(objAtualizado, deckAtual);
    
    console.log(`Name do elemento que modificou => ${elemento.name}`);
    console.log(`Valor do elemento mudado => ${elemento.value}`);
  
  }

  cardEditor.addEventListener('input', debounce((e) => handleAteracao(e), 1000));
  
  //Funcao para ajustar o curso e o scroll do input de exemplo
  function ajustarCursorAoClicarNoExemplo(e) {
    //Time out para 'forcar' o navegador a ajustar o cursor e o foco
    setTimeout(() => {
      const comprimentoText = e.target.value.length;
      e.target.setSelectionRange(comprimentoText, comprimentoText);
      e.target.scrollLeft = e.target.scrollWidth;
    }, 0)
  }

  const inputsExemplo = cardEditor.querySelectorAll('.example-input');
  inputsExemplo.forEach((input) => input.addEventListener('focus', ajustarCursorAoClicarNoExemplo));

}

function salvarElementosDeArray(nameElementoClicado, cardBaseEmMemoria, elementoTarget, deckAtual) {
  const significadoElemento = elementoTarget.closest('.sense-card');

  if(nameElementoClicado === "definicao" || nameElementoClicado === "tipoDefinicao") {
    console.log("ENTROU PARA ALTERAR O CONTEXTO!!!!");
    console.log(cardBaseEmMemoria);
    const objAtualizado = {...cardBaseEmMemoria, significados: cardBaseEmMemoria.significados.map((significado) => significado.id === significadoElemento.dataset.id ? {...significado, [nameElementoClicado]: elementoTarget.value.trim()} : significado)};
    
    salvarCardBaseNoDeck(objAtualizado, deckAtual);
  } else {
    console.log("Exemploo");
    console.log(cardBaseEmMemoria);
    const linhaExemplo = elementoTarget.closest('.example-row');
    const objAtualizado = {...cardBaseEmMemoria, significados: cardBaseEmMemoria.significados.map((significado) => significado.id === significadoElemento.dataset.id ? {...significado, exemplos: significado.exemplos.map((ex) => ex.id === linhaExemplo.dataset.exampleId ? {...ex, exemplo: elementoTarget.value.trim()} : ex)} : significado)};

    salvarCardBaseNoDeck(objAtualizado, deckAtual);
  }
}

// function salvarCardBaseLocalStorage(cardBase) {
//   localStorage.setItem('CARD_BASE', JSON.stringify(cardBase));
// }

function salvarCardBaseNoDeck(cardBaseAtualizado, deckAtual) {
  console.log("CARD BASE ATUALIZADO NA FUNCAO SALVAR CARDBASE NO DECK");
  console.log(cardBaseAtualizado);
  const novoArrayDeck = arrayDecks.map((deck) => deck.id === deckAtual.id ? {...deck, cardBase: {...deck.cardBase, [stateNavegacao.cardPanel.mode]: cardBaseAtualizado}} : deck);

  //salvar localstorage
  setArrayDecks(novoArrayDeck);
  salvarDecksLocalStorage(novoArrayDeck);
  console.log(novoArrayDeck);
}

// Funcao para travar rolamento do body no modal de aviso
export function travarScrollBodyComScrollY0() {
    document.body.style.position = 'fixed';
    document.body.style.top = `0px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
}