// client/script.js

// 🔐 REGISTER
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      role: document.getElementById("role").value,
    };

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      alert(result.message);
      if (res.ok) window.location.href = "login.html";
    } catch (err) {
      console.error("Registration error:", err);
      alert("Error occurred during registration");
    }
  });
}

// 🔐 LOGIN
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      role: document.getElementById("role").value,
    };

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      alert(result.message);
      if (res.ok) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("role", result.role);
        window.location.href = "dashboard.html";
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed");
    }
  });
}

// 📚 DASHBOARD: Fetch Books (dummy for now)
const booksList = document.getElementById("booksList");
if (booksList) {
  const dummyBooks = [
    { title: "The Alchemist", author: "Paulo Coelho" },
    { title: "1984", author: "George Orwell" },
    { title: "Atomic Habits", author: "James Clear" },
  ];

  dummyBooks.forEach((book) => {
    const card = document.createElement("div");
    card.className = "book-card";
    card.innerHTML = `<h3>${book.title}</h3><p>by ${book.author}</p>`;
    booksList.appendChild(card);
  });
}
