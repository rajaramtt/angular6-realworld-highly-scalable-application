let express = require('express');
let router = express.Router();

router.post('/', function (req, res, next) {

    res.json({
        status: "success",
        message: "Your password has been changed successfully, Please login to continue application"
    });
});

module.exports = router;
