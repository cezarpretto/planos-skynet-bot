const KKKImages = [
  'http://www.snopes.com/wordpress/wp-content/uploads/2017/01/trump-kkk.jpg',
  'http://s1.static.brasilescola.uol.com.br/artigos/kkk.jpg?i=http://brasilescola.uol.com.br/upload/e/kkk.jpg&w=302&h=293&c=FFFFFF&t=1',
  'https://media1.britannica.com/eb-media/41/190741-004-656BD12B.jpg',
  'http://www.eurthisnthat.com/wp-content/uploads/2014/11/KKK-today.jpg',
  'https://blogtiozao.files.wordpress.com/2011/08/641-ze-gotinha-ou-ku-klux-klan.jpg',
  'https://lh5.googleusercontent.com/-SG434raFDBg/U3VnfoRGgwI/AAAAAAABqOI/AMxRdWQyZyE/10380305_874919475857366_1509254434399134785_n.jpg'
]

function getKKKImage(msg, bot) {
  let position = Math.floor(Math.random() * KKKImages.length-1) + 0
  bot.sendPhoto(msg.chat.id, KKKImages[position], {'reply_to_message_id': msg.message_id})
}

module.exports = {
  getKKKImage
}
