import { CommandClient, Extension } from "@pikokr/command.ts"
import { Client } from "discord.js"
import mongoose from "mongoose"

export class App {
  private readonly client: Client
  private readonly commands: CommandClient

  constructor(private readonly extensions: Extension[]) {
    this.client = new Client({
      intents: ["Guilds", "DirectMessages", "MessageContent", "GuildMessages"],
    })
    this.commands = new CommandClient(this.client)
  }

  public async boot() {
    const connectionUrl = process.env.MONGO_CONNECTION_URL
    if (!connectionUrl) throw new Error("process.env.MONGO_CONNECTION_URL not found")

    await mongoose.connect(connectionUrl)
    await import("./domain/import-mongoose")

    await this.commands.enableApplicationCommandsExtension({})
    await this.commands.enableTextCommandsExtension({ prefix: "!" })

    Promise.all(this.getModuleRegisterPromises())

    await this.client.login(process.env.BOT_TOKEN)
    await this.commands.getApplicationCommandsExtension()?.sync()
  }

  private getModuleRegisterPromises() {
    return this.extensions.map(
      (extension): Promise<void> => this.commands.registry.registerModule(extension)
    )
  }
}
