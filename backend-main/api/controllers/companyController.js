const mongoose = require("mongoose");
const Company = mongoose.model("Companies");
const User = mongoose.model("Users");
const userBuilder = require("../controllers/userController");
const bcrypt = require("bcryptjs");

// Access database from here, CRUD (Create, Read, Update, Delete) operations

exports.list_all_companies = (req, res) => {
  Company.find({}, (err, companies) => {
    if (err) {
      res.send(err);
    } else {
      res.json(companies);
    }
  });
};

exports.create_company_and_user = async (req, res) => {
  req.body = req.body.formData;
  let userFound = await userBuilder.findByEmailUsername(
    req.body.adminUsername,
    req.body.adminEmail
  );
  let companyFound = await findByNameAndEmail(
    req.body.companyName,
    req.body.companyEmailAddress
  );
  if (userFound.length === 0 && companyFound.length === 0) {
    var hashedPassword = "";
    var userSalt = "";
    userSalt = bcrypt.genSaltSync(10);
    hashedPassword = bcrypt.hashSync(req.body.adminPassword, userSalt);
    let userToCreate = await new User({
      first_name: req.body.adminFirstname,
      last_name: req.body.adminLastname,
      username: req.body.adminUsername,
      password: hashedPassword,
      salt: userSalt,
      email: req.body.adminEmail,
      rights: "Administrator",
      image: req.body.image,
    });
    userToCreate.save().catch((error) => {
      res.status(400).send({
        message: "An error occured!",
        error: error.message,
      });
      return;
    });
    let companyToCreate = await new Company({
      company_name: req.body.companyName,
      company_email_address: req.body.companyEmailAddress,
      street_name: req.body.streetName,
      house_number: req.body.houseNumber,
      postcode: req.body.postcode,
      city: req.body.city,
      country: req.body.country,
      administrator: userToCreate._id,
    });
    companyToCreate.save().catch((error) => {
      res.status(400).send({
        message: "An error occured!",
        error: error.message,
      });
      return;
    });
    res.status(200).send({
      message: "Company and admin successufily created!",
    });
    return;
  } else {
    res.status(400).send({
      message:
        "A company or an administrator with this email, username or address combination already exists!",
    });
  }
};

exports.create_a_company = async (req, res) => {
  //didnt get what needed to be done here
  var companyFound = await findByNameAndAddress(
    req.body.company_name,
    req.body.street_name,
    req.body.house_name,
    req.body.postcode,
    req.body.city,
    req.body.country
  );
  if (companyFound.length === 0) {
    let companyToCreate = new Company({
      company_name: req.body.companyName,
      company_email_address: req.body.companyEmailAddress,
      street_name: req.body.streetName,
      house_number: req.body.houseNumber,
      postcode: req.body.postcode,
      city: req.body.city,
      country: req.body.country,
      salt: req.body.salt,
    });
    companyToCreate
      .save()
      .then((company) => {
        res.status(200).send({
          message: "Company successufily created!",
          company_id: company._id,
        });
      })
      .catch((error) => {
        res.status(400).send({
          message: "An error occured!",
          error: error.message,
        });
      });
  } else {
    res.status(400).send({
      message:
        "A company with this name and address combination already exists!",
    });
  }
};

async function findByNameAndEmail(company_name, company_email_address) {
  try {
    var companies = await Company.find({
      $and: [{ company_name }, { company_email_address }],
    });
    return companies;
  } catch (e) {
    console.log(e);
    return e;
  }
}

exports.read_a_company = (req, res) => {
  Company.findById(req.params.company_id, (err, company) => {
    if (err) {
      res.send(err);
      return;
    } else if (!company) {
      res.status(404).send();
      return;
    } else {
      res.json(company);
    }
  });
};

exports.update_a_company = (req, res) => {
  Company.findById(req.params.company_id, (err, company) => {
    if (err) {
      res.send(err);
      return;
    }
    if (!company) {
      res.status(404).send();
      return;
    }
    //Add authorisation/permissions here
    Company.findOneAndUpdate(
      { _id: company._id },
      req.body,
      { new: true },
      (err, company) => {
        if (err) res.send(err);
        else res.json(company);
      }
    );
  });
};

exports.delete_a_company = (req, res) => {
  Company.findById(req.params.company_id, (err, company) => {
    if (err) {
      res.send(err);
      return;
    }
    if (!company) {
      res.status(404).send();
      return;
    }
    //Add authorisation/permissions here
    Company.deleteOne({ _id: company._id }, (err) => {
      if (err) res.send(err);
      else {
        res.json({
          message: "Company successfully deleted.",
        });
      }
    });
  });
};
