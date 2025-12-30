# 🐱 PutriGPT - AI Math Solver

**PutriGPT** (a.k.a *"Sini Ku Kerjakanko"*) adalah aplikasi web cerdas yang dapat menyelesaikan soal matematika hanya dengan mengupload foto atau mengambil gambar langsung dari kamera. Ditenagai oleh **Qwen2.5-VL** (Vision-Language Model), aplikasi ini memberikan penjelasan langkah demi langkah dalam Bahasa Indonesia yang mudah dipahami.

![PutriGPT Preview](https://placehold.co/1200x600/e0f2fe/1e40af?text=PutriGPT+Preview)
*(Ganti gambar ini dengan screenshot aplikasi aslimu nanti)*

## ✨ Fitur Utama

- 📸 **Dual Input Mode**: Upload file gambar atau ambil foto langsung menggunakan kamera (support kamera depan/belakang).
- 🧠 **AI Power**: Menggunakan model `Qwen/Qwen2.5-VL-7B-Instruct` via Hugging Face Inference API.
- 📝 **LaTeX Rendering**: Rumus matematika ditampilkan dengan rapi menggunakan KaTeX.
- 🇮🇩 **Bahasa Indonesia**: Penjelasan solusi lengkap dalam Bahasa Indonesia.
- 🎨 **Modern UI**: Desain bersih dengan tema putih-biru dan glassmorphism.
- 📱 **Responsive**: Tampilan optimal di desktop maupun mobile.

## 🛠️ Tech Stack

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS
- **AI Integration**: Hugging Face Inference (`@huggingface/inference`)
- **Math Rendering**: React Markdown, Remark Math, Rehype Katex
- **Icons**: Lucide React

## 🚀 Cara Menjalankan Project

Ikuti langkah-langkah ini untuk menjalankan project di lokal komputer kamu:

### 1. Clone Repository
```bash
git clone https://github.com/Syahrulr18/PutriGPT.git
cd PutriGPT
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Konfigurasi Environment Variable
Buat file `.env` di root folder project, lalu copy isi dari `.env.example` atau tambahkan baris berikut:

```env
VITE_HF_TOKEN=hf_xxxxxxxxxxxxxxxxxxxxxxxx
```
> **Catatan:** Anda bisa mendapatkan token gratis di [Hugging Face Settings](https://huggingface.co/settings/tokens). Pastikan token memiliki izin `Read`.

### 4. Jalankan Aplikasi
```bash
npm run dev
```
Buka browser dan kunjungi `http://localhost:5173`.

## 📦 Build untuk Production

Untuk mendeploy aplikasi (misalnya ke Netlify/Vercel):

```bash
npm run build
```

---

Built with 🐱 by **PutriJago**
