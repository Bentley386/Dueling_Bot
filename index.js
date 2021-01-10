require("dotenv").config();

const Manager = require("./Manager.js");
const Discord = require("discord.js");

const client = new Discord.Client();
client.login(process.env.TOKEN);

const manager = new Manager();

client.on("message", manager.onMessage);
