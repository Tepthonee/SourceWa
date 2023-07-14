/* Copyright (C) 2022 Sourav KL11.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
Raganork MD - Sourav KL11
*/
const simpleGit = require('simple-git');
const git = simpleGit();
const {Module} = require('../main');
const {update} = require('./misc/koyeb');
const {MessageType} = require('@adiwajshing/baileys');
const Config = require('../config');
const {fixHerokuAppName} = require('./manage');
const exec = require('child_process').exec;
const Heroku = require('heroku-client');
const { PassThrough } = require('stream');
const heroku = new Heroku({ token: Config.HEROKU.API_KEY })
const { skbuffer } = require('raganork-bot');
var handler = Config.HANDLERS !== 'false'?Config.HANDLERS.split("")[0]:"";
let isHeroku = Config.HEROKU.API_KEY && Config.HEROKU.APP_NAME
Module({
    pattern: 'تحديث ?(.*)',
    fromMe: true,
    desc: "Updates bot",
    use: 'owner'
}, (async (message, match) => {
    if (match[1] == "start") return;
    await git.fetch();
    var commits = await git.log(['main' + '..origin/' + 'main']);
    var mss = '';
    if (commits.total === 0) {
        mss = "*لـم أتمـكن من وجـود أي تحديثـات!*"
        return await message.sendReply(mss);
    } else {
        var changelog = "_*سجل التغيـرات*:_\n\n";
        for (var i in commits.all){
        changelog += `${(parseInt(i)+1)}• *${commits.all[i].message}*\n`
    }
}
        changelog+=`\n*مـلاحظـة هامـة* : .تحديث الان للتأكيد على أنك تريد التحديث أرسـل`
          const Message = {
              text: changelog
            }
    return await message.client.sendMessage(message.jid,Message)   
}));
Module({pattern: 'تحديث الان',use: 'owner', fromMe: true,dontAddCommandList: true, desc: "Updates bot"}, (async (message, match) => {
    await git.fetch();
    var commits = await git.log(['main' + '..origin/' + 'main']);
    if (commits.total === 0) {
        return await message.client.sendMessage(message.jid, { text:"_لا يوجد أية تحديثـات 🥀_"})

        } 
    if (!__dirname.startsWith("/rgnk") && !isHeroku){
        await require("simple-git")().reset("hard",["HEAD"])
        await require("simple-git")().pull()
        await message.sendReply("_تم التحديث بنجاح. يرجى تحديث وحدات npm يدويًا إن أمكن!_")
        process.exit(0);    
        }
        else if (isHeroku) {
            await fixHerokuAppName(message)
            await message.client.sendMessage(message.jid, { text:"_Started update.._"})

            try {
                var app = await heroku.get('/apps/' + Config.HEROKU.APP_NAME)
            } catch {
                await message.client.sendMessage(message.jid, { text:"معلومات Heroku خاطئة!"})

                await new Promise(r => setTimeout(r, 1000));
            }
            git.fetch('upstream', 'main');
            git.reset('hard', ['FETCH_HEAD']);

            var git_url = app.git_url.replace(
                "https://", "https://api:" + Config.HEROKU.API_KEY + "@"
            )
            
            try {
                await git.addRemote('heroku', git_url);
            } catch { console.log(''); }
            await git.push('heroku', 'main');

            await message.client.sendMessage(message.jid, { text:"_Successfully updated_"})
           await message.client.sendMessage(message.jid, { text:"_Restarting_"})
            } else {
                await update("UPDATER",'default')
                await message.client.sendMessage(message.jid, { text:"_Update started!_"})
    }
    }));
Module({pattern: 'updt',use: 'owner', fromMe: true,dontAddCommandList: true, desc: "Updates bot"}, (async (message, match) => {
    await git.fetch();
    var commits = await git.log(['main' + '..origin/' + 'main']);
    if (commits.total === 0) {
        return await message.client.sendMessage(message.jid, { text:"_Bot up to date_"})

        } 
    if (!__dirname.startsWith("/rgnk") && !isHeroku){
        await require("simple-git")().reset("hard",["HEAD"])
        await require("simple-git")().pull()
        await message.sendReply("تم التحديث بنجاح. يرجى تحديث وحدات npm يدويًا إن أمكن!_")
        process.exit(0);    
        }
        else if (isHeroku) {
            await fixHerokuAppName(message)
            await message.client.sendMessage(message.jid, { text:"_بدأ التحديث 💡.._"})

            try {
                var app = await heroku.get('/apps/' + Config.HEROKU.APP_NAME)
            } catch {
                await message.client.sendMessage(message.jid, { text:"Heroku information wrong!"})

                await new Promise(r => setTimeout(r, 1000));
            }
            git.fetch('upstream', 'main');
            git.reset('hard', ['FETCH_HEAD']);

            var git_url = app.git_url.replace(
                "https://", "https://api:" + Config.HEROKU.API_KEY + "@"
            )
            
            try {
                await git.addRemote('heroku', git_url);
            } catch { console.log(''); }
            await git.push('heroku', 'main');

            await message.client.sendMessage(message.jid, { text:"_   _"})
           await message.client.sendMessage(message.jid, { text:"*جـاري التحديـث 💡...*"})
            } else {
                await update("UPDATER",'default')
                await message.client.sendMessage(message.jid, { text:"*تم التحديـث بنجـاح ✅*"})
    }
    }));
