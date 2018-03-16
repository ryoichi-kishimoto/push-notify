const client = axios.create({
  timeout: 5000,
  headers: {'Accept': 'application/json',
    'Content-type': 'application/json'}
})

new Vue({
  el: '#app',
  data: {
    title: '',
    message: '',
  },

  methods: {
    /**
     * push通知メッセージを登録する
     */
    addNotification() {
      if (this.title === '' || this.message === '') {
        alert('[NG]入力されていない項目があります。');
        return
      }

      client.post(
        "http://localhost:3000/trigger",
        {
          title: this.title,
          message: this.message,
        },
      ).then(() => {
        alert('[OK]登録に成功しました。');
      }).catch(() => {
        alert('[NG!]登録に失敗しました。');
      })
    }
  }
})
