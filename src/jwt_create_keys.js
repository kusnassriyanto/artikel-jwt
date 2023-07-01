
// gunakan library crypto untuk membuat pasangan kunci
const crypto = require("crypto")

// gunakan library fs untuk menyimpan kunci ke file
const fs = require('fs');

// kita gunakan tipe rsa 2048 bit
const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
})

// export sebagai string dan simpan ke file
privateKeyPEM = privateKey.export({
  format: "pem",
  type: "pkcs8"
})
publicKeyPEM = publicKey.export({
  format: "pem",
  type: "spki"
})

console.log(privateKeyPEM)
console.log(publicKeyPEM)

fs.writeFileSync('private.key', privateKeyPEM)
fs.writeFileSync('public.key', publicKeyPEM)
