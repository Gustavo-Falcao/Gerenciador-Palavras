// import { getCurrentDate } from "../helpers/HandlerDailyWords.js";
import { listenersBuscarPalavra, listenersOpcoesViewCard, voltarHome, fecharCard} from "../state/Listeners.js";
import {stateNavegacao, arrayDecks, scrollYBody, setScrollYBody} from "../state/State.js";
import { CardModal } from "./CardModal.js";

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

        const modal = CardModal(cardAtivo, 'view');
        root.append(modal);
        
        if(stateNavegacao.cardPanel.mode === 'view') {
            
            console.log('view')
            listenersOpcoesViewCard(stateNavegacao.idDeck)
            
        }   
        fecharCard();
        
        travarScrollBodyPersonalizado ? travarScrollBodyPersonalizado() : travarScrollBody();
    } else {
        const modalElement = root.querySelector('#janela-pai');
        if(modalElement) modalElement.remove();
        destravarScrollBody();
        
        document.body.classList.remove('travar-rolamento');
    }

    if(deck.cards.length > 0) listenersBuscarPalavra();
    voltarHome()
}


// Funcao para travar rolamento body
export function travarScrollBody() {
    
   const scrollY = window.scrollY || document.documentElement.scrollTop;

   setScrollYBody(scrollY);

  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollY}px`;
  document.body.style.left = '0';
  document.body.style.right = '0';
  document.body.style.width = '100%';

}

//arrumar o funcionamento dessa funcao
function travarScrollBodyPersonalizado() {
   
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollYBody}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
}

// Funcao para destravar o rolamento body
export function destravarScrollBody() {
    
  const scrollY = scrollYBody;

  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';
  document.body.style.width = '';

  setScrollYBody(0);

  window.scrollTo(0, scrollY);
}
