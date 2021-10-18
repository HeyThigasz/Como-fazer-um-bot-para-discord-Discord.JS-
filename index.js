const Discord = require('discord.js');
const bot = new Discord.Client({intents: 32767});

bot.login(config.token); //Isto irá deixar o bot ligado.

bot.on('ready', async () => {
bot.user.setPresence({status: 'dnd'}) //online = online dnd = dont not disturb
console.log(`Seu bot iniciou em ${bot.guilds.cache.size} servidores com ${bot.users.cache.size} e ${bot.emojis.cache.size} emojis.`)
})

bot.on('messageCreate', message => { // Event message
    if(message.author.bot) return; //Se o author da mensagem for um bot ele não irá responder
    if(message.channel.type == 'dm') return; //Se o comando for no privado do bot ele não irá responder.
    if(!message.content.toLowerCase().startsWith(config.prefix.toLowerCase())) return;
    if(message.content.startsWith(`<@!${bot.user.id}>`) || message.content.startsWith(`<@${bot.user.id}>`)) return;
    
    const args = message.content
    .trim().slice(config.prefix.length)
    .split(/ +/g)
    
    const command = args.shift().toLowerCase();
    
    try {
    const commandFile = require(`./comandos/${command}.js`)
    commandFile.run(bot, message, args);
    } catch (err) {
    console.error('Erro' + err);
    }
    });
