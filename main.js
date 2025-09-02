document.getElementById('bot-add').addEventListener('click', () => {
    let conteudo = document.getElementById('cont-palavra').value;
    if(conteudo) {
        localStorage.setItem('desc', conteudo);
    }
    window.location.href = "index.html";
});
