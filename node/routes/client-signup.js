let express = require('express');
let router = express.Router();

router.post('/', function (req, res, next) {
    res.json({
        status: "success",
        message: `An email has been sent to ${req.body.userInfo.email }. It contains an activation link you must click to activate your account.`
    });
});

module.exports = router;
