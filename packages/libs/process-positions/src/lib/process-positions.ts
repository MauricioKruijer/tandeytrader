import { getAllOpenPositionsFromUserPortfolio } from './getAllOpenPositionsFromUserPortfolio'

const formatInfoForSymbol = (item: string) => {
  return  `
Ticker: ${item}
Amount: 12000
Rate: $0.18267 ₿0.000006026
Value: $2,192.04 ₿0.072312
Average Purchase Rate: $0.29
Profit / loss: -$1,287.96
Profit / loss: -37,01%
`
}

const showAllOpenPositions = () => {
  const positions = getAllOpenPositionsFromUserPortfolio()

  return positions.map(formatInfoForSymbol).join(`\n=====\n`)
}

const getTickerSymbolsFromUserPortfolio = () => {
  return ['CRO', 'BTC', 'ETH', 'SOL']
}

const validateTickerSymbol = (symbol: string): void => {
  const knownSymbols = getTickerSymbolsFromUserPortfolio()

  if (!knownSymbols.includes(symbol)) {
    throw new Error(`Symbol ${symbol} not found in portfolio`)
  }
}

export function processPositions(tickerSymbol: string = null): string {
  if (!tickerSymbol || tickerSymbol === '') {
    return showAllOpenPositions()
  }

  validateTickerSymbol(tickerSymbol)

  return formatInfoForSymbol(tickerSymbol)
}
