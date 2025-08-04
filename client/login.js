// client/login.js
document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;

  fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, role })
  })
  .then(res => res.json())
  .then(data => {
    if (data.message === 'Login successful') {
      if (data.role === 'User') {
        window.location.href = '/user.html';
      } else if (data.role === 'Admin') {
        window.location.href = '/admin.html';
      }
    } else {
      alert(data.message);
    }
  })
  .catch(error => {
    console.error('Login failed:', error);
    alert('Something went wrong. Try again.');
  });
});
