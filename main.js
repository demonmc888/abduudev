const transactions = [];

const form = document.getElementById('transaction-form');
const list = document.getElementById('transaction-list');
const balanceDisplay = document.getElementById('balance');
const incomeDisplay = document.getElementById('income');
const expenseDisplay = document.getElementById('expense');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const desc = document.getElementById('description').value;
  const rawAmount = document.getElementById('amount').value.replace(/[^0-9.-]+/g, '');
  const amount = parseFloat(rawAmount);
  const category = document.getElementById('category').value;

  if (!desc || isNaN(amount)) return;

  transactions.push({ desc, amount, category, date: new Date() });
  form.reset();
  render();
});

function render() {
  list.innerHTML = '';
  let income = 0, expense = 0;

  transactions.forEach((tx) => {
    const item = document.createElement('div');
    item.className = `flex justify-between items-center p-2 border rounded ${tx.amount > 0 ? 'bg-blue-50' : 'bg-red-50'}`;
    item.innerHTML = `
      <div>
        <p class="font-semibold">${tx.desc}</p>
        <p class="text-sm text-gray-500">${tx.category}</p>
      </div>
      <div class="text-right">
        <p class="${tx.amount > 0 ? 'text-blue-600' : 'text-red-600'}">Rp ${tx.amount.toLocaleString('id-ID')}</p>
      </div>
    `;
    list.appendChild(item);

    if (tx.amount > 0) income += tx.amount;
    else expense += tx.amount;
  });

  incomeDisplay.textContent = `Rp ${income.toLocaleString('id-ID')}`;
  expenseDisplay.textContent = `Rp ${Math.abs(expense).toLocaleString('id-ID')}`;
  balanceDisplay.textContent = `Rp ${(income + expense).toLocaleString('id-ID')}`;

  updateChart(income, Math.abs(expense));
}

// Grafik
const ctx = document.getElementById('finance-chart').getContext('2d');
const financeChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Pemasukan', 'Pengeluaran'],
    datasets: [{
      label: 'Keuangan',
      data: [0, 0],
      backgroundColor: ['#3b82f6', '#ef4444'],
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  }
});

function updateChart(income, expense) {
  financeChart.data.datasets[0].data = [income, expense];
  financeChart.update();
}