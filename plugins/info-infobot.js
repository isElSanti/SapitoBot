import db from '../lib/database.js'
import { cpus as _cpus, totalmem, freemem, platform, hostname } from 'os'
import speed from 'performance-now'
import { sizeFormatter } from 'human-readable'

let format = sizeFormatter({
    std: 'JEDEC',
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    render: (literal, symbol) => `${literal} ${symbol}B`,
})

let handler = async (m, { conn, usedPrefix }) => {
    let bot = global.db.data.settings[conn.user.jid]
    let totalStats = Object.values(global.db.data.stats).reduce((total, stat) => total + stat.total, 0)
    let totalf = Object.values(global.plugins).filter((v) => v.help && v.tags).length

    let info = `  *Informacion de ${global.botname}*\n\n`
    info += `✎˚₊· 💚 *Prefijo* : [  ${usedPrefix}  ]\n`
    info += `✥˚₊· 💚 *Total Plugins* : ${totalf}\n`
    info += `✦˚₊· 💚 *Comandos Ejecutados* : ${toNum(totalStats)} ( *${totalStats}* )\n\n`
    info += `*◤ Hosts:*\n`
    info += `✰˚₊· 💚 *Plataforma* : ${platform()}\n`
    info += `✿˚₊· 💚 *Servidor* : ${hostname()}\n`
    info += `✧˚₊· 💚 *RAM* : ${format(totalmem() - freemem())} / ${format(totalmem())}\n`
    info += `⚘˚₊· 💚 *Free-RAM* : ${format(freemem())}\n\n`
    info += `❒ *NodeJS Uso de memoria* :\n`
    info += `${'```' + Object.keys(process.memoryUsage()).map((key) => `${key}: ${format(process.memoryUsage()[key])}`).join('\n') + '```'}`

    await conn.reply(m.chat, info, fkontak, { contextInfo: { mentionedJid: [owner[0][0] + '@s.whatsapp.net'] } })
}

handler.help = ['botinfo']
handler.tags = ['info']
handler.command = ['info', 'botinfo', 'infobot']

export default handler

function toNum(number) {
    if (number >= 1000 && number < 1000000) {
        return (number / 1000).toFixed(1) + 'k'
    } else if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + 'M'
    } else if (number <= -1000 && number > -1000000) {
        return (number / 1000).toFixed(1) + 'k'
    } else if (number <= -1000000) {
        return (number / 1000000).toFixed(1) + 'M'
    } else {
        return number.toString()
    }
}
