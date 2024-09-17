const jwt = require('koa-jwt')
const Router = require('koa-router')
const router = new Router({prefix:'/user'})
const { find, findById, create, 
    update, delete:del, login, checkOwner, 
    listFollowing, follow, unfollow,
    listFollowers, checkUserExist} = require('../controllers/user')
const { secret } = require('../config')

const auth = jwt({secret})

router.get('/', find)
router.get('/:id', findById)
router.post('/', create)
router.patch('/:id', auth, checkOwner, update)
router.delete('/:id', auth, checkOwner, del)
router.post('/login',login)
router.get('/:id/following', listFollowing)
router.get('/:id/followers', listFollowers)
router.put('/following/:id', auth, checkUserExist, follow)
router.put('/following/:id', auth, checkUserExist, unfollow)

module.exports = router