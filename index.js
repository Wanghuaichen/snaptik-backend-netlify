const express = require("express");
const cors = require("cors");
const serverless = require('serverless-http');
const router = require("express").Router();
const download = require("./controllers/download");

const app = express();
// const httpServer = createServer(app);

app.use(cors());
app.use(express.json());

// app.use("/.netlify/index/snaptik", downloadRoutes);
router.post("/.netlify/functions/index", download.downloadVideo);

// const HOST_NAME = '/.netlify'
// const HOST_NAME = 'https://68.178.145.77/snaptik-backend'
// const port = 5500;

// httpServer.listen('/.netlify/index', () => console.log(`Server listening on port ${port}`));
module.exports=app;
module.exports.handler = serverless(app);
// module.exports = { app };