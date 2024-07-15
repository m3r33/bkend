const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json()); // Add this middleware to parse JSON bodies

app.get("/", (req, res) => res.type('html').send("Hello There!"));

app.post("/endpoint", async (req, res) => {
    const body = req.body; // No need to parse, express.json() does it
    console.log({ body });
    return res.json(body); // Send the body back as JSON response
});

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
