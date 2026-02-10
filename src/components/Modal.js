export function Modal(conteudo) {
 //Background do modal (janelaPai)
    const backgroundModal = document.createElement('div');
    backgroundModal.setAttribute('id', 'janela-pai');
    backgroundModal.setAttribute('class', 'janela-pai-popup alinhar-centro');
    
    backgroundModal.appendChild(conteudo);

    return backgroundModal;
}