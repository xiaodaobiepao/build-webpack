const express = require('express')
const { renderToSting } = require('react-dom/server')
const SSR = require('../dist/search-server')
server(process.env.PORT || 3001)
const server = (port) => {
  const app = express()
  app.use(express.static('dist'))

  app.get('/search', (req, res) => {
    res.status(200).send(renderMarkup(renderToSting(SSR)))
  })
  app.listen(port, () => {
    console.log('Server is running on port' + prot)
  })
}

const renderMarkup = (str) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>search</title>
  </head>
  <body>
    <div id="root">${str}</div>
  </body>
  </html>`
}