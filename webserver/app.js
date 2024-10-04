const http = require('http')

const server = http.createServer((req, res)=>{
    console.log(req.url);
    res.writeHead(404);
    res.write('helo lupita');
    res.end();
});

server.listen(3000,'127.0.0.1');
console.log('servicor web iniciado en http://127.0.0.1:3000');
