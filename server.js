import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { readFileSync } from "fs";
import https from "https";
import { parse } from "url";
import next from "next";

// Simula __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: readFileSync(join(__dirname, "localhost-key.pem")),
  cert: readFileSync(join(__dirname, "localhost-cert.pem")),
};

app.prepare().then(() => {
  https
    .createServer(httpsOptions, (req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    })
    .listen(3000, (err) => {
      if (err) throw err;
      console.log("> Ready on https://localhost:3000");
    });
});
