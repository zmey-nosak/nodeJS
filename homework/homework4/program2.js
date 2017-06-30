/**
 * Created by Stepan.Koledov on 30.06.2017.
 */
var sum = 0;
for (var i = 2; i < process.argv.length; i++) {
    sum += parseInt(process.argv[i]);
}
console.log(sum);