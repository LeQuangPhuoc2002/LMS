module.exports = app => {
    const userController = require("../controllers/user.controller");
    const userRouter = require("express").Router();

    userRouter.get("/student-list", userController.findAllStudent);
    userRouter.get("/teacher-un-detail", userController.findAllTeacherUnDetail);
    app.use("/", userRouter);
    app.get('/500', (req, res) => {
        res.render('err');
    });

    app.get('/404', (req, res) => {
        res.render('404');
    });
};
