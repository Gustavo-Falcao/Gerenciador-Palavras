import { Modal } from "./Modal.js";

export function AvisoEdicaoModal(cardBase) {
    
    const modal = document.createElement('div');
    modal.setAttribute('class', 'janela-info');
    modal.setAttribute('id', 'info');

    const modalAviso = document.createElement('div');
    modalAviso.setAttribute('class', 'modal-aviso');

    const tituloAviso = document.createElement('h3');
    tituloAviso.textContent = '⚠️ Alterações não salvas';

    const infoCardNaoSalvo = document.createElement('p');
    infoCardNaoSalvo.innerHTML = `As alterações do card <span class='card-name'> ${cardBase.nome} </span> não foram salvas.`

    const infoAcoes = document.createElement('p');
    infoAcoes.textContent = "Você pode salvar as alterações agora para não perder seu progresso ou descartá-las para abrir o novo card imediatamente."

    modalAviso.append(tituloAviso, infoCardNaoSalvo, infoAcoes);

    const caixaOptions = document.createElement('div');
    caixaOptions.setAttribute('class', 'modal-actions');
    caixaOptions.setAttribute('id', 'actions-aviso');

    const botSalvarAndAbrirNovoCard = document.createElement('button');
    botSalvarAndAbrirNovoCard.setAttribute('class', 'btn-modal-aviso btn-save');
    botSalvarAndAbrirNovoCard.setAttribute('id', 'save');
    botSalvarAndAbrirNovoCard.textContent = 'Salvar alterações e abrir novo card';

    const botDescartarAndAbrirNovoCard = document.createElement('button');
    botDescartarAndAbrirNovoCard.setAttribute('class', 'btn-modal-aviso btn-discard')
    botDescartarAndAbrirNovoCard.setAttribute('id', 'descartar');
    botDescartarAndAbrirNovoCard.textContent = 'Descartar alterações e abrir novo card';

    const botVoltarDeck = document.createElement('button');
    botVoltarDeck.setAttribute('class', 'btn-modal-aviso btn-voltar-deck');
    botVoltarDeck.setAttribute('id', 'voltar-deck');
    botVoltarDeck.textContent = 'Voltar ao deck'

    caixaOptions.append(botSalvarAndAbrirNovoCard, botDescartarAndAbrirNovoCard, botVoltarDeck);

    modal.append(modalAviso, caixaOptions);

    const backgroundModal = Modal();

    backgroundModal.appendChild(modal);

    return backgroundModal;

    // <button class="btn btn-save">Salvar alterações e abrir novo card</button>
    //             <button class="btn btn-discard">Descartar alterações e abrir novo card</button>

}