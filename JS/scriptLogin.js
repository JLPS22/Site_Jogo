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

        fetch('http://localhost:3000/getData')
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
                            open('XGames.html');
                            close('Login.html');
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
    var email = document.getElementById("email").value;
    var nova_senha = document.getElementById("criando_senha").value;
    var senha = document.getElementById("senha").value;

    if (nome == "") {
        alert("Digite seu nome.");
        document.getElementById("nome").focus();
    } else if (email == "") {
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
    } else {
        
        

    }
}