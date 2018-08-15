const router = require('express').Router()
const userRouter = require('./module/user')
const articleRouter = require('./module/article')

router.use('/user', userRouter)
router.use('/article', articleRouter)
module.exports = router
