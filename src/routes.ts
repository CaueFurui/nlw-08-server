import express from 'express'
import nodemailer from 'nodemailer'
import { SubmitFeedbackUseCase } from './useCases/SubmitFeedbackUseCase';
import { PrismaFeedbackRepositories } from './repositories/prisma/PrismaFeedbackRepositories'
import { NodeMailerMailAdapter } from './adapters/nodemailer/NodeMailerMailAdapter';

const routes = express.Router()

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body
  
  const prismaFeedbackRepository = new PrismaFeedbackRepositories()
  const nodeMailerMailAdapter = new NodeMailerMailAdapter()

  const submitFeedback = new SubmitFeedbackUseCase(
    prismaFeedbackRepository,
    nodeMailerMailAdapter
  )

  await submitFeedback.execute({
    type,
    comment,
    screenshot
  })

  return res.status(201).send()
})

export default routes