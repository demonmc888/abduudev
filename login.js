document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    document.getElementById("message").textContent = "Login berhasil! Mengalihkan...";
    setTimeout(() => window.location.href = "register.html", 1500);
  } else {
    document.getElementById("message").textContent = "Email atau password salah!";
  }
});