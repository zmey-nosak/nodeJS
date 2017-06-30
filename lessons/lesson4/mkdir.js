/**
 * Created by Stepan.Koledov on 30.06.2017.
 */
var mkdirp = require('mkdirp');
mkdirp('foo', function (err) {
    if (err) console.error(err)
    else console.log('Directory created!')
});
