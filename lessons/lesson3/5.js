/**
 * Created by Stepan.Koledov on 29.06.2017.
 */
var cp = require('child_process');
var child = cp.fork(__dirname + '/5-1.js');
child.on('message', function (data) {
    console.log('Main got message: ', data);
});
child.send({hello: 'child'});