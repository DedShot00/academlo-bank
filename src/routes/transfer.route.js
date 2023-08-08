const express = require('express')

//* controllers
const transferController = require('../controllers/transfer.controller')

//* middlewares
const transferMiddleware = require('../middlewares/transfer.middleware')
const authMiddlware = require('../middlewares/auth.middleware');

const router = express.Router()

router.use(authMiddlware.protect)

//* routes
router.post('/', transferMiddleware.validReceiver, transferMiddleware.validSender, transferController.transfer)

module.exports = router