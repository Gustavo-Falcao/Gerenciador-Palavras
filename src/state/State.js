//Estado principal
export let statePrincipal = {
    entidades: {
        cards: JSON.parse(localStorage.getItem('arrayCards')) || []
    },
    navegacao: {
        page: 'home'
    },
    busca: {
        query: ''
    },
    cardPanel: {
        isOpen: false,
        idCardAtivo: null,
        mode: 'view'
    }
};

export function getStatePrincipal() {
    return statePrincipal;
}

export function setStatePrincipal(newState) {
    statePrincipal = {...statePrincipal, ...newState};
}
