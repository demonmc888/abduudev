<button onclick="handleSearch()">Cari</button>

<script>
  function handleSearch() {
    const query = document.getElementById('searchInput').value.trim();
    if (query === '') {
      alert("Masukkan kata yang mau dicari!");
    } else {
      alert("Kamu mencari: " + query);
    }
  }
</script>

// Ambil data dari localStorage
let posts = JSON.parse(localStorage.getItem("posts") || "[]");
let currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
// Tampilkan semua postingan di feed
function renderFeed(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  posts.forEach((post, i) => {
    const el = document.createElement("div");
    el.className = "post";
    el.innerHTML = `
      <div class="post-header">
        <img src="${post.avatar || 'default-avatar.png'}" />
        <div class="username">${post.username}</div>
      </div>
      <div class="post-media">
        ${post.type === 'video'
          ? `<video src="${post.src}" controls></video>`
          : `<img src="${post.src}" />`}
      </div>
      <div class="post-actions">
        <div class="left-icons">
          <i onclick="likePost(${i})">${post.likes?.includes(currentUser?.email) ? "❤️" : "🤍"}</i>
          <i onclick="focusComment(${i})">💬</i>
        </div>
        <div>${post.likes?.length || 0} suka</div>
      </div>
      <div class="post-caption"><b>${post.username}</b> ${post.caption}</div>
      <div class="comment-box">
        <input type="text" placeholder="Tambahkan komentar..." id="comment-${i}">
        <button onclick="addComment(${i})">Kirim</button>
      </div>
    `;
    container.appendChild(el);
  });
}
// Tambahkan postingan baru
function addPost({ src, caption, type }) {
  if (!currentUser) return alert("Login dulu!");
  posts.push({
    src,
    caption,
    type,
    username: currentUser.username,
    avatar: currentUser.avatar,
    likes: [],
    comments: []
  });
  localStorage.setItem("posts", JSON.stringify(posts));
}
// Like postingan
function likePost(index) {
  if (!currentUser) return alert("Login dulu!");
  const likes = posts[index].likes || [];
  const email = currentUser.email;
  if (likes.includes(email)) {
    posts[index].likes = likes.filter(e => e !== email);
  } else {
    likes.push(email);
    posts[index].likes = likes;
  }
  localStorage.setItem("posts", JSON.stringify(posts));
  renderFeed("feed");
}
// Tambah komentar
function addComment(index) {
  if (!currentUser) return alert("Login dulu!");
  const input = document.getElementById("comment-" + index);
  const text = input.value.trim();
  if (!text) return;
  posts[index].comments = posts[index].comments || [];
  posts[index].comments.push({
    text,
    username: currentUser.username
  });
  localStorage.setItem("posts", JSON.stringify(posts));
  input.value = "";
  renderFeed("feed");
}
// Focus komentar
function focusComment(index) {
  document.getElementById("comment-" + index)?.focus();
}
// Simpan user login
function login(email, password) {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    alert("Login berhasil!");
    window.location.href = "feed.html";
  } else {
    alert("Email atau password salah!");
  }
}
// Daftar akun
function register(username, email, password, avatar) {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  if (users.find(u => u.email === email)) {
    alert("Email sudah digunakan!");
    return;
  }
  const newUser = { username, email, password, avatar };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  alert("Registrasi berhasil, silakan login.");
  window.location.href = "login.html";
}