import express from 'express'
import nodemailer from 'nodemailer'
import { prisma } from './prisma'

const app = express()

app.use(express.json())

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER_CODE,
    pass: process.env.MAILTRAP_USER_PASS
  }
});

app.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body
  
  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    }
  })

  await transport.sendMail({ 
    from: 'Equipe Feedget <oi@feedget.com>',
    to: 'Caue Furui <cauefurui@gmail.com>',
    subject: 'Novo feedback',
    html: [
      `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
      `<p>Tipo do feedback: ${type}</p>`,
      `<p>Tipo do comentário: ${comment}</p>`,
      `</div>`,
    ].join('\n')
  })

  console.log({ feedback })

  return res.status(201).json({ data: feedback })
})

app.listen(3333, () => {
  console.log('Server is running at http://localhost:3333 🚀')
})