const { Console } = require("console");
const http = require("http");
const PORT=3000;
/*
const server =http.createServer((req, res)=>{
    res.writeHead(200,{
        'Content-Type' : 'text/plain',
    })
    res.end('Hello! Sir Isaac Newton is you friend!'); //Close stream
});
*/
/*
const server =http.createServer((req, res)=>{
    res.writeHead(200,{
        'Content-Type' : 'application/json',
    })
    res.end(JSON.stringify({
        id:1,
        name: 'Sir Isac Newton',
    })); //Close stream
});*/

const server =http.createServer();

server.on('request',(req, res)=>{
    if(req.url === '/friends') {
        //  res.writeHead(200,{
        //      'Content-Type' : 'application/json',
        //  }) //2 way to write the same
       res.statusCode=200;
       res.setHeader('Content-Type', 'application/json');

        res.end(JSON.stringify({
            id:1,
            name: 'Sir Isac Newton',
        }));
   }
    else if(req.url === '/messages') {
        res.statusCode=200;
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<body>');
        res.write('<ul>');
        res.write('<li>Hello Issac!</li>');
        res.write('<li>What are you thoughts on astronomy?</li>');
        res.write('</ul>');
        res.write('</body>');
        res.write('</html>');
        res.end();  
    }
    else {
        res.statusCode = 404;
        res.end();
    }
});

server.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}...`);
});//127.0.0.1 or localhost = local server