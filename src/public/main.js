var applicationServerPublicKey = 'BAXSEgh-cBBTrLl7BeFjdmDabBYPea55iNY71PMsTox9Rl_qVFJgitpWHqr9lyoNMzXqTxIjwqEu5oAY_fPkrzw'

const client = axios.create({
  timeout: 5000,
  headers: {'Accept': 'application/json',
    'Content-type': 'application/json'}
})

new Vue({
  el: '#app',
  data: {
    /**
     * 登録済みサービスワーカー?
     */
    registration: null,
  },

  created() {
    /**
     * サービスワーカー登録
     *
     * @see https://developer.mozilla.org/ja/docs/Web/API/ServiceWorker_API/Using_Service_Workers
     *
     * 一度登録されるとブラウザのディスクキャッシュにワーカーファイルが保存される.
     * 消したい場合は開発者ツール Application -> Clear storage でやる.
     *
     */
    if ('serviceWorker' in navigator) {
      //
      window.navigator.serviceWorker.register("service-worker.js").then(reg => {
        console.log('Registration succeeded.');
        this.registration = reg
      }).catch(err => {
        console.log("Register Error:", err);
      });
    }
  },

  methods: {
    /**
     * push通知の購読を開始する
     */
    startSubscribe() {
      // @see https://developer.mozilla.org/ja/docs/Web/API/PushManager
      this.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlB64ToUint8Array(applicationServerPublicKey),
      })
      /**
       * 通知の許可を行うとここに進む.
       */
        .then(subscription => {
        console.log("Subscribe OK:", subscription);

        // 購読者としてサーバに登録する.
        return client.post(
          "http://localhost:3000/register",
          subscription,
        );
      }).then(() => {
        alert("[OK]サーバに購読者として登録されました.");
      }).catch(err => {
        console.log("Subscribe Error:", err);
        console.error("[main.js][Subscription]", err);
      });

    }
  }
})

/**
 * push model をエンコード
 * @param base64String
 * @return {Uint8Array}
 */
function urlB64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}












const main = () => {
// {{{ Util class to output log
//   const logger = new (function() {
//     this._out = document.querySelector("pre#console-output");
//     this.line = function() {
//       console.log(...arguments);
//       this._out.innerHTML += "\n> " + [...arguments].map(e => typeof e.toString == "function" ? e.toString() : e).join(" ");
//     };
//   })();
  // }}}

  // {{{ Util function from https://github.com/GoogleChrome/push-notifications/blob/master/app/scripts/main.js#L31-L44
  // const urlB64ToUint8Array = (base64String) => {
  //   const padding = "=".repeat((4 - base64String.length % 4) % 4);
  //   const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");
  //   const rawData = window.atob(base64);
  //   const outputArray = new Uint8Array(rawData.length);
  //   for (let i = 0; i < rawData.length; ++i) {
  //     outputArray[i] = rawData.charCodeAt(i);
  //   }
  //   return outputArray;
  // }
  // }}}

  // ServiceWorker Registration shared object
  var _registration = null;

  // Event handler for "Register" button clicked.
  // var btnRegister = document.querySelector("button#register-sw");
  // btnRegister.addEventListener("click", ev => {
  //   ev.preventDefault();
  // });

  // Event handler for "Subscribe" button clicked.
  // var btnSubscribe = document.querySelector("button#start-subscribe");
  // btnSubscribe.addEventListener("click", ev => {
  //   ev.preventDefault();
  //   _registration.pushManager.subscribe({
  //     userVisibleOnly: true,
  //     applicationServerKey: urlB64ToUint8Array(applicationServerPublicKey),
  //   }).then(subscription => {
  //     logger.line("Subscribe OK:", subscription);
  //     return fetch("/register", {
  //       method: "POST",
  //       body: JSON.stringify(subscription.toJSON()),
  //     });
  //   }).then(() => {
  //     logger.line("Server Stored Subscription.");
  //   }).catch(err => {
  //     logger.line("Subscribe Error:", err);
  //     console.error("[main.js][Subscription]", err);
  //   });
  // });

  // Event handler for "Send Push" button clicked.
  // This method DOES NOT know who subscribers are,
  // because only server knows and manages the target list.
  var btnSendPush = document.querySelector("button#send-push");
  btnSendPush.addEventListener("click", ev => {
    ev.preventDefault();
    fetch("/trigger");
    logger.line("Just triggered server to publish notifications.");
  });
}

// window.onload = main


