var fs = require('fs');
var fileName = "lab1.html";
var fileName1 = "header.html";
var fileName2 = "body.html";
var fileName3 = "footer.html";
var http = require('http');
http.createServer(function (req, res) {
    // console.log('Server running on 8080');
    // var files = [fileName1, fileName2, fileName3];
    // var str="";
    // for(var i=0;i<files.length;i++){
    //     str+=fs.readFileSync(files[i],'utf-8').toString();
    // }
    // res.end(str);
}).listen(8080);

