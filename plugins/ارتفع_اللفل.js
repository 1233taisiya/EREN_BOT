//import db from '../lib/database.js'
import { canLevelUp } from '../lib/levelling.js'
//حقوق روبيرتو
if (image !== "غير متوفر") {
    const imageResponse = await axios.get(image, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(imageResponse.data, 'binary');

    await conn.sendMessage(m.chat, { image: imageBuffer, caption: messageText });
} else {
    const imageResponse = await axios.get("https://github.com/OfcDiego/YoshikoBot-MD?tab=readme-ov-file", { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(imageResponse.data, 'binary');

    await conn.sendMessage(m.chat, { image: imageBuffer, caption: messageText });
}

export async function before(m, { conn }) {
  let user = global.db.data.users[m.sender]
  if (!user.autolevelup) return !0
  let before = user.level * 1
  while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++
  user.role = global.rpg.role(user.level).name
  if (before !== user.level) {
    m.reply(
	    `
*「✧|───✦❯┇💎┇❮✦───|✧」*
*⚡️┃مـبـروك للتـرقـيه الجـديـده┃⚡*

 *⎔↞┃الـمستـوى الـسابق💧↞ ${before}┃*
 *⎔↞┃الـتـرقيـه الـى🎖↞ ${user.level}┃*
 *⎔↞┃الـرتـبـة⚔️↞ ${user.role}┃*

*「✧|───✦❯┇💎┇❮✦───|✧」*
 _لتـعـطـبـل الـمـيـزة_
_*/off autolevelup*_
	`.trim()
    )
  }
}
