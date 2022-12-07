import { Extension, listener } from "@pikokr/command.ts"
import { Message, Events } from "discord.js"
import { ConversationApplication } from "src/applications/conversation.application"
import { isBusinessError } from "src/utils/business-error"

export class ConversationController extends Extension {
  private readonly application = new ConversationApplication()

  @listener({ event: Events.MessageCreate })
  async converse({ content, author: { id }, reply }: Message) {
    const [command, ...remains] = content.split(" ")
    if (command !== "크시야") return

    const message = remains.join(" ")
    if (!message) return reply("네?")

    if (message.match(/^\d+(((\+|\-|\*|\/)\d+)*)$/)) {
      return reply(`${this.application.calculateFormula(message)}`)
    }

    const result = await this.application.converse(id, message)

    if (isBusinessError(result)) {
      switch (result.error) {
        case "user-not-found":
          return reply("유저 정보를 찾을 수 없어요")
        case "reaction-not-found":
          return reply("모르는 말이에요")
      }
    }

    const filledMessage = result.reaction.reaction.replace("(username)", result.user.username)

    await reply(filledMessage)
  }
}
