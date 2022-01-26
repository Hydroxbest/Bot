const { Client, Message, MessageEmbed, Collection, Collector } = require('discord.js')
const fs = require('fs')
const client = new Client({
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
    intents: 32767,
});

module.exports = client;

const config = require('./config.json')
const prefix = config.prefix
const token = config.token


client.on('ready', () => {
    console.log(`${client.user.tag} is ready!`)

    const actvs = [
        `${prefix}help | Under Development`,
        `${prefix}help | ${client.channels.cache.size} channels`,
        `${prefix}help | ${client.users.cache.size} users`,
        `${prefix}help | ${client.guilds.cache.size} servers`,
    ]

    client.user.setActivity(actvs[Math.floor(Math.random() *(actvs.length -1) +1)], { type: 'WATCHING' });
       setInterval(() => {
           client.user.setActivity(actvs[Math.floor(Math.random() *(actvs.length -1) +1)], { type: 'WATCHING' });
    }, 5000);

    client.user.setStatus('dnd')


 });

 
client.on('messageCreate', message => {
    if (message.author.bot) return;
    msg = message.content.toLowerCase();

    if(msg.startsWith (prefix + 'ping')) {
        message.channel.send('Pong!')
    }
})



//new collections
client.commands = new Collection();
client.aliases = new Collection();
client.events = new Collection();

client.categories = fs.readdirSync('./commands');

//load the files
[`command`].forEach((handler) => {
    require(`./handler/${handler}`)(client)
});


client.login(token)