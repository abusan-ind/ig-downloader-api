const axios = require('axios');

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { url } = req.query;

    if (!url) return res.status(400).json({ error: "URL is required" });

    try {
        // Membersihkan URL agar standar
        const cleanUrl = url.split('?')[0].replace(/\/$/, "");
        
        const response = await axios.get(`${cleanUrl}/?__a=1&container_main=1`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
                'Cookie': 'sessionid=17864863018060157;' 
            }
        });

        // Instagram mengembalikan data dalam format JSON jika memakai __a=1
        const data = response.data;
        const mediaData = data.graphql?.shortcode_media || data.items?.[0];

        if (!mediaData) {
            return res.status(404).json({ error: "Media tidak ditemukan. Pastikan akun tidak diprivat." });
        }

        // Ambil link video jika ada, jika tidak ambil link foto
        const downloadUrl = mediaData.video_url || mediaData.display_url;

        res.status(200).json({
            status: "success",
            url: downloadUrl
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Instagram tetap memblokir. Gunakan Session ID baru atau akun lain." });
    }
}
