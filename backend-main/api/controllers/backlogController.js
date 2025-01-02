const mongoose = require("mongoose");
const { ActionItems } = require("../models/schemas");
const Backlogs = mongoose.model("Backlogs");
const Projects = mongoose.model("Projects");

// Access database from here, CRUD (Create, Read, Update, Delete) operations

exports.list_all_backlog_items = (req, res) => {
  Backlogs.find({}, (err, backlogItem) => {
    if (err) {
      res.send(err);
    } else {
      res.json(backlogItem);
    }
  });
};

exports.list_project_backlogs = (req, res) => {
  console.log("project_id", req.params.project_id);
  Backlogs.find(
    { project: mongoose.Types.ObjectId(req.params.project_id) },
    (err, backlogs) => {
      if (err) {
        res.send(err);
      } else {
        res.json(backlogs);
      }
    }
  );
};

exports.create_a_backlog_item = (req, res) => {
  let backlogitemToCreate = new Backlogs({
    title: req.body.title,
    description: req.body.description,
    priority: req.body.priority,
    due_date: req.body.due_date,
    project: req.body.project_id,
    created_by: req.user.user_id,
  });
  backlogitemToCreate
    .save()
    .then(() => {
      res.status(200).send({
        message: "Backlogs item successufily registered!",
      });
    })
    .catch((error) => {
      res.status(400).send({
        message: "An error occured!",
        error: error.message,
      });
    });
};

exports.read_a_backlog_item = (req, res) => {
  Backlogs.findById(req.params.backlogItem_id, (err, backlogItem) => {
    if (err) {
      res.send(err);
      return;
    } else if (!backlogItem) {
      res.status(404).send();
      return;
    } else {
      res.json(backlogItem);
    }
  });
};

exports.update_a_backlog_item = (req, res) => {
  Backlogs.findById(req.params.backlogItem_id, (err, backlogItem) => {
    if (err) {
      res.send(err);
      return;
    }
    if (!backlogItem) {
      res.status(404).send();
      return;
    }
    //Add authorisation/permissions here
    Backlogs.findOneAndUpdate(
      { _id: backlogItem._id },
      req.body,
      { new: true },
      (err, backlogItem) => {
        if (err) res.send(err);
        else res.json(backlogItem);
      }
    );
  });
};

exports.delete_a_backlog_item = (req, res) => {
  Backlogs.findById(req.params.backlogItem_id, (err, backlogItem) => {
    if (err) {
      res.send(err);
      return;
    }
    if (!backlogItem) {
      res.status(404).send();
      return;
    }
    //Add authorisation/permissions here
    Backlogs.deleteOne({ _id: backlogItem._id }, (err) => {
      if (err) res.send(err);
      else {
        ActionItems.deleteMany({ _backlog_item: backlogItem._id }, (err, _) => {
          if (err) res.send(err);
          res.json({
            message: "Backlogs item successfully deleted.",
          });
        });
      }
    });
  });
};
