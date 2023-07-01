
let header = {
  "alg": "HS256",
  "typ": "JWT"
}
let jwt_header = Buffer.from(JSON.stringify(header))
  .toString('base64url')
console.log(jwt_header)

let payload = {
  "sub": "JWT-Example",
  "exp": 1686453000,
  "name": "Fulan",
  "admin": true
}
let jwt_payload = Buffer.from(JSON.stringify(payload))
  .toString('base64url')
console.log(jwt_payload)


// menggunakan library crypto
var crypto = require('crypto')

// buat hmac object menggunakan secret yang kita definisikan
var hmac = crypto.createHmac('sha256', 'my-key-secret')

// update data yang akan di hash dengan base64url
data = hmac.update(jwt_header+'.'+jwt_payload)
jwt_signature= data.digest('base64url');

console.log(jwt_signature);

console.log('result: '+jwt_header+'.'+jwt_payload+'.'+jwt_signature)

