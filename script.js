document.addEventListener('DOMContentLoaded', () => {
    const dataForm = document.getElementById('data-form');
    const goalForm = document.getElementById('goal-form');
    const notification = document.getElementById('notification');
    const goalNotification = document.getElementById('goal-notification');

    // Load data from local storage
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    let goals = JSON.parse(localStorage.getItem('goals')) || [];

    // Add transaction
    if (dataForm) {
        dataForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const type = document.getElementById('type').value;
            const amount = parseFloat(document.getElementById('amount').value);
            const description = document.getElementById('description').value;

            const transaction = { type, amount, description };
            transactions.push(transaction);
            localStorage.setItem('transactions', JSON.stringify(transactions));

            notification.textContent = 'Data added successfully!';
            notification.classList.remove('hidden');

            setTimeout(() => {
                notification.classList.add('hidden');
            }, 3000);

            dataForm.reset();
        });
    }

    // Set goals
    if (goalForm) {
        goalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const goalType = document.getElementById('goal-type').value;
            const goalAmount = parseFloat(document.getElementById('goal-amount').value);

            const goal = { goalType, goalAmount };
            goals.push(goal);
            localStorage.setItem('goals', JSON.stringify(goals));

            goalNotification.textContent = 'Goal set successfully!';
            goalNotification.classList.remove('hidden');

            setTimeout(() => {
                goalNotification.classList.add('hidden');
            }, 3000);

            goalForm.reset();
        });
    }

    // Display reports
    if (window.location.pathname.includes('reports.html')) {
        const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
        const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
        const totalSavings = transactions.filter(t => t.type === 'savings').reduce((sum, t) => sum + t.amount, 0);

        document.getElementById('total-income').textContent = totalIncome.toFixed(2);
        document.getElementById('total-expenses').textContent = totalExpenses.toFixed(2);
        document.getElementById('total-savings').textContent = totalSavings.toFixed(2);

        const ctx = document.getElementById('financial-chart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Income', 'Expenses', 'Savings'],
                datasets: [{
                    label: 'Amount ($)',
                    data: [totalIncome, totalExpenses, totalSavings],
                    backgroundColor: ['#4CAF50', '#FF5722', '#2196F3']
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginNotification = document.getElementById('login-notification');
    const registerNotification = document.getElementById('register-notification');

    // Load users from local storage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Handle login
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const user = users.find(u => u.username === username && u.password === password);

            if (user) {
                localStorage.setItem('loggedInUser', username);
                loginNotification.textContent = 'Login successful!';
                loginNotification.classList.remove('hidden');

                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            } else {
                loginNotification.textContent = 'Invalid username or password.';
                loginNotification.classList.remove('hidden');
            }
        });
    }

    // Handle registration
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newUsername = document.getElementById('new-username').value;
            const newPassword = document.getElementById('new-password').value;

            const existingUser = users.find(u => u.username === newUsername);

            if (existingUser) {
                registerNotification.textContent = 'Username already exists.';
                registerNotification.classList.remove('hidden');
            } else {
                users.push({ username: newUsername, password: newPassword });
                localStorage.setItem('users', JSON.stringify(users));

                registerNotification.textContent = 'Registration successful!';
                registerNotification.classList.remove('hidden');

                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1500);
            }
        });
    }

    // Redirect to login if not logged in
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser && !window.location.pathname.includes('login.html') && !window.location.pathname.includes('register.html')) {
        window.location.href = 'login.html';
    }
});
// Redirect to login if not logged in
const loggedInUser = localStorage.getItem('loggedInUser');
if (!loggedInUser && !window.location.pathname.includes('login.html') && !window.location.pathname.includes('register.html')) {
    window.location.href = 'login.html';
}
document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logout-btn');
    const usernameDisplay = document.getElementById('username-display');

    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        usernameDisplay.textContent = loggedInUser;
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('loggedInUser');
            window.location.href = 'login.html';
        });
    }
});