const indexadminRouter = require("express").Router();

module.exports = (app) => {
  var router = require("express").Router();
  // Route to retrieve all todos
  const moment = require("moment");

  app.use((req, res, next) => {
    if (req.session.user) {
      res.locals.user = req.session.user;
    }
    next();
  });

  app.get("/500", (req, res) => {
    res.render("err");
  });

  app.get("/multi_form", (req, res) => {
    res.render("multi_form");
  });

  app.get("/404", (req, res) => {
    res.render("404");
  });

  app.get("/registeremail", (req, res, next) => {
    res.render("registeremail");
  });

  app.get("/product-cart", (req, res, next) => {
    res.render("product-cart");
  });

  app.get("/cards", (req, res, next) => {
    res.render("cards");
  });
  
  app.get("/course-edit", (req, res, next) => {
    res.render("course-edit");
  });
  
 
  app.get("/index-1", (req, res, next) => {
    res.render("index-1");
  });

  app.get("/teacher-list", (req, res, next) => {
    res.render("teacher-list");
  });

  app.get("/index-2", (req, res, next) => {
    res.render("index-2");
  });

  app.get("/question-detail", (req, res, next) => {
    res.render("question-detail");
  });



  app.get("/modals", (req, res, next) => {
    res.render("modals");
  });

  app.get("/forms", (req, res, next) => {
    res.render("forms");
  });

  app.get("/charts", (req, res, next) => {
    res.render("charts");
  });

  app.get("/buttons", (req, res, next) => {
    res.render("buttons");
  });

  app.get("/youhavetologin", (req, res, next) => {
    res.render("youhavetologin");
  });



  app.get("/forgot-password", (req, res, next) => {
    res.render("forgot-password");
  });

  app.get("/tables", (req, res, next) => {
    res.render("tables");
  });



  app.get("/blank", (req, res, next) => {
    res.render("blank");
  });

  app.get("/404", (req, res, next) => {
    res.render("404");
  });

  app.get("/choseadmintype", (req, res, next) => {
    res.render("choseadmintype");
  });

  app.get("/quiz_add", (req, res, next) => {
    res.render("quiz_add");
  });

  function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        str.push(encodeURIComponent(key));
      }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
      sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
  }

  // Import 3 thư viện cần thiết
  const nodemailer = require("nodemailer");
  const { OAuth2Client } = require("google-auth-library");


  app.get("/send-email-ordersuccess", async (req, res) => {
    try {
      const user_name = req.query.user_name;
      const email = req.query.email;
      const month = req.query.month;
      const pricing_id = req.query.pricing_id;
      
      const vnp_Amount = req.query.vnp_Amount;

      // Ví dụ về cách truy cập dữ liệu từ query string
      const vnp_BankCode = req.query.vnp_BankCode;

      // Tạo dữ liệu khác tương tự với các trường bạn muốn truy cập từ query string

      const currentDate = new Date();
      const date_start = `${currentDate.getDate()}/${
        currentDate.getMonth() + 1
      }/${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
      const formattedAmount = ((vnp_Amount * 1000)/100000).toLocaleString('vi-VN');

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "20t1020652@husc.edu.vn", // Địa chỉ email của bạn
          pass: "binphuoctacoo", // Mật khẩu email của bạn
        },
      });

      const mailOptions = {
        from: "20t1020652@husc.edu.vn", // Địa chỉ email của bạn
        to: email, // Địa chỉ email người nhận
        subject: "SUCCESSFUL PAYMENT FOR ADVERTISING PACKAGE", // Tiêu đề email
        html: `
        <p>Dear ${user_name},</p>
        <p>We are delighted to inform you that your payment for the advertising package has been successfully confirmed.</p>
        <p>Below are some details regarding your payment:</p>
        <ul>
            <li>Instructor: ${user_name}</li>
            <li>Bank Code: ${vnp_BankCode}</li>
            <li>Month: ${month}</li>
            <li>Total Amount Paid: ${formattedAmount} VNĐ </li>
            <li>Payment Method: VNPAY</li>
        </ul>
        <p>Your advertising package is now active and ready for use.</p>
        <p>Feel free to reach out to us if you have any questions or need further assistance.</p>
        <p>Best regards,</p>
        <p>LMS_Phuoc</p>
        `,
    };    

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.error("Error occurred while sending email:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });

      res.redirect(`/ordersuccess?pricing_id=${encodeURIComponent(pricing_id)}&email=${encodeURIComponent(email)}`);

    } catch (error) {
      // Có lỗi thì các bạn log ở đây cũng như gửi message lỗi về phía client
      console.log(error);
      res.status(500).json({ errors: error.message });
    }
  });

  router.post("/create_payment_url", function (req, res, next) {
    process.env.TZ = "Asia/Ho_Chi_Minh";

    let date = new Date();
    let createDate = moment(date).format("YYYYMMDDHHmmss");

    let ipAddr =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

    let config = require("config");

    let user_name = req.body.user_name;
    let amount = req.body.amount;
    let email = req.body.email;
    let month = req.body.month;
    let pricing_id = req.body.pricing_id;
    
    let tmnCode = "8OL26WLV";
    let secretKey = "ZSACGHPGEITEKSERRKAZGKXMEXVMISCC";
    let vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    // URL cơ bản
    let returnUrlBase = "http://localhost:3010/send-email-ordersuccess";

    // Tạo URL hoàn chỉnh bằng cách thêm giá trị của coursename vào returnUrl
    let returnUrl = `${returnUrlBase}?user_name=${encodeURIComponent(
      user_name
    )}&amount=${encodeURIComponent(amount)}&email=${encodeURIComponent(email)}&month=${encodeURIComponent(month)}&pricing_id=${encodeURIComponent(pricing_id)}`;

    let orderId = moment(date).format("DDHHmmss");
    let bankCode = req.body.bankCode;

    let locale = req.body.language;
    if (locale === null || locale === "") {
      locale = "vn";
    }
    let currCode = "VND";
    let vnp_Params = {};
    vnp_Params["vnp_Version"] = "2.1.0";
    vnp_Params["vnp_Command"] = "pay";
    vnp_Params["vnp_TmnCode"] = tmnCode;
    vnp_Params["vnp_Locale"] = locale;
    vnp_Params["vnp_CurrCode"] = currCode;
    vnp_Params["vnp_TxnRef"] = orderId;
    vnp_Params["vnp_OrderInfo"] = "Thanh toan cho ma GD:" + orderId;
    vnp_Params["vnp_OrderType"] = "other";
    vnp_Params["vnp_Amount"] = amount * 100000;
    vnp_Params["vnp_ReturnUrl"] = returnUrl;
    vnp_Params["vnp_IpAddr"] = ipAddr;
    vnp_Params["vnp_CreateDate"] = createDate;
    if (bankCode !== null && bankCode !== "") {
      vnp_Params["vnp_BankCode"] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    let querystring = require("qs");
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
    vnp_Params["vnp_SecureHash"] = signed;
    vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

    res.redirect(vnpUrl);
  });

  router.get("/vnpay_return", function (req, res, next) {
    let vnp_Params = req.query;

    let secureHash = vnp_Params["vnp_SecureHash"];

    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    vnp_Params = sortObject(vnp_Params);

    let config = require("config");
    let tmnCode = config.get("vnp_TmnCode");
    let secretKey = config.get("vnp_HashSecret");

    let querystring = require("qs");
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

    if (secureHash === signed) {
      //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

      res.render("success", { code: vnp_Params["vnp_ResponseCode"] });
    } else {
      res.render("success", { code: "97" });
    }
  });

  app.use(router);
};
