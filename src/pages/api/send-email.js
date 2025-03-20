import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export default async (req, res) => {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: 'edivando.siqueira@gmail.com',
      subject: `Nova mensagem de ${name}`,
      text: message,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email enviado com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao enviar email', error });
    }
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
};