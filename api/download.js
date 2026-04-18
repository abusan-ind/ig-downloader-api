const instagramGetUrl = require("instagram-url-direct");

export default async function handler(req, res) {
    // Header agar bisa diakses dari Blogger (CORS)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: "URL Instagram tidak boleh kosong" });
    }

    try {
        // Menggunakan library khusus untuk fetch media
        const result = await instagramGetUrl(url);
        
        /* Hasil dari library ini biasanya berbentuk:
           {
             results_number: 1,
             url_list: ["https://link-video.mp4..."]
           }
        */

        if (result && result.url_list && result.url_list.length > 0) {
            res.status(200).json({
                status: "success",
                url: result.url_list[0] // Mengambil link pertama
            });
        } else {
            res.status(404).json({ 
                error: "Media tidak ditemukan atau akun di-private" 
            });
        }
    } catch (error) {
        console.error("Error API:", error);
        res.status(500).json({ 
            error: "Gagal memproses link. Instagram mungkin sedang membatasi akses." 
        });
    }
}
