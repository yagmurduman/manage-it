const mongoose = require("mongoose");
const ActionItem = mongoose.model("ActionItems");

// Access database from here, CRUD (Create, Read, Update, Delete) operations

exports.list_all_action_items = (req, res) => {
  ActionItem.find({}, (err, actionItem) => {
    if (err) {
      res.send(err);
    } else {
      res.json(actionItem);
    }
  });
};

exports.list_project_action_items = (req, res) => {
  ActionItem.find({ project: mongoose.Types.ObjectId(req.params.project_id) })
    .populate("assignees")
    .populate("backlog_item")
    .exec((err, action_items) => {
      if (err) {
        res.send(err);
      } else {
        res.json(action_items);
      }
    });
};

exports.list_backlog_action_items = (req, res) => {
  ActionItem.find({
    backlog_item: mongoose.Types.ObjectId(req.params.backlogItem_id),
  })
    .populate("assignees")
    .exec((err, action_items) => {
      if (err) {
        res.send(err);
      } else {
        res.json(action_items);
      }
    });
};

exports.create_an_action_item = (req, res) => {
  console.log("ooooo", req.body);
  let actionItemToCreate = new ActionItem({
    title: req.body.title,
    description: req.body.description,
    priority: req.body.priority,
    comments: req.body.comments,
    status: req.body.status,
    due_date: req.body.due_date,
    start_date: req.body.start_date,
    assignees: req.body.assignees,
    created_by: req.user.user_id,
    project: req.body.project,
    backlog_item: req.body.backlog_item,
    status_set_on: Date.now(),
  });
  actionItemToCreate
    .save()
    .then(() => {
      res.status(200).send({
        message: "Action item successufily registered!",
      });
    })
    .catch((error) => {
      res.status(400).send({
        message: "An error occured!",
        error: error.message,
      });
    });
};

exports.read_an_action_item = (req, res) => {
  ActionItem.findById(req.params.actionItem_id, (err, actionItem) => {
    if (err) {
      res.send(err);
      return;
    } else if (!actionItem) {
      res.status(404).send();
      return;
    } else {
      res.json(actionItem);
    }
  });
};

exports.update_an_action_item = (req, res) => {
  ActionItem.findById(req.params.actionItem_id, (err, actionItem) => {
    if (err) {
      res.send(err);
      return;
    }
    if (!actionItem) {
      res.status(404).send();
      return;
    }
    if (req.body.status) {
      req.body.status_set_on = Date.now();
    }
    ActionItem.findOneAndUpdate(
      { _id: actionItem._id },
      req.body,
      { new: true },
      (err, actionItem) => {
        if (err) res.send(err);
        else res.json(actionItem);
      }
    );
  });
};

exports.delete_an_action_item = (req, res) => {
  ActionItem.findById(req.params.actionItem_id, (err, actionItem) => {
    if (err) {
      res.send(err);
      return;
    }
    if (!actionItem) {
      res.status(404).send();
      return;
    }
    //Add authorisation/permissions here
    ActionItem.deleteOne({ _id: actionItem._id }, (err) => {
      if (err) res.send(err);
      else {
        res.json({
          message: "Action item successfully deleted.",
        });
      }
    });
  });
};
