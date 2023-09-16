import { User, MessageReaction, PartialMessageReaction, PartialUser, Message, MessagePayload } from 'discord.js'

export function pindome(reaction:MessageReaction|PartialMessageReaction,user:User|PartialUser):void{
    //BOTは無視
    if(user.bot == true)return

    //ピン止めが可能であれば実行
    if(reaction.emoji.name == "📌"){
        if(reaction.message.pinnable){
            reaction.message.pin()
            let sendmsg = "@" + user.toString() + "\nメッセージをピン留めしましたっ！"
            reaction.message.channel.send(sendmsg)
        }else{
            let sendmsg = "@" + user.toString() + "\nメッセージをピン留めできなかったよ"
            reaction.message.channel.send(sendmsg)
        }
    }

    return
}

export function erase_pin_automsg(me:User|null,message:Message):void{
    if(me != null){
        if(message.system){
            if(message.author.id == me.id){
                if(message.deletable){
                    message.delete()
                }else{
                }
            }
        }
    }

}
