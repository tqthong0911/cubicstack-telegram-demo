const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");
require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);
const TEXT_RESPONSE =
  "Welcome @tqthong0911 <a href='https://www.google.com/'>Google</a>";
bot.start(async (ctx) => {
  debugger;
  console.log("tqt", JSON.stringify(ctx.update.message.chat));
  ctx.reply(TEXT_RESPONSE, { parse_mode: "HTML" });
  await bot.telegram.sendMessage(ctx.chat.id, TEXT_RESPONSE, {
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Yes",
            callback_data: "btn_yes",
          },
        ],
        [
          {
            text: "No",
            callback_data: "btn_no",
          },
        ],
      ],
    },
  });
});

bot.action("btn_yes", (ctx) => {
  ctx.answerCbQuery("You clicked on No"); // This sends a response to acknowledge the button click

  // Your custom logic for handling the "No" button goes here
  // For example, you can reply with a message
//   ctx.reply("You clicked on Yes");
});

bot.help((ctx) => ctx.reply("Send me a sticker"));
bot.on(message("sticker"), (ctx) => ctx.reply("👍"));
bot.hears("hi", (ctx) => ctx.reply("Hey there"));
bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
