import {jest} from '@jest/globals'
import {processPositions} from './process-positions'
import {getAllOpenPositionsFromUserPortfolio} from './getAllOpenPositionsFromUserPortfolio'

jest.mock('./getAllOpenPositionsFromUserPortfolio')

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
const mockGetAllOpenPositionsFromUserPortfolio = getAllOpenPositionsFromUserPortfolio as jest.Mock
mockGetAllOpenPositionsFromUserPortfolio.mockReturnValue(['CRO', 'BTC'])

describe('processPositions', () => {
  it('should only show btc open position', () => {
    expect(processPositions('BTC')).toEqual(BTC_INFO)
    expect(getAllOpenPositionsFromUserPortfolio).toBeCalledTimes(0)
  })

  it('should show all open positions', () => {
    expect(processPositions()).toEqual(ALL_INFO)
    expect(getAllOpenPositionsFromUserPortfolio).toHaveBeenCalled()
  })
})
