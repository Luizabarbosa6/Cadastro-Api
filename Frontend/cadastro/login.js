document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('entrarBtn');

    loginBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('senha').value;

        try {
            const response = await fetch('http://localhost:3000/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                // redirect RELATIVO, pois login.html está em cadastro/
                window.location.href = '../index.html';
            } else {
                const errorData = await response.json();
                alert('Erro: ' + errorData.message);
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            alert('Erro ao fazer login');
        }
    });
});
