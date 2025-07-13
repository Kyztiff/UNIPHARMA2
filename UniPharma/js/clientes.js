document.addEventListener("DOMContentLoaded", function () {
    const formCadastroCliente = document.getElementById("formCadastroCliente");
    const mensagemDiv = document.getElementById("mensagem");
    const cpfInput = document.getElementById("cpfCliente");
    const telefoneInput = document.getElementById("telefoneCliente");
    const btnCancelarCadastro = document.getElementById("btnCancelarCadastro");

    // Função para exibir mensagem (sucesso/erro)
    function exibirMensagem(texto, tipo) {
        mensagemDiv.textContent = texto;
        mensagemDiv.className = `mensagem ${tipo}`; // Adiciona classe 'sucesso' ou 'erro'
        mensagemDiv.style.display = 'block';

        // Esconde a mensagem após 5 segundos
        setTimeout(() => {
            mensagemDiv.style.display = 'none';
            mensagemDiv.textContent = '';
            mensagemDiv.className = 'mensagem';
        }, 5000);
    }

    // Máscara para CPF: 000.000.000-00
    if (cpfInput) {
        cpfInput.addEventListener("input", function (e) {
            let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
            if (value.length > 11) value = value.slice(0, 11); // Limita a 11 dígitos para o CPF

            if (value.length > 9) {
                value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
            } else if (value.length > 6) {
                value = value.replace(/^(\d{3})(\d{3})(\d{3})$/, '$1.$2.$3');
            } else if (value.length > 3) {
                value = value.replace(/^(\d{3})(\d{3})$/, '$1.$2');
            } else if (value.length > 0) {
                value = value.replace(/^(\d{3})$/, '$1');
            }
            e.target.value = value;
        });
    }

    // Máscara para Telefone: (00) 00000-0000 ou (00) 0000-0000
    if (telefoneInput) {
        telefoneInput.addEventListener("input", function (e) {
            let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
            
            if (value.length > 11) value = value.slice(0, 11); // Limita a 11 dígitos (incluindo DDD e 9º dígito)

            if (value.length === 11) { // Formato (XX) XXXXX-XXXX
                value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
            } else if (value.length === 10) { // Formato (XX) XXXX-XXXX (para fixo ou antigo padrão)
                value = value.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
            } else if (value.length > 6) {
                value = value.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
            } else if (value.length > 2) {
                value = value.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
            } else if (value.length > 0) {
                value = value.replace(/^(\d{0,2})$/, '($1');
            }
            e.target.value = value;
        });
    }

    // Evento de submit do formulário
    if (formCadastroCliente) {
        formCadastroCliente.addEventListener("submit", function (event) {
            event.preventDefault(); // Impede o envio padrão do formulário

            // Coleta os dados do formulário
            const nome = document.getElementById("nomeCliente").value.trim();
            const cpf = document.getElementById("cpfCliente").value.trim();
            const telefone = document.getElementById("telefoneCliente").value.trim();
            const email = document.getElementById("emailCliente").value.trim();
            const endereco = document.getElementById("enderecoCliente").value.trim();

            // Validações básicas
            if (!nome || !cpf) {
                exibirMensagem("Por favor, preença os campos obrigatórios (Nome e CPF).", "erro");
                return;
            }

            // Simulação de envio de dados (em um sistema real, você enviaria para um backend)
            console.log("Dados do Cliente a serem salvos:");
            console.log("Nome:", nome);
            console.log("CPF:", cpf);
            console.log("Telefone:", telefone);
            console.log("E-mail:", email);
            console.log("Endereço:", endereco);

            // Simula um salvamento bem-sucedido
            exibirMensagem("Cliente cadastrado com sucesso!", "sucesso");

            // Limpa o formulário após o "cadastro"
            formCadastroCliente.reset();
        });
    }

    // Evento do botão Cancelar
    if (btnCancelarCadastro) {
        btnCancelarCadastro.addEventListener("click", function () {
            // Redireciona para a página principal (dashboard.html ou a que você preferir)
            window.location.href = "dashboard.html"; 
        });
    }
});