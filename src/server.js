import http from "http"
import https from "https"
import fs from "fs"
import express from 'express'
import webpush from "web-push"

const app = express()

const keys = require("./application-server-keys.json");

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

