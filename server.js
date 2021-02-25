const HTTP = require('http');
const FS = require('fs');
const PATH = require('path');
const PORT = 8080;

// const options = {};

HTTP.createServer(function(req,res){
    if(req.url == '' || req.url == '/' || req.url == '/main'){
        // console.log(req.rawHeaders)
        res.writeHead(200,{"Content-type":"text/html; charset=utf-8"})
        res.write(FS.readFileSync('public/templates/hello.html'));
        res.end();
    }
    else if(req.url =='/test'){
        req.on('data',function(chunk){
            let el = chunk + '';
            console.log(el);
            console.log(JSON.parse(el));
        })
        res.writeHead(200,{"Content-type":"text/html; charset=utf-8"})
        res.end('<p>LOGGEN IN</p>');
    }
    else if(req.url == '/home'){
        // verify 
        res.writeHead(200,{"Content-type":"text/html; charset=utf-8"})
        res.write(FS.readFileSync('public/templates/home.html'));
        res.end();
    }
    else if (req.url == '/loginverify'){
        let body = require('./foo.js');
        req.on('data',function(chunk){
            let query = ''+chunk;
            query = body.MakeAsObj(query);
            query = body.FindOnDB(query.Login,query.Password);
            if(query.exist){
                body.AddNewData(query.Login,'superSecret','keyOfAceesLvl02');
                // res.write(`<script>  </script>`);
                // setTimeout(()=>{
                    // res.end('<script>localStorage.setItem("superSecret","gav-gav")</script>');
                    res.end(`<script>
                    localStorage.clear();
                    window.location = "home";
                    localStorage.setItem("superSecret","keyOfAceesLvl02");
                    localStorage.setItem("login","${query.Login}");
                    </script>`)
                // },3000);
            }else{
                res.end('<script>window.location = "reqister"</script>');
            }
        })
    }
    else if(req.url == '/login'){
        res.writeHead(200,{"Content-type":"text/html; charset=utf-8"})
        res.write(FS.readFileSync('public/templates/login.html'));
        res.end();
    }
    else if(req.url == '/signup'){
        let body = require('./foo.js');
        let finished = false;
        req.on('data',function(chunk){
            let query = ''+chunk;
            let copy = body.MakeAsObj(query);
            // console.log('DATA:: '+query);
            query = body.MakeAsObj(query);
            // console.log(query);
            query = body.FindOnDB(query.Login,query.Password);
            // console.log(query);
            if(query.exist == false){
                let newUser = body.registerNewUser(copy.Login,copy.Name,copy.Password);
                if(newUser == 'CREATED'){
                    finished = true;
                    res.end('<script>window.location = "home"</script>');
                }
            }else if(query.exist == true){
                finished = true;
                res.write('<h3>User are registered </h3>')
                res.write("<a href='/main'>go home </a>");
            }
            
        })
        res.writeHead(200,{"Content-type":"text/html; charset=utf-8"})
        res.write('<p>Wait we are verify you</p>');
        // let result = isExecption()
        let a = setInterval(()=>{
            if(finished){
                res.end();
            }else{
                res.write('<p>wait</p>');
            }
        },100);
        a;
        
    }
    else if(req.url == '/reqister'){
        res.writeHead(200,{"Content-type":"text/html; charset=utf-8"})
        res.write(FS.readFileSync('public/templates/form.html'));
        res.end();
    }
    else{
        if(req.url){
            // console.log('URL::',req.url);
            // console.log(PATH.dirname(req.url),PATH.posix.basename(req.url),PATH.extname(req.url));

            if(PATH.dirname(req.url) == '/'){
                res.writeHead(404,{"Content-type":"text/html; charset=utf-8"});
                res.end();
            }else{
                if(PATH.extname(req.url) == '.js'){
                    res.writeHead(200,{"Content-type":"text/javascript; charset=utf-8"});
                }else if(PATH.extname(req.url) == '.css'){
                    res.writeHead(200,{"Content-type":"text/css; charset=utf-8"});
                }
                
                res.write(FS.readFileSync((req.url).replace('/','')));
                // let dir = FS.readdirSync(PATH.dirname(req.url).replace('/',''));
                // console.log(dir);
                // for(let i =0; i < dir.length;i++){
                //     if(dir[i] == PATH.posix.basename(req.url)){
                        
                //     }
                // }
            }
            
            res.end();
        }
        else{
            res.writeHead(404,{"Content-type":"text/html; charset=utf-8"})
            res.write('<p>sorry but 404 resource not found</p>');
            res.end("<a href='/main'>go home </a>");
        }
        
    }
    
}).listen(PORT);

console.log(`Server run at Localhost:${PORT}`);