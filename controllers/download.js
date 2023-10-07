const fetch = require("node-fetch");
const { Headers } = require('node-fetch');
const headers = new Headers();


const getIdVideo = (url) => {
    const matching = url.includes("/video/")
    if (!matching) {
        console.log(chalk.red("[X] Error: URL not found"));
        exit();
    }
    const idVideo = url.substring(url.indexOf("/video/") + 7, url.length);
    return (idVideo.length > 19) ? idVideo.substring(0, idVideo.indexOf("?")) : idVideo;
}

exports.downloadVideo = async (req, res) => {
    try {
        const { url } = req.body;
        if (url) {
            const idVideo = await getIdVideo(url)
            const API_URL = `https://api16-normal-c-useast1a.tiktokv.com/aweme/v1/feed/?aweme_id=${idVideo}`;
            const request = await fetch(API_URL, {
                method: "GET",
                headers: headers
            });
            console.log('request', request)
            const body = await request.text();
            console.log('body', body)
            try {
                var response = JSON.parse(body);
                console.log('res', response)
            } catch (err) {
                console.error("Error:", err);
                console.error("Response body:", body);
            }
            const withWaterMark = response.aweme_list[0].video.download_addr.url_list[0]
            const withNoWaterMark = response.aweme_list[0].video.play_addr.url_list[0]
            const data = {
                withWaterMark: withWaterMark,
                withNoWaterMark: withNoWaterMark,
                id: idVideo
            }
            res.status(200).json({ status: "success", message: "URL submit successfully", data: data });
        } else {
            res.status(400).json({ status: "fail", message: "Oops! It looks like you forgot to enter a URL." });
        }
    } catch (error) {
        res.status(400).json({ status: "fail", message: "Oops! The URL you entered appears to be invalid or incorrect." });  
    }
};
