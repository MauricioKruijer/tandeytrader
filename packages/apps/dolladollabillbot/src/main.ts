import 'tslib'
import * as express from 'express'
import { Telegraf } from 'telegraf'
import {libsStoreChat} from '@tandeytrader/libs/store-chat'

const { BOT_TOKEN, WEBHOOK_URL, DEV } = process.env
const version = 'v1-bot'
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
