const TelegramBot = require('node-telegram-bot-api')
const TOKEN = process.env.SKYNET_TOKEN
const R = require('ramda')
const saudacao = require('./saudacao')
const sensors = require('./sensors')
const ping = require('./ping')
const images = require('./images')

const bot = new TelegramBot(TOKEN, { polling: true })

bot.onText( /\/echo (.*)/, ( msg, match ) => {
  bot.sendMessage(msg.chat.id, `Olá ${msg.chat.first_name}! Seu comando de echo foi: ${match[1]}`)
})

bot.onText( /\/logo/, ( msg, match ) => {
  bot.sendPhoto(msg.chat.id, 'http://www.planosassessoria.com.br/site/images/logo-colored.png')
})

bot.onText( /\/ping (.*)/, ( msg, match ) => {
  bot.sendMessage(msg.chat.id, 'Aguarde. A requisição está em andamento!')
  ping.executePing(msg, match[1], bot)
})

bot.onText( /\/endereco/, ( msg, match ) => {
  bot.sendLocation(msg.chat.id, -14.0583027, -52.1604462)
})

bot.onText( /\/nodestatus/, ( msg, match ) => {
  ping.pm2Status(msg, bot)
})

bot.onText( /\/telefone/, ( msg, match ) => {
  bot.sendContact(msg.chat.id, '(66) 3468-3248', 'Planos Assessoria')
})

bot.onText( /\/now/, ( msg, match ) => {
  let dt = new Date()
  bot.sendMessage(msg.chat.id, `Hoje é ${dt.getDate()}/${dt.getMonth() +1}/${dt.getFullYear()}`, {'reply_to_message_id': msg.message_id})
})

bot.onText( /\/serverstatus/, ( msg, match ) => {
  ping.serverStatus(msg, bot)
})

// bot.onText( /\/temperatura/, ( msg, match ) => {
//   sensors.temperatura(msg, bot)
// })

bot.on('message', msg => {
  if(!R.isNil(msg.text)) {
    if(msg.text.toLowerCase().match(/\bkkk\b/)) {
      // bot.sendPhoto(msg.chat.id, 'http://www.snopes.com/wordpress/wp-content/uploads/2017/01/trump-kkk.jpg', {'reply_to_message_id': msg.message_id})
      images.getKKKImage(msg, bot)
    }
    if(msg.text.toLowerCase().match(/\bpapai\b/)) {
      bot.sendPhoto(msg.chat.id, 'https://p2.trrsf.com/image/fget/cf/460/0/images.terra.com/2015/11/17/hitler.jpg', {'reply_to_message_id': msg.message_id})
      bot.sendMessage(msg.chat.id, 'Este é meu pai!')
    }
    saudacao(msg, bot)
  }
})
