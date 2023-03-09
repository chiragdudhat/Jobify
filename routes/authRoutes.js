import express from 'express'
const router = express.Router()

import rateLimiter from 'express-rate-limit'

const apiLimiter = rateLimiter({
    windowMs: 114 * 60 * 1000,
    max: 10,
    message: 'Too many request from this IP address, please  try again after 15 minutes'
})

import {register, login, updateUser} from '../controller/authController.js'
import authenticateUser from '../middlewares/auth.js'
import testUser from '../middlewares/testUser.js'

router.route('/register').post(apiLimiter, register)
router.route('/login').post(apiLimiter,login)
router.route('/updateUser').patch(authenticateUser,testUser, updateUser)

export default router ;