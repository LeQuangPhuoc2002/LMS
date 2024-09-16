const sql = require("./db");

const course = function (course) {
  this.course_name = course.course_name;
  this.teacher_id = course.teacher_id;
  this.image = course.image;
  this.price = course.avatar;
  this.description = course.description;
};

course.findQuizQuestionList = (quiz_id, result) => {
  let query = `
  SELECT *
  FROM questions
  WHERE quiz_id = ?
  `;
  sql.query(query, [quiz_id], (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

course.getAllQuizzes = (course_id, result) => {
  let query = `
    SELECT q.*, COUNT(qq.question_id) AS count_question
    FROM quiz q
    LEFT JOIN questions qq ON q.quiz_id = qq.quiz_id
    WHERE q.course_id = ?
    GROUP BY q.quiz_id
  `;
  sql.query(query, [course_id], (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

course.findvideoInfo = (video_id, result) => {
  let query = `
    SELECT *
    FROM course_video
    WHERE video_id = ?
  `;
  sql.query(query, [video_id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

course.findCourseInfo = (course_id, result) => {
  let query = `
    SELECT *
    FROM course
    WHERE course_id = ?
  `;
  sql.query(query, [course_id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

course.findQuizQuestion = (quiz_id, result) => {
  let query = `
    SELECT *
    FROM quiz
    WHERE quiz_id = ?
  `;
  sql.query(query, [quiz_id], (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

course.findCourseQuizList = (course_id, result) => {
  let query = `
    SELECT *
    FROM course
    WHERE course_id = ?
  `;
  sql.query(query, [course_id], (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

course.findCouseVideoList = (course_id, result) => {
  let query = `
    SELECT c.*, cv.*
    FROM course c
    JOIN course_video cv ON c.course_id = cv.course_id
    WHERE c.course_id = ?
  `;
  sql.query(query, [course_id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

course.findAllTeacherUnDetaill = (email, result) => {
  let query = "SELECT * FROM teacher WHERE email = ?";
  sql.query(query, [email], (err, res) => {
    if (err) {
      console.log("Error while fetching teacher details:", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

course.addadstoteacherr = (pricing_id, email, result) => {
  let query = `
    INSERT INTO pricing_teacher (pricing_id, teacher_id)
    VALUES (?, (SELECT teacher_id FROM teacher WHERE email = ?));
    `;

  sql.query(query, [pricing_id, email], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Inserted pricing_teacher: ", res);
    result(null, res);
  });
};

course.updateads = (pct_id, start_date, end_date, file, course_id, result) => {
  const startDateParts = start_date.split("/");
  const startDay = startDateParts[0];
  const startMonth = startDateParts[1];
  const startYear = startDateParts[2];

  const formattedStartDate = `${startYear}-${startMonth.padStart(
    2,
    "0"
  )}-${startDay.padStart(2, "0")}`;

  const endDateParts = end_date.split("/");
  const endDay = endDateParts[0];
  const endMonth = endDateParts[1];
  const endYear = endDateParts[2];

  const formattedEndDate = `${endYear}-${endMonth.padStart(
    2,
    "0"
  )}-${endDay.padStart(2, "0")}`;

  let query = `
    UPDATE pricing_teacher
    SET start_date = ?, end_date = ?, banner_url = ?, course_id = ?
    WHERE pricing_teacher_id = ?`;

  sql.query(
    query,
    [formattedStartDate, formattedEndDate, file, course_id, pct_id],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Updated ads: ", {
        pct_id,
        start_date,
        end_date,
        file,
        course_id,
      });
      result(null, res);
    }
  );
};

course.getAllcourseteacher = (email, result) => {
  let query = `
    SELECT c.*
    FROM course c
    WHERE c.teacher_id = (SELECT teacher_id FROM teacher WHERE email = ?)`;

  sql.query(query, email, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
  });
};

course.getAllads = (email, result) => {
  let query = `
    SELECT pt.*, p.*
    FROM pricing_teacher pt
    INNER JOIN pricing p ON pt.pricing_id = p.pricing_id
    WHERE pt.teacher_id = (SELECT teacher_id FROM teacher WHERE email = ?)`;

  sql.query(query, email, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
  });
};

course.getAllprice = (result) => {
  let query = `
    SELECT *
    FROM pricing;`;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
  });
};

course.getAllcourse = (email, result) => {
  let query = `
    SELECT 
      course.*, 
      COUNT(DISTINCT course_video.video_id) AS count_video, 
      COUNT(DISTINCT quiz.quiz_id) AS count_quiz,
      COUNT(DISTINCT student_course.student_id) AS student_count
    FROM course
    LEFT JOIN course_video ON course.course_id = course_video.course_id
    LEFT JOIN quiz ON course.course_id = quiz.course_id
    LEFT JOIN student_course ON course.course_id = student_course.course_id
    WHERE course.teacher_id = (SELECT teacher_id FROM teacher WHERE email = ?)
    GROUP BY course.course_id;    
  `;

  sql.query(query, email, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("todo: ", res);
    result(null, res);
  });
};

course.getalloption = (quiz_id, course_id, result) => {
  let query = `
    SELECT *
    FROM options
    WHERE question_id IN (SELECT question_id FROM questions WHERE quiz_id = ?);
    `;

  sql.query(query, quiz_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("todo: ", res);
    result(null, res);
  });
};

course.getallquestion = (quiz_id, course_id, result) => {
  let query = `
    SELECT *
    FROM questions
    WHERE quiz_id = ?;
    `;

  sql.query(query, quiz_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("todo: ", res);
    result(null, res);
  });
};

course.playlist_buy = (courseId, user_email, result) => {
  let getStudentIdQuery = `
    SELECT student_id
    FROM student
    WHERE email = '${user_email}'`;

  sql.query(getStudentIdQuery, (err, studentRes) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (studentRes.length === 0) {
      result("Student not found with email: " + user_email, null);
      return;
    }

    const studentId = studentRes[0].student_id;

    let query = `
        SELECT EXISTS (
            SELECT 1
            FROM student_course
            WHERE course_id = ${courseId} AND student_id = ${studentId}
        ) AS exists_student_course`;

    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("result: ", res);
      const exists = res[0].exists_student_course === 1;
      result(null, exists);
    });
  });
};

let StudentIdd;

course.addcouresetouserr = (course_name, user_name, result) => {
  sql.query(
    "SELECT student_id FROM student WHERE name = ?",
    [user_name],
    (err, studentRes) => {
      if (err) {
        result(err, null);
        return;
      }

      if (studentRes.length === 0) {
        result({ message: "Student not found" }, null);
        return;
      }

      if (studentRes.length > 0 && studentRes[0].student_id !== undefined) {
        StudentIdd = studentRes[0].student_id;
      }

      sql.query(
        "SELECT course_id FROM course WHERE course_name = ?",
        [course_name],
        (err, courseRes) => {
          if (err) {
            result(err, null);
            return;
          }

          if (courseRes.length === 0) {
            result({ message: "Course not found" }, null);
            return;
          }

          const course_id = courseRes[0].course_id;

          sql.query(
            "INSERT INTO student_course (student_id, course_id, purchase_date) VALUES (?, ?, curdate())",
            [StudentIdd, course_id],
            (err, insertRes) => {
              if (err) {
                result(err, null);
                return;
              }

              result(null, { message: "Course added to user successfully" });
            }
          );
        }
      );
    }
  );
};

course.getallcourseemail = (email, result) => {
  sql.query(
    `
        SELECT c.*, COUNT(cv.video_id) AS count_course_video
        FROM student_course sc
        JOIN course c ON sc.course_id = c.course_id
        LEFT JOIN course_video cv ON c.course_id = cv.course_id
        WHERE sc.student_id = (SELECT student_id FROM student WHERE email = ?)
        GROUP BY c.course_id
    `,
    [email],
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

course.searchcourse = (course_name, result) => {
  let query = `
    SELECT c.*, COUNT(cv.video_id) AS video_count, t.*
    FROM course c
    LEFT JOIN course_video cv ON c.course_id = cv.course_id
    LEFT JOIN teacher t ON c.teacher_id = t.teacher_id
    WHERE c.course_name LIKE '%${course_name}%'`; 

  query += ` GROUP BY c.course_id`;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("todo: ", res);
    result(null, res);
  });
};

course.getallcourse = (result) => {
  let query = `
    SELECT c.*, COUNT(cv.video_id) AS video_count, t.*
    FROM course c
    LEFT JOIN course_video cv ON c.course_id = cv.course_id
    LEFT JOIN teacher t ON c.teacher_id = t.teacher_id`;

  query += ` GROUP BY c.course_id`;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("todo: ", res);
    result(null, res);
  });
};

course.getvideobyvideoid = (courseId, result) => {
  let query = `
    SELECT c.*, cv.*, t.*
    FROM course c
    LEFT JOIN course_video cv ON c.course_id = cv.course_id
    LEFT JOIN teacher t ON c.teacher_id = t.teacher_id`;

  if (courseId) {
    query += ` WHERE cv.video_id = ${courseId}`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("result: ", res);
    result(null, res);
  });
};

course.getallcomment = (courseId, result) => {
  let query = `
    SELECT course_comment.*, student.*, 
    (SELECT COUNT(*) FROM course_comment WHERE course_id = ${courseId}) AS count_comment_course
    FROM course_comment
    INNER JOIN student ON course_comment.student_id = student.student_id`;

  if (courseId) {
    query += ` WHERE course_comment.course_id = ${courseId}`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("result: ", res);
    result(null, res);
  });
};

course.addnotevideo = (email, video_id, note, result) => {
  let query = `
    INSERT INTO note (student_id, video_id, note_text)
    VALUES ((SELECT student_id FROM student WHERE email = ?), ?, ?);    
    `;

  sql.query(query, [email, video_id, note], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("result: ", res);
    result(null, res);
  });
};

course.alreadywatchvideo = (email, video_id, result) => {
  let query = `
    INSERT IGNORE INTO watchedvideos (student_id, video_id)
    VALUES ((SELECT student_id FROM student WHERE email = ?), ?);    
    `;

  sql.query(query, [email, video_id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("result: ", res);
    result(null, res);
  });
};

course.getnotevideo = (email, video_id, result) => {
  let query = `
    SELECT *
    FROM note
    WHERE student_id = (SELECT student_id FROM student WHERE email = ?)
    AND video_id = ?`;

  sql.query(query, [email, video_id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("result: ", res);
    result(null, res);
  });
};

course.getvideoalreadywatch = (email, result) => {
  let query = `
    SELECT *
    FROM watchedvideos
    WHERE student_id = (SELECT student_id FROM student WHERE email = ?)`;

  sql.query(query, [email], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("result: ", res);
    result(null, res);
  });
};

course.getvideobycourseid = (courseId, result) => {
  let query = `
    SELECT *
    FROM course_video`;

  if (courseId) {
    query += ` WHERE course_id = ${courseId}`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("result: ", res);
    result(null, res);
  });
};

course.getquizbycourseid = (courseId, result) => {
  let query = `
    SELECT *
    FROM quiz`;

  if (courseId) {
    query += ` WHERE course_id = ${courseId}`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("result: ", res);
    result(null, res);
  });
};

course.getcourserbyidd = (i, result) => {
  let query = `
    SELECT c.*, COUNT(cv.video_id) AS video_count, t.*
    FROM course c
    LEFT JOIN course_video cv ON c.course_id = cv.course_id
    LEFT JOIN teacher t ON c.teacher_id = t.teacher_id`;

  if (id) {
    query += ` WHERE c.course_id = ${id}`;
  }

  query += ` GROUP BY c.course_id`;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("todo: ", res);
    result(null, res);
  });
};

let studentId;

course.getcourserbyid = (id, email, result) => {
  let studentQuery = `SELECT student_id FROM student WHERE email = '${email}'`;

  sql.query(studentQuery, (err, studentRes) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    if (studentRes.length > 0 && studentRes[0].student_id !== undefined) {
      studentId = studentRes[0].student_id;
    }

    let courseQuery = `SELECT course_id FROM student_course WHERE student_id = '${studentId}'`;

    sql.query(courseQuery, (err, courseRes) => {
      if (err) {
        console.log("Error: ", err);
        result(null, err);
        return;
      }

      const courseIds = courseRes.map((course) => course.course_id);

      let query = `
                SELECT c.*, COUNT(cv.video_id) AS video_count, t.*, 
                CASE WHEN c.course_id IN (${courseIds.join(
                  ","
                )}) THEN 1 ELSE 0 END AS status_student
                FROM course c
                LEFT JOIN course_video cv ON c.course_id = cv.course_id
                LEFT JOIN teacher t ON c.teacher_id = t.teacher_id`;

      if (id) {
        query += ` WHERE c.course_id = ${id}`;
      }

      query += ` GROUP BY c.course_id`;

      sql.query(query, (err, res) => {
        if (err) {
          console.log("Error: ", err);
          result(null, err);
          return;
        }

        console.log("Result: ", res);
        result(null, res);
      });
    });
  });
};

module.exports = course;
