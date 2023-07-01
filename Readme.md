# JWT - JSON Web Token

JSON Web Token sangat popular digunakan dalam mekanisme otentikasi dan otorisasi karena sifatnya yang sangat sederhana, sehingga mudah diimplementasikan, serta ditandatangani dengan metode enkripsi, sehingga dapat dipastikan keabsahannya. Sifat lain yang juga popular adalah stateless yang artinya server tidak perlu menyimpan informasi tentang token yang diberikan, yang mana ini akan meningkatkan skalabilitasnya.

Meskipun pada umumnya JWT tidak terenkripsi, tetapi kita dapat mendefinisikan JWT yang terenkripsi dengan cara tertentu. Pemahaman yang baik tentang JWT akan dapat memaksimalkan potensinya dan menghilangkan dampak atas limitasinya.

Artikel ini akan menjelaskan secara detail tentang JWT, termasuk contoh program untuk membuat dan memverifikasinya secara langsung tanpa library eksternal, serta menggunakan dua library eksternal

## Daftar Isi

- [Pendahuluan](./docs/pendahuluan.md)
- [Apa Itu JWT](./docs/apa-itu-jwt.md)
  - [Contoh JWT](./docs/apa-itu-jwt.md#contoh-jwt)
- [JWT Claim Set](./docs/jwt-claims-set.md)
  - [Nama-nama Klaim Standar](./docs/jwt-claims-set.md#nama-nama-klaim-standar)
  - [Nama Klaim Publik](./docs/jwt-claims-set.md#nama-klaim-publik)
  - [Nama Klaim Private](./docs/jwt-claims-set.md#nama-klaim-privat)
- [JOSE Header](./docs/jose-header.md)
  - [Member dalam JOSE Header](./docs/jose-header.md#member-dalam-jose-header)
  - [Contoh JOSE Header](./docs/jose-header.md#contoh-jose-header)
- [Contoh Program](./docs/contoh-program.md)
  - [Contoh tanpa Library External](./docs/contoh-program.md#contoh-tanpa-library-external)
  - [Contoh dengan Library **jsonwebtoken**](./docs/contoh-program.md#menggunakan-library-jsonwebtoken)
  - [Contoh dengan Libray **jose**](./docs/contoh-program.md#menggunakan-library-jose)
- [Penutup](#penutup)
- [Referensi](#referensi)

## Daftar Program
- [Contoh JWT](./src/jwt_example.js)
  Contoh kode program untuk menghasilkan JWT tanpa menggunakan library external, hanya menggunakan library **crypto** yang sudah *built-in* dalam NodeJs.

- [Contoh JWT tanpa Library Eksternal](./src/jwt_native.js)
  Contoh kode program untuk Membuat JWT, Memeriksa JWT, serta melihat data klaim dalam JWT tanpa menggunakan library eksternal, hanya menggunakan library **crypto** yang sudah *built-in* dalam NodeJs.

- [Contoh JWT dengan Lib **jsonwebtoken** HS256](./src/jwt_jsonwebtoken_1.js)
  Contoh kode program untuk membuat JWT, memeriksa JWT, dan melihat data di dalamnya dengan algoritma *signature* HS256 menggunakan library **jsonwebtoken**

- [Contoh Pembuatan Private dan Public Key](./src/jwt_create_keys.js)
  Contoh kode program untuk menggenerate private key dan public key menggunakan algoritma rsa 2048 bit, dan menyimpannya dalam file.

- [Contoh JWT dengan Lib **jsonwebtoken** RS256](./src/jwt_jsonwebtoken_2.js)
  Contoh kode program untuk membuat dan memeriksa JWT menggunakan algoritma *signature* RS256 dengan memanfaatkan private dan public key yang sudah dibuat sebelumnya. Pada contoh ini, JWT di-*sign* dengan private key dan diperiksa dengan public key.

- [Contoh JWT dengan Lib **jose** RS256](./src/jwt_jose_1.js)
  Contoh kode program untuk membuat dan memeriksa JWT menggunakan library **jose** dengan algoritma *signature* RS256 dengan memanfaatkan private dan public key yang sudah dibuat sebelumnya. Pada contoh ini, JWT di-*sign* dengan private key dan diperiksa dengan public key.

- [Contoh Encrypted JWT (JWE) dengan Lib **jose**](./src/jwt_jose_2.js)
  Contoh kode program untuk membuat dan memeriksa JWT yang terenkripsi (JWE) menggunakan library **jose** memanfaatkan private dan public key yang sudah dibuat sebelumnya. Pada contoh ini JWE akan di-encrypt dengan public key dan akan di-decrypt dengan private key.


## Penutup

JWT Merupakan salah satu mekanisme yang popular digunakan dalam mekanisme otentikasi dan otorisasi karena sifatnya yang sangat sederhana, sehingga mudah diimplementasikan. Selain yang sering digunakan, yaitu JWT yang berbentuk JWS (JSON Web Signature) dengan algoritma signature adalah HS256, sebenarnya JWT masih menyediakan banyak fitur lain. Ada berbagai macam algoritma yang dapat digunakan untuk signing jwt, misalnya RS256, RS512, ES256, dll. Kita dapat memilih algoritma mana yang akan kita gunakan sesuai kebutuhan.

Selain bentuk JWS dimana payload tidak dienkripsi, ternyata masih ada bentuk lain, yaitu JWE (JSON Web Encryption) dimana payloadnya dienkripsi. Untuk kebutuhan menyimpan data sensitif dalam JWT, kita dapat menggunakan bentuk JWE ini yang juga memiliki banyak alternatif algoritma untuk enkripsinya.

Terdapat banyak library yang mengimplementasi JWT ini. Dua diantaranya kita gunakan dalam tulisan ini, yaitu jsonwebtoken yang penggunaannya sangat sederhana serta jose yang memiliki fitur enkripsi JWT.

Artikel ini diharapkan dapat membantu pembaca dalam memahami secara lebih mendalam terkait JWT ini. Dengan demikian, penggunaan JWT dalam pekerjaan sehari-hari dapat lebih tepat dan aman.
 
## Referensi
1. RFC 7519 - JSON Web Token (JWT)
  - Penulis: M. Jones, J. Bradley, N. Sakimura
  - Tahun: 2015
  - Publikasi: Internet Engineering Task Force (IETF)
  - URL: https://tools.ietf.org/html/rfc7519
2. RFC 7515 - JSON Web Signature (JWS)
  - Penulis: M. Jones, J. Bradley, N. Sakimura
  - Tahun: 2015
  - Publikasi: Internet Engineering Task Force (IETF)
  - URL: https://tools.ietf.org/html/rfc7515
3. RFC 7516 - JSON Web Encryption (JWE)
  - Penulis: M. Jones, J. Hildebrand
  - Tahun: 2015
  - Publikasi: Internet Engineering Task Force (IETF)
  - URL: https://tools.ietf.org/html/rfc7516
4. The JWT Handbook
  - Sebastian Peyrott
  - Publikasi: Auth0
  - URL: https://auth0.com/resources/ebooks/jwt-handbook
5. Introduction to JSON Web Tokens
  - Author: jwt.io
  - URL: https://jwt.io/introduction
6. jsonwebtoken
  - Author: Auth0
  - URL: https://github.com/auth0/node-jsonwebtoken
7. jose
  - Author: Filip Skokan
  - URL: https://github.com/panva/jose




