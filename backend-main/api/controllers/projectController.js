const mongoose = require("mongoose");
const Project = mongoose.model("Projects");

// Access database from here, CRUD (Create, Read, Update, Delete) operations

exports.list_all_projects = (req, res) => {
  Project.find({}, (err, projects) => {
    if (err) {
      res.send(err);
    } else {
      res.json(projects);
    }
  });
};

exports.list_projects_of_a_company = (req, res) => {
  if (req.user.rights === "Administrator") {
    Project.find({ company: req.user.company_id }, (err, projects) => {
      if (err) {
        res.send(err);
      } else {
        res.json(projects);
      }
    });
  } else if (req.user.company_id) {
    Project.find(
      {
        company: req.user.company_id,
        $or: [
          { assigned_employees: mongoose.Types.ObjectId(req.user.user_id) },
          { project_managers: mongoose.Types.ObjectId(req.user.user_id) },
        ],
      },
      (err, projects) => {
        if (err) {
          res.send(err);
        } else {
          res.json(projects);
        }
      }
    );
  } else {
    Project.find(
      {
        temps: mongoose.Types.ObjectId(req.user.user_id),
      },
      (err, projects) => {
        if (err) {
          res.send(err);
        } else {
          res.json(projects);
        }
      }
    );
  }
};

exports.create_a_project = async (req, res) => {
  console.log("req.body", req.body);
  let projectToCreate = new Project({
    title: req.body.title,
    description: req.body.description,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    assigned_employees: req.body.assigned_employees,
    project_managers: req.body.project_managers,
    created_by: req.user.user_id,
    company: req.user.company_id,
    image: req.body.image,
  });
  projectToCreate
    .save()
    .then((project) => {
      console.log(project);
      res.status(200).send({
        message: "Project successufily created!",
        project_id: project._id,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send({
        message: "An error occured!",
        error: error.message,
      });
    });
};

exports.read_a_project = (req, res) => {
  Project.findById(req.params.projectid, async (err, project) => {
    if (err) {
      res.send(err);
      return;
    } else if (!project) {
      res.status(404).send();
      return;
    } else {
      await project.populate("assigned_employees");
      await project.populate("project_managers");
      res.json(project);
    }
  });
};

exports.update_a_project = (req, res) => {
  Project.findById(req.params.projectid, (err, project) => {
    if (err) {
      res.send(err);
      return;
    }
    if (!project) {
      res.status(404).send();
      return;
    }

    //Add authorisation/permissions here
    if (req.user.rights !== "Administrator") {
      console.log("unauthorised");
      console.log(req.user);
      res.status(401).send({ message: "Unauthorized access" });
      return;
    }

    Project.findOneAndUpdate(
      { _id: project._id },
      req.body,
      { new: true },
      (err, project) => {
        if (err) res.send(err);
        else res.json(project);
      }
    );
  });
};

exports.delete_a_project = (req, res) => {
  Project.findById(req.params.project_id, (err, project) => {
    if (err) {
      res.send(err);
      return;
    }
    if (!project) {
      res.status(404).send();
      return;
    }
    //Add authorisation/permissions here
    Project.deleteOne({ _id: project._id }, (err) => {
      if (err) res.send(err);
      else {
        res.json({
          message: "Project successfully deleted.",
        });
      }
    });
  });
};
