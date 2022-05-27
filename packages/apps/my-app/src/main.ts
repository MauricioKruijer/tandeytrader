import { http } from '@google-cloud/functions-framework'
import {libsStoreChat} from "@cloud-func/libs/store-chat";
import 'tslib'

http('hello', (req, res) => {
  const result = libsStoreChat();
  res.send(result || 'Hello world!');
})

