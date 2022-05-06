import express from 'express'
import nodemailer from 'nodemailer'
import { SubmitFeedbackUseCase } from './useCases/submitFeedbackUseCase';
import { PrismaFeedbackRepositories } from './repositories/prisma/PrismaFeedbackRepositories'

const routes = express.Router()

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER_CODE,
    pass: process.env.MAILTRAP_USER_PASS
  }
});

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body
  
  const prismaFeedbackRepository = new PrismaFeedbackRepositories()

  const submitFeedback = new SubmitFeedbackUseCase(prismaFeedbackRepository)

  await submitFeedback.execute({
    type,
    comment,
    screenshot
  })

  // await transport.sendMail({ 
  //   from: 'Equipe Feedget <oi@feedget.com>',
  //   to: 'Caue Furui <cauefurui@gmail.com>',
  //   subject: 'Novo feedback',
  //   html: [
  //     `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
  //     `<p>Tipo do feedback: ${type}</p>`,
  //     `<p>Tipo do comentário: ${comment}</p>`,
  //     `</div>`,
  //   ].join('\n')
  // })

  return res.status(201).send()
})

export default routes