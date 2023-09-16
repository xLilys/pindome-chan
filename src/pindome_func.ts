import { User, MessageReaction, PartialMessageReaction, PartialUser, ReactionCollector } from 'discord.js'

export function pindome(reaction:MessageReaction|PartialMessageReaction,user:User|PartialUser):void{
    //BOTは無視
    if(user.bot == true)return

    console.log(reaction.emoji.name)

    return
}
