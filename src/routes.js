const express = require('express');
const routerZTEController = require('./controller/routerZTE-controller');
const router = express.Router();
const path = require('path')

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/'));
})

router.get('/ZTE/changeChannel', routerZTEController.changeChannel)


module.exports = router;