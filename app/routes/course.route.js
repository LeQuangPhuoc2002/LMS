module.exports = app => {
    const courseController = require("../controllers/course.controller");
    const courseRouter = require("express").Router();

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
    // app.use("/courses", courseRouter);

    //  teacherRouter.get("/:name", teacherController.findteacherwithname);
    //  router.put("/:id", todo.update);

    app.use("/", courseRouter);

    app.get('/500', (req, res) => {
        res.render('err');
    });

    app.get('/404', (req, res) => {
        res.render('404');
    });
};
