module.exports = app => {
    const userController = require("../controllers/user.controller");
    const userRouter = require("express").Router();

    // Route to retrieve all todos
    userRouter.get("/student-list", userController.findAllStudent);

    // userRouter.get("/teacher-list-un", userController.findAllTeacherUn);
    userRouter.get("/teacher-un-detail", userController.findAllTeacherUnDetail);
    // // courseRouter.get("/playlistbuy", courseController.findAllplaylistbuy);
    // courseRouter.get("/playlist_role", courseController.findAllplaylistbuy);
    // // courseRouter.get("playlist/create", comment_playlist.create);
    // courseRouter.get("/watch-video", courseController.findvideo);
    // courseRouter.get("/courses", courseController.findallcourse);
    // courseRouter.get("/indexusers", courseController.findallcourseindex);
    // courseRouter.get("/profile", courseController.findallcoursebyemail);
    // courseRouter.get("/ordersuccess", courseController.addcouresetouser);

    // Attach adminRouter to '/admin' path
    // app.use("/courses", courseRouter);

     // Retrieve a single todo with id
    //  teacherRouter.get("/:name", teacherController.findteacherwithname);
    //  // Update a todo with id
    //  router.put("/:id", todo.update);

    app.use("/", userRouter);
    // Error handling routes
    app.get('/500', (req, res) => {
        res.render('err');
    });

    app.get('/404', (req, res) => {
        res.render('404');
    });
};
