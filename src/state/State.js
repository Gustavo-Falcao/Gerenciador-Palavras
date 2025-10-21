//Estado principal
const savedDailyWords = JSON.parse(localStorage.getItem('infoDailyWords')) || {};
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
    },
    dailyWords: {
        amount: savedDailyWords.amount || 0,
        day: savedDailyWords.day || 0
    }

};

export let estadoModalDeck = {isModelOpen: false}

export function getStatePrincipal() {
    return statePrincipal;
}

export function setStatePrincipal(newState) {
    statePrincipal = {...statePrincipal, ...newState};
}
