## Contoh Program

Dalam bab ini, kita akan membahas mengenai contoh pembuatan JSON Web Token dengan NodeJS menggunakan tiga macam cara. Pertama adalah tanpa menggunkan library eksternal. Library yang akan kita gunakan pada contoh ini adalah crypto, yang sudah built in di dalam NodeJs. Kemudian kita akan menggunakan dua library eksternal, yaitu jsonwebtoken dan jose. Library jsonwebtoken adalah library yang paling banyak digunakan untuk membuat jwt. Sedangkan library jose merupakan library yang memberikan dukungan penuh untuk JOSE (JSON Object Signing and Encryption) yang mencakup JWT, JWS (JSON Web Signature), JWE (JSON Web Encryption), dan JWK (JSON Web Key).

#### Contoh tanpa Library External

Pada contoh ini kita akan membuat dan memerksa JWT tanpa menggunakan library eksternal. Library yang kita gunakan adalah crypto yang sudah built in dalam NodeJs. Kita akan membuat, memeriksa, serta melihat isi JWT tanpa memeriksa signature-nya. 
Keterbatasan dalam contoh ini adalah kita hanya akan menggunakan salah satu algoritma saja,yaitu HS256, atau HMAC SHA-256
Dalam contoh ini, kita akan melakukan 3 hal, sebagai berikut
  - Membentuk JWT
  - Memeriksa JWT
  - Melihat Data dalam JWT

Berikut adalah kode programnya

``` JavaScript

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
```

Berikut ini adalah hasil eksekusi dari program di atas
```

JWT: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTk5LCJ1c2VybmFtZSI6ImZ1bGFuIiwiZW1haWwiOiJmdWxhbkB0ZXN0aW5nLmNvbSIsInN1YiI6IkpXVC1FeGFtcGxlIiwiaXNzIjoiaHR0cHM6Ly9leGFtcGxlLmNvbSIsImlhdCI6MTY4NzY1ODEzNiwiZXhwIjoxNjg3NjYxNzM2fQ.3OfgKGwUINMFbc7ZBwfrnaBHOp52-c_K-DsYchJn6X8


Verified: true
Decoded: {
  header: { alg: 'HS256', typ: 'JWT' },
  payload: {
    id: 999,
    username: 'fulan',
    email: 'fulan@testing.com',
    sub: 'JWT-Example',
    iss: 'https://example.com',
    iat: 1687658136,
    exp: 1687661736
  }
}

```

Bila kita periksa dengan tools online jwt.io, maka hasilnya akan sama persis dengan hasil eksekusi di atas, seperti terlihat berikut ini.

![contoh-2](jwt-contoh-2.png)

### Menggunakan Library jsonwebtoken

Library jsonwebtoken adalah library untuk membuat JWT dengan javascript yang paling banyak digunakan. Kelebihan dari library ini adalah sebagai berikut
  - Mudah digunakan. Library jsonwebtoken dirancang dengan interface yang sederhana dan mudah digunakan. Dengan sedikit kode, kita dapat membuat, memverifikasi, dan memanipulasi JWT.
  - Ringan dan sederhana. Library ini ringan dan fokus hanay pada fitur JWT inti. Dan karena tidak memiliki dependensi eksternal yang kompleks, library mudah diintegrasikan ke dalam program JavaScript kita.
  - Dukungan untuk berbagai algoritma. Library ini mendukung berbagai algoritma digital signature JWT seperti HS256, RS256, ES256, dan sebagainya. Kita dapat memilih algoritma yang sesuai dengan kebutuhan kita.
  - Komunitas yang besar. Library jsonwebtoken adalah salah satu library JWT yang paling populer untuk JavaScript. Library ini memiliki komunitas yang aktif dan dukungan yang luas, sehingga mudah menemukan dokumentasi, sumber daya, dan bantuan dari komunitas tersebut.

Selanjutnya kita akan menggunakan library ini untuk membuat dan memeriksa JWT menggunakan dua algoritma signature berbeda yang umum digunakan, yaitu HS256 (HMAC SHA-256) dan RS256 (RSA SHA-256).

Untuk dapat menggunakan library jsonwebtoken, kita perlu menginstallnya terlebih dahulu menggunakan perintah berikut ini

```
npm install jsonwebtoken
```

Berikut ini adalah contoh programnya

``` JavaScript

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

// default algoritma yang digunakan adalah HS256
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

```

### Pasangan Kunci Privat dan Kunci Publik

Berbeda dengan contoh sebelumya yang menggunakan algoritma signature HS256 yang hanya memerlukan satu key (secret), untuk algoritma RS256, kita membutuhkan pasangan kunci privat dan kunci publik. Kunci privat akan digunakan untuk menghasilkan JWT signature, sedangkan kunci publik akan digunakan untuk memverifikasinya. Kunci privat harus disimpan dengan aman dan hanya dapat diakses oleh pihak yang berwenang membuat JWT. Sedangkan kunci publik dapat diberikan kepada pihak lain yang ingin memverifikasi JWT signature.

Untuk itu, sebagai langkah awal kita perlu mendefinisikan pasangan kunci tersebut. Kita dapat menggunakan online tool yang banyak tersedia di internet. Tapi disini akan ditunjukkan contoh untuk membuat pasangan kunci ini menggunakan kode program.

``` JavaScript
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

```

Hasil kunci yang di-generate akan muncul seperit pada tampilan berikut ini.

```
-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDBeKoxN9fQ0/Mw
vCHurv9RbhK8P1GiBoWmlPX+yZljyjUPxa3PyeHdkaIGvPRg8LTmDZ3mSltvSdjU
AdpKe49z+qwB85FRBsTMllk9pCCr5d8OzlvWlyuTUqpu+00HK3q9dFT78FCi1QI1
oiyi8tAcsG5UIJQ0bqAkmeaR3/+yKyRs+arNy5h6kGrCMIZ0eRM9E5e3kDux0kEQ
kNFK+Ff685ytlr7FFr3+9x2XbeAjR+6jc1O2fdFA8fmCdcuzPlMMsz44knuECv3b
JiLiw3ltPp/yQ1YH5xLfRZZF2lKgkNMAxpwfhTRowYMNgsoQjLVSUN4mTYqsB3qE
JA4OpSlFAgMBAAECggEAeFPLxgCtQTwRLGZV1FUShlqnXF0lMFhOF2Td+jD4LZA9
oCmaCHnO+DbzRq2OcBxE5i/h3LCyXWzYZkMguOJQPhnRkQUjg/lpvLRlnGjPyRmW
uWaux7ANcfsf9RZmuebY16vajzbPb/Z7AVBz4oSR2sYAWGJKyrFi+GCffmqKZQxL
KRQLTOzKSHeaGI29SDavUMFvZI3btrRdbH0thvMRUIuhxEeyagwIRouvOxLTZafH
quv8VGKtk2+trw1x1MYNMIRp5UFJ2WXwadOEal1XpfZMQCZHVmFdwPVOUCLV9tIh
Dew+6E7uaVLF0vwwRQ0oWt9o19zPYSWBRjCdku5FAQKBgQDhcLVcpXv2DwuiMPUi
i2EpzscJgIxCaS9AAVS2BvMVfVQCeHwhC906EacWM0ZcnLSEG0lnmiMDlZRDGtyM
UKvEmJeSTkeMZI72nfQR69zrEJ1fUgY2T3KVG1tBsC6jXvoxsK+T4SyHCEwhTPuH
vBpeQBSUVl+5/UcCvRLAuEmTaQKBgQDbso/YxzyL06pZ01sb0kHRxNEaD3CAg/na
NumKbsaNSIiGdimY8HQ80EvSfZ2mcXPt2zJEikw4TUYXFa3XtwkfhVUJXG4chyRW
uohy9Md96S3TM4rOcc5A9C6RcqR2EQ0CSTkrL4mfzxdgz710EKGwAVrDj64O/+ro
9Qe7WjPXfQKBgQDWT+05m9/SNM9caqo/Ir1Fn1s7v0aXQ6M1d45uVQD1puUcTCnE
yKCQuYNb6Xa0SAyboc0QfklW+PWvLXQIuA/ynxVIcr41ysrVy6bg+pZTqMHSggmB
y9kjwpPoSHKtwHacklj3fhJ0dADbj3F2we1XOBfYRJxQFWVSRyfyqb7YMQKBgGB6
bckY1XHiJfEEbAIvt0/TSrBTD2igjFxTuQNd2ju5GptR0Lqk/aanImTxXQX21J4j
oFORGB+xb5I7pvgQHSWGe+18da55em/LwpgY/nJAsCsLe21ldNn5YWnmGmru2fOj
DEP2wE05uF5/XAdYNmkAb0dqFVno8NQUpqyT1ChRAoGBAM0oWOUj9Nz7An7q/f4S
Lejf+/L/yUPhwDAnnoA2lgKYRmLbgZdV1blPJLdaXsI8cW46asLE7o8lQd0YrMJj
eiyDLWmKc8iSqZgjRQd7y154E3z8PbrdTVRddX4Ywur5OlVloqQKSLp+9G/KGibC
qip/poD6/mrq4gbogr/GR1c7
-----END PRIVATE KEY-----


-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwXiqMTfX0NPzMLwh7q7/
UW4SvD9RogaFppT1/smZY8o1D8Wtz8nh3ZGiBrz0YPC05g2d5kpbb0nY1AHaSnuP
c/qsAfORUQbEzJZZPaQgq+XfDs5b1pcrk1KqbvtNByt6vXRU+/BQotUCNaIsovLQ
HLBuVCCUNG6gJJnmkd//siskbPmqzcuYepBqwjCGdHkTPROXt5A7sdJBEJDRSvhX
+vOcrZa+xRa9/vcdl23gI0fuo3NTtn3RQPH5gnXLsz5TDLM+OJJ7hAr92yYi4sN5
bT6f8kNWB+cS30WWRdpSoJDTAMacH4U0aMGDDYLKEIy1UlDeJk2KrAd6hCQODqUp
RQIDAQAB
-----END PUBLIC KEY-----
```

Kedua file di atas, masing-masing akan disimpan sebagai file dengan nama private.key dan public.key.

#### Contoh JWT Menggunakan RS256

Berikut ini adalah contoh program menggunakan library jsonwebtoken yang akan melakukan dua hal, yaitu membuat dan memeriksa JWT. Untuk algoritma signature yang digunakan adalah RS256 dengan memanfaatkan kunci privat dan kunci publik yang sudah dibuat sebelumnya dan tersimpan masing-masing dalam file private.key dan public.key.

``` JavaScript

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
const publicKey = fs.readFileSync('public.key');
jwt.verify(token, publicKey, (err, decoded) => {
  if (err) {
    console.error('Invalid token.');
  } else {
    console.log('Verified: ', true);
    console.log(decoded);
  }
});

```

Hasil dari program di atas adalah sebagai berikut

```
JWT:  eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTk5LCJ1c2VybmFtZSI6ImZ1bGFuIiwiZW1haWwiOiJmdWxhbkB0ZXN0aW5nLmNvbSIsInN1YiI6IkpXVC1FeGFtcGxlIiwiaXNzIjoiaHR0cHM6Ly9leGFtcGxlLmNvbSIsImlhdCI6MTY4NzcwMTAzNCwiZXhwIjoxNjg3NzA0NjM0fQ.QSK1NwWHLAkhYdpc4gJhdIxeVm17LAv56Ay1UZ68fCbO-qPYctCfn3Rr4q0kc_3zm2RbvmFWHpOL9qZrOB9gr2MbFR3k9F-vk2ZkI1RmvselagUUjSBGAQEmIPfHdeXBYpa8DzNy9eSSE1lS1v3znohxxBNswxsILiwRwxNmbXrg3840NZEG-N0agZaC0XgQF6GALl-FdkeXtPSWEWb9waopeRPRQVkWn6ZcoHzQaIPWNCg9gha0U4Eh0WnZp4k8xcjUwQFFeOr5tNYf1ak0RIQ3joG7MNRttXIXLMbFUN5wNKKaOojWPgeCNv5N4ku2R47A7E-gW-5PjxytwN72Sw
Verified:  true
{
  id: 999,
  username: 'fulan',
  email: 'fulan@testing.com',
  sub: 'JWT-Example',
  iss: 'https://example.com',
  iat: 1687701034,
  exp: 1687704634
}
```

### Menggunakan Library jose

Library jose yang merupakan singkatan dari JSON Object Signing and Encryption, adalah library yang memiliki fitur cukup lengkap terkait JWT, JWS, JWE, hingga JWK dan JWK Sets. 

Kelebihan utama dari library ini dibandingkan library lainnya yang ada adalah bahwa library ini menyediakan dukungan penuh untuk standar JSON Object Signing and Encryption (JOSE), yang mencakup JWT, JWS (JSON Web Signature), JWE (JSON Web Encryption), dan JWK (JSON Web Key). Dalam dokumentasi resminya disebutkan bahwa library ini mengimplementasi spesifikasi-spesifikasi terkait JOSE seperti berikut ini.
  - JSON Web Signature (JWS) - RFC7515
  - JSON Web Encryption (JWE) - RFC7516
  - JSON Web Key (JWK) - RFC7517
  - JSON Web Algorithms (JWA) - RFC7518
  - JSON Web Token (JWT) - RFC7519
  - JSON Web Key Thumbprint - RFC7638
  - JSON Web Key Thumbprint URI - RFC9278
  - JWS Unencoded Payload Option - RFC7797
  - CFRG Elliptic Curve ECDH and Signatures - RFC8037
  - secp256k1 EC Key curve support - RFC8812

Sebagai tambahan, disebutkan juga bahwa implementasi algoritma di atas telah diuji menggunakan vektor tes dari spesifikasi masing-masing serta vektor tes dari spesifikasi JOSE yaitu RFC7520.

Untuk menggunakan library jose, terlebih dahulu kita install dalam project yang kita buat dengan menggunakan perintah berikut ini.
```

npm install jose

```

#### Membuat dan Memeriksa JWT
Contoh berikut ini kita akan membuat JWT menggunakan library jose. Algoritma signature yang digunakan adalah RS256 yang menggunakan public dan private key yang sudah kita buat sebelumnya dan masing-masing disimpan dalam file public.key dan private.key.

``` JavaScript
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

```

Bila kode program di atas dieksekusi, maka hasilnya adalah sebagai berikut

```

JWT:  eyJhbGciOiJSUzI1NiJ9.eyJpZCI6OTk5LCJ1c2VybmFtZSI6ImZ1bGFuIiwiZW1haWwiOiJmdWxhbkB0ZXN0aW5nLmNvbSIsImlzcyI6Imh0dHBzOi8vZXhhbXBsZS5jb20iLCJzdWIiOiJKV1QtRXhhbXBsZSIsImlhdCI6MTY4Nzc1NzkwOSwiZXhwIjoxNjg3NzYxNTA5fQ.U_GK7TbO-wlNpN-HSkaZ3VjDBHKwYMIic-SAZiHFX6-FWnLK7DoVbaEXblx70aTlbnmrFbC3P_QMpdlVBJZ6-oCPyM7HyQ_TJfVLKQj646rs3Oo25fsTN6f65US35-oLoWVrydDfFqseB2fylVCk2sD4gQlTQ-bqnirYqPzi_bo67lZ_tCPFOgpFOHLrDldi4CUyfeFT2zmmlnFmX5rBwbL9RFdioiWgD6MN3HHgn8nO8DspxagZ34MqjBJglNxojjHgGj-RKG6LLso2F3oM1_3mEGCOs7FJCASU-bYfRwp58dBSH1bwLItZXfNsKJ_DpKm3ZruFCJQBjU9GXI1krA
Verified: True
Decoded:  {
  payload: {
    id: 999,
    username: 'fulan',
    email: 'fulan@testing.com',
    iss: 'https://example.com',
    sub: 'JWT-Example',
    iat: 1687757909,
    exp: 1687761509
  },
  protectedHeader: { alg: 'RS256' }
}

```

#### Membuat Encrypted JWT dan Melakukan Decrypt

Contoh berikut ini masih akan menggunakan library jose untuk membuat JWT yang terenkripsi. JWT yang terenkripsi adalah JWT yang didalamnya adalah JWE (JSON Web Encryption). Bila ada kebutuhan menyimpan data sensitif di dalam JWT, maka sebaiknya menggunakan JWT yang terenkripsi.
Pada contoh ini kita akan melakukan enkripsi menggunakan algoritma RSA-OAEP-256, dimana kita akan menggunakan public key untuk mengenkripsi payload JWT dan akan menggunakan private key untuk mendekripsinya.

``` JavaScript
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

Bila kode program di atas dijalankan, maka hasilnya adalah sebagai berikut

```

JWT:  eyJhbGciOiJSU0EtT0FFUC0yNTYiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0.nbXlXz4GPxKGAI3J9m_d4H_hQEG2YyPb2V-6QX6K-U6MuEcexPWtgXOqKR6aEsmUiMgzFrmH-n8Ha7EQsqk1BMgqWTLmQAF77howCsKfDIezW6jbIPO0K-15ksmIfjyKPpiWvW5iEJnqUGMw6O5_Cv7NEWk6wSYIPuQIXHABS8myz8tLmIu3_Ay6v_iImkQG60l5QAnko3xKfAWyed4bDkBTJkIqgBhK_6CwhEzUsRbcT16-_TAunpgQF8fX5tLdORO7w5GOy91JvK8ISUN_y9a2HSd3n8EOJf-70ID6E1EIVTiVekHDyWoe2fLYAe2e0BNCN8x9nli5y1r1rokDpg.dQPI55Pea8F4l66iI19cWg.Nmn3qX5ge0qBD6-flraTfJdMrErxvOewKi_Qk9l7evdQri06TTzNqj-KQ-T9jD3U3SCUJeGjOzRnNNA4UgH56_Tt0UeC9vFof2Me4yZnB_-HeubM6DgWjV0W4qqhOwmlBUCIE2CUSlNFTPeXPBDW6oyRV9JRVZjQHdo56wmoMEJYdJpqs8KNTCHQ449baE3x.whvtIc-oOgw3skYnPX1W6w

Verified: True
Decoded:  {
  payload: {
    id: 999,
    username: 'fulan',
    email: 'fulan@testing.com',
    iss: 'https://example.com',
    sub: 'JWT-Example',
    iat: 1687766162,
    exp: 1687769762
  },
  protectedHeader: { alg: 'RSA-OAEP-256', enc: 'A128CBC-HS256' }
}

```
