"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
const pindome_func_1 = require("./pindome_func");
//.envファイルを読み込む
dotenv_1.default.config();
//Botで使うGetwayIntents、partials
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.DirectMessages,
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMembers,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent,
        discord_js_1.GatewayIntentBits.GuildMessageReactions
    ],
    partials: [discord_js_1.Partials.Message, discord_js_1.Partials.Channel],
});
client.once('ready', () => {
    console.log('Ready!');
    if (client.user) {
        console.log(client.user.tag);
    }
});
client.on('messageReactionAdd', (reaction, user) => {
    (0, pindome_func_1.pindome)(reaction, user);
    (0, pindome_func_1.unpin_reaction_subscriber)(reaction, user);
});
client.on('messageCreate', (message) => {
    (0, pindome_func_1.erase_pin_automsg)(client.user, message);
    (0, pindome_func_1.unpin_command)(message);
});
//ボット作成時のトークンでDiscordと接続
client.login(process.env.TOKEN);
