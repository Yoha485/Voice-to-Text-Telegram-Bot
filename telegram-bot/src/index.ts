import TelegramBot from "node-telegram-bot-api";
import FormData from "form-data";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const token = process.env.TOKEN;
if (!token) {
  throw new Error("No Telegram Token Provided");
}
const bot = new TelegramBot(token, { polling: true });

bot.on("voice", (msg) => {
  const id = msg.voice?.file_id as string;
  const stream = bot.getFileStream(id);
  const formData = new FormData();

  formData.append("file", stream);
  console.log("received one");

  axios.post("http://localhost:5000/api/upload", formData).then((res) => {
    bot.sendMessage(msg.chat.id, res.data);
  });
});

console.log("Bot is Running");
