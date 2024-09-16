const Todo = require("../models/user.model");

exports.create = (req, res) => {
    res.locals.status = req.query.status;
    res.render('todo/create');
}

exports.store = (req, res) => {
    if (!req.body) {
        res.redirect('/todo/create?status=error')
    }
    
    const todo = new Todo({
        title: req.body.title,
        description: req.body.description,
        published: !req.body.published ? false : true
    });
    Todo.create(todo, (err, data) => {
        if (err)
            res.redirect('/todo/create?status=error')
        else res.redirect('/todo/create?status=success')
    });
};
exports.findAllStudent = (req, res) => {
    res.locals.deleted = req.query.deleted;
    const name = req.query.name;
    Todo.getAllStudent(name, (err, data) => {
        if (err)
            res.redirect('/500')
        else res.render('student-list', {todo: data});
    });
};

exports.findAllTeacherUnDetail = (req, res) => {
    const teacher_id = req.query.teacher_id;

    Todo.findAllTeacherUnDetaill(teacher_id, (err, data) => {
        if (err)
            res.redirect('/500')
        else res.render('teacher-un-detail', {teacher_un: data});
    });
};


exports.findAllTeacherUn = (req, res) => {
    const teacher_id = req.query.teacher_id;
    const status = req.query.status;

    console.log(teacher_id);
    console.log(status);

    Todo.findAllTeacherUn(teacher_id, status, (err, data) => {
        if (err)
            res.redirect('/500')
        else res.render('teacher-list-un', {todo: data});
    });
};

exports.findAllCourse = (req, res) => {
    res.locals.deleted = req.query.deleted;
    const email = req.query.email;
    Todo.getAllcourse(email, (err, data) => {
        if (err)
            res.redirect('/500')
        else res.render('course-list', {todo: data});
    });
};

exports.edit = (req, res) => {
    res.locals.status = req.query.status;

    Todo.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.redirect('/404');
            } else {
                res.redirect('/500');
            }
        } else res.render('todo/edit', { todo: data });
    });
};

exports.update = (req, res) => {
    if (!req.body) {
        res.redirect('/todo/edit/' + req.params.id + '?status=error')
    }
    if (req.body.published == 'on') {
        req.body.published = true;
    } else {
        req.body.published = false;
    }
    Todo.updateById(
        req.params.id,
        new Todo(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.redirect('/404');
                } else {
                    res.redirect('/500');
                }
            } else res.redirect('/todo/edit/' + req.params.id + '?status=success');
        }
    );
};

exports.delete = (req, res) => {
    Todo.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.redirect('/404');
            } else {
                res.redirect('/500');
            }
        } else res.redirect('/todo?deleted=true')
    });
};

exports.deleteAll = (req, res) => {
    Todo.removeAll((err, data) => {
        if (err)
            res.redirect('/500');
        else res.redirect('/todo?deleted=true')
    });
};

exports.findAllPublished = (req, res) => {
    Todo.getAllPublished((err, data) => {
        if (err)
            res.redirect('/500')
        else res.render('todo/index', { todo: data})
    });
};
