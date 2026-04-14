# Template Padrão do Site

O layout padrão do **FinApp** foi projetado para oferecer uma experiência de controle financeiro intuitiva e moderna, focada no usuário web. O sistema adota uma estética *Dark Mode* com uma hierarquia visual clara, utilizando o contraste entre o fundo profundo e tons de verde esmeralda para destacar dados críticos e ações principais. A interface foi pensada para ser limpa, evitando a sobrecarga cognitiva e facilitando a gestão do patrimônio.

## Design

O design do FinApp utiliza uma estrutura de **Dashboard Centralizado** com navegação simplificada. A interface é organizada da seguinte forma:

1.  **Cabeçalho (Topbar):** Uma barra fixa no topo que contém o logotipo "FinApp" à esquerda e o acesso ao perfil do usuário (avatar) à direita, mantendo a área de trabalho limpa.
2.  **Área de Conteúdo (Visão Geral):** Os módulos são organizados em cards independentes com cantos arredondados, criando uma separação lógica entre diferentes tipos de dados (Finanças, Metas, Gráficos).
3.  **Barra de Ações Rápidas:** Localizada na base da tela, apresenta botões proeminentes ("Adicionar Receita" e "Adicionar Despesa") para facilitar a entrada de dados sem navegação complexa.

O logo do sistema utiliza a fonte principal em verde esmeralda acompanhada de um ícone de cofre/carteira, reforçando a identidade visual em todas as telas, desde o Login até o Dashboard.

## Cores

A paleta de cores foi extraída diretamente da identidade visual do projeto, garantindo legibilidade e uma aparência "Premium".

| Aplicação | Hexadecimal | Descrição |
| :--- | :--- | :--- |
| **Entrada / Crescimento** | `#12D68E` | Utilizada em botões de ação, gráficos de saldo e indicadores positivos. |
| **Investimentos / Alertas** | `#F5C543` | Cor de destaque para metas e recomendações de otimização financeira. |
| **Despesas / Alertas** | `#FF5756` | Identifica saídas de caixa e áreas de atenção nos gráficos. |
| **Fundo Principal** | `#0B111D` | Tom de azul marinho quase preto para o fundo da aplicação. |
| **Fundo de Cards/Inputs** | `#1A2230` | Tom intermediário para criar profundidade nos componentes de interface. |

## Tipografia

A escala tipográfica foi planejada para guiar o olhar do usuário através dos dados numéricos.

* **Header 01 (32px):** Títulos principais como "Visão Geral do FinApp" e nomes de módulos principais.
* **Header 02 (24px):** Títulos internos de cards e valores de saldo de grande destaque.
* **Header 03 (20px):** Subtítulos e rótulos de seções secundárias.
* **Body (16px):** Texto padrão para labels de inputs (Nome, E-mail, Senha) e listas de transações.
* **Small (14px):** Legendas de gráficos, porcentagens de progresso e textos de auxílio.

## Iconografia

O projeto utiliza ícones minimalistas para reduzir o ruído visual e acelerar a compreensão das funções:

* **Ícones de Input:** Usuário, E-mail e Cadeado nos formulários de cadastro.
* **Ícones de Módulo:** Carteira (Finanças), Bandeira/Casa (Metas) e Gráficos de barra/área para análise de fluxo.
* **Botões de Ação:** Sinais de "+" integrados aos botões de transação na base do Dashboard.

## Estilos CSS (Padrão)

Abaixo, os estilos base em CSS puro que sustentam a interface apresentada:

```css
/* Variáveis de Identidade Visual */
:root {
    --primary: #12D68E;
    --warning: #F5C543;
    --danger: #FF5756;
    --bg-main: #0B111D;
    --bg-card: #1A2230;
    --text-white: #FFFFFF;
    --text-gray: #9CA3AF;
}

/* Tipografia Base */
body {
    background-color: var(--bg-main);
    color: var(--text-white);
    font-family: 'Inter', sans-serif;
    margin: 0;
}

h1 { font-size: 32px; font-weight: bold; }
h2 { font-size: 24px; font-weight: 600; }

/* Componentes de Interface */
.dashboard-card {
    background-color: var(--bg-card);
    border-radius: 16px;
    padding: 20px;
    border: 1px solid #2D3748;
}

.btn-primary {
    background-color: var(--primary);
    color: #000;
    border-radius: 8px;
    font-weight: bold;
    padding: 12px 24px;
    border: none;
    cursor: pointer;
}

/* Gráficos e Barras de Progresso */
.progress-bar {
    width: 100%;
    background-color: #2D3748;
    border-radius: 10px;
    height: 8px;
}

.progress-fill {
    background-color: var(--primary);
    height: 100%;
    border-radius: 10px;
}
