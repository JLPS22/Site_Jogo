fetch('https://site-jogo.onrender.com/getDataJogos')
    .then(response => response.json())
    .then(data => {

        const id = localStorage.getItem('valor');
        document.getElementById('imagem').outerHTML = `<img src=${data[id].img}>`
        document.getElementById('nomeJogo').innerHTML = data[id].nome;
        document.getElementById('overview').innerHTML = data[id].overview;
        document.getElementById('valor').innerHTML = `R$ ${data[id].valor}`;

    })
    .catch(error => console.error('Erro ao obter dados:', error));

function comprar() {
    
    var add = '';
    const idUser = localStorage.getItem('idUser');

    fetch('https://site-jogo.onrender.com/getDataJogos')
        .then(response => response.json())
        .then(data => {
            const idJogo = localStorage.getItem('valor');
            const nomeJogo = data[idJogo].nome;

            fetch('https://site-jogo.onrender.com/getData')
                .then(response => response.json())
                .then(user => {
                    if (user[idUser].jogo_user == null) {
                        add = nomeJogo;
                    } else {
                        add = `${user[idUser].jogo_user}, ${nomeJogo}`;
                    }

                    fetch('https://site-jogo.onrender.com/atualizar-valor', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            id: idUser,
                            nomeJogo: add
                        }),
                    })
                        .then(response => response.json())
                        .then(data => {
                            alert(idUser);
                            alert("Jogo Comprado.");
                        })
                        .catch(error => {
                            console.error('Erro ao obter dados:', error);
                            alert();
                        });
                    
                })
                .catch(error => console.error('Erro ao obter dados:', error));
        })
        .catch(error => console.error('Erro ao obter dados:', error));
}