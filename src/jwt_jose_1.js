
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
  let strPrivateKey = fs.readFileSync('private.key').toString()
  let privateKey = await jose.importPKCS8(strPrivateKey)
  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'RS256' })
    .setIssuer('https://example.com')
    .setSubject('JWT-Example')
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(privateKey);
  console.log('JWT: ', jwt);

  // verify JWT
  let strPublicKey = fs.readFileSync('public.key').toString()
  let publicKey = await jose.importSPKI(strPublicKey)
  try {
    const decoded = await jose.jwtVerify(jwt, publicKey)
    // bila gagal akan masuk ke catch 
    console.log('Verified: True');
    console.log('Decoded: ', decoded);
  } catch (error) {
    console.log('Invalid token.')
  }
  
})()
