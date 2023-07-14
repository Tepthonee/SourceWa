const {
    Module
} = require('../main');
const {
    processOnwa
} = require('./misc/misc');
Module({
    pattern: 'بحث ?(.*)',
    fromMe: true,
    desc: 'يسرد الأرقام المسجلة في واتسـاب ، غير المسجلة وما إلى ذلك.',
    use: 'whatsapp',
    usage: 'onwa +48888888xxx'
}, (async (message, match) => {
    if (!match[1]) return await message.sendReply("_Need number!_");
    let x = await message.send("_جـاري المعالجـة.._");
    await processOnwa(message,match[1])
    return await message.edit('_Task complete!_',message.jid,x.key)
}));