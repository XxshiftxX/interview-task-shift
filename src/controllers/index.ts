import { Extension } from "@pikokr/command.ts"
import { BadgeController } from "./badge.controller"
import { ConversationController } from "./conversation.controller"
import { PingController } from "./ping.controller"

export const extensions: Extension[] = [
  new PingController(),
  new ConversationController(),
  new BadgeController(),
]
