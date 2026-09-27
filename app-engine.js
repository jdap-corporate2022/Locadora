// app-engine.js - Motor de Cálculo Automático do MotoFácil

function calcularEAtualizarDashboard() {
  // Configurações do Contrato de Carlos Eduardo Silva
  const DATA_INICIO = new Date(2026, 8, 23); // 23/09/2026 (Mês 8 = Setembro no JS)
  const VALOR_PARCELA = 320.00;
  const MULTA_DIARIA = 20.00;
  const TOTAL_PARCELAS = 12;

  // Data atual do celular/navegador do locatário
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  // 1. Calcular a semana atual do contrato (1 a 12)
  const diffInicioEmMs = hoje.getTime() - DATA_INICIO.getTime();
  const diasCorridos = Math.floor(diffInicioEmMs / (1000 * 3600 * 24));
  
  let parcelaAtual = Math.floor(diasCorridos / 7) + 1;
  if (parcelaAtual < 1) parcelaAtual = 1;
  if (parcelaAtual > TOTAL_PARCELAS) parcelaAtual = TOTAL_PARCELAS;

  // 2. Calcular a próxima quarta-feira (Dia de vencimento)
  let vencimento = new Date(DATA_INICIO);
  vencimento.setDate(DATA_INICIO.getDate() + (parcelaAtual * 7));

  // 3. Calcular diferença de dias para o vencimento
  const diffVencimentoMs = vencimento.getTime() - hoje.getTime();
  const diasRestantes = Math.ceil(diffVencimentoMs / (1000 * 3600 * 24));

  // Variáveis para atualização de valores
  let diasAtraso = 0;
  let valorMulta = 0;
  let totalPagar = VALOR_PARCELA;

  // Verificação de Atraso
  if (diasRestantes < 0) {
    diasAtraso = Math.abs(diasRestantes);
    valorMulta = diasAtraso * MULTA_DIARIA;
    totalPagar = VALOR_PARCELA + valorMulta;
  }

  // --- ATUALIZAÇÃO DOS ELEMENTOS NO HTML ---

  // Atualiza Badge (ex: 1/12)
  const elBadge = document.getElementById('badgeContrato');
  if (elBadge) elBadge.innerText = `${parcelaAtual}/${TOTAL_PARCELAS}`;

  // Atualiza Texto "Faltam X Dias" ou "Em Atraso"
  const elFaltam = document.getElementById('txtFaltamDias');
  if (elFaltam) {
    if (diasRestantes > 0) {
      elFaltam.innerText = `${diasRestantes} Dias`;
    } else if (diasRestantes === 0) {
      elFaltam.innerText = `Vence Hoje!`;
    } else {
      elFaltam.innerText = `${diasAtraso} Dias em Atraso`;
      elFaltam.style.color = '#ff3b30'; // Vermelho para alerta de atraso
    }
  }

  // Atualiza Barra de Progresso do Tempo (7 dias = 100%)
  const elBarra = document.getElementById('barraDias');
  if (elBarra && diasRestantes >= 0) {
    const porcentagem = Math.max(0, Math.min(100, ((7 - diasRestantes) / 7) * 100));
    elBarra.style.width = `${porcentagem}%`;
  }

  // Atualiza Data do Vencimento formatada (ex: 30/09/2026)
  const elDataVenc = document.getElementById('txtDataVencimento');
  if (elDataVenc) {
    const dia = String(vencimento.getDate()).padStart(2, '0');
    const mes = String(vencimento.getMonth() + 1).padStart(2, '0');
    const ano = vencimento.getFullYear();
    elDataVenc.innerText = `${dia}/${mes}/${ano}`;
  }

  // Atualiza Indicadores de Atraso e Total
  const elDiasAtraso = document.getElementById('txtDiasAtraso');
  if (elDiasAtraso) elDiasAtraso.innerText = diasAtraso;

  const elMulta = document.getElementById('txtMultaAtraso');
  if (elMulta) elMulta.innerText = `R$ ${valorMulta.toFixed(2).replace('.', ',')}`;

  const elTotal = document.getElementById('txtTotalPagar');
  if (elTotal) elTotal.innerText = `R$ ${totalPagar.toFixed(2).replace('.', ',')}`;
}

// Executa automaticamente quando a página é carregada
document.addEventListener('DOMContentLoaded', calcularEAtualizarDashboard);
