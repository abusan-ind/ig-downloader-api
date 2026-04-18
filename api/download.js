const axios = require('axios');

export default async function handler(req, res) {
    // Header CORS agar bisa diakses dari domain Blogger mana pun
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Mengambil username dari query string (misal: /api/download?username=cristiano)
    const { username } = req.query;

    if (!username) {
        return res.status(400).json({ error: "Username tidak boleh kosong" });
    }

    // Mengonversi data ke format x-www-form-urlencoded
    const params = new URLSearchParams();
    params.append('username', username);

    const options = {
        method: 'POST',
        url: 'https://instagram-downloader-v2.p.rapidapi.com/stories.php',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'x-rapidapi-host': 'instagram-downloader-v2.p.rapidapi.com',
            'x-rapidapi-key': 'd1c4fe54aamshc362b772236c69cp1330a9jsn6e9c4cfedda1'
        },
        data: params
    };

    try {
        const response = await axios.request(options);
        // Mengirimkan hasil mentah dari RapidAPI ke Blogger
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ 
            error: "Gagal memproses permintaan ke Instagram melalui RapidAPI",
            details: error.message 
        });
    }
}
