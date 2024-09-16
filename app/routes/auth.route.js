const login = require('../controllers/auth/login.controller');
const register = require('../controllers/auth/register.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const forgotPassword = require('../controllers/auth/forgotPassword.controller');
const multer = require('multer');
const path = require('path');

module.exports = app => {
    var router = require('express').Router();


    // const avatarStorage = multer.diskStorage({
    //     destination: function (req, file, cb) {
    //         cb(null, 'C:/Users/admin/OneDrive/New folder/Máy tính/hi/final/final/final/nodejs_teacher/Build-NodeJS-with-Mysql/app/public/avatar_teacher/');
    //     },
    //     filename: function (req, file, cb) {
    //         // Đặt tên file lưu trữ
    //         cb(null, file.originalname); // Có thể cần xử lý tên file nếu cần thiết
    //     }
    // });
    
    // // Cấu hình lưu trữ cho file image_card
    // const imageCardStorage = multer.diskStorage({
    //     destination: function (req, file, cb) {
    //         cb(null, 'C:/Users/admin/OneDrive/New folder/Máy tính/hi/final/final/final/nodejs_teacher/Build-NodeJS-with-Mysql/app/public/card_image/');
    //     },
    //     filename: function (req, file, cb) {
    //         // Đặt tên file lưu trữ
    //         cb(null, file.originalname); // Có thể cần xử lý tên file nếu cần thiết
    //     }
    // });
    
    // // Khởi tạo multer với các cấu hình lưu trữ tương ứng
    // const uploadAvatar = multer({ storage: avatarStorage });
    // const uploadImageCard = multer({ storage: imageCardStorage });
    
    // // Sử dụng uploadAvatar để xử lý yêu cầu tải lên file avatar
    // router.post('/registerteacher', uploadAvatar.single('avatar'), (req, res, next) => {
    //     // File avatar đã được lưu vào ổ cứng của máy chủ và đường dẫn đã được cung cấp trong req.file.path
    //     console.log('File avatar đã được lưu tại:', req.file.path);
    //     // Tiếp tục xử lý hoặc chuyển tiếp đến middleware tiếp theo nếu cần
    // });
    
    // // Sử dụng uploadImageCard để xử lý yêu cầu tải lên file image_card
    // router.post('/registerteacher', uploadImageCard.single('image_card'), (req, res, next) => {
    //     // File image_card đã được lưu vào ổ cứng của máy chủ và đường dẫn đã được cung cấp trong req.file.path
    //     console.log('File image_card đã được lưu tại:', req.file.path);
    //     // Tiếp tục xử lý hoặc chuyển tiếp đến middleware tiếp theo nếu cần
    // });

    router.get('/loginteacher', authMiddleware.isAuth, login.showLoginForm)
    router.post('/loginteacher', login.login)

    router.get('/registerteacher', register.create)
    // router.post('/registerteacher', register.post)


    router.get('/bankinformation', register.bank)

    // .get('/teacher_form', register.register)

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