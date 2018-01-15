let fs = require('fs');
const timeStamp = require('./time.js').timeStamp;
const http = require('http');
const WebApp = require('./webapp');
const TodoApp = require('./src/todoApp.js');
const myApp =  new TodoApp();
myApp.addAccount('harshad','Harshad Vijay Thombare','ht1234')
myApp.addAccount('jack','Jack Sparrow','js1234');

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
  //console.log(`${req.method} ${req.url}`);
}

let loadUser = (req,res)=>{
  let sessionid = req.cookies.sessionid;
  let user = myApp.getUserBySessionId(sessionid);
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

const cookieParse = function(cookies){
  try{
    return JSON.parse(cookies.loginFailed.split(",")[0]);
  }catch(e){}
}

const redirectToIndexPage = (req,res)=>{
  if(req.urlIsOneOf(['/','/login'])&&req.user) res.redirect('/index.html');
}
let app = WebApp.create();

app.use(logRequest);
app.use(loadUser);
app.use(redirectToIndexPage);
app.use(dontAllowWithoutLogin);
app.useAfter(handleStaticFileReq);



app.get('/login',(req,res)=>{
  res.setHeader('Content-type','text/html');
  if(cookieParse(req.cookies)) res.write('<p>logIn Failed</p>');
  res.write(` <center>
    <h4>Login</h4>
    <form method="POST">
      Name : <input  name="userName"> <br> <br>
      Password : <input type="password" name="password"> <br> <br>
      <input type="submit">
    </form>`);
  res.end();
});


app.post('/login',(req,res)=>{
   let userName = req.body.userName;
   let password =  req.body.password
   let user =  myApp.areUserDetailsValid(userName,password) && myApp.getAccount(userName);
  if(!user) {
    res.setHeader('Set-Cookie',`loginFailed=true; Max-Age = 5`);
    res.redirect('/login');
    return;
  }
  let sessionid = new Date().getTime();
  res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
  myApp.setSessionId(userName,sessionid);
  res.redirect('/index.html');
});

app.get('/userName',(req,res)=>{
  req.user && res.write(req.user.name);
  res.end();
});

app.post('/createTodo',(req,res)=>{
   let userName = req.user.username;
   let todoTitle = req.body.todoTitle;
   myApp.addTodo(userName,todoTitle);
   res.end();
});

app.post('/addTask',(req,res)=>{
   let userName = req.user.username;
   let todoTitle = req.body.todoTitle;
   let taskTitle = req.body.taskTitle;
   let date = req.body.date
   myApp.insertTaskInTodo(userName,date,todoTitle,taskTitle);
   let todo = myApp.getTodo(userName,date,todoTitle);
   res.write(toS(todo));
   res.end();
});

app.post('/setTaskTitle',(req,res)=>{
   let userName = req.user.username;
   let todoTitle = req.body.todoTitle;
   let newTaskTitle = req.body.taskTitle;
   let date = req.body.date;
   let srNo = req.body.srNo;
   myApp.setTaskTitle(userName,date,todoTitle,srNo,newTaskTitle);
   let todo = myApp.getTodo(userName,date,todoTitle);
   res.write(toS(todo));
   res.end();
});

app.post('/setTodoTitle',(req,res)=>{
   let userName = req.user.username;
   let newTodoTitle = req.body.todoTitle;
   let date = req.body.date;
   let todoToken = req.body.todoToken;
   myApp.setTodoTitle(userName,date,todoToken,newTodoTitle);
   let todo = myApp.getTodo(userName,date,newTodoTitle)
   res.write(toS(todo));
   res.end();
});

app.post('/changeStatus',(req,res)=>{
   let userName = req.user.username;
   let todoTitle = req.body.todoTitle;
   let date = req.body.date;
   let srNo = req.body.srNo;
   let status = req.body.status
   myApp.setTaskStatus(userName,date,todoTitle,srNo,status)
   res.end();
});

app.post('/getTodoTitlesOnDate',(req,res)=>{
   let userName = req.user.username;
   let date = req.body.date;
   let titles=myApp.getTodoTitlesOnDate(userName,date);
   res.write(toS(titles));
   res.end();
});
app.post('/getTodo',(req,res)=>{
   let userName = req.user.username;
   let date = req.body.date;
   let todoTitle=req.body.todoTitle;
   let todo = myApp.getTodo(userName,date,todoTitle)
   res.write(toS(todo));
   res.end();
});

app.post('/deleteTodo',(req,res)=>{
  let userName = req.user.username;
  let date = req.body.date;
  let todoTitle=req.body.todoTitle;
  myApp.deleteTodo(userName,date,todoTitle)
  let titles=myApp.getTodoTitlesOnDate(userName,date);
  res.write(toS(titles));
  res.end();
});


app.get('/getToken',(req,res)=>{
   let userName = req.user.username;
   let token = myApp.getToken(userName);
   res.write(toS(token));
   res.end();
});

app.post('/addDescription',(req,res)=>{
  let userName = req.user.username;
  let todoTitle = req.body.todoTitle;
  let todoDescription = req.body.todoDescription;
  let date = req.body.date
  myApp.setTodoDescription(userName,date,todoTitle,todoDescription);
  // let todo = myApp.getTodo(userName,date,todoTitle);
  // console.log(todo);
  res.end();
});


app.get('/logout',(req,res)=>{
  res.setHeader('Set-Cookie',[`sessionid=0,Expires=Thu Jan 01 1970 05:30:00 GMT`]);
  delete req.user.sessionid;
  res.redirect('/login');
});

const PORT = 5000;

let server = http.createServer(app);

server.on('error',e=>console.error('**error**',e.message));

server.listen(PORT,(e)=>console.log(`server listening at ${PORT}`));
