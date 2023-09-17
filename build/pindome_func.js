"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unpin_reaction_subscriber = exports.unpin_command = exports.erase_pin_automsg = exports.pindome = void 0;
function pindome(reaction, user) {
    //BOTは無視
    if (user.bot == true)
        return;
    const pin_emoji = "📌";
    switch (reaction.emoji.name) {
        case pin_emoji: {
            //ピン止めが可能であれば実行
            if (reaction.message.pinnable) {
                if (!reaction.message.pinned) {
                    reaction.message.pin();
                    let sendmsg = user.toString() + "がメッセージをピン留めしましたっ！";
                    reaction.message.reply(sendmsg);
                }
            }
            else {
                if (!reaction.message.pinned) {
                    let sendmsg = user.toString() + "\nメッセージをピン留めできなかったよ。";
                    reaction.message.channel.send(sendmsg);
                }
            }
        }
    }
    return;
}
exports.pindome = pindome;
function erase_pin_automsg(me, message) {
    if (me != null) {
        if (message.system) {
            if (message.author.id == me.id) {
                if (message.deletable) {
                    message.delete();
                }
                else {
                }
            }
        }
    }
}
exports.erase_pin_automsg = erase_pin_automsg;
function unpin_command(message) {
    let msgstr = message.content;
    if (msgstr.startsWith("!pin")) {
        let c = msgstr.split(" ");
        if (c.length < 3) {
            message.reply("引数が少なすぎるよ。");
            return;
        }
        if (c.length > 3) {
            message.reply("引数が多すぎるよ。");
            return;
        }
        if (c.length == 3) {
            if (c[1] == "unpin") {
                let unpin_msgid = c[2];
                let unpin_msg = message.channel.messages.fetch(unpin_msgid);
                unpin_msg.then((targetMessage) => {
                    if (targetMessage) {
                        if (!targetMessage.pinned) {
                            let repl = message.channel.send(message.author.toString() + `\nメッセージ\"${unpin_msgid}\"はピン留めされてないよ。\nメッセージを削除は❌`);
                            repl.then((fail_reply_message) => {
                                fail_reply_message.react("❌");
                            });
                            if (message.deletable) {
                                message.delete();
                            }
                            return;
                        }
                        let ask_msg = targetMessage.reply("ほんとうにピン留めを外してもいいの？");
                        ask_msg.then((ask_message) => {
                            ask_message.react("✅");
                            ask_message.react("❌");
                            if (message.deletable) {
                                message.delete();
                            }
                        });
                    }
                    else {
                        message.reply(`メッセージ\"${unpin_msgid}\"が見つからなかったよ。`);
                        if (message.deletable) {
                            message.delete();
                        }
                    }
                });
            }
        }
    }
}
exports.unpin_command = unpin_command;
function unpin_reaction_subscriber(reaction, user) {
    var _a;
    if (user.bot)
        return;
    switch (reaction.emoji.name) {
        case "✅": {
            if ((_a = reaction.message.reference) === null || _a === void 0 ? void 0 : _a.messageId) {
                let unpin_message = reaction.message.channel.messages.fetch(reaction.message.reference.messageId);
                unpin_message.then((dest_message) => {
                    if (dest_message.pinned) {
                        dest_message.reactions.removeAll();
                        dest_message.unpin();
                        dest_message.reply("ピン留めを外しましたっ！");
                        if (reaction.message.deletable) {
                            reaction.message.delete();
                        }
                    }
                });
            }
            break;
        }
        case "❌": {
            if (reaction.message.deletable) {
                reaction.message.delete();
            }
            break;
        }
    }
}
exports.unpin_reaction_subscriber = unpin_reaction_subscriber;
