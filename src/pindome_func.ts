import { User, MessageReaction, PartialMessageReaction, PartialUser, ReactionCollector, ReactionEmoji } from 'discord.js'

export function pindome(reaction:MessageReaction|PartialMessageReaction,user:User|PartialUser):void{
    //BOTは無視
    if(user.bot == true)return

    //ピン止めが可能であれば実行
    if(reaction.emoji.name == "📌"){
        if(reaction.message.pinnable){
            reaction.message.pin()
        }
    }

    return
}
