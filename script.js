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