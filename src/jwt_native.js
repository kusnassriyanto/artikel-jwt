
// Contoh membuat JWT dengan NodeJS 
//   tanpa menggunakan library external.
//   hanya menggunakan library built in crypto

// library yang digunakan untuk signature
const crypto = require('crypto')

// Mengatur kunci rahasia untuk tanda tangan JWT
const secretKey = 'kuncirahasia'

// Mengkodekan string menjadi Base64
function base64Encode(str) {
  const buff = Buffer.from(str, 'utf-8')
  return buff.toString('base64url')
}

// Mendekodekan string Base64 menjadi teks
function base64Decode(str) {
  const buff = Buffer.from(str, 'base64url')
  return buff.toString('utf-8')
}

// Membuat tanda tangan JWT menggunakan HMAC SHA-256
function createSignature(encodedToken) {
  const hmac = crypto.createHmac('sha256', secretKey)
  hmac.update(encodedToken)
  return hmac.digest('base64url')
}

// Membentuk JWT
function createJWT(payload, expiresIn) {
  // payload berbentuk JSON
  // expiresIn dengan satuan detik

  // Membuat header menggunakan HS256
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  }

  // Menambahkan iat dalam payload
  const issuedAt = new Date()
  const issuedAtTimeStamp = Math.floor(issuedAt.getTime() / 1000)
  payload.iat = issuedAtTimeStamp

  // Menambahkan waktu kedaluwarsa (expiration) jika expiresIn disediakan
  if (expiresIn) {
    const expirationDate = new Date()
    expirationDate.setSeconds(expirationDate.getSeconds() + expiresIn)
    const expirationTimestamp = Math.floor(expirationDate.getTime() / 1000)
    payload.exp = expirationTimestamp
  }

  // Mengkodekan header dan payload menjadi Base64
  const encodedHeader = base64Encode(JSON.stringify(header))
  const encodedPayload = base64Encode(JSON.stringify(payload))

  // Menggabungkan header dan payload dengan tanda titik
  const encodedToken = `${encodedHeader}.${encodedPayload}`

  // Menambahkan tanda tangan pada token
  const signature = createSignature(encodedToken)
  const jwt = `${encodedToken}.${signature}`

  return jwt
}


// Memeriksa JWT
function verifyJWT(jwt) {
  // Memisahkan token menjadi header, payload, dan signature
  const [encodedHeader, encodedPayload, signature] = jwt.split('.')

  // Menggabungkan header dan payload dengan tanda titik
  const encodedToken = `${encodedHeader}.${encodedPayload}`

  // Membuat tanda tangan yang diharapkan
  const expectedSignature = createSignature(encodedToken)

  // Memeriksa apakah tanda tangan sesuai dengan yang diharapkan
  if (signature === expectedSignature) {
    return true
  } else {
    return false
  }
}

// Melihat klaim JWT tanpa verifikasi
function decodeJWT(jwt) {
  const [encodedHeader, encodedPayload] = jwt.split('.')

  const header = JSON.parse(base64Decode(encodedHeader))
  const payload = JSON.parse(base64Decode(encodedPayload))

  return { header, payload }
}

// Contoh penggunaan

// Membentuk JWT
const payload = { 
  id: 999, 
  username: 'fulan',
  email: 'fulan@testing.com',
  sub: 'JWT-Example',
  iss: 'https://example.com',
}

const jwt = createJWT(payload, 3600)
console.log('JWT:', jwt)

// Memeriksa JWT
const isVerified = verifyJWT(jwt)
console.log('Verified:', isVerified)

// Melihat klaim JWT tanpa verifikasi
const decoded = decodeJWT(jwt)
console.log('Decoded:', decoded)
