const router = require("express").Router();
const download = require("../controllers/download");

router.post("/download", download.downloadVideo);

module.exports = router;