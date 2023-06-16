require("dotenv").config()
export const configData = require(`./utils/config${process.env.bot}`)
import { client } from "./utils/index"

client.login(process.env.token)