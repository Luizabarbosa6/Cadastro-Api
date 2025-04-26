document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://cadastro-api-pyio.onrender.com/api/users'; // Atualize para sua API

    const form = document.querySelector('.form');

    // Função para adicionar usuário
    const addUser = async (user) => {
        try {
            await fetch(`${apiUrl}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            alert('Usuário cadastrado com sucesso!');
            console.log('Redirecionando para o login...');
            window.location.replace('login.html'); // Tente usar replace em vez de href
        } catch (error) {
            console.error('Erro ao adicionar usuário:', error);
            alert('Erro ao cadastrar usuário.');
        }
    };
    
    // Evento de envio do formulário
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const userData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('senha').value
        };

        if (!userData.name || !userData.email || !userData.password) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        await addUser(userData);
    });
});
