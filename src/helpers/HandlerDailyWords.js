import { setStatePrincipal, statePrincipal } from "../state/State.js";

export function handlerDailyWords() {
    const diaAtual = new Date().getDate();
    if(diaAtual !== statePrincipal.dailyWords.day) {
        setStatePrincipal({dailyWords: {amount: 0, day: diaAtual}});
        localStorage.setItem('infoDailyWords', JSON.stringify(statePrincipal.dailyWords))
    }

}

export function getCurrentDate() {
    const data = new Date();
    const dataFormatada = data.toLocaleDateString('pt-BR');
    return dataFormatada;
}