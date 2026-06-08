# Programação de Funcionalidades

A implementação do sistema foi realizada sob o modelo de **Single Page Application (SPA)** utilizando HTML5, CSS3 e JavaScript (Vanilla). Para contornar a restrição de ausência de backend, o sistema utiliza o `localStorage` do navegador como banco de dados não relacional, garantindo a persistência dos dados, o isolamento por usuário e a disponibilidade contínua da aplicação.

## Requisitos Atendidos

As tabelas a seguir apresentam os requisitos funcionais e não-funcionais estabelecidos no escopo do projeto e sua respectiva relação com os artefatos de código criados. Como o sistema é uma SPA, o controle de exibição de telas (Login vs. Dashboard) e a lógica de negócios estão concentrados nos mesmos artefatos.

### Requisitos Funcionais

| ID | Descrição do Requisito | Responsável | Artefato Criado |
| :--- | :--- | :--- | :--- |
| RF-01 | A aplicação deve permitir que o usuário crie uma conta | Vanessa, André, Raul | `index.html`, `app.js`, `style.css` |
| RF-02 | A aplicação deve permitir ao usuário fazer login em sua conta | Luiz, Lucca, Caio | `index.html`, `app.js`, `style.css` |
| RF-03 | A aplicação deve permitir que o usuário cadastre as suas receitas financeiras | Caio e Luiz | `index.html`, `app.js`, `style.css` |
| RF-04 | A aplicação deve permitir que o usuário cadastre as suas despesas | Caio e Luiz | `index.html`, `app.js`, `style.css` |
| RF-05 | A aplicação deve permitir que o usuário categorize as receitas/despesas | Vanessa, André, Raul | `index.html`, `app.js` |
| RF-06 | A aplicação deve exibir gráficos para o usuário visualizar as movimentações por categorias | Caio, Lucca | `index.html`, `app.js`, `style.css` |
| RF-07 | A aplicação deve permitir que o usuário insira metas de gastos | Luiz, Lucca | `index.html`, `app.js` |
| RF-08 | A aplicação deve fazer recomendações e sugestões de controle financeiro | Vanessa, André, Caio | `app.js` |
| RF-09 | A aplicação deve gerar alertas para o usuário em caso de gastos acima da meta | Caio, Raul | `app.js`, `style.css` |

### Requisitos Não Funcionais

| ID | Descrição do Requisito | Artefato Criado / Justificativa |
| :--- | :--- | :--- |
| RNF-01 | A aplicação deve ser compatível com dispositivo mobile e desktops | Implementado via Media Queries no `style.css` e CSS Grid/Flexbox. |
| RNF-02 | A aplicação deve garantir a segurança e a confidencialidade dos dados | Isolamento de chaves no `localStorage` por e-mail no `app.js`. O logout limpa a sessão. |
| RNF-03 | A aplicação deve possuir símbolos para categorização dos itens | Mapeamento dinâmico do dicionário `categoryConfig` no `app.js` renderizando ícones Lucide. |
| RNF-04 | A aplicação deve apresentar uma interface visualmente organizada e intuitiva | Aplicação de Design System em Dark Mode centralizado no `style.css`. |
| RNF-05 | A aplicação deve carregar suas telas em até 03 segundos | SPA baseada em arquivos estáticos (HTML/CSS/JS puros), garantindo tempo de resposta quase nulo. |
| RNF-06 | A aplicação deverá funcionar a todo momento | Por não depender de requisições web externas (backend), opera offline (Client-side) após o primeiro carregamento. |

---

## Descrição das Estruturas de Dados

A persistência de dados foi implementada exclusivamente no lado do cliente utilizando a API de Web Storage (`localStorage`). A estrutura foi modelada para separar dados de credenciais de acesso dos dados de uso financeiro, garantindo isolamento total entre contas cadastradas na mesma máquina.

As estruturas refletem os objetos e arrays manipulados em formato JSON pela aplicação JavaScript.

### 1. Cadastro e Credenciais (Chave: `finapp_user_{email}`)

Quando um usuário cria uma conta, o sistema gera uma chave única no `localStorage` combinando o prefixo padrão e o e-mail informado. Isso permite a existência de múltiplos usuários no mesmo navegador.

| Nome | Tipo | Descrição | Exemplo |
| :--- | :--- | :--- | :--- |
| `name` | String | Nome completo fornecido no ato do cadastro | "João Silva" |
| `email`| String | E-mail do usuário (usado também como identificador da chave) | "joao@email.com" |
| `password` | String | Senha gerada para acesso e validação de login | "senha123" |

*Exemplo do objeto armazenado:*
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123"
}
```

### 2. Dados Financeiros (Chave: `finapp_data_{email}`)

Todas as movimentações e metas vinculadas a um usuário específico são armazenadas nesta chave paralela. O sistema efetua a leitura (Parse) deste JSON ao efetuar o login e o sobrescreve (Stringify) a cada nova inserção de dados.

| Nome | Tipo | Descrição | Exemplo |
| :--- | :--- | :--- | :--- |
| `goal` | Number | Valor numérico representando o limite de gastos mensal (Meta) | `1500.00` |
| `transactions` | Array | Lista (vetor) contendo os objetos de todas as movimentações financeiras do usuário | `[{}, {}]` |

**Estrutura interna do objeto de Transação (`transactions`)**

| Nome | Tipo | Descrição | Exemplo |
| :--- | :--- | :--- | :--- |
| `id` | Number | Identificador único gerado via Timestamp (`Date.now()`) | `1686178491234` |
| `type` | String | Define se o registro é uma receita (`income`) ou despesa (`expense`) | "expense" |
| `amount` | Number | Valor nominal da transação (Float) | `185.50` |
| `category` | String | Categoria correspondente (define cor e ícone na renderização) | "Alimentação" |
| `desc` | String | Descrição curta inserida pelo usuário | "Compra do Mês" |
| `date` | String | Data da inserção gerada via `Intl.DateTimeFormat` | "07/06/2026" |

*Exemplo do objeto armazenado:*
```json
{
  "goal": 1500,
  "transactions": [
    {
      "id": 1686178491234,
      "type": "expense",
      "amount": 185.5,
      "category": "Alimentação",
      "desc": "Supermercado BH",
      "date": "07/06/2026"
    },
    {
      "id": 1686178500000,
      "type": "income",
      "amount": 3500.0,
      "category": "Salário",
      "desc": "Pagamento Mensal",
      "date": "07/06/2026"
    }
  ]
}
```

### Instruções para Acesso e Verificação

Para validar e auditar as estruturas de dados enquanto a aplicação estiver rodando:
1. Abra a aplicação `index.html` em qualquer navegador moderno (Google Chrome, Firefox, Edge).
2. Pressione a tecla `F12` ou clique com o botão direito e selecione "Inspecionar" para abrir o *Developer Tools*.
3. Navegue até a aba **Application** (ou Armazenamento).
4. No menu lateral, expanda a seção **Local Storage** e selecione o domínio da aplicação.
5. Crie contas de teste e faça movimentações na tela para observar os arquivos `finapp_user_...` e `finapp_data_...` sendo gerados e atualizados em tempo real.
