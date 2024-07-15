const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req, res) => res.type('html').send("Hello There!"));


app.post("/endpoint", (req, res) => {
    const body = req.body;
    console.log({body, res})
    return res.statusCode;
})

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

