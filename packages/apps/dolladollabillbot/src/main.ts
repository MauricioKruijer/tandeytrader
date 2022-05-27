import { http } from '@google-cloud/functions-framework'
import {libsStoreChat} from "@tandeytrader/libs/store-chat";
import 'tslib'

http('dolladollabillbot', (req, res) => {
  const result = libsStoreChat();
  res.send(result || 'Hello world! bruf');
})

