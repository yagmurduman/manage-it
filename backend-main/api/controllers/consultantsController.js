const mongoose = require("mongoose");
const Consultant = mongoose.model("Consultants");
const User = mongoose.model("Users");
const Project = mongoose.model("Projects");
const bcrypt = require("bcryptjs");

// Access database from here, CRUD (Create, Read, Update, Delete) operations

exports.list_all_consultants = (req, res) => {
  Consultant.find({})
    .populate("user")
    .populate("reviews.user")
    .exec((err, consultants) => {
      if (err) {
        res.send(err);
      } else {
        res.json(consultants);
      }
    });
};

exports.create_temp_account = (req, res) => {
  const randString = Math.random().toString(36).substring(2, 10);
  const userSalt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(randString, userSalt);
  let userToCreate = new User({
    first_name: req.user.first_name,
    last_name: "Test Account",
    username: randString,
    password: hashedPassword,
    salt: userSalt,
    email: `${randString}@manage-it.com`,
    rights: "Employee",
    expireAt: Date.now() + 60 * 60 * 1000, //Valid for an hour
  });
  userToCreate
    .save()
    .then((tempAccount) => {
      Project.findByIdAndUpdate(
        req.body.project_id,
        {
          $push: {
            temps: tempAccount._id,
          },
        },
        { new: true },
        (err, _) => {
          if (err) res.send(err);
          res.send({ tempPass: randString });
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

exports.read_a_consultant = (req, res) => {
  Consultant.findById(req.params.consultant_id, async (err, consultant) => {
    if (err) {
      res.send(err);
    } else {
      await consultant.populate("user");
      await consultant.populate("reviews.user");
      res.json(consultant);
    }
  });
};

exports.update_a_consultant = (req, res) => {
  Consultant.findOneAndUpdate(
    { user: req.user.user_id },
    req.body,
    { new: true },
    (err, consultant) => {
      if (err) res.send(err);
      else res.json(consultant);
    }
  );
};

exports.update_consultant_availability = async (req, res) => {
  let consultant = await Consultant.findOne({
    user: req.user.user_id,
  });
  let filtered_availability = consultant.availability.filter(
    (slot) => slot.date !== req.body.availability[0]?.date
  );
  console.log(req.body.availability);
  filtered_availability = req.body.availability.concat(filtered_availability);
  console.log("filtered_availability", filtered_availability);
  Consultant.findByIdAndUpdate(
    consultant._id,
    { availability: filtered_availability },
    { new: true },
    (err, consultant) => {
      if (err) res.send(err);
      res.json(consultant);
    }
  );
};

exports.get_consultant_by_userId = (req, res) => {
  Consultant.findOne({ user: req.user.user_id }, async (err, consultant) => {
    if (err) {
      res.send(err);
    } else {
      await consultant.populate("user");
      await consultant.populate("availability.user_id");
      await consultant.populate("availability.project_id");
      await consultant.populate("availability.project_id.company");
      await consultant.populate("reviews.user");
      res.json(consultant);
    }
  });
};

exports.add_a_review = (req, res) => {
  Consultant.findByIdAndUpdate(
    req.params.consultant_id,
    {
      $push: {
        reviews: {
          title: req.body.title,
          user: req.user.user_id,
          review: req.body.review,
          rating: req.body.rating,
        },
      },
    },
    { new: true },
    (err, consultant) => {
      if (err) res.send(err);
      else res.json({ message: "Review added" });
    }
  );
};
