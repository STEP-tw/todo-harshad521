let fs = require('fs');
const timeStamp = require('./time.js').timeStamp;
const http = require('http');
const WebApp = require('./webapp');
let registered_users = [{userName:'harshad',name:'Harshad Vijay Thombare',password:'ht1234'}];

const getContentType = function(fileExtension){
  let contentType={
    ".jpg":"img/jpg",
    ".html":"text/html",
    ".css":"text/css",
    ".js":"text/javascript",
    ".gif":"img/gif",
    ".pdf":"text/pdf",
    ".txt":"text/plain"
  };
  return contentType[fileExtension] || "text/html";
};

const setResponseType = function(path,res){
  let fileExt=path.slice(path.lastIndexOf("."));
  res.setHeader('Content-type',getContentType(fileExt));
  return;
};

const getPath =  (req) =>`./public/${req.url}`;

let toS = o=>JSON.stringify(o,null,2);

let logRequest = (req,res)=>{
  let text = ['------------------------------',
    `${timeStamp()}`,
    `${req.method} ${req.url}`,
    `HEADERS=> ${toS(req.headers)}`,
    `COOKIES=> ${toS(req.cookies)}`,
    `BODY=> ${toS(req.body)}`,''].join('\n');
  fs.appendFile('request.log',text,()=>{});
  console.log(`${req.method} ${req.url}`);
}

let loadUser = (req,res)=>{
  let sessionid = req.cookies.sessionid;
  let user = registered_users.find(u=>u.sessionid==sessionid);
  if(sessionid && user){
    req.user = user;
  }
};

const isStaticFileRequest = function (req) {
  return fs.existsSync(getPath(req));
};

const serveStaticFileReq = function (req,res) {
  let path = getPath(req);
  setResponseType(path,res);
  res.write(fs.readFileSync(path));
  res.end();
  return;
};

const handleStaticFileReq = function (req,res) {
   isStaticFileRequest(req) && serveStaticFileReq(req,res);
};


const dontAllowWithoutLogin = (req,res)=>{
  if(req.url!='/login'&&!req.user) res.redirect('/login');
}

const redirectToIndexPage = (req,res)=>{
  if(req.url=="/") res.redirect('/index.html');
}
const cookieParse = function(cookies){
  try{
    return JSON.parse(cookies.loginFailed.split(",")[0]);
  }catch(e){}
}

let app = WebApp.create();

app.use(logRequest);
app.use(loadUser);
app.use(redirectToIndexPage);
app.use(dontAllowWithoutLogin);
//app.use(redirectLoggedOutUserToIndex);
app.useAfter(handleStaticFileReq);



app.get('/login',(req,res)=>{
  res.setHeader('Content-type','text/html');
  if(cookieParse(req.cookies)) res.write('<p>logIn Failed</p>');
  res.write(` <center>
    <h4><a href="index.html"> << </a>Login</h4>
    <form method="POST">
      Name : <input  name="userName"> <br> <br>
      Password : <input type="password" name="password"> <br> <br>
      <input type="submit">
    </form>`);
  res.end();
});


app.post('/login',(req,res)=>{
  let user = registered_users.find(u=>u.userName==req.body.userName && u.password==req.body.password);
  if(!user) {
    res.setHeader('Set-Cookie',`loginFailed=true; Max-Age = 5`);
    res.redirect('/login');
    return;
  }
  let sessionid = new Date().getTime();
  res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
  user.sessionid = sessionid;
  res.redirect('/index.html');
});

app.get('/userName',(req,res)=>{
  req.user && res.write(req.user.name);
  res.end();
});

app.get('/logout',(req,res)=>{
  res.setHeader('Set-Cookie',[`loginFailed=false,Expires=Thu Jan 01 1970 05:30:00 GMT`,`sessionid=0,Expires=Thu Jan 01 1970 05:30:00 GMT`]);
  delete req.user.sessionid;
  res.redirect('/login');
});



const PORT = 5000;

let server = http.createServer(app);

server.on('error',e=>console.error('**error**',e.message));

server.listen(PORT,(e)=>console.log(`server listening at ${PORT}`));
