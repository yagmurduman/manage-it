const mongoose = require("mongoose");
const User = mongoose.model("Users");
const Company = mongoose.model("Companies");
const ActionItem = mongoose.model("ActionItems");
const Project = mongoose.model("Projects");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// Access database from here, CRUD (Create, Read, Update, Delete) operations

exports.list_all_users = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.send(err);
    } else {
      res.json(users);
    }
  });
};

//add project managers as employees
exports.list_employees_of_a_company = (req, res) => {
  Company.findById(req.user.company_id, async (err, company) => {
    if (err) {
      res.send(err);
    } else {
      await company.populate("administrator");
      await company.populate("employees");
      let employees = company.employees;
      employees.push(company.administrator);
      console.log(employees);
      res.json(employees);
    }
  });
};

exports.list_employees_of_a_project = (req, res) => {
  Project.findById(req.params.projectid, async (err, project) => {
    if (err) {
      res.send(err);
    } else {
      await project.populate("assigned_employees");
      employees = project.assigned_employees;

      res.json(employees);
    }
  });
};

//remove
exports.list_assignees_of_an_action_item = (req, res) => {
  ActionItem.findById(req.params.actionItem_id, async (err, actionItem) => {
    if (err) {
      res.send(err);
    } else {
      await actionItem.populate("assignees");
      assigned_employees = actionItem.assignees;

      res.json(assigned_employees);
    }
  });
};

exports.list_pm_of_a_project = (req, res) => {
  Project.findById(req.params.projectid, async (err, project) => {
    if (err) {
      res.send(err);
    } else {
      await project.populate("project_managers");
      pm = project.project_managers;

      res.json(pm);
    }
  });
};

exports.create_a_user = async (req, res) => {
  var userFound = await findByEmailUsername(req.body.username, req.body.email);
  if (userFound.length === 0) {
    var hashedPassword = "";
    var userSalt = "";
    userSalt = bcrypt.genSaltSync(10);
    hashedPassword = bcrypt.hashSync(req.body.password, userSalt);
    let userToCreate = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      password: hashedPassword,
      salt: userSalt,
      email: req.body.email,
      rights: req.body.rights,
    });
    userToCreate
      .save()
      .then((user) => {
        const userDTO = {
          user_id: user._id,
          first_name: user.first_name,
          username: user.username,
          email: user.email,
          rights: user.rights,
        };
        var jwt_token = jwt.sign(userDTO, process.env.TOKEN_SECRET, {
          expiresIn: "1800s",
        });
        res.status(200).send({
          message: "User successufily registered!",
          jwt_token,
        });
      })
      .catch((error) => {
        res.status(400).send({
          message: "An error occured!",
          error: error.message,
        });
      });
  } else {
    res.status(401).send({
      message: "A user account with this E-Mail or username already exists!",
    });
  }
};

exports.findByEmailUsername = async (username, email) => {
  try {
    var users = await User.find({ $or: [{ username }, { email }] });
    return users;
  } catch (e) {
    console.log(e);
    return e;
  }
};

findByEmailUsername = async (username, email) => {
  try {
    var users = await User.find({ $or: [{ username }, { email }] });
    return users;
  } catch (e) {
    console.log(e);
    return e;
  }
};

exports.read_a_user = (req, res) => {
  if (req.params.user_id !== req.user.user_id) {
    res.status(404).send();
    return;
  }
  User.findById(req.params.user_id, async (err, user) => {
    if (err) {
      res.send(err);
      return;
    } else if (!user) {
      res.status(404).send();
      return;
    } else {
      await user.populate("bookings.consultant");
      await user.populate("bookings.consultant.user");
      res.json(user);
    }
  });
};

exports.get_user_image = (req, res) => {
  if (req.params.user_id !== req.user.user_id) {
    res.status(404).send();
  }
  User.findById(req.params.user_id, async (err, user) => {
    if (err) {
      res.send(err);
      return;
    } else if (!user) {
      res.status(404).send();
      return;
    } else {
      res.json({ image: user.image });
    }
  });
};

exports.update_a_user = (req, res) => {
  console.log("update_a_user");
  console.log(req.user);
  console.log(req.body);
  var user_in_token = req.user.user_id;
  User.findById(req.params.user_id, (err, user) => {
    if (err) {
      res.send(err);
      return;
    }
    if (!user) {
      res.status(404).send();
      return;
    }
    if (
      (user._id != user_in_token && req.user.rights !== "Administrator") ||
      (req.body.password && user._id != user_in_token)
    ) {
      console.log("unauthorised");
      console.log(user._id, user_in_token);
      res.status(401).send({ message: "Unauthorized access" });
      return;
    }
    if (req.body.password) {
      let salt = bcrypt.genSaltSync(10);
      let password = bcrypt.hashSync(req.body.password, salt);
      req.body.salt = salt;
      req.body.password = password;
    }
    console.log("got this far");
    User.findOneAndUpdate(
      { _id: user._id },
      req.body,
      { new: true },
      (err, user) => {
        if (err) res.send(err);
        else res.json(user);
      }
    );
  });
};

exports.delete_a_user = (req, res) => {
  console.log("delete_a_user");
  var user_in_token = req.user.user_id;
  User.findById(req.params.user_id, (err, user) => {
    if (err) {
      res.send(err);
      return;
    }
    if (!user) {
      res.status(404).send();
      return;
    }
    if (user._id != user_in_token && req.user.rights !== "Administrator") {
      res.status(401).send({ message: "Unauthorized access" });
      return;
    }
    User.deleteOne({ _id: user._id }, (err) => {
      if (err) res.send(err);
      else {
        res.json({
          message: "user successfully deleted.",
          _id: req.params.user_id,
        });
      }
    });
  });
};

exports.create_registeration_link = async (req, res) => {
  if (req.user.rights === "Administrator") {
    const email = req.body.email;
    if (email == null) {
      // nothing to do here
      res.sendStatus(400);
      return;
    } else {
      emailFound = await findByEmailUsername(email, email);
      console.log(emailFound);
      if (emailFound.length === 0) {
        let userDTO = {
          email,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          company_id: req.user.company_id,
          company_name: req.user.company_name,
        };

        let jwt_token = jwt.sign(userDTO, process.env.TOKEN_SECRET, {
          expiresIn: "10800s",
        });
        sendRegisterationMail(jwt_token, email, res);
      } else {
        res.status(403).send({
          message: "A user account with this E-Mail already exists!",
        });
      }
    }
  } else {
    res.status(401).send({ message: "User is not an administrator!" });
  }
};

function sendRegisterationMail(jwt_token, company_email, res) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ManageITTUM@gmail.com",
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });
  let html = `Welcome to Manage-IT! <br> An account under your E-Mail has been requested on the ManageIT platform. Please follow this link to complete your registration: <a target="_blank" href="http://localhost:8080/registeremployee/${jwt_token}">click here</a> <br> Please note that this link is only valid for the next three hours. <br> Best, <br> Your ManageIT Team`;
  let mailOptions = {
    from: "ManageITTUM@gmail.com",
    to: company_email,
    subject: "ManageIT: Complete Your Registration",
    html,
  };
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      res
        .status(401)
        .send({ message: "Registeration E-Mail could not be sent" });
      return;
    } else {
      res
        .status(200)
        .send({ message: "Registeration E-Mail successfully sent!" });
      return;
    }
  });
}

exports.create_user_from_registeration_link = (req, res) => {
  jwt.verify(req.body.token, process.env.TOKEN_SECRET, (err, token_data) => {
    if (err) return res.sendStatus(403);
    req.token_data = token_data;
  });
  console.log("Token data", req.token_data);
  let userSalt = bcrypt.genSaltSync(10);
  let hashedPassword = bcrypt.hashSync(req.body.password, userSalt);
  let userToCreate = new User({
    first_name: req.token_data.first_name,
    last_name: req.token_data.last_name,
    email: req.token_data.email,
    username: req.body.username,
    password: hashedPassword,
    salt: userSalt,
  });
  userToCreate
    .save()
    .then((user) => {
      Company.findOneAndUpdate(
        { _id: req.token_data.company_id },
        { $push: { employees: user._id } },
        { new: true },
        (err, user) => {
          if (err) res.send(err);
          else
            res.json({
              message: "User created and respective company updated",
            });
        }
      );
    })
    .catch((error) => {
      res.status(400).send({
        message: "An error occured!",
        error: error.message,
      });
    });
};

exports.send_contact_form_mail = (req, res) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ManageITTUM@gmail.com",
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });
  let html = `${req.body.fullname} - Inquiry`;
  let mailOptions = {
    from: req.body.email,
    to: "ManageITTUM@gmail.com",
    subject: html,
    html: req.body.message,
  };
  console.log(mailOptions);
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      res.status(401).send({ message: "E-Mail could not be sent" });
      console.log(error);
      return;
    } else {
      res.status(200).send({ message: "E-Mail successfully sent!" });
      console.log("done");
      return;
    }
  });
};
