import express from 'express'
import { getuserTask,   userRegister, userlogin, usertaskStatus } from '../controllers/userController.js';
import { isAdmin, requireSignIn } from '../middlewares/userMiddleware.js';
const router = express.Router()

router.post('/login', userlogin )
router.post('/register', userRegister )
router.get('/allusertasks', getuserTask )
router.put('/taskstatus/:id', usertaskStatus )






// Analyticcs route
export default router;

