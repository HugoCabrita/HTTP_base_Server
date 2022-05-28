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
const friends =[{
    id:0,
    name: 'Nikola Tesla',
},
{
    id:1,
    name: 'Sir Isac Newton',
},
{
    id:2,
    name: 'Abert Einstein',
}
    
]
server.on('request',(req, res)=>{
    const item =req.url.split('/');
    //  /friende/2 => ['','friends','2']
    if(req.method === 'POST' && item[1] === 'friends')
    {
        req.on('data',(data)=> {
            const friend=data.toString();
            console.log('request: ',friend);
            friends.push(JSON.parse(friend));
           
        });
        req.pipe(res);
    }
    else if(req.method === 'GET' && item[1] === 'friends') {
       res.statusCode=200;
       res.setHeader('Content-Type', 'application/json');
        if(item.length===3)
        {
            console.log("specific friend "+item[2]);
            const friendIndex=Number(item[2]); // or +item[2] to convert to number 
            res.end(JSON.stringify(friends[friendIndex]));
        }
        else{
            res.end(JSON.stringify(friends));
        }

       
   }
    else if(req.method === 'GET' &&item[1]  === 'messages') {
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