import { applicationCommand, Extension } from "@pikokr/command.ts"
import { ApplicationCommandType, ChatInputCommandInteraction } from "discord.js"
import { User } from "src/domain/user/user.entity"

export class PingController extends Extension {
  @applicationCommand({
    type: ApplicationCommandType.ChatInput,
    name: "핑",
    description: "핑 하면 퐁 해요",
  })
  async ping(interaction: ChatInputCommandInteraction) {
    const ping = new Date().getTime() - interaction.createdAt.getTime()
    await interaction.reply(`퐁! 현재 핑: ${ping}ms`)
  }
}
