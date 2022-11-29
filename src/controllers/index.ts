import { Extension } from "@pikokr/command.ts"
import { PingController } from "./ping.controller"

export const extensions: Extension[] = [new PingController()]
