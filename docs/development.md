# Programação de Funcionalidades

Implementação do sistema descritas por meio dos requisitos funcionais e/ou não funcionais. Deve relacionar os requisitos atendidos os artefatos criados (código fonte) além das estruturas de dados utilizadas e as instruções para acesso e verificação da implementação que deve estar funcional no ambiente de hospedagem.

## Requisitos Atendidos

As tabelas que se seguem apresentam os requisitos funcionais e não-funcionais que relacionam o escopo do projeto com os artefatos criados:

### Requisitos Atendidos

Com base exclusivamente no código e nas telas que desenvolvemos ao longo deste chat (onde enxugamos o projeto para 3 inputs exatos por tela e removemos funcionalidades não implementadas como gráficos, metas e categorias), a tabela de requisitos fica assim:

#### Requisitos Funcionais

| ID | Descrição do Requisito | Responsável | Artefato Criado |
| :--- | :--- | :--- | :--- |
| RF-01 | A aplicação deve permitir que o usuário crie uma conta | Desenvolvedor | `cadastre-se.html`, `script.js`, `style.css` |
| RF-02 | A aplicação deve permitir ao usuário fazer login em sua conta | Desenvolvedor | `index.html`, `script.js`, `style.css` |
| RF-04 | A aplicação deve permitir que o usuário cadastre as suas despesas | Desenvolvedor | `gastos.html`, `script.js`, `style.css` |

---

### Descrição das estruturas:

Como o banco de dados utilizado foi o `localStorage` do navegador, não há geração de Tokens, status de sessão ou datas automáticas de login. As estruturas refletem estritamente as chaves e objetos que o JavaScript salva e lê.

#### 1. Login (Validação na chave `dbuser`)

| Nome | Tipo | Descrição | Exemplo |
| :--- | :--- | :--- | :--- |
| Email | Texto | Endereço de e-mail inserido para acessar o painel | exemplo@email.com |
| Senha | Texto | Senha inserida para validação de acesso | 123456 |

#### 2. Cadastro de Usuário (Objeto salvo na chave `dbuser`)

| Nome | Tipo | Descrição | Exemplo |
| :--- | :--- | :--- | :--- |
| Nome | Texto | Nome completo do usuário registrado | João Silva |
| Email | Texto | Endereço de e-mail do usuário | exemplo@email.com |
| Senha | Texto | Senha criada para acesso ao sistema | 123456 |

#### 3. Cadastro de Gastos (Array de objetos salvo na chave `dbgastos`)

| Nome | Tipo | Descrição | Exemplo |
| :--- | :--- | :--- | :--- |
| Descrição | Texto | Título ou detalhe indicando no que o dinheiro foi gasto | Mercado, Combustível |
| Valor | Texto | Montante financeiro do gasto, salvo com a máscara de moeda | R$ 185,50 |
| Data | Texto | Data em que a despesa ocorreu, salva com a máscara de calendário | 18/05/2026 |
