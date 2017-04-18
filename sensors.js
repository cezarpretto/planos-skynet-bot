const servers = require('./servers')
const exec = require('node-exec-promise').exec

function temperatura(msg, bot) {
  let retorno = ``
  bot.sendMessage(msg.chat.id, 'Aguarde. A requisição está em andamento!')
  let count = 0
  exec("ssh operador@172.16.10.102 -i /home/operador/.ssh/sensors 'sensors'").then(stdout => {
    console.log(stdout)
  }, stderr => {
    bot.sendMessage(msg.chat.id, stderr)
  })
  // servers.forEach(server => {
  // })
}
module.exports = {
  temperatura
}
