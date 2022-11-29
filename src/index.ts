import { config } from "dotenv"
import { App } from "./app"
import { extensions } from "./controllers"

config()
new App(extensions).boot()
