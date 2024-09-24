const login = require('../controllers/auth/login.controller');
const register = require('../controllers/auth/register.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const forgotPassword = require('../controllers/auth/forgotPassword.controller');
const multer = require('multer');
const path = require('path');

module.exports = app => {
    var router = require('express').Router();
    
    router.get('/loginteacher', authMiddleware.isAuth, login.showLoginForm)
    router.post('/loginteacher', login.login)
    router.get('/registerteacher', register.create)
    router.get('/bankinformation', register.bank)
    router.get('/emailcodee', register.codee)
    router.get('/emailcode', register.sendcode)
    router.get('/logout', authMiddleware.loggedin, login.logout)
    router.get('/verify', register.verify)
    router.get('/password/reset', forgotPassword.showForgotForm)
    router.post('/password/email', forgotPassword.sendResetLinkEmail)
    router.get('/password/reset/:email', forgotPassword.showResetForm)
    router.post('/password/reset', forgotPassword.reset)
    
    app.use(router);
}
