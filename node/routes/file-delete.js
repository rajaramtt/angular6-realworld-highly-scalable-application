
let express = require('express');
let router = express.Router();
const DIR = './public/upload';
const fs = require('fs');

router.post('/', function (req, res, next) {
    fs.unlink(`${DIR}/${req.body.filename}`, (err) => {
        if (err) {
            res.json({
                status: "error",
                message: err.message
            });
        } else {
            res.json({
                status: "success",
                message: "Attachment has been deleted successfully"
            });
        }
    });
});

module.exports = router;

