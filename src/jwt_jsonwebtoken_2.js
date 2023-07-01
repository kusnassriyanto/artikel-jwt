
const jwt = require('jsonwebtoken');
const fs = require('fs');

// Function untuk membentuk unix time dari waktu sekarang ditambah x detik
function getUnixTime(tambahanDetik) {
  const now = new Date()
  const unixTime = Math.floor(now.getTime() / 1000)
  return unixTime + tambahanDetik
}

// Mendapatkan private key RSA dari file
const privateKey = fs.readFileSync('private.key');

// Data payload untuk JWT
const payload = { 
  id: 999, 
  username: 'fulan',
  email: 'fulan@testing.com',
  sub: 'JWT-Example',
  iss: 'https://example.com',
}

// Opsi untuk JWT
const options = {
  algorithm: 'RS256', // Algoritma RS256
  expiresIn: '1h' // Masa berlaku 1 jam
};

// Membentuk JWT
const token = jwt.sign(payload, privateKey, options);
console.log('JWT: ', token);

// Memeriksa JWT
const publicKey = fs.readFileSync('public-2.key');
jwt.verify(token, publicKey, (err, decoded) => {
  if (err) {
    console.error('Invalid token.');
  } else {
    console.log('Verified: ', true);
    console.log(decoded);
  }
});
