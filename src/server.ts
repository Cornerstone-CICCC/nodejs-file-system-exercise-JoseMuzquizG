import http from 'http'
import fs from 'fs'
import path from 'path'
import url from 'url'

const directory = "images"
const filePath = path.join(__dirname, directory) // get the folder path

const server = http.createServer((req, res) => {
    const { method } = req
    const parsedUrl = url.parse(req.url || '', true)
    const { pathname } = parsedUrl
    const fileName = "veryhappydog.jpg"

    if (pathname === "/view-image" && method === "GET") {
        fs.readFile(`${filePath}/${fileName}`, (err, data) => {
            if (err) {
                res.writeHead(500, {"content-type" : "text/plain"})
                res.end("Something went wrong")
                return
            }
            res.writeHead(200,  {"Content-Type" : "image/jpeg"})
            res.end(data)
        })
        return
    }

    res.writeHead(404, {"Content-Type" : "text/plain"})
    res.end("Something went wrong... :(")
})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`)
})