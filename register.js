document.getElementById("registerForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.some(u => u.email === email)) {
    document.getElementById("message").textContent = "Email sudah terdaftar!";
    return;
  }

  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  document.getElementById("message").textContent = "Registrasi berhasil! Arahkan ke login...";
  setTimeout(() => window.location.href = "index.html", 1500);
});