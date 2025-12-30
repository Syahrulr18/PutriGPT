import { useState } from 'react';
import { HfInference } from '@huggingface/inference';

const hf = new HfInference(import.meta.env.VITE_HF_TOKEN);

export function useMathSolver() {
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [solution, setSolution] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Convert file to Base64
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    // Handle image upload
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Mohon upload file gambar yang valid (JPG, PNG, dll.)');
            return;
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            setError('Ukuran file terlalu besar. Maksimal 10MB.');
            return;
        }

        setError('');
        setImage(file);

        // Create preview
        const base64 = await convertToBase64(file);
        setImagePreview(base64);
        setSolution('');
    };

    // Clear image
    const clearImage = () => {
        setImage(null);
        setImagePreview(null);
        setSolution('');
        setError('');
    };

    // Handle camera capture
    const handleCameraCapture = (file, preview) => {
        setError('');
        setImage(file);
        setImagePreview(preview);
        setSolution('');
    };

    // Solve math problem
    const solveMath = async () => {
        if (!image) {
            setError('Silakan upload gambar soal matematika terlebih dahulu');
            return;
        }

        setLoading(true);
        setError('');
        setSolution('');

        try {
            const base64Image = await convertToBase64(image);

            const prompt = `Kamu adalah tutor matematika ahli. Analisis gambar soal matematika ini dan berikan solusi lengkap.

INSTRUKSI:
1. Identifikasi jenis soal matematika pada gambar
2. Jelaskan langkah demi langkah penyelesaiannya dalam Bahasa Indonesia
3. Tulis semua rumus dan persamaan matematika menggunakan format LaTeX (contoh: $x^2 + 2x + 1 = 0$ atau $$\\frac{a}{b}$$)
4. Berikan penjelasan yang mudah dipahami untuk setiap langkah
5. Tampilkan jawaban akhir dengan jelas

Mulai analisis dan penyelesaian soal:`;

            const response = await hf.chatCompletion({
                model: "Qwen/Qwen2.5-VL-7B-Instruct",
                messages: [
                    {
                        role: "user",
                        content: [
                            {
                                type: "text",
                                text: prompt
                            },
                            {
                                type: "image_url",
                                image_url: {
                                    url: base64Image
                                }
                            }
                        ]
                    }
                ],
                max_tokens: 2048
            });

            const answer = response.choices[0]?.message?.content;

            if (answer) {
                setSolution(answer);
            } else {
                setError('Tidak dapat memproses gambar. Silakan coba lagi dengan gambar yang lebih jelas.');
            }
        } catch (err) {
            console.error('API Error:', err);
            if (err.message?.includes('401') || err.message?.includes('Unauthorized')) {
                setError('Token API tidak valid. Pastikan VITE_HF_TOKEN sudah dikonfigurasi dengan benar.');
            } else if (err.message?.includes('429')) {
                setError('Terlalu banyak permintaan. Silakan tunggu beberapa saat dan coba lagi.');
            } else if (err.message?.includes('503')) {
                setError('Model sedang loading. Silakan tunggu 20-30 detik dan coba lagi.');
            } else {
                setError(`Terjadi kesalahan: ${err.message || 'Gagal memproses gambar'}`);
            }
        } finally {
            setLoading(false);
        }
    };

    return {
        image,
        imagePreview,
        solution,
        loading,
        error,
        handleImageUpload,
        handleCameraCapture,
        clearImage,
        solveMath,
    };
}
