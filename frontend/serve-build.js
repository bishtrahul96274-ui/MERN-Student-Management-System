const fs = require("fs");
const http = require("http");
const path = require("path");

const root = path.resolve(__dirname, "build");
const port = 3000;

const types = {
  ".css": "text/css",
  ".html": "text/html",
  ".ico": "image/x-icon",
  ".js": "text/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".txt": "text/plain",
};

http
  .createServer((req, res) => {
    let filePath = path.join(root, decodeURI(req.url.split("?")[0]));

    if (!filePath.startsWith(root)) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }

    if (
      req.url === "/" ||
      !fs.existsSync(filePath) ||
      fs.statSync(filePath).isDirectory()
    ) {
      filePath = path.join(root, "index.html");
    }

    fs.readFile(filePath, (error, data) => {
      if (error) {
        res.writeHead(404);
        res.end("Not found");
        return;
      }

      res.writeHead(200, {
        "Content-Type": types[path.extname(filePath)] || "application/octet-stream",
      });
      res.end(data);
    });
  })
  .listen(port, () => {
    console.log(`Frontend served at http://localhost:${port}`);
  });
