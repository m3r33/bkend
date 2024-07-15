const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req, res) => res.type('html').send("Hello There!"));


app.post("/endpoint", async (req, res) => {
    const body = await JSON.parse(req.body);
    const response =  await res.json();
    console.log({body, response})
    return response;
})

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

