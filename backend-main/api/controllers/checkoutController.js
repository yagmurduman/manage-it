const projectBuilder = require("./projectController");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Company = mongoose.model("Companies");
const Project = mongoose.model("Projects");
const User = mongoose.model("Users");
const Consultant = mongoose.model("Consultants");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.bookConsultationSession = async (req, res) => {
  try {
    req.body.user_id = req.user.user_id;
    req.body.is_free = false;
    Consultant.findById(req.body.consultant_id, async (err, consultant) => {
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              unit_amount: Number(consultant.hourly_rate),
              currency: "eur",
              product_data: {
                name: "Consultation Session",
              },
            },
            quantity: 1,
          },
        ],
        success_url:
          process.env.REACT_APP_BASE_URL +
          "/consultation-booking-success/{CHECKOUT_SESSION_ID}",
        cancel_url: process.env.REACT_APP_BASE_URL + "/checkout-fail",
        metadata: req.body,
      });
      return res.send({ url: session.url });
    });
  } catch (e) {
    return e;
  }
};

exports.checkConsultationBookingStatus = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(
      req.body.session_id
    );
    let bookings = {
      date: session.metadata.date,
      time: session.metadata.time,
      consultant: mongoose.Types.ObjectId(session.metadata.consultant_id),
      project: mongoose.Types.ObjectId(session.metadata.project_id),
    };
    console.log("bookings", bookings);
    if (session.payment_status == "paid" && session.status == "complete") {
      console.log("session.metadata", session.metadata);
      Consultant.findOneAndUpdate(
        {
          _id: session.metadata.consultant_id,
          availability: {
            $elemMatch: {
              date: session.metadata.date,
              time: session.metadata.time,
            },
          },
        },
        {
          $set: {
            "availability.$.user_id": session.metadata.user_id,
            "availability.$.project_id": session.metadata.project_id,
            "availability.$.is_free": session.metadata.is_free,
          },
        },
        { new: true },
        (err, _) => {
          if (err) res.send(err);
        }
      );
      User.findOneAndUpdate(
        { _id: session.metadata.user_id },
        {
          $push: {
            bookings,
          },
        },
        { new: true },
        (err, _) => {
          if (err) res.send(err);
        }
      );
    }
    res.send({
      message:
        "Payment status is " + session.payment_status + " - " + session.status,
    });
  } catch (e) {
    return e;
  }
};

exports.checkoutpay = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [{ price: process.env.PRICE, quantity: 1 }],
      success_url:
        process.env.REACT_APP_BASE_URL +
        "/checkout-success/{CHECKOUT_SESSION_ID}",
      cancel_url: process.env.REACT_APP_BASE_URL + "/checkout-fail",
      metadata: {
        user_id: req.user.user_id,
        company_id: req.user.company_id,
        rights: req.user.rights,
        project_id: req.body.project_id,
      },
    });
    return res.send({ url: session.url });
  } catch (e) {
    return e;
  }
};

exports.checkoutsubscribe = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: process.env.RECURR_PRICE, quantity: 1 }],
      success_url:
        process.env.REACT_APP_BASE_URL +
        "/subscription-success/{CHECKOUT_SESSION_ID}",
      cancel_url: process.env.REACT_APP_BASE_URL + "/subscription-fail",
      metadata: {
        user_id: req.user.user_id,
        company_id: req.user.company_id,
        rights: req.user.rights,
        project_id: req.body.project_id,
      },
    });
    return res.send({ url: session.url });
  } catch (e) {
    return e;
  }
};

exports.checksessionstatus = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(
      req.body.session_id
    );
    if (session.payment_status == "paid" && session.status == "complete") {
      console.log(session.mode);
      if (session.mode == "payment") {
        // one time payment
        Project.findOneAndUpdate(
          { _id: session.metadata.project_id },
          { payment_status: "one time" },
          { new: true },
          (err, _) => {
            if (err) res.send(err);
          }
        );
      } else {
        // subscription
        console.log(session.metadata.project_id);
        Project.findOneAndUpdate(
          { _id: session.metadata.project_id },
          { payment_status: "subscription" },
          { new: true },
          (err, _) => {
            if (err) res.send(err);
          }
        );
        Company.findOneAndUpdate(
          { _id: session.metadata.company_id },
          { subscription_id: req.body.session_id, subscribed_on: +new Date() },
          { new: true },
          (err, _) => {
            if (err) res.send(err);
          }
        );
      }
    }
    res.send({
      message:
        "Payment status is " + session.payment_status + " - " + session.status,
      project_id: session.metadata.project_id,
    });
  } catch (e) {
    return e;
  }
};
