function validacaoLogin() {
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;

    if (email == "") {
        alert("Coloque seu email");
        document.getElementById("email").focus();

    } else if (senha == "") {
        alert("Coloque sua senha");
        document.getElementById("senha").focus();

    } else {

        fetch('https://site-jogo.onrender.com/getData')
            .then(response => response.json())
            .then(data => {

                let x = true
                let count = 0
                var emails = []
                while (x) {
                    try {
                        emails.push(data[count].email);
                        count += 1;
                    } catch {
                        x = false;
                    }
                }

                for (let i = 0; i < emails.length; i++) {
                    if (emails[i] == email) {
                        if (senha == data[i].senha) {
                            localStorage.setItem('idUser', i);
                            open('../XGames.html');
                            close('login.html');
                            break;
                        } else {
                            alert("Senha Incorreta!");
                            document.getElementById('senha').focus();
                            break;
                        }
                    }
                    if (i == (emails.length - 1)) {
                        alert("Email não cadastrado!");
                        document.getElementById('email').focus();
                    }
                }

            })
            .catch(error => console.error('Erro ao obter dados:', error));
    }
}

function cadastrando_novo_user() {
    var nome = document.getElementById("nome").value;
    var n_email = document.getElementById("email").value;
    var nova_senha = document.getElementById("criando_senha").value;
    var senha = document.getElementById("senha").value;
    var dt_nascimento = document.getElementById("date").value;
    var sexo = document.querySelector('input[name="genero"]:checked');
    var n_celular = document.getElementById("n_celular").value;

    if (nome == "") {
        alert("Digite seu nome.");
        document.getElementById("nome").focus();

    } else if (n_email == "") {
        alert("Coloque seu email.");
        document.getElementById("email").focus();

    } else if (nova_senha == "") {
        alert("Crie uma senha.");
        document.getElementById("criando_senha").focus();

    } else if (senha == "") {
        alert("Confirme a senha.");
        document.getElementById("senha").focus();

    } else if (nova_senha != senha) {
        alert("As senhas colocadas não são iguais.");
        document.getElementById("senha").focus();

    } else if (dt_nascimento == "") {
        alert("Informe a data de nascimento.");
        document.getElementById("date").focus();

    } else if (sexo == null) {
        alert("Informe seu gênero.");

    } else if (n_celular == "") {
        alert("Informe o número de seu celular.");
        document.getElementById("n_celular").focus();

    } else {
        sexo = sexo.value;

        fetch('https://site-jogo.onrender.com/getData')
            .then(response => response.json())
            .then(data => {

                let x = true;
                let count = 0;
                var emails = [];
                var cadastrar = true;

                while (x) {
                    try {
                        emails.push(data[count].email);
                        count += 1;
                    } catch {
                        x = false;
                    }
                }

                for (let i = 0; i < emails.length; i++) {
                    if (emails[i] == n_email) {
                        alert("Este email já está cadastrado!");
                        cadastrar = false;
                        break;
                    }
                }

                if(cadastrar){
                    var data = {
                        nome: nome,
                        email: n_email,
                        senha: senha,
                        dt_nascimento: dt_nascimento,
                        sexo: sexo,
                        n_celular: n_celular
                    };
    
                    fetch('https://site-jogo.onrender.com/cadastrar_user', {
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
    
                    open('../XGames.html');
                    close('cadastrar_user.html');
                }

            })
            .catch(error => console.error('Erro ao obter dados:', error));
    }
}