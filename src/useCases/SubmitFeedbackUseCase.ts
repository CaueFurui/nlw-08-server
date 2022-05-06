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

  constructor(private feedbacksRepository: FeedbacksRepository) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot
    })
    
  }
}