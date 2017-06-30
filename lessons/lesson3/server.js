var mod1 = require('./mod1.js');
mod1.setGlobal(100);
var val = mod1.returnGlobal();
console.log(val);