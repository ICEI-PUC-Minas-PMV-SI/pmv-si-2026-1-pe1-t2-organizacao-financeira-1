lucide.createIcons();

let isLoginMode = true;
let currentUser = null;
let transactions = [];
let monthlyGoal = 0;
let editingTransactionId = null;

const categoryConfig = {
  Moradia: { icon: "home", type: "expense" },
  Alimentação: { icon: "coffee", type: "expense" },
  Transporte: { icon: "car", type: "expense" },
  Lazer: { icon: "gamepad-2", type: "expense" },
  Saúde: { icon: "activity", type: "expense" },
  Salário: { icon: "dollar-sign", type: "income" },
  Investimentos: { icon: "trending-up", type: "income" },
  Outros: { icon: "tag", type: "both" },
};

document.addEventListener("DOMContentLoaded", () => {
  const loggedEmail = localStorage.getItem("finapp_logged_user");
  if (loggedEmail) {
    const savedUser = JSON.parse(
      localStorage.getItem(`finapp_user_${loggedEmail}`),
    );
    if (savedUser) {
      currentUser = savedUser;
      initDashboard();
    }
  }
});

function toggleAuthMode() {
  isLoginMode = !isLoginMode;
  document.getElementById("username").classList.toggle("hidden");
  document.getElementById("username").required = !isLoginMode;
  document.getElementById("auth-btn").innerText = isLoginMode
    ? "Entrar no FinApp"
    : "Criar minha conta";
  document.getElementById("toggle-auth").innerText = isLoginMode
    ? "Ainda não tem conta? Cadastre-se"
    : "Já tem conta? Faça Login";
}

function handleAuth(e) {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();

  if (isLoginMode) {
    const savedUser = JSON.parse(localStorage.getItem(`finapp_user_${email}`));
    if (
      savedUser &&
      savedUser.password === document.getElementById("password").value
    ) {
      currentUser = savedUser;
      localStorage.setItem("finapp_logged_user", email);
      initDashboard();
    } else {
      alert("Credenciais incorretas ou usuário não existe.");
    }
  } else {
    const name = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    currentUser = { name, email, password };
    localStorage.setItem(`finapp_user_${email}`, JSON.stringify(currentUser));
    localStorage.setItem("finapp_logged_user", email);
    initDashboard();
  }
}

function logout() {
  currentUser = null;
  transactions = [];
  monthlyGoal = 0;
  editingTransactionId = null;

  localStorage.removeItem("finapp_logged_user");

  document.getElementById("dashboard-view").classList.add("hidden");
  document.getElementById("auth-view").classList.remove("hidden");

  const authForm = document.getElementById("auth-form");
  if(authForm) authForm.reset();
  
  const transForm = document.getElementById("transaction-form");
  if(transForm) transForm.reset();
  
  const goalForm = document.getElementById("goal-form");
  if(goalForm) goalForm.reset();

  if(document.getElementById("goal-fill")) {
    document.getElementById("goal-fill").style.width = "0%";
    document.getElementById("goal-percentage").innerText = "0%";
    document.getElementById("monthly-goal").value = "";
    document.getElementById("alerts-container").innerHTML = "";
    document.getElementById("category-chart").innerHTML = "";
    document.getElementById("transactions-list").innerHTML = "";
  }
}

function initDashboard() {
  document.getElementById("auth-view").classList.add("hidden");
  document.getElementById("dashboard-view").classList.remove("hidden");

  const nameDisplay = document.getElementById("user-name-display");
  if(nameDisplay) nameDisplay.innerText = currentUser.name.split(" ")[0];

  const savedData = JSON.parse(
    localStorage.getItem(`finapp_data_${currentUser.email}`),
  ) || { transactions: [], goal: 0 };
  transactions = savedData.transactions || [];
  monthlyGoal = savedData.goal || 0;

  const monthlyGoalInput = document.getElementById("monthly-goal");
  if(monthlyGoalInput) monthlyGoalInput.value = monthlyGoal > 0 ? monthlyGoal : "";

  updateCategoryOptions();
  updateUI();
}

function saveData() {
  localStorage.setItem(
    `finapp_data_${currentUser.email}`,
    JSON.stringify({ transactions, goal: monthlyGoal }),
  );
}

function updateCategoryOptions() {
  const typeSelect = document.getElementById("trans-type");
  const categorySelect = document.getElementById("trans-category");
  
  if (!typeSelect || !categorySelect) return; 

  const type = typeSelect.value;
  categorySelect.innerHTML = "";

  for (const [cat, config] of Object.entries(categoryConfig)) {
    if (config.type === type || config.type === "both") {
      categorySelect.innerHTML += `<option value="${cat}">${cat}</option>`;
    }
  }
}

function addTransaction(e) {
  e.preventDefault();
  const type = document.getElementById("trans-type").value;
  const amount = parseFloat(document.getElementById("trans-amount").value);
  const category = document.getElementById("trans-category").value;
  const desc = document.getElementById("trans-desc").value;

  if (editingTransactionId) {
    const index = transactions.findIndex(t => t.id === editingTransactionId);
    if(index !== -1) {
      transactions[index] = { ...transactions[index], type, amount, category, desc };
    }
    cancelEdit(); 
  } else {
    const newTransaction = {
      id: Date.now(),
      type,
      amount,
      category,
      desc,
      date: new Intl.DateTimeFormat("pt-BR").format(new Date()),
    };
    transactions.unshift(newTransaction);
    document.getElementById("transaction-form").reset();
  }

  saveData();
  updateCategoryOptions();
  updateUI();
}

function editTransaction(id) {
  const t = transactions.find(t => t.id === id);
  if (!t) return;
  
  editingTransactionId = id;
  
  document.getElementById("trans-type").value = t.type;
  updateCategoryOptions(); 
  
  document.getElementById("trans-amount").value = t.amount;
  document.getElementById("trans-category").value = t.category;
  document.getElementById("trans-desc").value = t.desc;

  document.getElementById("submit-btn").innerText = "Atualizar";
  document.getElementById("cancel-edit-btn").classList.remove("hidden");
}

function cancelEdit() {
  editingTransactionId = null;
  document.getElementById("transaction-form").reset();
  updateCategoryOptions();
  document.getElementById("submit-btn").innerText = "Adicionar";
  document.getElementById("cancel-edit-btn").classList.add("hidden");
}

function deleteTransaction(id) {
  if (confirm("Tem certeza que deseja excluir esta transação?")) {
    transactions = transactions.filter(t => t.id !== id);
    saveData();
    updateUI();
  }
}

function setGoal(e) {
  e.preventDefault();
  monthlyGoal = parseFloat(document.getElementById("monthly-goal").value);
  saveData();
  updateUI();
}

function updateUI() {
  const listEl = document.getElementById("transactions-list");
  
  if (!listEl) {
    lucide.createIcons();
    return;
  }

  let income = 0;
  let expense = 0;
  let expenseByCategory = {};
  listEl.innerHTML = "";

  transactions.forEach((t) => {
    if (t.type === "income") {
      income += t.amount;
    } else {
      expense += t.amount;
      expenseByCategory[t.category] =
        (expenseByCategory[t.category] || 0) + t.amount;
    }

    const isIncome = t.type === "income";
    const colorClass = isIncome ? "text-success" : "text-error";
    const operator = isIncome ? "+" : "-";
    const iconName = categoryConfig[t.category]?.icon || "tag";

    listEl.innerHTML += `
      <div class="transaction-item flex-between">
        <div class="flex-center-gap">
          <div class="transaction-icon-box"><i data-lucide="${iconName}"></i></div>
          <div>
            <p><strong>${t.desc}</strong></p>
            <p class="caption">${t.category} • ${t.date}</p>
          </div>
        </div>
        <div class="flex-center-gap">
          <div class="${colorClass} font-bold mr-2">
            ${operator} R$ ${t.amount.toFixed(2)}
          </div>
          <div class="transaction-actions">
            <button onclick="editTransaction(${t.id})" class="btn-icon text-warning" title="Editar"><i data-lucide="edit-2"></i></button>
            <button onclick="deleteTransaction(${t.id})" class="btn-icon text-error" title="Excluir"><i data-lucide="trash-2"></i></button>
          </div>
        </div>
      </div>
    `;
  });

  if (transactions.length === 0)
    listEl.innerHTML = '<p class="caption">Nenhuma transação ainda.</p>';

  const balance = income - expense;

  document.getElementById("total-balance").innerText = `R$ ${balance.toFixed(2)}`;
  document.getElementById("total-income").innerText = `R$ ${income.toFixed(2)}`;
  document.getElementById("total-expense").innerText = `R$ ${expense.toFixed(2)}`;

  renderAlerts(balance, expense, income);
  renderCategoryChart(expenseByCategory, expense);

  lucide.createIcons();
}

function renderAlerts(balance, expense, income) {
  const alertsContainer = document.getElementById("alerts-container");
  alertsContainer.innerHTML = "";

  if (monthlyGoal > 0) {
    const percent = (expense / monthlyGoal) * 100;
    document.getElementById("goal-percentage").innerText =
      `${Math.min(percent, 100).toFixed(1)}%`;

    const fillEl = document.getElementById("goal-fill");
    fillEl.style.width = `${Math.min(percent, 100)}%`;

    if (percent >= 100) {
      fillEl.style.backgroundColor = "var(--danger)";
      alertsContainer.innerHTML += `<div class="alert-box alert-danger"><i data-lucide="alert-triangle"></i> <strong>Atenção!</strong> Você ultrapassou 100% da sua meta de gastos deste mês.</div>`;
    } else if (percent >= 80) {
      fillEl.style.backgroundColor = "var(--warning)";
      alertsContainer.innerHTML += `<div class="alert-box alert-warning"><i data-lucide="alert-circle"></i> <strong>Cuidado:</strong> Você já consumiu ${percent.toFixed(1)}% do seu limite mensal.</div>`;
    } else {
      fillEl.style.backgroundColor = "var(--primary)";
    }
  } else {
    document.getElementById("goal-percentage").innerText = "0%";
    document.getElementById("goal-fill").style.width = "0%";
  }

  if (balance > 0 && income > 0) {
    const savedPercent = (balance / income) * 100;
    if (savedPercent >= 20) {
      alertsContainer.innerHTML += `<div class="alert-box alert-tip"><i data-lucide="trending-up"></i> <strong>Excelente!</strong> Você poupou ${savedPercent.toFixed(1)}% da sua renda. Que tal investir esse valor?</div>`;
    }
  } else if (balance < 0) {
    alertsContainer.innerHTML += `<div class="alert-box alert-danger"><i data-lucide="trending-down"></i> <strong>Dica:</strong> Seu saldo está negativo. Tente revisar a aba de "Despesas por Categoria" para cortar gastos não essenciais.</div>`;
  }
}

function renderCategoryChart(expenseByCategory, totalExpense) {
  const chartContainer = document.getElementById("category-chart");
  if (totalExpense === 0) {
    chartContainer.innerHTML =
      '<p class="caption text-center">Nenhuma despesa registrada para gerar gráficos.</p>';
    return;
  }

  chartContainer.innerHTML = "";

  const sortedCategories = Object.entries(expenseByCategory).sort(
    (a, b) => b[1] - a[1],
  );

  let chartHTML = "";

  const baseValue = (monthlyGoal > 0) ? monthlyGoal : totalExpense;

  sortedCategories.forEach(([cat, amount]) => {
    const percentage = (amount / baseValue) * 100;
    const visualWidth = Math.min(percentage, 100);
    const iconName = categoryConfig[cat]?.icon || "tag";

    chartHTML += `
      <div class="category-bar-row">
        <div class="cat-label caption">
          <i data-lucide="${iconName}" style="width: 16px; height: 16px;"></i> ${cat}
        </div>
        <div class="cat-bar-bg">
          <div class="cat-bar-fill" style="width: ${visualWidth}%;"></div>
        </div>
        <div class="cat-amount text-error">R$ ${amount.toFixed(2)}</div>
      </div>
    `;
  });

  chartContainer.innerHTML = chartHTML;
  lucide.createIcons();
}
