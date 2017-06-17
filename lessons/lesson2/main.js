/**
 * Created by Echetik on 17.06.2017.
 */
var fs=require("fs");
var data=fs.readFileSync('index.html');
console.log(data.toString());
console.log("Program Ended");