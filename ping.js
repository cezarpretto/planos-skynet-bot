const ping = require('ping')
const servers = require('./servers')
const exec = require('node-exec-promise').exec

function executePing(msg, host, bot) {
  ping.promise.probe(host, {
        timeout: 10,
        extra: ["-c 4"],
    })
    .then(res => {
      if(res.alive) {
        bot.sendMessage(msg.chat.id, res.output)
      } else {
        bot.sendMessage(msg.chat.id, 'O endereço está fora de alcance 😷')
      }
    })
}

function serverStatus(msg, bot) {
  let retorno = ``
  bot.sendMessage(msg.chat.id, 'Aguarde. A requisição está em andamento!')
  let count = 0
  servers.forEach(server => {
    ping.promise.probe(server.host, {
          timeout: 10,
          extra: ["-c 4"],
      })
      .then(res => {
        count ++
        if(res.alive) {
          retorno += `*${server.name}*: OPERANTE 😎 \n\n`
        } else {
          retorno += `*${server.name}*: FORA DE ALCANCE 😢 \n\n`
        }
        if(count === servers.length) {
          bot.sendMessage(msg.chat.id, retorno, { parse_mode: 'Markdown' })
        }
      })
  })
}

function pm2Status(msg, bot) {
  exec("ssh operador@172.16.10.103 'pm2 status'").then(stdout => {
    // .filter((line, index) => index < stdout.length -4)
    stdout = stdout.split('\n').filter((line, index) => index > 2)
    stdout = stdout.filter((line, index) => index < stdout.length -3)
    stdout = stdout.map(line => {
      let cell = line.split('│')
      return `*SERVIÇO:* ${cell[1].trim()}\n*STATUS:* ${cell[5].trim()} \n\n`
    })
    bot.sendMessage(msg.chat.id, stdout.join(), { parse_mode: 'Markdown' })
  }, stderr => {
    bot.sendMessage(msg.chat.id, stderr)
  })
}

module.exports = {
  executePing,
  serverStatus,
  pm2Status
}
