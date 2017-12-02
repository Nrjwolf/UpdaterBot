const TelegramBot = require('node-telegram-bot-api');
var express = require('express');

/*---
    Написанный ниже код не претендует ни на что, написан в ознакомительных целях
    https://t.me/nrjwolf_live
---*/

const token = "TOKEN"; // Спроси у https://t.me/BotFather
const chat_id = "@loading_channel";

var msg_id = 1; // последний id + 1, узнать последний id можно скопировав ссылку на сообщение

function create() {
    bot = new TelegramBot(token, { polling: true });
}

function updateMe() {
    updateTitle(() => {
        // Ф-ия смены картинки отключена
        /* updatePhoto(() => {
            console.log('updated');
            setTimeout(updateMe, 3000);
        }); */
        setTimeout(updateMe, 3000); // закоментить, если раскоменчено выше
    });
}

var percent = 1;
function updateTitle(callback) {
    bot.setChatTitle(chat_id, `loading ${percent.toString()}%`).then((result) => {
        percent++;
        if (percent > 100)
            percent = 0;

        // удаляем сообщение, затем вызываем калбек
        deleteLast(() => {
            callback();
        });
    }).catch((error) => {
        console.log(error);
    });
}

var img = 1;
function updatePhoto() {
    console.log("img  " + img);
    bot.setChatPhoto(chat_id, `./img/${img}.png`).then((result) => {
        img++;
        if (img > 8)
            img = 1;
        // удаляем сообщение, затем обновляем фото
        deleteLast(() => {
            updatePhoto();
        });
    }).catch((error) => {
        console.log(error);
    });
}

function deleteLast(callback) {
    bot.deleteMessage(chat_id, msg_id).then((result) => {
        msg_id++;
        console.log(msg_id);
        callback();
    }).catch((error) => {
        console.log(error);
    });
}

create();
updateMe();
