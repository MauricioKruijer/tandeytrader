import { processPositions } from '@tandeytrader/libs/process-positions'
import { Telegraf, Context } from 'telegraf'

const COMMAND = `positions`

const stripCommand = (input: string): string => {
  const [showAll, symbol] = input.split(' ')

  if (symbol) {
    return symbol
  }

  return showAll.replace(`/${COMMAND}`, ``)
}

export const positionsCommand = (bot: Telegraf<Context>) => {
  bot.command(COMMAND, ctx => {
    ctx.reply(processPositions(stripCommand(ctx.update.message.text)))
  })
}
