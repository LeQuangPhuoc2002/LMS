module.exports = app => {
    const todo = require("../controllers/todo.controller");
    var router = require("express").Router();

    router.get("/", todo.findAll);
    router.get("/create", todo.create);
    router.post("/", todo.store);
    router.get("/edit/:id", todo.edit);
    router.put("/:id", todo.update);
    router.get("/delete/:id", todo.delete);
    router.delete("/delete", todo.deleteAll);
    router.get("/published", todo.findAllPublished);
    app.use('/todo', router);
    app.get('/500', (req, res) => {
        res.render('err')
    });
    app.get('/404', (req, res) => {
        res.render('404')
    });
}
