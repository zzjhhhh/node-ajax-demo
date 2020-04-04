var http = require("http")
var fs = require("fs")
var url = require("url")
var port = process.argv[2]

if (!port) {
  console.log("请指定端口, 如: \nnode server.js 8888")
  process.exit(1)
}

var server = http.createServer(function (request, response) {
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url
  var queryString = ""
  if (pathWithQuery.indexOf("?") >= 0) {
    QueryString = pathWithQuery.substring(pathWithQuery.indexOf("?"))
  }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  console.log("有人发送请求过来了，路径(带查询参数) 为: " + pathWithQuery)

  response.statusCode = 200
  const filePath = path === "/" ? "/index.html" : path
  const index = filePath.lastIndexOf(".")
  const fileExtension = filePath.substring(index)
  const fileTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".png": "image/png",
    ".jpg": "image/jpeg",
  }
  response.setHeader(
    "Content-Type",
    `${fileTypes[fileExtension] || "text/html"};charset=utf-8`
  )

  let content
  try {
    content = fs.readFileSync(`./public${filePath}`)
  } catch (error) {
    content = "no such file"
    response.statusCode = 404
  }
  response.write(content)
  response.end()
})

server.listen(port)
console.log("监听" + port + "成功\n请打开 http://localhost:" + port)
