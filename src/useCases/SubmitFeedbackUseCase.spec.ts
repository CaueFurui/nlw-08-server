import { SubmitFeedbackUseCase } from "./SubmitFeedbackUseCase"

const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
)

describe('SubmitFeedback', () => {
  it('should be able to submit a feedback', () => {
    expect(submitFeedback.execute({
      type: 'BUG',
      comment: "teste",
      screenshot: 'data:image/png;base64fadsfasdfas'
    })).resolves.not.toThrow()

    expect(createFeedbackSpy).toHaveBeenCalled()
    expect(sendMailSpy).toHaveBeenCalled()
  })

  it('should not be able to submit a feedback without a type', () => {
    expect(submitFeedback.execute({
      type: '',
      comment: "teste",
      screenshot: 'data:image/png;base64fadsfasdfas'
    })).rejects.toThrow()
  })

  it('should not be able to submit a feedback without a comment', () => {
    expect(submitFeedback.execute({
      type: 'BUG',
      comment: "",
      screenshot: 'data:image/png;base64fadsfasdfas'
    })).rejects.toThrow()
  })

  it('should not be able to submit a feedback with a screenshot invalids format', () => {
    expect(submitFeedback.execute({
      type: 'BUG',
      comment: "teste",
      screenshot: 'test.jpg'
    })).rejects.toThrow()
  })
})