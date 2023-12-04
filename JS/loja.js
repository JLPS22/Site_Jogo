fetch('http://localhost:3000/getDataJogos')
    .then(response => response.json())
    .then(jogos => {
        const listaJogos = document.getElementById('objeto-list');

        jogos.forEach(jogo => {
            const div = document.createElement('div');
            div.className = 'conteudo';
            div.innerHTML = `
                <img src="${jogo.img}" class="card-img-top" height="300">

                <h4 class="card-title">${jogo.nome}</h4>
                <p>R$ ${jogo.valor}</p>
                <button type="button" class="button" onclick="pagJogos(${jogo.id})">Comprar</button>
            `;
            listaJogos.appendChild(div);
        });

    })
    .catch(error => console.error('Error ao obter objetos:', error));

function pagJogos(id) {
    localStorage.setItem('valor', (id - 1));
    open('paginaJogo.html');
}