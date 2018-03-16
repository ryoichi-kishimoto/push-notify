# push-notify

参考にしたページ
* [webブラウザにPush通知送るサーバとjsのサンプル](http://otiai10.hatenablog.com/entry/2017/06/19/200715)
* [github:sampleコード](https://github.com/otiai10/web-push-notification-sample)
* [Qiita:Web Pushのサーバ認証VAPIDを試してみる (旧題: GCMの登録が不要になったChromeのWeb Pushを試してみる)
](https://qiita.com/tomoyukilabs/items/9346eb44b5a48b294762#_reference-a1f3c76ac8a1adfe2452)
* [Qiita:[改訂版] Web Pushでブラウザにプッシュ通知を送ってみる](https://qiita.com/tomoyukilabs/items/2ae4a0f708a1af75f13e)
* [Mozilla:サービスワーカー](https://developer.mozilla.org/ja/docs/Web/API/ServiceWorker_API/Using_Service_Workers)

# 使い方
### 環境構築
```bash
yarn
```

### 鍵ペア作成
```bash
yarn genkey
```

### サーバ起動
```bash
yarn start
```

### ユーザページへアクセスしてプッシュ通知受信の許可を行う
http://localhost:3000

### 管理画面でメッセージを登録する。
http://localhost:3000/admin.html

