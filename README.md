# Contact API (Node.js/Express)

Esta é uma API simples construída com Node.js e Express para receber mensagens do formulário de contato do seu portfólio.

## Funcionalidade

A API expõe um endpoint:

- **`POST /contact`**: Recebe dados do formulário (`name`, `email`, `subject`, `message`).
  - **Atenção**: Atualmente, a API apenas loga os dados no console. Para enviar e-mails de verdade, você precisará integrar um serviço de terceiros (como SendGrid, Mailgun ou Nodemailer com SMTP) e adicionar as credenciais necessárias no arquivo `.env`.

## Configuração

1.  **Instalar dependências:**
    \`\`\`bash
    npm install
    \`\`\`

2.  **Variáveis de Ambiente:**
    Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

    \`\`\`
    # Porta em que a API irá rodar
    PORT=3001

    # URL do seu frontend em produção (necessário para CORS)
    # Exemplo: https://meu-portfolio.vercel.app
    FRONTEND_URL=https://[SEU_DOMINIO_VERCEL].vercel.app
    \`\`\`

3.  **Executar localmente:**
    \`\`\`bash
    npm start
    \`\`\`

## Deploy

Recomenda-se o deploy desta API em um serviço de hospedagem de backend como **Render**, **Railway** ou **Vercel Functions** (se você usar o Vercel, precisará adaptar o código para o formato de Serverless Function).

### Deploy no Render (Recomendado)

1.  Crie uma nova conta no [Render](https://render.com/).
2.  Crie um novo **Web Service**.
3.  Conecte seu repositório do GitHub (onde esta API estará).
4.  **Build Command:** `npm install`
5.  **Start Command:** `npm start` (ou `node server.js`)
6.  Adicione as variáveis de ambiente (`PORT` e `FRONTEND_URL`) nas configurações do Render.
7.  Após o deploy, use a URL pública fornecida pelo Render para atualizar a variável `NEXT_PUBLIC_CONTACT_API_URL` no seu frontend.
\`\`\`
