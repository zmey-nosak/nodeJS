/**
 * Created by Echetik on 17.06.2017.
 */
const EventEmitter = require('events').EventEmitter;

const eventEmitter = new EventEmitter();

eventEmitter.on('randomString', function (randomStr) {
    console.log('Received the string: ' + randomStr);
});

eventEmitter.emit('randomString', randomString());

function randomString() {
    const stringsArr = ['A', 'B', 'C', 'D'];
    return stringsArr[Math.floor(Math.random() * stringsArr.length)];
}