# JWT - JSON Web Token

JSON Web Token sangat popular digunakan dalam mekanisme otentikasi dan otorisasi karena sifatnya yang sangat sederhana, sehingga mudah diimplementasikan, serta ditandatangani dengan metode enkripsi, sehingga dapat dipastikan keabsahannya. Sifat lain yang juga popular adalah stateless yang artinya server tidak perlu menyimpan informasi tentang token yang diberikan, yang mana ini akan meningkatkan skalabilitasnya.

Meskipun pada umumnya JWT tidak terenkripsi, tetapi kita dapat mendefinisikan JWT yang terenkripsi dengan cara tertentu. Pemahaman yang baik tentang JWT akan dapat memaksimalkan potensinya dan menghilangkan dampak atas limitasinya.

Artikel ini akan menjelaskan secara detail tentang JWT, termasuk contoh program untuk membuat dan memverifikasinya secara langsung tanpa library eksternal, serta menggunakan dua library eksternal

## Daftar Isi

[link text](http://dev.nodeca.com)

- [Pendahuluan](#pendahuluan)
- Apa Itu JWT
  - Contoh JWT
- JWT Claim Set
  - Nama-nama Klaim Standar
  - Nama Klaim Publik
  - Nama Klaim Private
- JOSE Header
- Contoh Program
  - Contoh tanpa Library External
  - Contoh dengan Library **jsonwebtoken**
  - Contoh dengan Libray **jose**
- Penutup


## Pendahuluan

Aplikasi web adalah program komputer yang diakses melalui internet melalui peramban web atau browser. Ini berarti aplikasi tersebut tidak perlu diunduh atau diinstal secara lokal pada perangkat pengguna, tetapi dapat diakses dan digunakan secara langsung melalui tautan URL yang diberikan.

Aplikasi web terdiri dari dua komponen utama: sisi klien (client-side) dan sisi server (server-side). Pada sisi klien, terdapat perangkat lunak yang dijalankan di peramban web pengguna dan bertanggung jawab untuk menampilkan antarmuka pengguna serta berinteraksi dengan pengguna. Biasanya, teknologi web seperti HTML (Hypertext Markup Language), CSS (Cascading Style Sheets), dan JavaScript digunakan untuk mengembangkan bagian klien dari aplikasi web.

Sisi server dari aplikasi web mengacu pada bagian yang berjalan di server. Ini berisi logika bisnis aplikasi, pengolahan data, dan akses ke berbagai sumber daya seperti basis data. Bahasa pemrograman seperti Node.js, PHP, Python, Java, atau .NET sering digunakan untuk mengembangkan bagian server dari aplikasi web. Server mengirimkan data yang diminta oleh peramban web klien, memproses permintaan tersebut, dan menghasilkan respons yang dikirim kembali ke klien. 

Komunikasi antara sisi klien dengan sisi server dilakukan menggunakan protokol yang disebut HTTP (Hypertext Transfer Protocol). Salah satu karakteristik utama HTTP adalah sifat stateless-nya. Ini berarti server tidak menyimpan informasi tentang permintaan sebelumnya dari klien. Setiap permintaan dianggap sebagai permintaan yang mandiri tanpa pengetahuan tentang sesi atau status sebelumnya. Namun, dalam banyak aplikasi web, penting untuk menjaga konteks dan informasi pengguna selama interaksi mereka dengan aplikasi. Inilah dimana session diperlukan.

Dalam konteks HTTP, session merupakan mekanisme yang digunakan untuk menyimpan informasi dan mempertahankan status antara permintaan-permintaan yang dilakukan oleh klien (client) ke server. Secara khusus, session digunakan untuk memelihara konteks yang spesifik untuk setiap pengguna atau klien yang terhubung ke aplikasi web.

Salah satu aspek penting dalam aplikasi Web adalah terkait aspek keamanan data, dimana harus dipastikan bahwa hanya user yang berhak yang dapat mengakses resource tertentu. Oleh sebab itu, otentikasi dan otorisasi merupakan mekanisme yang sangat penting, dimana otentikasi adalah mekanisme untuk memeriksa identitas pengguna atau klien yang ingin melakukan akses, sedangkan otorisasi adalah mekanisme untuk mengatur izin penggunaan resource yang akan digunakan. Proses otentikasi dan otorisasi ini akan memanfaatkan session untuk menjaga kontinuitas request yang dikirim ke server. 

Selanjutnya, terkait aspek keamanannya, aplikasi web mesti memastikan bahwa session tidak dapat disusupi oleh data lain dari pihak yang tidak berhak. Ada berbagai cara untuk melakukannya. Salah satu yang paling populer adalah menggunakan JSON Web Token (JWT).
Dalam kaitannya dengan pengelolaan otentikasi dan otorisasi, penggunaan JWT sangat popular. 

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

## JWT Claims Set

*JWT Claims Set*, atau himpunan klaim dalam JWT, berfungsi sebagai representasi objek JSON yang berisi klaim-klaim yang dikirimkan oleh JWT. Untuk memenuhi persyaratan, setiap Nama Klaim dalam JWT Claims Set harus bersifat unik. Parser JWT harus menolak JWT yang memiliki Nama Klaim yang duplikat atau dapat juga menggunakan parser JSON yang hanya mengembalikan nama anggota duplikat terakhir berdasarkan urutan leksikalnya.

Apakah sebuah JWT dianggap valid atau tidak tergantung pada konteks dan penggunaannya. Hal tersebut tidak dijelaskan dalam spesifikasi JWT. Penggunaan JWT dalam aplikasi tertentu akan memerlukan implementasi untuk memahami dan memproses beberapa klaim secara khusus. Namun, jika tidak ada persyaratan yang ditentukan, semua klaim yang tidak dipahami oleh implementasi harus diabaikan.
Berikut ini adalah contoh *claims set*.

``` JSON
{
  "iss": "https://example.com",
  "sub": "user123",
  "aud": "https://api.example.com",
  "exp": 1690838400,
  "nbf": 1690834400,
  "iat": 1690830400,
  "jti": "abc123",
  "role": "admin",
  "email": "user@example.com",
  "name": "John Doe",
  "user_id": "123456789",
  "scope": ["read", "write"]
}
```

### Nama-nama Klaim Standar

Sejumlah nama klaim sudah terdaftar di IANA dengan nama “JSON Web Token Claims”. Meskipun menurut spesifikasi JWT nama-nama klaim ini tidak wajib digunakan, akan tetapi penggunaan nama yang standar akan mempermudah dalam interoperabilitas.

#### Klaim "iss" (Issuer)

Klaim "iss" (issuer) mengidentifikasi pihak yang mengeluarkan JWT. Penggunaan klaim ini umumnya spesifik untuk aplikasi. Nilai "iss" adalah string yang bersifat case sensitive dan berisi nilai string atau URI.

#### Klaim "sub" (Subject)

Klaim "sub" (subject) mengidentifikasi pihak yang menjadi subjek JWT. Klaim ini biasanya berisi pernyataan tentang subjek tersebut. Nilai subjek harus bersifat unik lokal dalam konteks issuer atau bersifat unik secara global. Penggunaan klaim ini umumnya spesifik untuk aplikasi. Nilai "sub" bersifat case sensitive dan berisi string atau URI.

#### Klaim "aud" (Audience)

Klaim "aud" (audience) mengidentifikasi penerima yang dituju oleh JWT. Setiap pihak yang dituju untuk memproses JWT HARUS mengidentifikasi dirinya sendiri dengan nilai pada klaim audience. Jika pihak yang memproses klaim tidak mengidentifikasi dirinya dengan nilai pada klaim "aud" saat klaim ini ada, maka JWT HARUS ditolak. Pada umumnya, nilai "aud" adalah array dari string yang memperhatikan huruf besar-kecil, masing-masing berisi nilai string atau URI. Dalam kasus khusus saat JWT memiliki satu penerima, nilai "aud" BISA berupa string tunggal yang memperhatikan huruf besar-kecil, berisi nilai string atau URI. Interpretasi nilai audience umumnya spesifik untuk aplikasi.

#### Klaim "exp" (Expiration Time)

Klaim "exp" (expiration time) mengidentifikasi waktu kedaluwarsa di mana JWT TIDAK BOLEH diterima untuk diproses. Pengolahan klaim "exp" mengharuskan bahwa tanggal/waktu saat ini HARUS sebelum tanggal/waktu kedaluwarsa yang tercantum dalam klaim "exp". Implementer BISA memberikan sedikit toleransi, biasanya tidak lebih dari beberapa menit, untuk memperhitungkan ketidak seimbangan waktu. Nilai klaim ini HARUS berupa angka yang berisi nilai unix time.

#### Klaim "nbf" (Not Before)

Klaim "nbf" (not before) mengidentifikasi bahwa sebelum waktu ini JWT TIDAK BOLEH diterima untuk diproses. Pengolahan klaim "nbf" mengharuskan tanggal/waktu saat ini HARUS setelah atau sama dengan tanggal/waktu not-before yang tercantum dalam klaim "nbf". Implementer BISA memberikan sedikit toleransi, biasanya tidak lebih dari beberapa menit, untuk memperhitungkan ketidakseimbangan waktu. Nilai klaim ini HARUS berupa angka yang berisi nilai unix time.

#### Klaim "iat" (Issued At)

Klaim "iat" (issued at) mengidentifikasi waktu saat JWT dibuat. Klaim ini dapat digunakan untuk menentukan usia JWT. Nilai klaim ini HARUS berupa angka yang berisi nilai unix time.

#### Klaim "jti" (JWT ID)

Klaim "jti" (JWT ID) menyediakan pengenal unik untuk JWT. Nilai pengenal HARUS ditetapkan dengan cara yang memastikan bahwa kemungkinan besar nilai yang sama tidak akan secara tidak sengaja diberikan kepada objek data yang berbeda. Jika aplikasi menggunakan beberapa issuer, tabrakan id HARUS dicegah di antara nilai-nilai yang dihasilkan oleh issuer yang berbeda juga. Klaim "jti" dapat digunakan untuk mencegah JWT dari pemutaran ulang. Nilai "jti" adalah string yang memperhatikan huruf besar-kecil.

### Nama Klaim Publik

Nama Klaim dapat ditentukan sesuai keinginan oleh mereka yang menggunakan JWT. Namun, untuk mencegah nama yang sama digunakan untuk keperluan berbeda, setiap Nama Klaim baru harus didaftarkan dalam registri IANA "JSON Web Token Claims" atau nama tersebut cukup unik, sehingga tidak akan tubrukan dengan keperluan lain. Dalam setiap kasus, pihak yang menentukan nama atau nilai tersebut perlu mengambil langkah-langkah yang wajar untuk memastikan bahwa mereka memiliki kendali atas bagian dari namespace yang mereka gunakan untuk mendefinisikan Nama Klaim.

### Nama Klaim Privat

Issuer dan pengguna JWT BISA sepakat untuk menggunakan Nama Klaim yang merupakan Nama Privat: nama yang bukan Nama Klaim Terdaftar atau Nama Klaim Publik. Berbeda dengan Nama Klaim Publik, Nama Klaim Pribadi rentan terhadap tabrakan nama dan harus digunakan dengan hati-hati.

## JOSE Header

Seperti sudah disebutkan sebelumnya, isi dari JWT dapat berupa struktur JWS atau JWE. Kedua struktur tersebut memiliki kesamaan yaitu terdiri atas beberapa bagian, antar bagiannya dipisahkan dengan tanda titik (.) dan bagian pertama dari keduanya adalah header. Header dari JWS dan JWE ini disebut JOSE (JSON Object Signing and Encryption) Header. 

Untuk membedakan JWT adalah JWS atau JWE, kita dapat melihat content dari header ini. Bila ada member header Bernama “enc” berarti itu adalah JWE. Bila tidak berarti itu adalah JWS. Sebagai catatan tambahan di sini, kita juga bisa membedakan JWE dan JWS berdasarkan jumlah bagiannya. JWS ada 3 bagian, sedangkan JWE ada 5 bagian.

JOSE Header tidak di-encrypt melainkan hanya dikodekan dengan base64url. Di dalamnya terdapat informasi yang diperlukan untuk melakukan decode dari bagian berikutnya.

### Member dalam JOSE Header
Berikut ini adalah beberapa nama-nama member dalam JOSE Header, baik itu yang digunakan di JWS maupun JWE. Karena keterbatasan ruang, tidak semua nama member header dibahas di sini. Hanya yang penting saja.

#### Parameter Header "alg" (Algorithm)

Parameter Header "alg" (algorithm) mengidentifikasi algoritma kriptografis yang digunakan untuk mengamankan JWS. Nilai Tanda Tangan JWS tidak valid jika nilai "alg" tidak mewakili algoritma yang didukung atau jika tidak ada kunci yang terkait dengan algoritma tersebut yang terkait dengan pihak yang secara digital menandatangani atau melakukan MAC pada konten tersebut. Nilai "alg" sebaiknya didaftarkan dalam registri IANA "JSON Web Signature and Encryption Algorithms" (JWA) atau merupakan nilai yang cukup unik agar tidak bentrok dengan algoritma lain. Nilai "alg" adalah string ASCII yang memperhatikan huruf besar-kecil. Parameter Header ini HARUS ada, DAN HARUS dipahami dan dapat diproses oleh bagian yang melakukan implementasi.
Untuk JWE, nilai dari parameter ini menunjukkan algoritma yang digunakan untuk mengenkripsi key enkripsi dari content-nya 
Daftar nilai "alg" yang telah ditentukan untuk penggunaan ini dapat ditemukan dalam registri IANA "JSON Web Signature and Encryption Algorithms" (JWA).

#### Parameter Header "jku" (JWK Set URL)

Parameter Header "jku" (JWK Set URL) adalah yang mengacu pada sumber daya untuk satu set kunci publik yang dienkripsi dalam format JSON, salah satunya sesuai dengan kunci yang digunakan untuk menandatangani digital JWS. Kunci-kunci tersebut HARUS dienkripsi sebagai JWK Set [JWK]. Protokol yang digunakan untuk memperoleh sumber daya tersebut HARUS menyediakan perlindungan integritas. Permintaan HTTP GET untuk mengambil JWK Set HARUS menggunakan Transport Layer Security (TLS)

#### Parameter Header "jwk" (JSON Web Key)

Parameter Header "jwk" (JSON Web Key) adalah kunci publik yang sesuai dengan kunci yang digunakan untuk menandatangani digital JWS. Kunci ini direpresentasikan sebagai JSON Web Key [JWK].

#### Parameter Header "kid" (Key ID)

Parameter Header "kid" (key ID) adalah petunjuk yang menunjukkan kunci mana yang digunakan untuk mengamankan JWS. Parameter ini memungkinkan pengirim secara eksplisit memberi sinyal perubahan kunci kepada penerima. Struktur nilai "kid" tidak ditentukan. Nilainya HARUS berupa string yang memperhatikan huruf besar-kecil.
Ketika digunakan dengan JWK, nilai "kid" digunakan untuk menentukan key mana dalam JWK yang akan digunakan.

#### Parameter Header "typ" (Type)

Parameter Header "typ" (type) digunakan oleh aplikasi JWS untuk mendeklarasikan tipe media (IANA.MediaTypes) dari JWS lengkap. Ini dimaksudkan untuk digunakan oleh aplikasi ketika lebih dari satu jenis objek dapat ada dalam struktur data aplikasi yang dapat mengandung JWS. Aplikasi dapat menggunakan nilai ini untuk membedakan antara jenis objek yang berbeda yang mungkin ada. Biasanya, ini tidak akan digunakan oleh aplikasi ketika jenis objek sudah diketahui.

#### Parameter Header "cty" (Content Type)

Parameter Header "cty" (content type) digunakan oleh aplikasi JWS untuk mendeklarasikan tipe media (IANA.MediaTypes) dari konten yang diamankan (payload). Ini dimaksudkan untuk digunakan oleh aplikasi ketika isi dari JWS bisa bermacam-macam. Aplikasi dapat menggunakan nilai ini untuk membedakan antara jenis objek yang berbeda yang mungkin ada. Biasanya, ini tidak akan digunakan oleh aplikasi ketika jenis objek sudah diketahui.

#### Parameter Header "crit" (Critical)

Parameter Header "crit" (critical) digunakan untuk menunjukkan bahwa nama-nama yang disebutkan dalam parameter ini harus ada dalam header, harus dipahami dan diproses oleh penerima. Bila ada salah satu nama dalam parameter ini tidak ada atau tidak dikenali oleh penerima, maka JWS tidak valid. Nama parameter yang sudah terdefinisi dalam spesifikasi ini tidak boleh disebutkan dalam parameter ini. Parameter ini tidak boleh berisi array kosong, serta isinya tidak boleh duplikat.

#### Parameter Header "enc" (Encryption Algorithm)

Parameter Header "enc" (Encryption Algorithm) digunakan untuk mengidentifikasi algoritma enkripsi konten yang digunakan untuk melakukan enkripsi otentikasi pada plaintext sehingga menghasilkan ciphertext dan Tag Autentikasi. Algoritma ini HARUS merupakan algoritma AEAD dengan panjang kunci yang ditentukan. Konten terenkripsi tidak dapat digunakan jika nilai "enc" tidak mewakili algoritma yang didukung. Nilai "enc" harus terdaftar dalam registri IANA "JSON Web Signature and Encryption Algorithms" (JWA), atau nilai tersebut harus berisi nama yang tidak bentrok (Collision-Resistant Name). Nilai "enc" adalah string ASCII yang mempertahankan kapitalisasi dan berisi nilai string. Dalam JWE, parameter ini **HARUS** ada, **HARUS** dipahami dan dapat diproses.

