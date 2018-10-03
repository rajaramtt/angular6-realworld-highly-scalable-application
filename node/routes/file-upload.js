let express = require('express');
let router = express.Router();
let path = require('path');
const DIR = './public/upload';
const multer = require('multer');
let uniqid = require('uniqid');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        cb(null, path.parse(file.originalname).name + '-' + uniqid() + path.extname(file.originalname));
    }
});
let upload = multer({ storage: storage });

router.post('/', upload.single('attachment'), function (req, res) {
    if (!req.file) {
        res.json({
            status: "failed",
            name: req.file.filename
        });
    } else {
        res.json({ 
            status: "success", 
            name: req.file.filename 
        });

    }
});

module.exports = router;
