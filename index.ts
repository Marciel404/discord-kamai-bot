require("dotenv").config()
import { client } from "./utils/loader"

client.login(process.env.token)
