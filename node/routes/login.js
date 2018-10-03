let express = require('express');
let router = express.Router();

router.post('/', function(req, res, next) {
res.json({ 
    status:"success", 
    email: "raja@test.com", 
    name: "raja",
    id: 1, 
    token: "123456789",
    role: 'client'
});
// res.send(403);
});

module.exports = router;
