import { arrayDecks, setArrayDecks } from "../state/State.js";

// export function handlerDailyWords() {
//     const diaAtual = new Date().getDate()
//     const novoArrayDack = arrayDecks.map((deck) => deck.dailyWords.day !== diaAtual ? {...deck, dailyWords: {amount: 0, day: diaAtual}} : deck)
//     setArrayDecks(novoArrayDack)
// }

//Retorna um novo dia e uma nova quantidade se o dia guardado for diferente do dia atual
export function handlerDailyWordsFirstDeck(dia, quant) {
    const diaAtual = new Date().getDate()
    if(diaAtual !== dia) {
        console.log("Vai retornar diferente")
        return {amount: 0, day: diaAtual}
    }
    console.log("Vai retornar igual")
    return {amount: quant, day: dia}
}

export function gerarDayToCompare() {
    const data = new Date();

    return {
        dia: data.getDate(),
        mes: data.getMonth(),
        ano: data.getFullYear()
    }
}

export function getCurrentDate() {
    const data = new Date();
    const dataFormatada = data.toLocaleString();
    return dataFormatada;
}

export function getCurrentDateTime() {
    const novaData = new Date();
    return novaData.getTime();
}

export function getCurrentDay() {
    return new Date().getDate()
}

export function formatarDiaEMesParaMostrar() {
    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth()+1).padStart(2, '0');

    return `${dia}/${mes}`;
}

export function formatarDataEHoraParaMostrar(data) {
    const stringSeparada = data.split(',');
    const dataFormatada = stringSeparada[0]
    const hora = stringSeparada[1]

    return `${dataFormatada} as ${hora}`
}