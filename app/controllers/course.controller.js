const { user } = require("../config/db.config");
const Todo = require("../models/course.model");

exports.findVideoDetail = (req, res) => {
  const video_id = req.query.video_id;

  Todo.findvideoInfo(video_id, (err, data) => {
    if (err) res.redirect("/500");
    else res.render("video-detail", { todo: data });
  });
};

exports.findQuizQuestionList = (req, res) => {
  const quiz_id = req.query.quiz_id;

  // Sử dụng Promise.all để gửi yêu cầu lấy tất cả câu hỏi và tùy chọn cùng một lúc
  Promise.all([
    new Promise((resolve, reject) => {
      Todo.findQuizQuestion(quiz_id, (errQuestion, questionData) => {
        if (errQuestion) {
          reject(errQuestion);
        } else {
          resolve(questionData);
        }
      });
    }),
    new Promise((resolve, reject) => {
      Todo.findQuizQuestionList(quiz_id, (errOption, optionData) => {
        if (errOption) {
          reject(errOption);
        } else {
          resolve(optionData);
        }
      });
    }),
  ])
    .then(([questionData, optionData]) => {
      // Gửi dữ liệu đến trang quiz khi cả hai yêu cầu đều thành công
      res.render("course-question-list", { todo: questionData, tododes: optionData });
    })
    .catch((err) => {
      // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
      console.error(err);
      res.redirect("/500");
    });
};

exports.findCouseQuizList = (req, res) => {
  const course_id = req.query.course_id;

  // Sử dụng Promise.all để gửi yêu cầu lấy tất cả câu hỏi và tùy chọn cùng một lúc
  Promise.all([
    new Promise((resolve, reject) => {
      Todo.findCourseQuizList(course_id, (errQuestion, questionData) => {
        if (errQuestion) {
          reject(errQuestion);
        } else {
          resolve(questionData);
        }
      });
    }),
    new Promise((resolve, reject) => {
      Todo.getAllQuizzes(course_id, (errOption, optionData) => {
        if (errOption) {
          reject(errOption);
        } else {
          resolve(optionData);
        }
      });
    }),
  ])
    .then(([questionData, optionData]) => {
      // Gửi dữ liệu đến trang quiz khi cả hai yêu cầu đều thành công
      res.render("course-quiz-list", { todo: questionData, tododes: optionData });
    })
    .catch((err) => {
      // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
      console.error(err);
      res.redirect("/500");
    });
};



exports.findCouseVideoList = (req, res) => {
  const course_id = req.query.course_id;

  // Sử dụng Promise.all để gửi yêu cầu lấy tất cả câu hỏi và tùy chọn cùng một lúc
  Promise.all([
    new Promise((resolve, reject) => {
      Todo.findCouseVideoList(course_id, (errQuestion, questionData) => {
        if (errQuestion) {
          reject(errQuestion);
        } else {
          resolve(questionData);
        }
      });
    }),
    new Promise((resolve, reject) => {
      Todo.findCourseInfo(course_id, (errOption, optionData) => {
        if (errOption) {
          reject(errOption);
        } else {
          resolve(optionData);
        }
      });
    }),
  ])
    .then(([questionData, optionData]) => {
      // Gửi dữ liệu đến trang quiz khi cả hai yêu cầu đều thành công
      res.render("course-video-list", { todo: questionData, tododes: optionData });
    })
    .catch((err) => {
      // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
      console.error(err);
      res.redirect("/500");
    });
};

exports.findAllTeacherUnDetail = (req, res) => {
  const email = req.query.email;
  Todo.findAllTeacherUnDetaill(email, (err, data) => {
    if (err) res.redirect("/500");
    else res.render("index", { todo: data });
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

exports.findAllpricee = (req, res) => {
  const email = req.query.email;
  const pct_id = req.query.pct_id;
  const start_date = req.query.start_date;
  const end_date = req.query.end_date;
  const file = req.query.file;
  const course_id = req.query.course_id;

  Todo.updateads(pct_id, start_date, end_date, file, course_id, (err) => {
    if (err) {
      console.error("Error:", err);
      res.redirect("/500");
    } else {
      res.redirect(`http://localhost:3010/ads?email=${email}`);
    }
  });

 
}


exports.findAllprice = (req, res) => {
  const { email } = req.query;

  // Kiểm tra tính hợp lệ của dữ liệu đầu vào
  if (!email) {
    console.error("Missing required parameter: email.");
    res.redirect("/500");
    return;
  }

  // Khởi tạo mảng promises
  const promises = [];

  // Thêm các promise vào mảng
  promises.push(
    new Promise((resolve, reject) => {
      Todo.getAllprice((errPrice, priceData) => {
        if (errPrice) {
          reject(errPrice);
        } else {
          resolve(priceData);
        }
      });
    }),
    new Promise((resolve, reject) => {
      Todo.getAllcourseteacher(email, (errCourse, courseData) => {
        if (errCourse) {
          reject(errCourse);
        } else {
          resolve(courseData);
        }
      });
    }),
    new Promise((resolve, reject) => {
      Todo.getAllads(email, (errAds, adsData) => {
        if (errAds) {
          reject(errAds);
        } else {
          resolve(adsData);
        }
      });
    })
  );

  // Chạy tất cả các promise và render trang "ads" với dữ liệu đã nhận được
  Promise.all(promises)
    .then(([priceData, courseData, adsData]) => {
      res.render("ads", { todo: priceData, course: courseData, ads: adsData });
    })
    .catch((err) => {
      // Xử lý lỗi
      console.error("Error:", err);
      res.redirect("/500");
    });
};


// exports.findAllprice = (req, res) => {
//   const email = req.query.email;
//   const pcd_id = req.query.pcd_id;
//   const start_date = req.query.start_date;
//   const end_date = req.query.end_date;
//   const file = req.query.file;
//   const course_id = req.query.course_id;

//   const promises = [];

//   if (start_date !== null && start_date !== undefined){

//     Todo.updateads(pcd_id, start_date, end_date, file, course_id, (err) => {
//       if (err) {
//         console.error("Error:", err);
//         res.redirect("/500");
//         return;
//       }
//       // Sau khi addnotevideo được thực hiện, tiếp tục render trang
//       renderPage();
//     });
//   }
//   // Sử dụng Promise.all để gửi yêu cầu lấy tất cả mức giá và quảng cáo cùng một lúc
//   // Hàm để render trang watch-video với dữ liệu đã nhận được
//   function renderPage() {
//     // Thêm các promise còn lại vào mảng
//     promises.push(
//     new Promise((resolve, reject) => {
//       Todo.getAllprice((errPrice, priceData) => {
//         if (errPrice) {
//           reject(errPrice);
//         } else {
//           resolve(priceData);
//         }
//       });
//     }),
//     new Promise((resolve, reject) => {
//       // Truyền tham số email vào hàm getAllcourseteacher
//       Todo.getAllcourseteacher(email, (errCourse, courseData) => {
//         if (errCourse) {
//           reject(errCourse);
//         } else {
//           resolve(courseData);
//         }
//       });
//     }),
//     new Promise((resolve, reject) => {
//       Todo.getAllads(email, (errAds, adsData) => {
//         if (errAds) {
//           reject(errAds);
//         } else {
//           resolve(adsData);
//         }
//       });
//     }),
//   ])}
//   Promise.all(promises)
//     .then(([priceData, courseData, adsData]) => {
//       // Gửi dữ liệu đến trang ads khi cả hai yêu cầu đều thành công
//       res.render("ads", { todo: priceData, course: courseData, ads: adsData });
//     })
//     .catch((err) => {
//       // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
//       console.error(err);
//       res.redirect("/500");
//     });
// };


exports.findAllCourse = (req, res) => {
  res.locals.deleted = req.query.deleted;
  const email = req.query.email;
  Todo.getAllcourse(email, (err, data) => {
      if (err)
          res.redirect('/500')
      else res.render('course-list', {todo: data});
  });
};

exports.allquesstion = (req, res) => {
  const quiz_id = req.query.quiz_id;
  const course_id = req.query.course_id;

  
  // Sử dụng Promise.all để gửi yêu cầu lấy tất cả câu hỏi và tùy chọn cùng một lúc
  Promise.all([
    new Promise((resolve, reject) => {
      Todo.getallquestion(quiz_id, course_id, (errQuestion, questionData) => {
        if (errQuestion) {
          reject(errQuestion);
        } else {
          resolve(questionData);
        }
      });
    }),
    new Promise((resolve, reject) => {
      Todo.getalloption(quiz_id, course_id, (errOption, optionData) => {
        if (errOption) {
          reject(errOption);
        } else {
          resolve(optionData);
        }
      });
    }),
  ])
    .then(([questionData, optionData]) => {
      // Gửi dữ liệu đến trang quiz khi cả hai yêu cầu đều thành công
      res.render("question", { question: questionData, option: optionData });
    })
    .catch((err) => {
      // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
      console.error(err);
      res.redirect("/500");
    });
};

exports.addadstoteacher = (req, res) => {
  const pricing_id = req.query.pricing_id;
  const email = req.query.email;
  Todo.addadstoteacherr(pricing_id, email, (err, data) => {
    if (err) res.redirect("/500");
    else res.render("ordersuccess");
  });
};

exports.findAllplaylistbuy = (req, res) => {
  const course_id = req.query.course_id;
  const user_email = req.query.user_email;

  // Sử dụng Promise.all để thực hiện các cuộc gọi đồng thời
  Promise.all([
    new Promise((resolve, reject) => {
      Todo.getcourserbyidd(course_id, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    }),
    new Promise((resolve, reject) => {
      Todo.getvideobycourseid(course_id, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    }),
    new Promise((resolve, reject) => {
      Todo.getallcomment(course_id, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    }),
  ])
    .then(([courses, videos, comments]) => {
      // Kiểm tra xem có thông tin về việc mua khóa học hay không
      Todo.playlist_buy(course_id, user_email, (err, exists_student_course) => {
        if (err) {
          console.error("Error: ", err);
          res.redirect("/500");
          return;
        }

        res.render("playlist", {
          course_detail: courses,
          video_course: videos,
          course_comment: comments,
        });
      });
    })
    .catch((err) => {
      console.error("Error: ", err);
      res.redirect("/500");
    });
};

exports.findallcoursebyemail = (req, res) => {
  const email = req.query.email;
  Todo.getallcourseemail(email, (err, data) => {
    if (err) res.redirect("/500");
    else res.render("profile", { todo: data });
  });
};

exports.findallroombyemail = (req, res) => {
  const email = req.query.email;
  Todo.getallcourseemail(email, (err, data) => {
    if (err) res.redirect("/500");
    else res.render("chat_room", { rooms: data });
  });
};

exports.findallcourseindex = (req, res) => {
  Todo.getallcourse((err, data) => {
    if (err) res.redirect("/500");
    else res.render("indexusers", { todo: data });
  });
};

exports.findallcourse = (req, res) => {
  const course_name = req.query.search_box;
  if (course_name != null && course_name.trim() !== "") { // Kiểm tra xem course_name có được cung cấp không
    Todo.searchcourse(course_name, (err, data) => { // Nếu có, thực hiện tìm kiếm
      if (err) res.redirect("/500");
      else res.render("courses", { todo: data });
    });
  } else { // Nếu không, hiển thị tất cả các khóa học
    Todo.getallcourse((err, data) => {
      if (err) res.redirect("/500");
      else res.render("courses", { todo: data });
    });
  }
};

exports.findvideo = (req, res) => {
  const video_id = req.query.video_id;
  const course_id = req.query.course_id;
  const email = req.query.email;

  const note = req.query.note;

  let status = req.query.status;

  if (!status) {
    status = 0;
  }

  // Mảng các promise sẽ được chạy bất kỳ trong bất kỳ trường hợp nào
  const promises = [];
  // Nếu status là 1 hoặc note !== null hoặc note !== undefined, thực hiện Todo.alreadywatchvideo hoặc Todo.addnotevideo trước khi render trang
  if (status == 1 || (note !== null && note !== undefined)) {
    // Nếu note !== null hoặc note !== undefined, thực hiện Todo.addnotevideo trước khi render trang
    if (note !== null && note !== undefined) {
      Todo.addnotevideo(email, video_id, note, (err) => {
        if (err) {
          console.error("Error:", err);
          res.redirect("/500");
          return;
        }
        // Sau khi addnotevideo được thực hiện, tiếp tục render trang
        renderPage();
      });
    }
    // Nếu status là 1, thực hiện Todo.alreadywatchvideo trước khi render trang
    else if (status == 1) {
      Todo.alreadywatchvideo(email, video_id, (err) => {
        if (err) {
          console.error("Error:", err);
          res.redirect("/500");
          return;
        }
        // Nếu không có lỗi, tiếp tục render trang
        renderPage();
      });
    } 
    
    else {
      // Nếu không cần thực hiện Todo.alreadywatchvideo, render trang ngay lập tức
      renderPage();
    }
  } else {
    // Nếu không cần thực hiện cả hai, render trang ngay lập tức
    renderPage();
  }

  // Hàm để render trang watch-video với dữ liệu đã nhận được
  function renderPage() {
    // Thêm các promise còn lại vào mảng
    promises.push(
      new Promise((resolve, reject) => {
        Todo.getvideobyvideoid(video_id, (err, videoData) => {
          if (err) {
            reject(err);
          } else {
            resolve(videoData);
          }
        });
      }),
      new Promise((resolve, reject) => {
        Todo.getvideobycourseid(course_id, (err, courseData) => {
          if (err) {
            reject(err);
          } else {
            resolve(courseData);
          }
        });
      }),
      new Promise((resolve, reject) => {
        Todo.getvideoalreadywatch(email, (err, videoWatchData) => {
          if (err) {
            reject(err);
          } else {
            resolve(videoWatchData);
          }
        });
      }),
      new Promise((resolve, reject) => {
        Todo.getnotevideo(email, video_id, (err, videoNoteData) => {
          if (err) {
            reject(err);
          } else {
            resolve(videoNoteData);
          }
        });
      })
    );

    // Chạy tất cả các promise và render trang watch-video với dữ liệu đã nhận được
    Promise.all(promises)
      .then(([videoData, courseData, videoWatchData, videoNoteData]) => {
        res.render("watch-video", {
          video: videoData,
          video_course: courseData,
          video_watch: videoWatchData,
          note_data: videoNoteData,
        });
      })
      .catch((err) => {
        // Xử lý lỗi
        console.error("Error:", err);
        res.redirect("/500");
      });
  }
};

exports.findAll = (req, res) => {
  const course_id = req.query.course_id;
  const email = req.query.email;

  // Sử dụng Promise.all để thực hiện các cuộc gọi đồng thời
  Promise.all([
    new Promise((resolve, reject) => {
      Todo.getcourserbyid(course_id, email, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    }),
    new Promise((resolve, reject) => {
      Todo.getvideobycourseid(course_id, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    }),
    new Promise((resolve, reject) => {
      Todo.getallcomment(course_id, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    }),
    new Promise((resolve, reject) => {
      Todo.getquizbycourseid(course_id, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    }),
    new Promise((resolve, reject) => {
      Todo.getvideoalreadywatch(email, (err, videoWatchData) => {
        if (err) {
          reject(err);
        } else {
          resolve(videoWatchData);
        }
      });
    }),
  ])
    .then(([courses, videos, comments, quizs, videoWatchData]) => {
      res.render("playlist", {
        course_detail: courses,
        video_cousrse: videos,
        course_comment: comments,
        quiz_course: quizs,
        video_watch: videoWatchData,
      });
    })
    .catch((err) => {
      console.error("Error: ", err);
      res.redirect("/500");
    });
};
