import { GatewayIntentBits, Client, Partials, Message } from 'discord.js'
import dotenv from 'dotenv'

import { erase_pin_automsg, pindome, unpin_command, unpin_reaction_subscriber } from './pindome_func'

//.envファイルを読み込む
dotenv.config()

//Botで使うGetwayIntents、partials
const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions
    ],
    partials: [Partials.Message, Partials.Channel],
})


client.once('ready', () => {
    console.log('Ready!')
    if (client.user) {
        console.log(client.user.tag)
    }
})

client.on('messageReactionAdd',(reaction,user) =>{
    pindome(reaction,user)
    unpin_reaction_subscriber(reaction,user)
})

client.on('messageCreate',(message) =>{
    erase_pin_automsg(client.user,message)
    unpin_command(message)
})

//ボット作成時のトークンでDiscordと接続
client.login(process.env.TOKEN)
