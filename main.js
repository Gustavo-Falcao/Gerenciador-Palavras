/* document.getElementById('bot-add').addEventListener('click', () => {
    let conteudo = document.getElementById('cont-palavra').value;
    if(conteudo) {
        localStorage.setItem('desc', conteudo);
    }
    window.location.href = "index.html";
}); */

/* let state = {
    cards: [],
    busca: ''
} */

// array para inserir
/* objetos = [
    {id: 'card1', nome:'Nome do Card1', desc: 'Desc do Card1'},
    {id: 'card2', nome:'Nome do Card2', desc: 'Desc do Card2'},
    {id: 'card3', nome:'Nome do Card3', desc: 'Desc do Card3'}
] */

/* document.addEventListener('DOMContentLoaded', () => {
    const result = document.getElementById('grid');
    let itemSalvo = localStorage.getItem('arrayObjetos');
    if(itemSalvo) {
        let frag = document.createDocumentFragment();
        let item = JSON.parse(localStorage.getItem('arrayObjetos'));
        item.forEach(element => {
            let card = document.createElement('article');
            card.setAttribute('class', 'card');
            card.setAttribute('id', element.id);
            card.innerHTML = `
            <h3>${element.nome}</h3>
            <pre>${element.desc}</pre>
            `;
            frag.appendChild(card);
        });
        result.appendChild(frag);
    }
});
 */
/* document.getElementById('bot-add').addEventListener('click', () => {
    let nomePalavra = document.getElementById('nome-palavra').value;
    let descPalavra = document.getElementById('cont-palavra').value

    if(nomePalavra && descPalavra) {
        let novoCard = {
            id: 'cardTeste', nome: nomePalavra, desc: descPalavra
        };
        localStorage.setItem(novoCard.id, JSON.stringify(novoCard));
    }
   localStorage.setItem('arrayObjetos', JSON.stringify(objetos));
}); */


// Carregar dados
let dadosCarregados = document.addEventListener('DOMContentLoaded', () => {
    const dados = JSON.parse(localStorage.getItem('arrayCards')) ?? [];
    return dados;
});


// Gerar id aleatório e único
function gerarId() {
    return crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2);
}

// Estado da lista de cards
let stateBusca = {
    cards: dadosCarregados,
    busca: ''
}

// Mudança de estado da lista de cards
function setStateBusca(newState) {
    stateBusca = {...stateBusca, ...newState};
    render();
}

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

// Renderização da página de buscar palavra
function renderBuscarPalavra(root) {
    root.innerHTML = '';

    root.innerHTML = `
        <div class=".main-buscar">
            <header class="titulo-buscar">
                <h1>Palavras</h1>
            </header>
            <section class="toolbar" id="toolbar">
                <input type="search" id="q" placeholder="Buscar..." autocomplete="off">
            </section>
            <main id="grid" class="grid" aria-live="polite">
                <article class="card">
                    <h3>titulo</h3>
                </article>
                <article class="card">
                    <h3>titulo2</h3>
                </article>
                <article class="card">
                    <h3>titulo4</h3>
                </article>
            </main>
        </div>
    `;
}

function render() {
    console.log(`Qual pagina = > ${stateNavegacao.page}`)

    const container = document.getElementById('root');

    if(stateNavegacao.page === 'add') renderAddPalavra(container);
    if(stateNavegacao.page === 'buscar') renderBuscarPalavra(container);
    if(stateNavegacao.page === 'home') renderHome(container);
}

render();

// Listener para o botão que irá para a página de add palavra
document.getElementById('add').addEventListener('click', () => {
    setStateNavegacao({page: 'add'});
});

// Listener para o botão que irá direcionar para a página de buscar palavar
document.getElementById('buscar').addEventListener('click', () => {
    setStateNavegacao({page: 'buscar'});
});



