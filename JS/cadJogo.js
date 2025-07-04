function cadastrar_novo_jogo(){
    var nome = document.getElementById("nomeJogo").value;
    var genero = document.getElementById("generoJogo").value;
    var fxE = document.getElementById("faixaEtaria").value;
    var dt_lancamento = document.getElementById("dtLancamento").value;
    var desenvolvedora = document.getElementById("desenvolvedora").value;
    var valor = document.getElementById("valor").value;
    var avaliacao = document.getElementById("avaliacao").value;
    var img = document.getElementById("logoImg").value;
    var overview = document.getElementById("overview").value;

    if(nome == "") {
        alert("Digite o Nome do Jogo.");
        document.getElementById("nomeJogo").focus();

    } else if(genero == "") {
        alert("Digite o Gênero do Jogo.")
        document.getElementById("generoJogo").focus();

    } else if(fxE == "") {
        alert("Digite a Faixa Etária permitida para esse Jogo.");
        document.getElementById("faixaEtaria").focus();

    } else if(dt_lancamento == "") {
        alert("Digite a Data de Lançamento do Jogo.");
        document.getElementById("dtLancamento").focus();

    } else if(desenvolvedora == "") {
        alert("Digite a Fornecedora do Jogo.");
        document.getElementById("desenvolvedora").focus();

    } else if(valor == "") {
        alert("Digite o Valor do Jogo.");
        document.getElementById("valor").focus();

    } else if(avaliacao == "") {
        alert("Digite a Nota do Jogo.");
        document.getElementById("avaliacao").focus();

    } else if(img == "") {
        alert("Digite a URL da Logo do Jogo.");
        document.getElementById("logoImg").focus();

    } else if(overview == "") {
        alert("Digite a Overview do Jogo.");
        document.getElementById("overview").focus();
        
    } else {
        fetch('https://site-jogo.onrender.com/getDataJogos')
            .then(response => response.json())
            .then(data => {
                let x = true;
                let count = 0;
                var nomeJ = [];
                var cadastrar = true;

                while (x) {
                    try {
                        nomeJ.push(data[count].nome);
                        count += 1;
                    } catch {
                        x = false;
                    }
                }

                for (let i = 0; i < nomeJ.length; i++) {
                    if(nomeJ[i] == nome){
                        alert("Este jogo já esta cadastrado ou já existe um jogo com esse nome cadastrado.")
                        cadastrar = false;
                        break;
                    }
                }

                if(cadastrar) {
                    var data = {
                        nome: nome,
                        genero: genero,
                        faixa_etaria: fxE,
                        dt_lancamento: dt_lancamento,
                        desenvolvedora: desenvolvedora,
                        valor: valor,
                        avaliacao: avaliacao,
                        img: img,
                        overview: overview
                    };

                    fetch('https://site-jogo.onrender.com/cadastrar_jogo' , {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log('Resposta:', data);
                        })
                        .catch(error => {
                            console.error('Erro:', error);
                        });
                    alert('Jogo Cadastrado.');
                    location.reload();
                }
            })
    }
}