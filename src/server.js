import fs from "fs"
import express from 'express'
import webpush from "web-push"

const app = express()

const keys = require("../application-server-keys.json");

// Initialize library with **YOUR** project keys and settings.
// 送信者の情報を入れなきゃいけない。第一引数はメールアドレスかURLか。
webpush.setVapidDetails(
  process.env.SENDER_EMAIL || "mailto:ryoichi.kishimoto@luxa.co.jp",
  keys.publicKey,
  keys.privateKey
)

// push 通知を送信先の購読者のリスト?
const subscribers = [
  // Here would be any subscribers endpoints,
  // therefore this is gonna be a list of, so called, "target list".
  // You should sotre this list to your database to make it persistent.
]

// static
app.use(express.static(`${__dirname}/public`))

// ルーティング
app.post('/register', (req, res, next) => {
  console.log('registerd!!');
  res()
})

/**
 * [サービスページ用]
 *
 * 各ブラウザのサービスワーカーが生成した購読者情報(PushSubscription)をサーバに登録する
 *
 * サーバはこの PushSubscription を購読者(subscribers)として保存しておく。
 */
app.post('/register', (req, res) => {
  // var body = [];
  // req.on("data", chunk => body.push(chunk));
  // req.on("end", () => {
  //   body = JSON.parse(Buffer.concat(body).toString());
  //   res.writeHead(200, {"Content-Type":"application/json"});
  //   res.end(JSON.stringify({msg:`I've got the endpoint: ${body.endpoint}`}));
  //   subscribers.push(body);
  // });
  console.log('registerd!!');
  res()
})

/**
 * [管理画面用]
 *
 * push 通知の登録を行う。
 *
 * @todo crontab 対応する.
 */
app.post('/trigger', (req, res) => {
  // const icon = `img/${Math.floor(Math.random() * 3)}.png`;
  // const params = {
  //   title: "You've got a push-notification!!",
  //   msg:   `Hi, this is message from server. It"s ${new Date().toLocaleString()} now. You can send any message, e.g. notification icons and so`,
  //   icon:  icon,
  // };
  // Promise.all(subscribers.map(subscription => {
  //   return webpush.sendNotification(subscription, JSON.stringify(params), {});
  // })).then(res => console.log(res)).catch(err => console.log('ERROR', err));
  console.log('triggered!!');
  res()
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`app listening on port ${port}!`))
