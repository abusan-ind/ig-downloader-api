const axios = require('axios');
const qs = require('qs');

export default async function handler(req, res) {
    // Pengaturan agar Blogger bisa mengakses API ini
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Mengambil username dari parameter URL (?username=...)
    const { username } = req.query;

    if (!username) {
        return res.status(400).json({ error: "Username Instagram wajib diisi" });
    }

    // Format data sesuai permintaan RapidAPI (x-www-form-urlencoded)
    const data = qs.stringify({ 'username': username });

    const options = {
        method: 'POST',
        url: 'https://instagram-downloader-v2.p.rapidapi.com/stories.php',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'x-rapidapi-host': 'instagram-downloader-v2.p.rapidapi.com',
            'x-rapidapi-key': 'd1c4fe54aamshc362b772236c69cp1330a9jsn6e9c4cfedda1'
        },
        data: data
    };

    try {
        const response = await axios.request(options);
        
        // Kirim hasil dari RapidAPI kembali ke Blogger kamu
        res.status(200).json(response.data);
    } catch (error) {
        console.error("API Error:", error.response ? error.response.data : error.message);
        res.status(500).json({ 
            error: "Gagal mengambil data. Pastikan username benar dan akun tidak privat." 
        });
    }
}
