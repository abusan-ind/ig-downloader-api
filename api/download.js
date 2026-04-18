const axios = require('axios');

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { url } = req.query;

    if (!url) return res.status(400).json({ error: "URL diperlukan" });

    const options = {
        method: 'GET',
        url: 'https://instagram-loarder.p.rapidapi.com/download', // Sesuaikan dengan API yang kamu pilih
        params: { url: url },
        headers: {
            'X-RapidAPI-Key': 'd1c4fe54aamshc362b772236c69cp1330a9jsn6e9c4cfedda1
',
            'X-RapidAPI-Host': 'instagram-downloader-v2.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        // Sesuaikan 'response.data.url' dengan struktur data dari RapidAPI tersebut
        res.status(200).json({
            url: response.data.result?.url || response.data.url 
        });
    } catch (error) {
        res.status(500).json({ error: "API Pihak Ketiga Error atau Kuota Habis" });
    }
}
