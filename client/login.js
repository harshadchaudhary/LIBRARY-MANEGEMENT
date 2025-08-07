document.getElementById('loginForm').addEventListener('submit', function (e)
 {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const role = document.getElementById('role').value;

  fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, role })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      // Store login session data
      localStorage.setItem('loggedInUser', JSON.stringify(data.user));

      // Redirect to the respective dashboard
      if (data.user.role === 'Admin') {
        window.location.href = 'admin-dashboard.html';
      } else if (data.user.role === 'User') {
        window.location.href = 'user-dashboard.html';
      } else {
        alert('Unknown role');
      }
    } else {
      alert(data.message || 'Login failed');
    }
  })
  .catch(error => {
    console.error('Login error:', error);
    alert('Something went wrong. Try again.');
  });
});
