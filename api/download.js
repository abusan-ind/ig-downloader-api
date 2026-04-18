import axios from 'axios';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { url } = req.query;

    if (!url) return res.status(400).json({ error: "URL is required" });

    try {
        // Membersihkan URL agar formatnya benar
        const cleanUrl = url.split('?')[0];
        
        // Menggunakan layanan pengambil data atau membedah metadata secara manual
        // Catatan: Ini adalah contoh logika dasar
        const response = await axios.get(`${cleanUrl}?__a=1&container_main=1`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/110.0.0.0 Safari/537.36',
                'Cookie': 'sessionid=ISI_DENGAN_SESSION_ID_JIKA_DIBUTUHKAN;' 
            }
        });

        // Kirim data ke Blogger
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Instagram blocking connection. Try again later." });
    }
}
