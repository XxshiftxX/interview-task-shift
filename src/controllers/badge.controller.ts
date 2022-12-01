import { applicationCommand, Extension, listener, option } from "@pikokr/command.ts"
import {
  ApplicationCommandOptionType,
  User,
  ApplicationCommandType,
  ChatInputCommandInteraction,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  EmbedBuilder,
  Events,
  Interaction,
} from "discord.js"
import { BadgeApplication } from "src/applications/badges.application"
import { isBusinessError } from "src/utils/business-error"

export class BadgeController extends Extension {
  private readonly application = new BadgeApplication()
  @applicationCommand({
    type: ApplicationCommandType.ChatInput,
    name: "배지",
    description: "배지 목록 보여줘요",
  })
  async getBadges(
    interaction: ChatInputCommandInteraction,
    @option({
      name: "user",
      type: ApplicationCommandOptionType.User,
      description: "뱃지를 조회할 유저를 선택할 수 있어요",
    })
    inputUserId?: string
  ) {
    const userId = inputUserId ?? interaction.user.id

    const result = await this.application.getUserBadges(userId)
    if (isBusinessError(result)) {
      switch (result.error) {
        case "user-not-found":
          return interaction.reply("유저 정보를 찾을 수 없어요")
      }
    }

    const badgeInfoEmbed = new EmbedBuilder()
      .setColor(0x679289)
      .setTitle(":question: 크시 배지")
      .setDescription("도전과제를 클리어해서 모든 배지를 모아보세요!")

    const badgeSelectRow = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId("badge-select")
        .setPlaceholder(`달성한 배지 ${result.length}개`)
        .addOptions(
          ...result.map((badge) => ({
            label: badge.title,
            description: badge.requirements,
            value: badge.id,
          }))
        )
    )

    await interaction.reply({
      content: "Pong!",
      embeds: [badgeInfoEmbed],
      components: [badgeSelectRow],
    })
  }

  @listener({
    event: Events.InteractionCreate,
  })
  async selectBadge(interaction: Interaction) {
    if (!interaction.isStringSelectMenu()) return
    if (interaction.customId !== "badge-select") return

    const [badgeId] = interaction.values

    const result = await this.application.getBadge(badgeId)
    if (isBusinessError(result)) {
      switch (result.error) {
        case "badge-not-found":
          const errorEmbed = new EmbedBuilder().setColor(0x0a0a0a).setTitle("문제가 발생했어요!")
          return interaction.update({ embeds: [errorEmbed] })
      }
    }

    const badgeInfoEmbed = new EmbedBuilder()
      .setColor(0x679289)
      .setTitle(result.title)
      .setDescription(result.requirements)

    await interaction.update({ embeds: [badgeInfoEmbed] })
  }
}
