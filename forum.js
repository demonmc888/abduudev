const user = JSON.parse(localStorage.getItem("loggedInUser"));
if (!user) window.location.href = "index.html";

let threads = JSON.parse(localStorage.getItem("forumThreads")) || [];

if (document.getElementById("newThreadForm")) {
  // Menambahkan topik
  document.getElementById("newThreadForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const title = document.getElementById("threadTitle").value;
    const content = document.getElementById("threadContent").value;
    const id = Date.now();
    threads.push({ id, title, content, author: user.name, replies: [] });
    localStorage.setItem("forumThreads", JSON.stringify(threads));
    location.reload();
  });

  // Menampilkan daftar topik
  const list = document.getElementById("threadList");
  threads.reverse().forEach(thread => {
    const div = document.createElement("div");
    div.className = "bg-gray-800 p-4 rounded";
    div.innerHTML = `
      <a href="forum-thread.html?id=${thread.id}" class="text-xl font-bold text-blue-300 hover:underline">${thread.title}</a>
      <p class="text-sm text-gray-400">Oleh ${thread.author}</p>
    `;
    list.appendChild(div);
  });
}

if (window.location.href.includes("forum-thread.html")) {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  const thread = threads.find(t => t.id === id);

  if (thread) {
    document.getElementById("threadTitle").textContent = thread.title;
    document.getElementById("threadContent").textContent = thread.content;

    const replyList = document.getElementById("replies");
    thread.replies.forEach(reply => {
      const div = document.createElement("div");
      div.className = "bg-gray-800 p-3 rounded";
      div.innerHTML = `<p>${reply.text}</p><p class="text-sm text-gray-400 mt-1">— ${reply.user}</p>`;
      replyList.appendChild(div);
    });

    // Tambah balasan
    document.getElementById("replyForm").addEventListener("submit", function(e) {
      e.preventDefault();
      const replyText = document.getElementById("replyInput").value;
      thread.replies.push({ text: replyText, user: user.name });
      localStorage.setItem("forumThreads", JSON.stringify(threads));
      location.reload();
    });
  }
}