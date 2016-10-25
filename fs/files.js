var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');

//文件类型

var mineTypes = {
   "html" : "text/html",
   "jpeg" : "image/jpeg",
   "jpg"  : "image/jpg",
   "png"  : "image/png",
   "js"   : "text/javascript",
   "css"  : "text/css"
}

http.createServer(function(req, res){
  //url.parse() -- 输入url字符串返回一个对象
  var uri = url.parse(req.url).pathname;
  var filename = path.join(process.cwd(), decodeURI(uri));
  console.log(filename);
  console.log("loading" + uri);

   var stats;
   try{
     stats = fs.lstatSync(filename);
     console.log(stats);
   }catch(e){
     res.writeHead(404, {'Content-type':'text/plain'});
     res.write("404 not found");
     res.end();
     return;
   }

// path.extname('index.html')
// // returns
// '.html'
// path.extname('index.')
// // returns
// '.'
// path.extname('index')
// // returns
// ''

   if(stats.isFile()){
     var mineType = mineTypes[path.extname(filename).split('.').reverse()[0]];

     var filestream = fs.createReadStream(filename);
     filestream.pipe(res);
   }else if(stats.isDirectory()){
     res.writeHead(302, {
       "Location" : "index.html"
     });
     res.end();
   }else{
     res.writeHead(500, {'Content-type' : 'text/plain'});
     res.write('500 Internal Error');
     res.end();
   }

}).listen(3000, function(){
  console.log("runnig on port 3000...");
});
