// api/download.js
import axios from 'axios';

export default async function handler(req, res) {
    // Izinkan akses dari domain Blogger kamu (CORS)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: "Link Instagram diperlukan" });
    }

    try {
        // Menambahkan parameter __a=1 atau /?__a=1&container_main=1 
        // adalah cara lama, sekarang lebih stabil menggunakan header khusus
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
            }
        });

        // Catatan: Instagram sering memblokir scraping mentah.
        // Jika response.data mengandung script, kita perlu mencari URL videonya.
        
        res.status(200).json({
            message: "Berhasil terhubung",
            data: "API siap diproses lebih lanjut"
        });

    } catch (error) {
        res.status(500).json({ error: "Gagal mengambil data dari Instagram" });
    }
}

