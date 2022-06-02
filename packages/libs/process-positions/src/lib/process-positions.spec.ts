import { processPositions } from './process-positions'

const ALL_INFO = `
Symbol or ISIN: CRO
Amount: 12000
Rate: $0.18267 ₿0.000006026
Value: $2,192.04 ₿0.072312
Average Purchase Rate: $0.29
Profit / loss: -$1,287.96
Profit / loss: -37,01%

=====

Symbol or ISIN: BTC
Amount: 12000
Rate: $0.18267 ₿0.000006026
Value: $2,192.04 ₿0.072312
Average Purchase Rate: $0.29
Profit / loss: -$1,287.96
Profit / loss: -37,01%
`

const BTC_INFO = `
Symbol or ISIN: BTC
Amount: 12000
Rate: $0.18267 ₿0.000006026
Value: $2,192.04 ₿0.072312
Average Purchase Rate: $0.29
Profit / loss: -$1,287.96
Profit / loss: -37,01%
`

describe('processPositions', () => {
  it('should show all open positions', () => {
    expect(processPositions()).toEqual(ALL_INFO)
  })

  it('should only show btc open position', () => {
    expect(processPositions('BTC')).toEqual(BTC_INFO)
  })
})
