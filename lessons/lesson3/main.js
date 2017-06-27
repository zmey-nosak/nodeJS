/**
 * Created by Stepan.Koledov on 27.06.2017.
 */
var cp = require('child_process');
var childl = cp.fork(__dirname + '/child1.js');
var child2 = cp.fork(__dirname + '/child2.js');
while(cp){
    console.log("running main");
};