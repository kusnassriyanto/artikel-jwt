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

### Contoh JOSE Header

#### Unsecured JWT
Salah satu contoh yang disebutkan dalam RFC 7519 adalah JWT yang tidak ditanda tangani. Dalam contoh ini, parameter alg yang disebutkan dalam JOSE  bernilai "none" seperti contoh berikut ini.

``` JSON
{
  "alg": "none"
}
```

#### Contoh Jose Header dalam JWT
Contoh yang cukup umum digunakan adalah JWT dengan algoritma signature-nya adalah menggunakan HMAC SHA 256 atau HS256, seperti contoh header berikut ini

``` JSON
{
  "alg": "HS256",
  "typ": "JWT"
}
```

#### Contoh Header dalam JWT dengan JWE
Berikut ini adalah contoh header dalam JWT yang didialamnya adalah JWE
``` JSON
{
  "alg":"RSA-OAEP",
  "enc":"A256GCM"
}
```
