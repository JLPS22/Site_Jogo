let count = 1;
document.getElementById("radio1").checked = true;

setInterval(function () {
    nextImage();
}, 9500)

function nextImage() {
    count++;
    if (count > 5) {
        count = 1;
    }

    document.getElementById("radio" + count).checked = true
}

function pagJogos(id) {
    localStorage.setItem('valor', id);
    open('paginaJogo.html');
}

function cadJogo() {
    fetch('http://localhost:3000/getData')
        .then(response => response.json())
        .then(data => {

            const idUser = localStorage.getItem('idUser');
            const adm = data[idUser].adm;

            if(adm == 1) {
                open('cadastrar_jogo.html');
            } else {
                alert('Você não tem permissão para cadastrar um jogo.');
            }
        })
        .catch(error => console.error('Erro ao obter dados:', error));
}