import { setStatePrincipal, statePrincipal, arrayDecks, setArrayDecks } from "../state/State.js";

export function handlerDailyWords() {
    const diaAtual = new Date().getDate()
    const novoArrayDack = arrayDecks.map((deck) => deck.dailyWords.day !== diaAtual ? {...deck, dailyWords: {amount: 0, day: diaAtual}} : deck)
    setArrayDecks(novoArrayDack)
}

export function handlerDailyWordsFirstDeck(dia, quant) {
    const diaAtual = new Date().getDate()
    if(diaAtual !== dia) {
        console.log("Vai retornar diferente")
        return {amount: 0, day: diaAtual}
    }
    console.log("Vai retornar igual")
    return {amount: quant, day: dia}
}

export function getCurrentDate() {
    const data = new Date();
    const dataFormatada = data.toLocaleDateString('pt-BR');
    return dataFormatada;
}

export function getCurrentDay() {
    return new Date().getDate()
}