//Função debounce que será aplicada no input da busca
function debounce(fn, delay) {
    let timer = null;

    return function debounced(...args) {
        const context = this;
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, delay);
    };
}

function ordenarCards(cards, busca) {
    // let filtroAlfabetico = [...filtroBusca].sort((a,b) => a.nome.localeCompare(b.nome, 'pt'));

    let filtroBusca = cards.filter(function(card) {
        if(!busca) return true;
        
        let nome = card.nome.toLowerCase();
        let palavraBusca = busca.toLowerCase();
        
        if(nome.includes(palavraBusca)) {
            return true;
        } else {
            return false;
        }
    });

    return filtroBusca;
}

// Gerar id aleatório e único
function gerarId() {
    return crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2);
}

// Estado da lista de cards
let stateBusca = {
    cards: [],
    busca: '',
}
// Estado do popUp do card
let stateCardPopUp = {
    aberto: false,
    idCard: ''
}

// Mudança de estado do card popUp
function setStateCardPopUp(newState) {
    stateCardPopUp = {...stateCardPopUp, ...newState};
    renderBuscarPalavra();
}

// Mudança de estado da lista de cards
function setStateBusca(newState) {
    stateBusca = {...stateBusca, ...newState};
    renderListaPalavras();
}

function setStateCards(newState) {
    stateBusca.cards = [...stateBusca.cards, ...newState];
}

document.addEventListener('DOMContentLoaded', () => {
    const listStorage = localStorage.getItem('arrayCards');
    if(listStorage) {
    let cardsCarregados = JSON.parse(listStorage);
        setStateCards([...stateBusca.cards, ...cardsCarregados]);
    }
});

// Estado navegação entre páginas
let stateNavegacao = {
    page: 'home'
}

// Mudança de estado da navegação entre páginas
function setStateNavegacao(newState) {
    stateNavegacao = {...stateNavegacao, ...newState};
    render();
}

// Renderização da página home
function renderHome(root) {
    root.innerHTML = '';

    root.innerHTML = `
        <header class="titulo-home">
            <h1>Palavras</h1>
        </header>
        <main class="main-home">
        <button id="add">Adicionar Palavra</button>
        <button id="buscar">Buscar Palavra</button>
        </main>
    `;
}

// Renderização da página de add palavra
function renderAddPalavra(root) {
    root.innerHTML = '';
    
    root.innerHTML = `
        <main class="main-add">
            <header class="titulo-add"><h1>Adicionar Palavra</h1></header>
            <form>
            <input type="text" id="nome-palavra" placeholder="Nome da palvra...">
            <textarea id="cont-palavra" rows="10" cols="40" placeholder="Digite o conteúdo aqui..."></textarea>
            </form>
            <button id="bot-add">Adicionar</button>
        </main>
    `;
}

//Renderização da lista de palavras
function renderListaPalavras() {
    const cardsOrdenados = ordenarCards(stateBusca.cards, stateBusca.busca);
    console.log(`Tamanho cards normal => ${stateBusca.cards.length}`);
    console.log(`Tamanho card filtrado => ${cardsOrdenados.length}`);
    cardsOrdenados.forEach(element => {
        console.log(`Nome card => ${element.nome}`);
    });
    let mainList = document.getElementById('grid');

    if(mainList) {

        mainList.innerHTML = '';
    
        let frag = document.createDocumentFragment();
        
        if(cardsOrdenados.length > 0) {
            cardsOrdenados.forEach(card => {
                const article = document.createElement('article');
                article.setAttribute('class', 'card');
                article.setAttribute('id', `${card.id}`);
                const h3Element = document.createElement('h3');
                h3Element.textContent = `${card.nome}`;
                article.appendChild(h3Element);
                frag.appendChild(article);
            });
            
            mainList.appendChild(frag);
          
        } else {
            mainList.innerHTML = `
                <article class="card">
                    <h3>Não encontrado</h3>
                </article>
            `;
        }
    }
}

// Renderização da página de buscar palavra
function renderBuscarPalavra(valor) {
    console.log(`Estado do cardPopUp => ${stateCardPopUp.aberto}`);

    let root = document.getElementById('root');

    root.innerHTML = '';
    const cards = stateBusca.cards;
    
    const frag = document.createDocumentFragment();
    
    if(cards.length > 0) {
        cards.forEach(card => {
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
    const main = document.createElement('main');
    main.setAttribute('id', 'grid');
    main.setAttribute('class', 'grid');
    main.setAttribute('aria-alive', 'polite');

    main.appendChild(frag);

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
                <h1>Palavras</h1>
            </header>
            <section class="toolbar" id="toolbar">
                <input type="search" id="q" placeholder="Buscar..." autocomplete="off">
            </section>
        </div>
    `;
    root.appendChild(main);
    
    let janelaPai = document.createElement('div');
    janelaPai.setAttribute('id', 'janela-pai');
    janelaPai.setAttribute('class', 'janela-pai-popup');

    let botSair = document.createElement('button');
    botSair.setAttribute('class', 'botSair');
    botSair.setAttribute('id', 'sair');
    botSair.innerHTML = `&#x2715`;

    let janelaInfo = document.createElement('div');
    janelaInfo.setAttribute('id', 'janela-info');
    janelaInfo.setAttribute('class', 'janela-pop');
    let nomePalavra = document.createElement('h2');
    let desc = document.createElement('pre');

    let bodyConteiner = document.getElementById('body')

    if(stateCardPopUp.aberto) {
        if(janelaPai.classList.contains('esconder-janela')) {
            janelaPai.classList.remove('esconder-janela');
        }
        let cardPalavra = stateBusca.cards.find((element) => element.id === stateCardPopUp.idCard);
        
        console.log(`Id que está no estado do popup => ${stateCardPopUp.idCard}`)

        nomePalavra.innerHTML = `${cardPalavra.nome}`;
        desc.innerHTML = `${cardPalavra.desc}`;

        janelaPai.classList.add('mostrar-janela');
        bodyConteiner.classList.add('.travar-rolamento');
    } else {
        if(bodyConteiner.classList.contains('.travar-rolamento')) {
            bodyConteiner.classList.remove('.travar-rolamento');
        }
        if(janelaPai.classList.contains('mostrar-janela')) {
            janelaPai.classList.remove('mostrar-janela');
        }
        janelaPai.classList.add('esconder-janela');
    }
    janelaInfo.appendChild(nomePalavra);
    janelaInfo.appendChild(desc);
    janelaPai.appendChild(janelaInfo);
    janelaPai.appendChild(botSair);
    root.appendChild(janelaPai);
    listenerFecharPopUpCard();
    listenerMostrarPopUpCard();
    listenerBuscarPalavra();
    listenerIrHome();
}


function render() {
    console.log(`Qual pagina = > ${stateNavegacao.page}`)

    let container = document.getElementById('root');

    if(stateNavegacao.page === 'add') {
        renderAddPalavra(container);
        listenerAddPalavra();
    } 
    if(stateNavegacao.page === 'buscar') {
        renderBuscarPalavra(container);
    } 
    if(stateNavegacao.page === 'home'){
        renderHome(container);
        listenersHome();
    } 
}

render();

//Listener para o input de buscar palavra
function listenerBuscarPalavra() {
    document.getElementById('q').addEventListener('input', debounce((e)=> {
        console.log(`Palavra para buscar => ${e.target.value}`);
        setStateBusca({busca: e.target.value});
        console.log('Entrou no debounceee')
    }, 250));
}

function listenerMostrarPopUpCard() {
    document.getElementById('grid').addEventListener('click', (e) => {
        let elementoClicado = e.target.closest('.card')
        console.log(`Id do elemento clicado => ${elementoClicado.id}`);
        setStateCardPopUp({aberto: true, idCard: elementoClicado.id});
    });
}

function listenerFecharPopUpCard() {
    document.getElementById('sair').addEventListener('click', () => {
        setStateCardPopUp({aberto: false, idCard: ''});
    });
}

//Listener para o botão home da página de buscar palavra
function listenerIrHome() {
    document.getElementById('home').addEventListener('click', () => {
        setStateNavegacao({page: 'home'});
    });
}

function listenersHome() {
    // Listener para o botão que irá para a página de add palavra
    document.getElementById('add').addEventListener('click', () => {
        setStateNavegacao({page: 'add'});
    });

    // Listener para o botão que irá direcionar para a página de buscar palavar
    document.getElementById('buscar').addEventListener('click', () => {
        setStateNavegacao({page: 'buscar'});
    });
}

// Listener para o botão que irá adicionar palavra
function listenerAddPalavra() {
    document.getElementById('bot-add').addEventListener('click', () => {
    const nomePalavra = document.getElementById('nome-palavra').value;
    const descPalavra = document.getElementById('cont-palavra').value;

    if(nomePalavra && descPalavra) {
        const newCard = {id: gerarId(), nome: nomePalavra, desc: descPalavra};
        if(stateBusca.cards) {
            localStorage.setItem('arrayCards', JSON.stringify([...stateBusca.cards, newCard]));
            setStateBusca({cards: [...stateBusca.cards, newCard]})
        } else {
            console.log('Deu ruim');
            console.log(`${stateBusca.cards}`);
        }
        setStateNavegacao({page: 'home'});
    }
});
}




