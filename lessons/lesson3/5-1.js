/**
 * Created by Stepan.Koledov on 29.06.2017.
 */
process.on('message', function (m) {
    console.log('Child got message: ', m);
});
process.send({foo: 'bar'});
