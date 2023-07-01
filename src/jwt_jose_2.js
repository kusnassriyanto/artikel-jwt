
const fs = require('fs');
const jose = require('jose');

(async () => {
  // Data payload untuk JWT
  const payload = { 
    id: 999, 
    username: 'fulan',
    email: 'fulan@testing.com'
  }
  
  // create JWT
  let strPublicKey = fs.readFileSync('public.key').toString()
  let publicKey = await jose.importSPKI(strPublicKey)
  let header = {
    "alg": "RSA-OAEP-256",
    "enc": "A128CBC-HS256"
  }
  const jwt = await new jose.EncryptJWT(payload)
    .setProtectedHeader(header)
    .setIssuer('https://example.com')
    .setSubject('JWT-Example')
    .setIssuedAt()
    .setExpirationTime('1h')
    .encrypt(publicKey);
  console.log('JWT: ', jwt);

  // verify JWT
  let strPrivateKey = fs.readFileSync('private.key').toString()
  let privateKey = await jose.importPKCS8(strPrivateKey)
  try {
    const decoded = await jose.jwtDecrypt(jwt, privateKey)
    // bila gagal akan masuk ke catch 
    console.log('Verified: True');
    console.log('Decoded: ', decoded);
  } catch (error) {
    console.log('Invalid token.')
    console.log(error)
  }
  
})()
