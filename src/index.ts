import TelegramBot from "node-telegram-bot-api";
import ChatIdStore from "./chatIdStore";

const token = "7018997563:AAE7qyeX7cobcI1eNdNpoQW4EgMncELRPVU";

const main = () => {
  const bot = new TelegramBot(token, { polling: true });

  bot.on("message", msg => {
    const chatId = msg.chat.id;
    ChatIdStore.add(chatId);
    bot.sendMessage(chatId, "Чат id теперь мой");
  });

  let i = 1;
  const incrementor = () => {
    for (const id of ChatIdStore.arr) bot.sendMessage(id, i + "");
    i++;
    setTimeout(incrementor, 1000);
  };
  incrementor();
};

process.on("SIGINT", () => {
  ChatIdStore.save();
  process.exit();
});

ChatIdStore.load();
main();
