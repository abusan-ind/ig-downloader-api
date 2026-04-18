const axios = require('axios');
const qs = require('qs'); // Digunakan untuk format x-www-form-urlencoded

export default async function handler(req, res) {
    // Header agar bisa diakses dari Blogger (CORS)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

    // Kita ambil username dari query (contoh: ?username=jokowi)
    const { username } = req.query;

    if (!username) {
        return res.status(400).json({ error: "Username Instagram diperlukan" });
    }

    // Data yang akan dikirim ke RapidAPI (x-www-form-urlencoded)
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
        
        // Kirim hasil dari RapidAPI kembali ke Blogger
        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            error: "Gagal mengambil stories. Pastikan username benar dan akun tidak privat." 
        });
    }
}
