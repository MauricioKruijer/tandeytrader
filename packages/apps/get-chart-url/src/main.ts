import { http } from '@google-cloud/functions-framework'
import 'tslib'

http('get-chart-url', (req, res) => res.send('ok!'))
