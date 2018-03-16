/**
 * ページごとに登録済みのサービスワーカーがインストールされる
 *
 * オフラインになるとこれが動く??
 *
 * 開発者ツールの application -> Service Workers タブで 登録されたサービスワーカーの情報が見れる。
 */

/**
 * この self は ServiceWorkerGlobalScope オブジェクト.
 *
 * @see https://developer.mozilla.org/ja/docs/Web/API/ServiceWorkerGlobalScope/oninstall
 */
console.log('self', self)

// ページごとに登録済みサービスワーカーがインストールされる
self.addEventListener('install', () => {
  console.log('[sw]', 'Your ServiceWorker is installed');
});

self.addEventListener('push', ev => {
  console.log('[sw]', 'pushed!!', ev.data.json());
  const {title, msg, icon} = ev.data.json();
  self.registration.showNotification(title, {
    body: msg,
    icon: icon,
  });
});
