process.on('SIGHUP', function(){
    console.log('Got   SIGHUP');
});
setInterval(function(){ console.log('Running');}, 10000);
console.log('PID: ', process.pid);
