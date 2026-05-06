# TypeScript RESTful API - Contact Management

Proyek ini adalah implementasi RESTful API untuk manajemen kontak yang dibangun menggunakan **Node.js** dan **TypeScript**. Proyek ini menggunakan **Prisma ORM** untuk interaksi database dan **Zod** untuk validasi data.

## 🚀 Tech Stack
- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **ORM**: Prisma
- **Validation**: Zod
- **Logging**: Winston
- **Database**: MySQL / MariaDB
- **Testing**: Jest & Supertest

---

## 🛠️ Setup Project

Ikuti langkah-langkah di bawah ini untuk menjalankan proyek di mesin lokal kamu:

### 1. Clone Repository
```bash
git clone git@github.com:Ardhiityo/NodeJs-PZN.git
cd typescript-pzn
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Konfigurasi Environment
Buat file `.env` di direktori akar proyek dan sesuaikan konfigurasinya:
```env
DATABASE_URL="mysql://root:@127.0.0.1:3306/typescript_restful_api"
DATABASE_HOST="127.0.0.1"
DATABASE_PORT="3306"
DATABASE_USER="root"
DATABASE_PASSWORD=""
DATABASE_NAME="typescript_restful_api"
```

### 4. Database Migration
Jalankan migrasi untuk membuat tabel-tabel yang diperlukan di database kamu:
```bash
npm run migrate
```

### 5. Generate Prisma Client
Pastikan Prisma Client sudah ter-generate dengan versi terbaru dari skema kamu:
```bash
npm run generate
```

### 6. Build & Run Project
Untuk melakukan kompilasi TypeScript ke JavaScript:
```bash
npm run build
```

Untuk menjalankan aplikasi (Development):
```bash
npm run dev
```

### 7. Running Tests
Untuk menjalankan rangkaian pengujian menggunakan Jest:
```bash
npm run test
```

---

## 📖 API Documentation
*(Opsional: Kamu bisa menambahkan daftar endpoint utama di sini nanti)*
- **User**: Register, Login, Current, Update, Logout
- **Contact**: Create, Get, Search, Update, Delete
- **Address**: Create, Get, Update, Delete
