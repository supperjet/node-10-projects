const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.send('Hello world\n')
})

server.listen(port, hostname, ()=>{
  const date = new Date();
  const year = date.getFullYear();
  const months = date.getMonth()+1;
  const days = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  console.log("["+year+"年"+months+"月"+days+"日"+hours+":"+minutes+"]"+" "+'Server is running at http://'+hostname+":"+port+'/');
})
