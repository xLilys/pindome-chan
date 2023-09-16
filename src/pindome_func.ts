import { User, MessageReaction, PartialMessageReaction, PartialUser, Message, MessagePayload } from 'discord.js'

export function pindome(reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser): void {
    //BOTは無視
    if (user.bot == true) return

    const pin_emoji = "📌"

    switch (reaction.emoji.name) {
        case pin_emoji: {
            //ピン止めが可能であれば実行
            if (reaction.message.pinnable) {
                reaction.message.pin()
                let sendmsg = "@" + user.toString() + "\nメッセージをピン留めしましたっ！"
                reaction.message.channel.send(sendmsg)
            } else {
                let sendmsg = "@" + user.toString() + "\nメッセージをピン留めできなかったよ"
                reaction.message.channel.send(sendmsg)
            }
        }
    }

    return
}

export function erase_pin_automsg(me: User | null, message: Message): void {
    if (me != null) {
        if (message.system) {
            if (message.author.id == me.id) {
                if (message.deletable) {
                    message.delete()
                } else {
                }
            }
        }
    }

}

export function unpin_command(message:Message):void{
    let msgstr = message.content
    if(msgstr.startsWith("!pin")){
        let c = msgstr.split(" ")
        if(c.length < 3){
            message.reply("引数が少なすぎるよ")
            return
        }
        if(c.length > 3){
            message.reply("引数が多すぎるよ")
            return
        }
        if(c.length == 3){
            if(c[1] == "unpin"){
                let unpin_msgid = c[2]
                let unpin_msg = message.channel.messages.fetch(unpin_msgid)
                unpin_msg.then((targetMessage) =>{
                    if(targetMessage){
                        let ask_msg = message.reply("ほんとうにピン留めを外してもいいの？")
                        ask_msg.then((ask_message) =>{
                            ask_message.react("✅")
                            ask_message.react("❌")
                        })
                    }
                })
            }
        }
    }
}
