const mongoose = require("mongoose");
const User = mongoose.model("Users");
const Company = mongoose.model("Companies");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const userController = require("../controllers/userController");

exports.verifyRefreshToken = (req, res) => {
  let user = req.user;
  const userDTO = {
    user_id: user.user_id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
  };
  res.status(200).send({
    status: "Logged In",
    jwt_token: jwt.sign(userDTO, process.env.TOKEN_SECRET, {
      expiresIn: "1800s",
    }),
  });
};

exports.login = async (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) res.send(err.message);
    if (
      user &&
      user.expireAt &&
      new Date(user.expireAt).getTime() < Date.now()
    ) {
      res.status(401).send({ message: "Temporary account expired!" });
    } else if (user) {
      hashedPasswordInput = bcrypt.hashSync(req.body.password, user.salt);
      if (hashedPasswordInput === user.password) {
        const userDTO = {
          user_id: user._id,
          first_name: user.first_name,
          username: user.username,
          email: user.email,
          rights: user.rights,
        };
        Company.find(
          { $or: [{ administrator: user._id }, { employees: user._id }] },
          (_, company) => {
            userDTO.company_id = company[0]?._id;
            userDTO.company_name = company[0]?.company_name;
            res.status(200).send({
              message: "User logged in!",
              jwt_token: jwt.sign(userDTO, process.env.TOKEN_SECRET, {
                expiresIn: `${48 * 60 * 60}s`, //48 hrs
              }),
            });
          }
        );
      } else {
        res.status(401).send({ message: "Invalid Login" });
      }
    } else {
      res.status(401).send({ message: "No such user exists" });
    }
  });
};

exports.generatePassToken = (req, res) => {
  const email = req.body.email;
  if (email == null) {
    // nothing to do here
    res.sendStatus(400);
    return;
  } else {
    User.findOne({ email }, (err, user) => {
      if (err) {
        res.status(400).send({ error: err });
        return;
      } else if (user == null) {
        res.status(401).send({ message: "No account found with this E-Mail." });
        return;
      } else {
        let userDTO = {
          email,
          salt: user.salt,
        };
        let jwt_token = jwt.sign(userDTO, process.env.TOKEN_SECRET, {
          expiresIn: "900s",
        });
        sendForgotMail(jwt_token, email, user.first_name, res);
      }
    });
  }
};

function sendForgotMail(jwt_token, user_email, name, res) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ManageITTUM@gmail.com",
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });
  let html = `Hello, ${name}! <br> You requested to reset your password on ManageIT. Please follow this link to reset it: <a target="_blank" href="http://localhost:8080/resetpassword/${jwt_token}">click here</a> <br> Please note that this link is only valid for the next 15 minutes. <br> Best, <br> Your ManageIT Team`;
  let mailOptions = {
    from: "ManageITTUM@gmail.com",
    to: user_email,
    subject: "ManageIT: You forgot your password",
    html,
  };
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      res.status(401).send({ message: "Reset E-Mail could not be sent" });
      return;
    } else {
      res.status(200).send({ message: "Reset E-Mail successfully sent!" });
      return;
    }
  });
}

exports.updatePassowrd = (req, res) => {
  let hashedPassword = "";
  let userSalt = "";
  userSalt = bcrypt.genSaltSync(10);
  hashedPassword = bcrypt.hashSync(req.body.password, userSalt);
  let email = req.body.email;
  User.findOne({ email }, (err, user) => {
    if (err || user == null) {
      res.status(401).send({ status: "Account not found" });
      return;
    }
    if (req.body.salt != user.salt) {
      res.status(401).send({ status: "Invalid token" });
      return;
    }
    User.findOneAndUpdate(
      { email },
      {
        password: hashedPassword,
        salt: userSalt,
      },
      { new: true },
      (err) => {
        if (err) {
          res.status(401).send({ status: "Access denied" });
          return;
        } else {
          res.status(200).send({ status: "Passowrd changed successfully" });
          return;
        }
      }
    );
  });
};

exports.generateVerificationToken = async (req, res) => {
  const email = req.body.email;
  if (email == null) {
    // nothing to do here
    res.sendStatus(400);
    return;
  } else {
    emailFound = await userController.findByEmailUsername(email, email);
    console.log(emailFound);
    if (emailFound.length === 0) {
      let companyDTO = {
        email,
      };

      let jwt_token = jwt.sign(companyDTO, process.env.TOKEN_SECRET, {
        expiresIn: "900s",
      });
      sendVerificationMail(jwt_token, email, res);
    } else {
      res.status(401).send({
        message: "A user or a company account with this E-Mail already exists!",
      });
    }
  }
};

function sendVerificationMail(jwt_token, company_email, res) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ManageITTUM@gmail.com",
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });
  let html = `Welcome to Manage-IT! <br> You requested to register your company on the ManageIT platform. Please follow this link to complete your registration: <a target="_blank" href="http://localhost:8080/signup/${jwt_token}">click here</a> <br> Please note that this link is only valid for the next 15 minutes. <br> Best, <br> Your ManageIT Team`;
  let mailOptions = {
    from: "ManageITTUM@gmail.com",
    to: company_email,
    subject: "ManageIT: Verify Your Registration",
    html,
  };
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      res
        .status(401)
        .send({ message: "Verification E-Mail could not be sent" });
      return;
    } else {
      res
        .status(200)
        .send({ message: "Verification E-Mail successfully sent!" });
      return;
    }
  });
}
