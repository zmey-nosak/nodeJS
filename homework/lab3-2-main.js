/**
 * Created by Stepan.Koledov on 29.06.2017.
 */
var cp = require('child_process');
var child = cp.fork(__dirname + '/lab3-2-child.js');
child.on('message', function (data) {
    console.log('Main got message: ', data);
});
