module.exports = function execute(msg, bot) {
  if(msg.text.toLowerCase().match(/\bbom dia\b/)) {
    bot.sendMessage(msg.chat.id, 'Bom dia, brother!', {'reply_to_message_id': msg.message_id})
  }
  if(msg.text.toLowerCase().match(/\bboa tarde\b/)) {
    bot.sendMessage(msg.chat.id, 'Boa tarde, brother!', {'reply_to_message_id': msg.message_id})
  }
  if(msg.text.toLowerCase().match(/\bboa noite\b/)) {
    bot.sendMessage(msg.chat.id, 'Boa noite, brother!', {'reply_to_message_id': msg.message_id})
  }
}
