const { Router } = require('express');

const router = Router();

const BaseController = require('../controllers/base.controller')

router.get('/', BaseController.getIndex);

router.get('/register', BaseController.getRegister);
router.post('/register', BaseController.Register);

router.get('/login', BaseController.getLogin);
router.post('/login', BaseController.Login);

router.get('/activate/:token', BaseController.activate);

router.get('/forgot-password', BaseController.getForgot);
router.post('/forgot-password', BaseController.Forgot);

router.get('/restore/:token', BaseController.getRestore);
router.post('/restore/:token', BaseController.Restore);



module.exports = router;