import { MailAdapter } from "../adapters/MailAdapter"
import { FeedbacksRepository } from "../repositories/FeedbacksRepository"

export enum FeedbackType {
  BUG = 'BUG',
  IDEA = 'IDEA',
  OTHER = 'OTHER'
}

interface SubmitFeedbackUseCaseRequest {
  type: FeedbackType
  comment: string
  screenshot?: string
}

export class SubmitFeedbackUseCase {

  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter,
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot
    })

    await this.mailAdapter.sendEmail({
      subject: 'Novo feedback',
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Tipo do comentário: ${comment}</p>`,
        `</div>`,
      ].join('\n')
    })
    
  }
}