import { Message } from "discord.js";


export function other_funcs(message:Message){
    let msg_content = message.content

    if(msg_content.startsWith("!pin")){
        let msg_len = msg_content.length
        if(msg_len == 1){
            message.reply("引数が少なすぎるよ")
            return
        }

        if(msg_len == 2){
            
        }
    }
}