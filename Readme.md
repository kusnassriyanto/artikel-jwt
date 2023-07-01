# JWT - JSON Web Token

JSON Web Token sangat popular digunakan dalam mekanisme otentikasi dan otorisasi karena sifatnya yang sangat sederhana, sehingga mudah diimplementasikan, serta ditandatangani dengan metode enkripsi, sehingga dapat dipastikan keabsahannya. Sifat lain yang juga popular adalah stateless yang artinya server tidak perlu menyimpan informasi tentang token yang diberikan, yang mana ini akan meningkatkan skalabilitasnya.

Meskipun pada umumnya JWT tidak terenkripsi, tetapi kita dapat mendefinisikan JWT yang terenkripsi dengan cara tertentu. Pemahaman yang baik tentang JWT akan dapat memaksimalkan potensinya dan menghilangkan dampak atas limitasinya.

Artikel ini akan menjelaskan secara detail tentang JWT, termasuk contoh program untuk membuat dan memverifikasinya secara langsung tanpa library eksternal, serta menggunakan dua library eksternal

## Daftar Isi

[link text](http://dev.nodeca.com)

- [Pendahuluan](./pendahuluan.md)
- [Apa Itu JWT](./apa-itu-jwt.md)
  - [Contoh JWT](./apa-itu-jwt.md#contoh-jwt)
- [JWT Claim Set](./jwt-claims-set.md)
  - [Nama-nama Klaim Standar](./jwt-claims-set.md#nama-nama-klaim-standar)
  - [Nama Klaim Publik](./jwt-claims-set.md#nama-klaim-publik)
  - [Nama Klaim Private](./jwt-claims-set.md#nama-klaim-privat)
- [JOSE Header](./jose-header.md)
  - [Member dalam JOSE Header](./jose-header.md#member-dalam-jose-header)
  - [Contoh JOSE Header](./jose-header.md#contoh-jose-header)
- [Contoh Program](./contoh-program.md)
  - [Contoh tanpa Library External](./contoh-program.md#contoh-tanpa-library-external)
  - [Contoh dengan Library **jsonwebtoken**](./contoh-program.md#menggunakan-library-jsonwebtoken)
  - [Contoh dengan Libray **jose**](./contoh-program.md#menggunakan-library-jose)
- [Penutup](#penutup)
- [Referensi](#referensi)

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




