module.exports = app => {
    const courseController = require("../controllers/course.controller");
    const courseRouter = require("express").Router();

    // Route to retrieve all todos
    // courseRouter.get("/playlist", courseController.findAll);
    // // courseRouter.get("/playlistbuy", courseController.findAllplaylistbuy);
    // // courseRouter.get("/playlist_role", courseController.findAllplaylistbuy);
    // // courseRouter.get("playlist/create", comment_playlist.create);
    // courseRouter.get("/watch-video", courseController.findvideo);
    // courseRouter.get("/courses", courseController.findallcourse);
    // courseRouter.get("/question", courseController.allquesstion);

    courseRouter.get("/course-list", courseController.findAllCourse);
    courseRouter.get("/course-video-list", courseController.findCouseVideoList);
    courseRouter.get("/course-quiz-list", courseController.findCouseQuizList);
    courseRouter.get("/course-question-list", courseController.findQuizQuestionList);

    courseRouter.get("/video-detail", courseController.findVideoDetail);

    courseRouter.get("/index", courseController.findAllTeacherUnDetail);

    courseRouter.get("/ads", courseController.findAllprice);
    courseRouter.get("/adss", courseController.findAllpricee);

    courseRouter.get("/ordersuccess", courseController.addadstoteacher);


    // courseRouter.get("/indexusers", courseController.findallcourseindex);
    // courseRouter.get("/profile", courseController.findallcoursebyemail);
    // courseRouter.get("/ordersuccess", courseController.addcouresetouser);

    // courseRouter.get("/chat_roomm", courseController.findallroombyemail);
    // Attach adminRouter to '/admin' path
    // app.use("/courses", courseRouter);

     // Retrieve a single todo with id
    //  teacherRouter.get("/:name", teacherController.findteacherwithname);
    //  // Update a todo with id
    //  router.put("/:id", todo.update);

    app.use("/", courseRouter);

    // Error handling routes
    app.get('/500', (req, res) => {
        res.render('err');
    });

    app.get('/404', (req, res) => {
        res.render('404');
    });
};
