"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const { range } = require("discord.js");
const loader_1 = require("./utils/loader");
loader_1.client.login(process.env.token);