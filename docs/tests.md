# Testes

Este documento detalha os testes realizados na aplicação FinApp, divididos em duas categorias:

 - **Teste de Software:** Abordagem de caixa preta para verificar a conformidade com os requisitos funcionais e não funcionais.
 - **Teste de Usabilidade:** Avaliação da interação do público-alvo com a interface e funcionalidades do sistema.

## Índice
 - [Plano de Testes de Software](#plano-de-testes-de-software)
 - [Registro dos Testes de Software](#registro-dos-testes-de-software)
 - [Avaliação dos Testes de Software](#avaliação-dos-testes-de-software)
 - [Cenários de Teste de Usabilidade](#cenários-de-teste-de-usabilidade)
 - [Registro dos Testes de Usabilidade](#registro-dos-testes-de-usabilidade)
 - [Avaliação dos Testes de Usabilidade](#avaliação-dos-testes-de-usabilidade)

---

# Teste de Software

Os testes abaixo verificam a implementação dos requisitos funcionais (RF) na Single Page Application (SPA).

## Plano de Testes de Software

| **Caso de Teste** | **CT01 - Criar conta de usuário** |
| :--------------: | :------------ |
| **Procedimento** | 1) Acesse o link da aplicação <br> 2) Clique em "Ainda não tem conta? Cadastre-se" <br> 3) Preencha Nome, E-mail e Senha <br> 4) Clique em "Criar minha conta". |
| **Requisitos associados** | RF-01 |
| **Resultado esperado** | Dados inseridos no `localStorage` e redirecionamento para o Dashboard. |
| **Dados de entrada** | Nome: "João Silva", E-mail: "joao@email.com", Senha: "123" |
| **Resultado obtido** | Sucesso |
| **Vídeo Teste criando usuário** | https://github.com/user-attachments/assets/842421bb-b7bb-4534-9ef2-70a49d5fd0

| **Caso de Teste** | **CT02 - Fazer Login no sistema** |
| :--------------: | :------------ |
| **Procedimento** | 1) Acesse a URL da aplicação <br> 2) Insira o e-mail e senha cadastrados no CT01 <br> 3) Clique em "Entrar no FinApp". |
| **Requisitos associados** | RF-02 |
| **Resultado esperado** | Validação das credenciais e carregamento dos dados do usuário no Dashboard. |
| **Dados de entrada** | E-mail: "joao@email.com", Senha: "123" |
| **Resultado obtido** | Sucesso |
| **Vídeo Teste Login** | https://github.com/user-attachments/assets/05ad2e8c-44aa-480a-b405-8c43cc2f298b

| **Caso de Teste** | **CT03 - Adicionar Despesa e atualizar Gráficos** |
| :--------------: | :------------ |
| **Procedimento** | 1) No Dashboard, em "Nova Transação" <br> 2) Selecione "Despesa (-)" <br> 3) Insira Valor: 150.00, Categoria: Alimentação, Descrição: "Mercado" <br> 4) Clique em "Adicionar". |
| **Requisitos associados** | RF-04, RF-05, RF-06 |
| **Resultado esperado** | Subtração do valor no saldo, inserção na lista de movimentações e atualização do gráfico de barras "Despesas por Categoria". |
| **Dados de entrada** | Tipo: Despesa, Valor: 150, Categoria: Alimentação, Descrição: Mercado |
| **Resultado obtido** | Sucesso |
|**Vídeos Teste Despesa** | https://github.com/user-attachments/assets/71208f94-6677-47db-8b24-7a67f9cfe34d

| **Caso de Teste** | **CT04 - Definir Meta Mensal e gerar Alerta** |
| :--------------: | :------------ |
| **Procedimento** | 1) Em "Metas do Mês", insira o limite de "100" <br> 2) Clique em "Salvar". |
| **Requisitos associados** | RF-07, RF-09 |
| **Resultado esperado** | Barra de progresso em 100% (cor vermelha) e exibição do alerta de limite ultrapassado, com base na despesa do CT03. |
| **Dados de entrada** | Limite: 100 |
| **Resultado obtido** | Sucesso |
| **Vídeo Teste Meta e Alerta** | https://github.com/user-attachments/assets/7a6f995a-a99f-422b-a159-6b78c0ec0641



---

## Registro dos Testes de Software

Relatório de execução dos testes baseados no plano pré-definido.

| *Caso de Teste* | *CT01 - Criar conta de usuário* |
|---|---|
| Requisito Associado | RF-01 - Cadastro de contas |
| Status de Execução | Validado. | 

| *Caso de Teste* | *CT02 - Fazer Login no sistema* |
|---|---|
| Requisito Associado | RF-02 - Autenticação |
| Status de Execução | Validado. | 

| *Caso de Teste* | *CT03 - Adicionar Despesa e atualizar Gráficos* |
|---|---|
| Requisito Associado | RF-04, RF-05, RF-06 - Registro, categorização e gráficos |
| Status de Execução | Validado. | 

| *Caso de Teste* | *CT04 - Definir Meta Mensal e gerar Alerta* |
|---|---|
| Requisito Associado | RF-07, RF-09 - Metas e alertas visuais |
| Status de Execução | Validado. | 

---

## Avaliação dos Testes de Software

**Resultados:** A arquitetura SPA eliminou o tempo de resposta de rede para atualizações de interface, cumprindo o RNF-05. A rotina de limpeza do DOM acionada pela função de logout evitou a persistência visual de dados entre sessões diferentes.

**Limitações Identificadas:** O uso estrito do `localStorage` impede a sincronização de contas em múltiplos dispositivos. A limpeza de dados do navegador pelo usuário resulta em perda irreversível dos registros financeiros.

**Propostas de Melhoria:** Implementação futura de uma API REST integrada a um banco de dados relacional ou NoSQL em nuvem para garantir persistência e acesso multiplataforma.

---

# Testes de Usabilidade

Avaliação da interação de quatro usuários com perfis correspondentes às personas do projeto. 

Métricas avaliadas:
1. **Taxa de sucesso:** Conclusão da tarefa proposta.
2. **Satisfação subjetiva:** Escala de 1 (Péssimo) a 5 (Ótimo).
3. **Tempo de conclusão:** Em segundos, comparado ao tempo base de um desenvolvedor (especialista).

## Cenários de Teste de Usabilidade

| Nº | Descrição do Cenário |
|----|----------------------|
| 1  | **Registro de Despesa:** O usuário realizou uma compra de supermercado no valor de R$ 250,00. Deve acessar o sistema e registrar a saída. |
| 2  | **Configuração de Meta:** O usuário deseja limitar os gastos mensais a R$ 1.500,00. Deve configurar este valor no sistema e verificar o nível de consumo atual. |

---

## Registro de Testes de Usabilidade

**Cenário 1: Registro de Despesa**

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo |
|---------|-----------------|----------------------|-------|
| 1       | SIM             | 5                    | 18.5s |
| 2       | SIM             | 5                    | 22.1s |
| 3       | SIM             | 4                    | 25.3s |
| 4       | SIM             | 5                    | 15.8s |
| **Média** | **100%** | **4.75** | **20.42s** |
| **Especialista** | SIM    | 5                    | 8.5s  |

**Comentários relatados:** Dúvida pontual sobre o uso de vírgula ou ponto decimal no campo de valor.

<br>

**Cenário 2: Configuração de Meta**

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo |
|---------|-----------------|----------------------|-------|
| 1       | SIM             | 5                    | 12.4s |
| 2       | SIM             | 4                    | 18.2s |
| 3       | SIM             | 5                    | 14.1s |
| 4       | SIM             | 4                    | 20.6s |
| **Média** | **100%** | **4.5** | **16.32s** |
| **Especialista** | SIM    | 5                    | 6.2s  |

**Comentários relatados:** Necessidade de rolagem vertical prolongada em dispositivos móveis para acessar o botão de submissão do formulário.

---

## Avaliação dos Testes de Usabilidade

Os testes indicaram taxa de sucesso de 100% na execução dos fluxos principais. A alocação dos formulários de entrada e relatórios de saída em uma única tela reduziu o tempo médio de operação. A avaliação subjetiva média foi de 4.62.

A diferença no tempo de conclusão entre a amostra de usuários (~18.3s) e o especialista (~7.3s) é condizente com a curva inicial de reconhecimento da interface. 

Com base nos registros, a principal correção de usabilidade identificada para a próxima versão é a otimização do layout em resoluções móveis (RNF-01), com a transição de formulários estáticos para janelas modais, reduzindo a necessidade de rolagem (scroll) para conclusão das tarefas.
