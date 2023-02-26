const express = require('express');
const router = express.Router();
const controller = require('./../Controller/logincontroller');

router.post('/login',controller.login)


// export router
module.exports = router;