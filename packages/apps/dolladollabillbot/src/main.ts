import 'tslib'
import * as express from 'express'
import { Telegraf } from 'telegraf'
import {storeConversation} from '@tandeytrader/libs/store-conversation'

const { BOT_TOKEN, WEBHOOK_URL, DEV } = process.env
const version = 'v2-bot'
const app = express()

if (BOT_TOKEN === undefined || BOT_TOKEN === '') {
  throw new Error('BOT_TOKEN is required')
}

const bot = new Telegraf(BOT_TOKEN)

bot.telegram.getWebhookInfo().then(({url}) => {
  if (url !== WEBHOOK_URL) {
    bot.telegram.setWebhook(WEBHOOK_URL)
  }
}).catch(err => {
  console.log({err})
})

bot.use(async (ctx, next) => {
  const start = new Date();

  try {
    await storeConversation(ctx.chat);
    await next();
  } catch (err) {
    console.log('Caught error', err);
  }

  const ms = new Date().getTime() - start.getTime();

  console.log(`Response time ms %sms`, ms);
})

bot.command('hello', (ctx) => {
  ctx.reply('Hello, friend!')
})

app.get('/', async (req, res) => {
  return res.send({ version })
})

app.post('/telegraf', async (req, res) => {
  try {
    await bot.handleUpdate(req.body)
  } finally {
    return res.status(200).end()
  }
})

exports.dolladollabillbot = app
