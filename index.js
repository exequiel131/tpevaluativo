const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');


const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, {
        small: true
    });
        console.log(qr);
});

client.on('ready', () => {
    console.log('Conectado a whatsapp!');
});

client.on('message', msg => {
	console.log("Mensaje Recibido!", msg.body);
    console.log("De: ", msg.from);
    msg.reply("Hola soy un Bot");
});


client.initialize();