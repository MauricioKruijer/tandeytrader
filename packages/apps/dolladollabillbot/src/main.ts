import * as express from 'express'
import {libsStoreChat} from '@tandeytrader/libs/store-chat'
import 'tslib'

const app = express();

const { BOT_TOKEN, DEV } = process.env;

app.get('/', async (req, res) => {
  res.send('Your token is ' + BOT_TOKEN)
})

app.post('/telegraf', async (req, res) => {
  res.send({message: 'OK'})
})

exports.dolladollabillbot = app
