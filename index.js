require("dotenv").config()
const client = require("./utils/loader")

client.login(process.env.token)