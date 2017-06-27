process.stdin.setEncoding('utf8');
process.stdin.resume();
process.stdin.on('data', function(chunk) {
    if (chunk !== "end\n") {
        process.stdout.write('data: ' + chunk);
    } else {
        process.kill(process.pid);
    }});