const router = require('express').Router();
const fs = require('fs');
const multer = require('multer');

const saveImage = multer({
    dest: __dirname + '../i/',
    limits: {fileSize: 10000000, files:1},
});


//returns up to 10 samoyed images TODO: query the mongo database, NOT the directory.
router.get('/', (req, res) =>{

});

//publishes samoyed image, posts link to Redis, and associates upload with user
router.post('/', (req, res) =>{
    //TODO: API key validation, save link to DB
    saveImage(req, res, (err)=> {
        if (err) {
            console.log(`error uploading ${err}`);
        }
    })
});

//Deletes published image by link  if uploaded by requester
router.delete('/', (req, res) =>{
    //TODO: user validation. Check passed in API key matches photo associated api key
    fs.unlink(`i/${req.body.photoID}`, (err)=>{
        if (err) throw err;
        console.log('successfully deleted image');
    });
});

exports.router = router;