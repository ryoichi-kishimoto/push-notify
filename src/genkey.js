/**
 * VAPID の鍵ペアを生成する
 *
 * VAPID is a pair of public key and private key for "Web Push Protocol".
 * Visit https://developers.google.com/web/fundamentals/engage-and-retain/push-notifications/web-push-protocol
 * for more information.
*/

const fs = require('fs');
const dest = 'application-server-keys.json';

if (fs.existsSync(dest)) {
  return console.log(`[genkey:ABORT] ${dest} file already exits.`);
}

const webpush = require('web-push');
const {publicKey, privateKey} = webpush.generateVAPIDKeys();

fs.writeFileSync(dest, JSON.stringify({publicKey, privateKey}, null, 2));

const embed = `
// {{{ AUTO GENERATED BY "./scripts/genkey.js"
var applicationServerPublicKey = "${publicKey}";
// }}}
`;

// ブラウザで実行されるjsファイルに、グローバル変数で public key を出力する。
fs.appendFileSync('src/public/main.js', embed);

return console.log('[genkey:DONE] server-keys for your project is created.');
