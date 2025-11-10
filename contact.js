import express from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      error: 'Todos os campos são obrigatórios: nome, email, assunto e mensagem.'
    });
  }

  const html = `
     <div style="max-width:480px;width:95%;margin:20px auto;background:#ffffff;border-radius:10px;border:1px solid #dbe2ea;box-shadow:0 4px 10px rgba(0,0,0,0.08);font-family:'Segoe UI',Arial,sans-serif;">
  <div style="background:#007BFF;padding:20px 10px;border-radius:10px 10px 0 0;text-align:center;">
    <h1 style="color:#fff;font-size:20px;margin:0;line-height:1.3;">
      Nova mensagem de contato
    </h1>
  </div>
  <div style="padding:18px 16px;">
    <div style="margin-bottom:14px;">
      <div style="font-weight:600;color:#007BFF;font-size:15px;margin-bottom:4px;">Nome</div>
      <div style="color:#222;font-size:15px;">${name}</div>
    </div>
    <div style="margin-bottom:14px;">
      <div style="font-weight:600;color:#007BFF;font-size:15px;margin-bottom:4px;">E-mail</div>
      <div style="color:#222;font-size:15px;">${email}</div>
    </div>
    <div style="margin-bottom:14px;">
      <div style="font-weight:600;color:#007BFF;font-size:15px;margin-bottom:4px;">Assunto</div>
      <div style="color:#222;font-size:15px;">${subject}</div>
    </div>
    <div style="margin-bottom:16px;">
      <div style="font-weight:600;color:#007BFF;font-size:15px;margin-bottom:6px;">Mensagem</div>
      <div style="white-space:pre-wrap;background:#f0f6ff;padding:12px;border-radius:6px;color:#222;line-height:1.5;font-size:14px;">
        ${message}
      </div>
    </div>
    <p style="font-size:13px;color:#818ca9;text-align:center;margin-top:26px;line-height:1.4;">
      Recebido pelo portfólio online. <a href="mailto:${email}" style="color:#007BFF;text-decoration:none;">Responder</a>
    </p>
  </div>
</div>

  `;

  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
    return res.status(200).json({
      info: "Envio de e-mail NÃO está ativo. Mensagem recebida apenas localmente.",
      contact: { nome: name, email, assunto: subject, mensagem: message }
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.GMAIL_USER,
      subject: `[PORTFOLIO] ${subject}`,
      html
    });

    return res.status(200).json({
      success: true,
      message: "Contato recebido com sucesso e enviado por e-mail!"
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erro ao enviar e-mail.",
      detail: error.message
    });
  }
});

app.listen(3001, () => {
  console.log('API de contato local rodando em http://localhost:3001/api/contact');
});
