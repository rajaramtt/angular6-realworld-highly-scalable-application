let express = require('express');
let router = express.Router();

router.post('/', function(req, res, next) {

res.json({ 
    status:"success", 
    message: "The password reset request has been successfully submitted. Please check your email for instructions"
});

});

module.exports = router;
