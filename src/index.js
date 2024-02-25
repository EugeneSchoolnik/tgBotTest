"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const chatIdStore_1 = __importDefault(require("./chatIdStore"));
const token = "7018997563:AAE7qyeX7cobcI1eNdNpoQW4EgMncELRPVU";
const main = () => {
    const bot = new node_telegram_bot_api_1.default(token, { polling: true });
    bot.on("message", msg => {
        const chatId = msg.chat.id;
        chatIdStore_1.default.add(chatId);
        bot.sendMessage(chatId, "Чат id теперь мой");
    });
    let i = 1;
    const incrementor = () => {
        for (const id of chatIdStore_1.default.arr)
            bot.sendMessage(id, i + "");
        i++;
        setTimeout(incrementor, 1000);
    };
    incrementor();
};
process.on("SIGINT", () => {
    chatIdStore_1.default.save();
    process.exit();
});
chatIdStore_1.default.load();
main();
