function mostrarSection(id) {
  document.getElementById("select-none").style.display = "none";
  document.getElementById("reserva").style.display = "none";
  document.getElementById("juros-compostos").style.display = "none";

  // Esconde a tabela sempre que mudar de seção
  document.getElementById("tabelaInvestimento").style.display = "none";

  document.getElementById(id).style.display = "block";

  // Se o usuário abrir a seção de reserva, carregar dados salvos
  if (id === "reserva") {
    carregarDados();
  }
}

function abrirModal() {
  document.getElementById("modalGastos").style.display = "flex";
}

function fecharModal() {
  document.getElementById("modalGastos").style.display = "none";
}

// Função para salvar dados no localStorage
function salvarDados(reserva, investimentoMensal, meses, valoresForm) {
  const dados = { reserva, investimentoMensal, meses, valoresForm };
  localStorage.setItem("dadosReserva", JSON.stringify(dados));
}

// Função para carregar dados do localStorage
function carregarDados() {
  const dados = localStorage.getItem("dadosReserva");
  if (dados) {
    const { reserva, investimentoMensal, meses, valoresForm } =
      JSON.parse(dados);

    // Só exibe se houver valores salvos
    if (reserva > 0 && investimentoMensal > 0) {
      document.getElementById("valorReserva").textContent =
        `R$ ${reserva.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
      document.getElementById("valorInvestimento").textContent =
        `R$ ${investimentoMensal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
      document.getElementById("tempoEstimado").textContent =
        `${meses} meses (${(meses / 12).toFixed(1)} anos)`;

      document.getElementById("resultadoReserva").style.display = "grid";
    } else {
      document.getElementById("resultadoReserva").style.display = "none";
    }

    // Preenche os campos do formulário com os valores salvos
    const inputs = document.querySelectorAll("#formGastos input[type=number]");
    inputs.forEach((input, index) => {
      input.value = valoresForm[index] || "";
    });
  } else {
    // Se não houver nada salvo, mantém escondido
    document.getElementById("resultadoReserva").style.display = "none";
  }
}

// --- Reserva de Emergência ---
document.getElementById("formGastos").addEventListener("submit", function (e) {
  e.preventDefault();

  const inputs = document.querySelectorAll("#formGastos input[type=number]");
  let soma = 0;
  let investimentoMensal = 0;
  const valoresForm = [];

  inputs.forEach((input) => {
    const valor = Number(input.value) || 0;
    valoresForm.push(valor);
    if (input.name === "investimento") {
      investimentoMensal = valor;
    } else {
      soma += valor;
    }
  });

  const reserva = soma * 6;

  let saldo = 0;
  let meses = 0;
  const taxa = 0.01;

  while (saldo < reserva && meses < 600) {
    saldo = saldo * (1 + taxa) + investimentoMensal;
    meses++;
  }

  // Preenche resultados
  document.getElementById("valorReserva").textContent =
    `R$ ${reserva.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
  document.getElementById("valorInvestimento").textContent =
    `R$ ${investimentoMensal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
  document.getElementById("tempoEstimado").textContent =
    `${meses} meses (${(meses / 12).toFixed(1)} anos)`;

  document.getElementById("resultadoReserva").style.display = "grid";

  // Salva tudo no localStorage
  salvarDados(reserva, investimentoMensal, meses, valoresForm);

  fecharModal();
  document.getElementById("reserva").style.display = "block";
});

// --- Simulador de Investimento ---
document
  .getElementById("formInvestimento")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validarInputsInvestimento()) {
      return;
    }

    const inicial =
      Number(document.querySelector("[name='inicial']").value) || 0;
    const mensal = Number(document.querySelector("[name='mensal']").value) || 0;
    const prazo = Number(document.querySelector("[name='prazo']").value) || 0;
    const prazoBtn = document.querySelector(".dropdown-prazo-btn");
    const prazoTipo = prazoBtn ? prazoBtn.dataset.value : "anos";
    const rentabilidade =
      Number(document.querySelector("[name='rentabilidade']").value) || 0;
    const rentabilidadeBtn = document.querySelector(
      ".dropdown-rentabilidade-btn",
    );
    const rentabilidadeTipo = rentabilidadeBtn
      ? rentabilidadeBtn.dataset.value
      : "anual";

    const tipo = document.querySelector("[name='tipo']:checked").value;
    const indexacao = document.querySelector(
      "[name='indexacao']:checked",
    ).value;

    const meses = prazoTipo === "anos" ? prazo * 12 : prazo;

    let taxaMensal;
    if (indexacao === "pos") {
      const cdiAnual = 14.4; // exemplo
      const percentualCDI = rentabilidade / 100;
      taxaMensal = Math.pow(1 + (cdiAnual / 100) * percentualCDI, 1 / 12) - 1;
    } else {
      if (rentabilidadeTipo === "anual") {
        taxaMensal = Math.pow(1 + rentabilidade / 100, 1 / 12) - 1;
      } else {
        taxaMensal = rentabilidade / 100;
      }
    }

    // Cálculo de juros compostos
    let saldo = inicial;
    for (let i = 1; i <= meses; i++) {
      saldo = saldo * (1 + taxaMensal) + mensal;
    }

    const valorInvestido = inicial + mensal * meses;
    const jurosRecebidos = saldo - valorInvestido;

    let impostos = 0;
    let valorLiquido = saldo;

    if (tipo === "cdb" || tipo === "tesouro") {
      let aliquota;
      if (meses <= 6) aliquota = 0.225;
      else if (meses <= 12) aliquota = 0.2;
      else if (meses <= 24) aliquota = 0.175;
      else aliquota = 0.15;

      impostos = jurosRecebidos * aliquota;
      valorLiquido = saldo - impostos;
    }

    // Exibir resultados finais
    document.getElementById("valorBruto").textContent =
      `R$ ${saldo.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    document.getElementById("valorLiquido").textContent =
      `R$ ${valorLiquido.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    document.getElementById("valorInvestido").textContent =
      `R$ ${valorInvestido.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    document.getElementById("jurosRecebidos").textContent =
      `R$ ${jurosRecebidos.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    document.getElementById("impostos").textContent =
      tipo === "lci"
        ? "Isento"
        : `R$ ${impostos.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    document.getElementById("resultadoInvestimento").style.display = "block";
    document.getElementById("formInvestimento").style.display = "none";

    // --- Gerar tabela mês a mês ---
    const tabelaBody = document.getElementById("tabelaBody");
    tabelaBody.innerHTML = "";

    let saldoTabela = inicial;
    let totalJuros = 0;

    for (let i = 1; i <= meses; i++) {
      const jurosMes = saldoTabela * taxaMensal;
      saldoTabela = saldoTabela * (1 + taxaMensal) + mensal;
      totalJuros += jurosMes;

      const totalInvestidoMes = inicial + mensal * i;

      const row = `
      <tr>
        <td>${i}</td>
        <td>R$ ${jurosMes.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
        <td>R$ ${totalInvestidoMes.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
        <td>R$ ${totalJuros.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
        <td>R$ ${saldoTabela.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
      </tr>
    `;
      tabelaBody.insertAdjacentHTML("beforeend", row);
    }

    document.getElementById("tabelaInvestimento").style.display = "block";
  });

// --- Dropdowns ---
function configurarDropdown(classeDropdown) {
  const dropdown = document.querySelector(classeDropdown);
  const btn = dropdown.querySelector("button");
  const options = dropdown.querySelectorAll(".dropdown-content div");

  btn.dataset.value = btn.textContent.toLowerCase();

  btn.addEventListener("click", () => {
    dropdown.classList.toggle("show");
  });

  options.forEach((opt) => {
    opt.addEventListener("click", () => {
      btn.textContent = opt.textContent;
      btn.dataset.value = opt.dataset.value;
      dropdown.classList.remove("show");
      atualizarPlaceholder();
    });
  });

  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("show");
    }
  });
}

function validarInputsInvestimento() {
  const inicial = document.querySelector("[name='inicial']").value;
  const mensal = document.querySelector("[name='mensal']").value;
  const prazo = document.querySelector("[name='prazo']").value;
  const rentabilidade = document.querySelector("[name='rentabilidade']").value;

  // Verifica se algum campo está vazio
  if (!inicial || !mensal || !prazo || !rentabilidade) {
    alert("Por favor, preencha todos os campos antes de calcular.");
    return false;
  }
  return true;
}

configurarDropdown(".dropdown"); // prazo
configurarDropdown(".dropdown-rentabilidade"); // rentabilidade

function atualizarPlaceholder() {
  const prazoInput = document.getElementById("prazoInput");
  const prazoTipo = document.querySelector(".dropdown-btn").dataset.value;
  const rentabilidadeInput = document.getElementById("rentabilidadeInput");
  const rentabilidadeBtn = document.querySelector(
    ".dropdown-rentabilidade-btn",
  );
  const rentabilidadeTipo = rentabilidadeBtn
    ? rentabilidadeBtn.dataset.value
    : "anual";

  const indexacao = document.querySelector("[name='indexacao']:checked").value;

  prazoInput.placeholder = prazoTipo === "anos" ? "Ex: 2 anos" : "Ex: 24 meses";

  if (indexacao === "pos") {
    rentabilidadeInput.placeholder = "% do CDI";
    rentabilidadeInput.disabled = false;
    document.querySelector(".dropdown-rentabilidade").style.display = "none";
    document.getElementById("cdiInfo").style.display = "inline-block";
  } else {
    rentabilidadeInput.placeholder =
      rentabilidadeTipo === "anual" ? "Ex: 12% ao ano" : "Ex: 1% ao mês";
    document.querySelector(".dropdown-rentabilidade").style.display =
      "inline-block";
    document.getElementById("cdiInfo").style.display = "none";
  }
}

document.getElementById("btnRecalcular").addEventListener("click", function () {
  // Resetar formulário
  const form = document.getElementById("formInvestimento");
  form.reset();

  // Mostrar novamente o formulário
  form.style.display = "flex";

  // Esconder resultados e tabela
  document.getElementById("resultadoInvestimento").style.display = "none";
  document.getElementById("tabelaInvestimento").style.display = "none";

  // Limpar tabela
  document.getElementById("tabelaBody").innerHTML = "";

  // Resetar placeholders corretamente
  atualizarPlaceholder();
});

// Inicializa placeholders corretos
atualizarPlaceholder();

// Atualiza placeholder quando mudar indexação
document.querySelectorAll("[name='indexacao']").forEach((radio) => {
  radio.addEventListener("change", atualizarPlaceholder);
});
