/**
 * Created by Echetik on 17.06.2017.
 */
var fs=require("fs");
fs.readFile('index.html', function (err,data) {
    if(err) return console.error(err);
    console.log(data.toString());
});
console.log("Program Ended");