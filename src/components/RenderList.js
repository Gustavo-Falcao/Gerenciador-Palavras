import { getStateBusca } from "../state/State.js";
//Renderização da lista de palavras
export function renderListaPalavras() {
    const stateBusca = getStateBusca();
    const cardsOrdenados = ordenarCards(stateBusca.cards, stateBusca.busca);
    console.log(`Tamanho cards normal => ${stateBusca.cards.length}`);
    console.log(`Tamanho card filtrado => ${cardsOrdenados.length}`);
    cardsOrdenados.forEach(element => {
        console.log(`Nome card => ${element.nome}`);
    });
    let mainList = document.getElementById('grid');

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