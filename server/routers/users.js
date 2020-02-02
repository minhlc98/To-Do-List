const express = require('express')
const router = express.Router()
const userController = require('../controllers/users')

router.post('/signup', userController.signUp)
router.post('/signin', userController.signIn)
router.post('/activate', userController.confirmEmail)
router.get('/random', userController.randomUsers)
module.exports = router