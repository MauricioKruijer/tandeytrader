import * as express from 'express'
import 'tslib'

const app = express();

app.get('/', async (req, res) => {
  res.send('Hi')
})

app.post('/telegraf', async (req, res) => {
  res.send({message: 'OK'})
})

exports.dolladollabillbot = app
