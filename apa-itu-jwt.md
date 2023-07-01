## Apa Itu JWT

Secara sederhana dapat dikatakan bahwa JSON Web Token (JWT) adalah format representasi kumpulan klaim yang ringkas yang ditujukan untuk lingkungan dengan ruang terbatas seperti header Otorisasi HTTP dan parameter query dalam URI. JWT bisa berbentuk JSON Web Signature (JWS) atau JSON Web Encryption (JWE), yang memungkinkan JWT untuk diproteksi integritasnya dengan Message Authentication Code (MAC) atau dienkripsi. Kumpulan klaim akan berbentuk JSON dan akan disimpan sebagai payload dari JWS atau sebagai plain teks dalam JWE.

Kumpulan klaim adalah berbentuk JSON yang terdiri atas pasangan name-value, dimana name adalah string dan value adalah tipe JSON apapun. Objek JSON untuk kumpulan klaim ini boleh mengandung spasi atau pemisah baris (CR/LF) baik sebelum atau setelah nilai JSON maupun karakter strukturnya.
JWT direpresentasikan sebagai urutan dari bagian-bagian, yang masing-masing aman untuk URL (URL-safe), yang dipisahkan oleh karakter titik ('.'). Setiap bagian berisi nilai yang dienkripsi menggunakan base64url. Banyaknya bagian dalam JWT tergantung pada representasi yang digunakan, apakah menggunakan JWS atau JWE. Bagian pertama dalam JWT adalah header, yang disebut sebagai JOSE (JSON Object Signing and Encryption) Header, dimana didalamnya terdapat informasi terkait proteksi atau enkripsi yang digunakan dalam bagian berikutnya. Header ini juga dapat digunakan untuk membedakan apakah isi JWT adalah JWS atau JWE. 

### Contoh JWT

Berikut ini adalah contoh JWT yang menggunakan JWS yang ditanda tangani secara digital dengan algoritma HMAC SHA-256. Contoh ini akan terdiri atas 3 bagian, yaitu header, payload, dan signature yang antar bagiannya dipisahkan dengan tanda titik (.).

#### Header
Pertama kita akan definisikan header yang menunjukkan algoritma yang digunakan
``` javascript
let header = {
  "alg": "HS256",
  "typ": "JWT"
}
let jwt_header = Buffer.from(JSON.stringify(header))
  .toString('base64url')
console.log(jwt_header)

hasil:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
```

#### Payload
Selanjutnya kita akan definisikan klaim sebagai payload dari JWT. Sebagai contoh kita akan menyimpan data subject, nama user, dan expired time, dan status admin dalam JWT. Maka kita bisa definisikan field-field dari JSON seperti contoh berikut ini.
``` JavaScript
let payload = {
  "sub": "JWT-Example",
  "exp": 1686453000,
  "name": "Fulan",
  "admin": true
}
let jwt_payload = Buffer.from(JSON.stringify(payload))
  .toString('base64url')
console.log(jwt_payload)
```

```
hasil: 
eyJzdWIiOiJKV1QtRXhhbXBsZSIsImV4cCI6MTY4NjQ1MzAwMCwibmFtZSI6IkZ1bGFuIiwiYWRtaW4iOnRydWV9
```

Pada contoh di atas, kita menggunakan field sub dengan value “JWT-Example” sebagai subject, nama user disimpan dalam field name, expired time dalam bentuk unix time disimpan dalam field exp, dan status admin disimpan dalam field admin. JWT mendefinisikan sejumlah claim name standard yang dapat kita gunakan untuk sejumlah keperluan, seperti pada contoh di atas adalah sub untuk subject dan exp untuk expired time. Adanya nama klaim standard akan mempermudah kita dalam mendefinisikan dan mengkomunikasikan data dalam JWT.

#### Signature
Selanjutnya kita akan menggunakan HMAC SHA-256 untuk menggenerate hash yang akan kita gunakan sebagai signature dari klaim yang kita buat. Kita akan menggunakan “my-key-secret” sebagai secret untuk hash. Kita akan menggunakan library crypto yang tersedia di NodeJS untuk menggenerate hash. 

``` JavaScript
// menggunakan library crypto
var crypto = require('crypto')

// buat hmac object menggunakan secret yang kita definisikan
var hmac = crypto.createHmac('sha256', 'my-key-secret')

// update data yang akan di hash dengan base64url
data = hmac.update(jwt_header+'.'+jwt_payload)
jwt_signature= data.digest('base64url');

console.log(jwt_signature);
```

```
hasil:
hRTPEIRuoUv8UZSqK2p7GmI_KdZoHm-Xxi5AA62Sjfo
```

Data yang kita hash adalah hasil encoding dari header dan payload dengan disambung menggunakan titik (.)  dan diencode dengan base64url.

#### Hasil JWT

Selanjutnya token JWT kita adalah gabungan dari header, payload, dan signature yang dihubungkan dengan karakter titik (.), sebagai berikut.

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJKV1QtRXhhbXBsZSIsImV4cCI6MTY4NjQ1MzAwMCwibmFtZSI6IkZ1bGFuIiwiYWRtaW4iOnRydWV9.hRTPEIRuoUv8UZSqK2p7GmI_KdZoHm-Xxi5AA62Sjfo
```

#### Menggunakan Tool Online
Untuk membuat dan menganalisis JWT, kita dapat menggunakan tool online yang banyak tersedia di internet. Salah satunya dengan alamat https://jwt.io 

![contoh-jwt](jwt-contoh.png)
