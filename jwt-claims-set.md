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
