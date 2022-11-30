import { Extension } from "@pikokr/command.ts"
import { ConversationController } from "./conversation.controller"
import { PingController } from "./ping.controller"

export const extensions: Extension[] = [new PingController(), new ConversationController()]
