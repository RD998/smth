const API_BASE = "https://pathfinder-backend-2u7u.onrender.com";

function showForm(which) {
    document.getElementById('loginForm').classList.toggle('hidden', which !== 'login');
    document.getElementById('signupForm').classList.toggle('hidden', which !== 'signup');
    document.getElementById('loginTab').classList.toggle('active', which === 'login');
    document.getElementById('signupTab').classList.toggle('active', which === 'signup');
    document.getElementById('message').textContent = '';
}

function showMessage(text, isError) {
    const el = document.getElementById('message');
    el.textContent = text;
    el.className = isError ? 'error' : 'success';
}

document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const res = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();

        if (!res.ok) {
            showMessage(data.detail || 'Login failed', true);
            return;
        }

        // Store user_id in localStorage for your application's booking/dashboard flows
        localStorage.setItem('user_id', data.id);
        
        showMessage(`Welcome, ${data.name}!\nRedirecting...`, false);
        
        // Redirect to your preferences/facility selection page after a short moment
        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 1000);

    } catch (err) {
        showMessage('Could not reach the server', true);
    }
});

document.getElementById('signupForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    try {
        const res = await fetch(`${API_BASE}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        const data = await res.json();

        if (!res.ok) {
            showMessage(data.detail || 'Signup failed', true);
            return;
        }

        showMessage(`Account created for ${data.name}. You can now log in.`, false);
        showForm('login');
    } catch (err) {
        showMessage('Could not reach the server', true);
    }
});