fetch('http://localhost:3000/getDataJogos')
    .then(response => response.json())
    .then(data => {

        const id = localStorage.getItem('valor');
        document.getElementById('imagem').outerHTML = `<img src=${data[id].img}>`
        document.getElementById('nomeJogo').innerHTML = data[id].nome;
        document.getElementById('overview').innerHTML = data[id].overview;
        document.getElementById('valor').innerHTML = `R$ ${data[id].valor}`;

    })
    .catch(error => console.error('Erro ao obter dados:', error));