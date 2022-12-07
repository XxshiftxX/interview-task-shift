import { Extension, listener } from "@pikokr/command.ts"
import { Message, Events } from "discord.js"
import { ConversationApplication } from "src/applications/conversation.application"
import { isBusinessError } from "src/utils/business-error"

export class ConversationController extends Extension {
  private readonly application = new ConversationApplication()

  @listener({ event: Events.MessageCreate })
  async converse(payload: Message) {
    const {
      content,
      author: { id },
    } = payload

    const [command, ...remains] = content.split(" ")
    if (command !== "크시야") return

    const message = remains.join(" ")
    if (!message) return payload.reply("네?")

    /** Convert to another route */
    const isFormula = message.match(/^\d+(((\+|\-|\*|\/)\d+)*)$/)
    if (isFormula) return this.calculateFormula(payload, message)

    /** Normal route */
    const result = await this.application.converse(id, message)

    if (isBusinessError(result)) {
      switch (result.error) {
        case "user-not-found":
          return payload.reply("유저 정보를 찾을 수 없어요")
        case "reaction-not-found":
          return payload.reply("모르는 말이에요")
      }
    }

    const filledMessage = result.reaction.reaction.replace("(username)", result.user.username)

    await payload.reply(filledMessage)
  }

  private calculateFormula(payload: Message, message: string) {
    const result = this.application.calculateFormula(message)

    if (!result && result !== 0) {
      return payload.reply("비정상적인 수식이에요!")
    }

    payload.reply(`답은 ${result}에요!`)
  }
}
