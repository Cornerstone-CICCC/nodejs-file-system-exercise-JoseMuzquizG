"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const url_1 = __importDefault(require("url"));
const directory = "images";
const filePath = path_1.default.join(__dirname, directory); // get the folder path
const server = http_1.default.createServer((req, res) => {
    const { method } = req;
    const parsedUrl = url_1.default.parse(req.url || '', true);
    const { pathname } = parsedUrl;
    const fileName = "veryhappydog.jpg";
    if (pathname === "/view-image" && method === "GET") {
        fs_1.default.readFile(`${filePath}/${fileName}`, (err, data) => {
            if (err) {
                res.writeHead(500, { "content-type": "text/plain" });
                res.end("Something went wrong");
                return;
            }
            res.writeHead(200, { "Content-Type": "image/jpeg" });
            res.end(data);
        });
        return;
    }
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Something went wrong... :(");
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
