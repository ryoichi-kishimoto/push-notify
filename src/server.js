import express from 'express'
import bodyParser from 'body-parser'
import webpush from "web-push"
import cors from 'cors'

const app = express()
app.use(cors())
app.use(bodyParser.json())

const keys = require("../application-server-keys.json");

// Initialize library with **YOUR** project keys and settings.
// 送信者の情報を入れなきゃいけない。第一引数はメールアドレスかURLか。
webpush.setVapidDetails(
  process.env.SENDER_EMAIL || "mailto:ryoichi.kishimot@luxa.co.jp",
  keys.publicKey,
  keys.privateKey
)

// push 通知を送信先の購読者のリスト
const subscribers = []

// static
app.use(express.static(`${__dirname}/public`))

/**
 * [サービスページ用]
 *
 * 各ブラウザのサービスワーカーが生成した購読者情報(PushSubscription)をサーバに登録する
 *
 * サーバはこの PushSubscription を購読者(subscribers)として保存しておく。
 */
app.post('/register', (req, res) => {
  subscribers.push(req.body);
  res.send('register is succeed.')
})

/**
 * [管理画面用]
 *
 * push 通知の登録を行う。
 *
 * @todo crontab 対応する.
 */
app.post('/trigger', (req, res) => {
  const { title, message } = req.body;

  const params = {
    title,
    msg:   `${new Date().toLocaleString()} now.${message}`,
    icon:  'images/icon.jpeg',
  };

  if (!subscribers.length) {
    res.send('購読者がいません。')
  }

  // 購読者全員へpush通知する(pushサービスに通知を依頼する)
  Promise.all(subscribers.map(subscription => {
    return webpush.sendNotification(subscription, JSON.stringify(params), {});
  }))
  .then(ret => {
    console.log(ret)
    res.send('push succeed.')
  })
  .catch(err => {
    console.log('ERROR', err)
    res.status(500).send(err);
  });
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`app listening on port ${port}!`))
