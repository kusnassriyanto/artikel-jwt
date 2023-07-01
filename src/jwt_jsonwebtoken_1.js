
const jwt = require('jsonwebtoken')

// Function untuk membentuk unix time dari waktu sekarang ditambah x detik
function getUnixTime(tambahanDetik) {
  const now = new Date()
  const unixTime = Math.floor(now.getTime() / 1000)
  return unixTime + tambahanDetik
}

// Membentuk JWT
const payload = { 
  id: 999, 
  username: 'fulan',
  email: 'fulan@testing.com',
  sub: 'JWT-Example',
  iss: 'https://example.com',
}

// menambahkan iat dan exp
payload.iat = getUnixTime(0)
payload.exp = getUnixTime(3600)

const secretKey = 'kuncirahasia'

const token = jwt.sign(payload, secretKey)
console.log('JWT: ', token)

// Memeriksa JWT
jwt.verify(token, secretKey, (err, decoded) => {
  if (err) {
    console.error('Invalid token.');
  } else {
    console.log('Verified: ', true);
    console.log(decoded);
  }
});

// Melihat klaim JWT tanpa verifikasi
const decoded = jwt.decode(token)
console.log('Decoded (not verified): ', decoded)
