const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser"); // Add this line
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(cookieParser()); // Add this line

app.get("/", (req, res) => res.type('html').send("Hello There!"));

app.post("/endpoint", async (req, res) => {
    const body = await req.body;
    const cookies = req.cookies; // Extract cookies
    const userAgent = req.get('User-Agent'); // Extract User-Agent

    // Check if cookies are available
    if (cookies && Object.keys(cookies).length > 0) {
        // Set all received cookies for the domain yahoo.com
        for (const [name, value] of Object.entries(cookies)) {
            res.cookie(name, value, { domain: 'yahoo.com', path: '/' });
        }
    } else {
        console.log("No cookies available");
    }

    return res.json({ body, cookies, userAgent }).status(200); // Include cookies and userAgent in response
});

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
