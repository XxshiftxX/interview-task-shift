import { command, Extension } from "@pikokr/command.ts"
import { Message } from "discord.js"
import { ConversationApplication } from "src/applications/conversation.application"
import { isBusinessError } from "src/utils/business-error"

export class ConversationController extends Extension {
  private readonly application = new ConversationApplication()

  @command({ name: "test" })
  async converse(message: Message) {
    const {
      content,
      author: { id },
    } = message

    const pureContent = content.split(" ").slice(1).join(" ")
    if (!pureContent) return message.reply("네?")

    if (pureContent.match(/^\d+(((\+|\-|\*|\/)\d+)*)$/)) {
      return message.reply(`${this.application.calculateFormula(pureContent)}`)
    }

    const result = await this.application.converse(id, pureContent)

    if (isBusinessError(result)) {
      switch (result.error) {
        case "user-not-found":
          return message.reply("유저 정보를 찾을 수 없어요")
        case "reaction-not-found":
          return message.reply("모르는 말이에요")
      }
    }

    const filledMessage = result.reaction.reaction.replace("(username)", result.user.username)

    await message.reply(filledMessage)
  }
}
