# Especificações do Projeto

A seção apresenta a definição do problema sob a perspectiva do usuário, abordando dificuldades no controle financeiro e propondo uma solução prática e acessível. São utilizadas técnicas como definição de personas, histórias de usuário e levantamento de requisitos funcionais e não funcionais. Também são consideradas as restrições do projeto para garantir viabilidade e foco na implementação.## Personas

| Campo | Descrição |
| :--- | :--- |
| **Descrição:** | O usuário busca uma organização financeira e pode estar dentro de um dos três perfis financeiros: O que poupa, o que gasta toda a sua renda e o que se endivida. |
| **Necessidades:** | 1. Ferramentas de planejamento financeiro para visualizar entradas e saídas; <br> 2. Alertas de gastos excessivos e metas de poupança; <br> 3. Sugestões de investimentos simples e acessíveis; <br> 4. Interface prática e rápida, já que o tempo é escasso; <br> 5. Recursos para organizar e acompanhar metas de poupança; <br> 6. Controle rigoroso de despesas com categorização automática; <br> 7. Metas mensais para ajudar na organização financeira e na motivação. |

## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

| Eu como... [QUEM] | ... quero/desejo ... [O QUE] | ... para .... [PORQUE] |
| :--- | :--- | :--- |
| Usuário | Ter metas de poupança. | Conseguir transformar parte da renda em patrimônio e não terminar o mês sem saldo. |
| Usuário | Acessar relatórios claros sobre os gastos. | Identificar gastos desnecessários. |
| Usuário | Organizar minhas metas de poupança. | Planejar minha independência financeira e construir reservas. |
| Usuário | Aprender sobre investimentos de forma simples. | Começar a investir com segurança e aumentar meu patrimônio. |
| Usuário | Controlar despesas. | Entender para onde vai meu dinheiro e reduzir gastos. |
| Usuário | Ter um plano de acompanhamento de dívidas. | Montar estratégias para amenizar as dívidas. |
| Usuário | Receber alertas de limite de gastos. | Evitar que o saldo fique negativo. |

Apresente aqui as histórias de usuário que são relevantes para o projeto de sua solução. As Histórias de Usuário consistem em uma ferramenta poderosa para a compreensão e elicitação dos requisitos funcionais e não funcionais da sua aplicação. Se possível, agrupe as histórias de usuário por contexto, para facilitar consultas recorrentes à essa parte do documento.

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais


| ID | Descrição | Prioridade |
| :--- | :--- | :--- |
| RF- 01 | A aplicação deve permitir que o usuário crie uma conta | ALTA |
| RF- 02 | A aplicação deve permitir ao usuário fazer login em sua conta. | ALTA |
| RF- 03 | A aplicação deve permitir que o usuário cadastre as suas receitas financeiras | ALTA |
| RF- 04 | A aplicação deve permitir que o usuário cadastre as suas despesas | ALTA |
| RF- 05 | A aplicação deve permitir que o usuário categorize as receitas/despesas. | ALTA |
| RF -06 | A aplicação deve exibir gráficos para o usuário visualizar as movimentações por categorias. | MÉDIA |
| RF -07 | A aplicação deve permitir que o usuário insira metas de gastos | MÉDIA |
| RF-08 | A aplicação deve fazer recomendações e sugestões de controle financeiro para o usuário | BAIXA |
| RF-09 | A aplicação deve gerar alertas para o usuário em caso de gastos acima da meta definida | BAIXA |


### Requisitos não Funcionais

| ID | Descrição | Prioridade |
| :--- | :--- | :--- |
| RNF-01 | A aplicação deve ser compatível com dispositivo mobile e desktops | ALTA |
| RNF- 02 | A aplicação deve garantir a segurança e a confidencialidade dos dados econômicos dos usuários, prevenindo qualquer vazamento de informações | ALTA |
| RNF-03 | A aplicação deve possuir símbolos para categorização dos itens | BAIXA |
| RNF-04 | A aplicação deve apresentar uma interface visualmente organizada e intuitiva, proporcionando facilidade de utilização | MÉDIA |
| RNF-05 | A aplicação deve carregar suas telas em até 03 segundos | MÉDIA |
| RNF-06 | A aplicação deverá funcionar a todo momento | ALTA |

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Não pode ser desenvolvido um módulo de backend        |


Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

> **Links Úteis**:
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)
