import https from 'https'
import fs from 'fs'
import next from 'next'
import { parse } from 'url'

const app = next({ dev: true })
const handle = app.getRequestHandler()

const httpsOptions = {
  key: fs.readFileSync('C:\\mkcert\\localhost-key.pem'),
  cert: fs.readFileSync('C:\\mkcert\\localhost.pem'),
}

app.prepare().then(() => {
  https
    .createServer(httpsOptions, (req, res) => {
      const parsedUrl = parse(req.url, true)
      handle(req, res, parsedUrl)
    })
    .listen(3000, () => {
      console.log('https://localhost:3000')
    })
})
