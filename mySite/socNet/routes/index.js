var express = require('express');
var router = express.Router();
var fs = require('fs');
var url = require('url');
var path = require('path');
var formidable = require('formidable');
router.get('/', function(req, res, next) {
    loggedInCheck(req,res,next);
});

router.get('/login', function (req, res, next) {
    res.render('login',{})
});

function loggedInCheck(req, res, next) {
    if (req.session.auth) {
        res.render('');
    } else {
        console.log("Please Log in to access to this webpage");
        res.redirect("http://localhost:8080/login");
    }
}

router.post('/upload', function(req, res){

    // create an incoming form object
    var form = new formidable.IncomingForm();

    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = true;

    // store all uploads in the /uploads directory
    form.uploadDir = 'D:\\frontend\\nodeJS\\mySite\\socNet\\uploads\\'+req.session.user_id+'\\images';
    if (!fs.existsSync(form.uploadDir)){
        createDir(form.uploadDir);
    }
    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    form.on('file', function(field, file) {
        fs.rename(file.path, path.join(form.uploadDir, file.name));
    });

    // log any errors that occur
    form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', function() {
        res.end('success');
    });

    // parse the incoming request containing the form data
    form.parse(req);

});
const createDir = (dir) => {
    // This will create a dir given a path such as './folder/subfolder'
    const splitPath = dir.split('\\');
    splitPath.reduce((path, subPath) => {
        let currentPath;
        if(subPath != '.'){
            currentPath = path + '\\' + subPath;
            if (!fs.existsSync(currentPath)){
                fs.mkdirSync(currentPath);
            }
        }
        else{
            currentPath = subPath;
        }
        return currentPath
    }, '')
};
module.exports = router;