import { prisma } from "../../prisma";
import { FeedbacksRepository, FeedbackCreateData } from "../FeedbacksRepository";

export class PrismaFeedbackRepositories implements FeedbacksRepository {
  async create({ comment, type, screenshot }: FeedbackCreateData) {
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
      }
    })
  }
}