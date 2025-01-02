const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    first_name: String,
    last_name: String,
    username: String,
    email: String,
    salt: String,
    password: String,
    rights: {
      type: String,
      enum: ["Employee", "Administrator", "Consultant"],
      default: "Employee",
    },
    bookings: [
      {
        date: String,
        time: String,
        consultant: { type: Schema.Types.ObjectId, ref: "Consultants" },
        project: { type: Schema.Types.ObjectId, ref: "Projects" },
      },
    ],
    image: String,
    expireAt: {
      type: Date,
      default: null,
    },
  },
  { collection: "Users", timestamps: true }
);

const companySchema = new Schema(
  {
    company_name: String,
    company_email_address: { type: String, unique: true },
    street_name: String,
    house_number: String,
    postcode: String,
    city: String,
    country: String,
    employees: [{ type: Schema.Types.ObjectId, ref: "Users" }], //foreign key referencing users: one to many
    administrator: { type: Schema.Types.ObjectId, ref: "Users" },
    subscribed_on: String,
    subscription_id: String,
    temps: [{ type: Schema.Types.ObjectId, ref: "Users" }],
  },
  { collection: "Companies", timestamps: true }
);

const projectSchema = new Schema(
  {
    title: String,
    description: String,
    start_date: String,
    end_date: String,
    assigned_employees: [{ type: Schema.Types.ObjectId, ref: "Users" }], //foreign key referencing employees/users: one to many
    project_managers: [{ type: Schema.Types.ObjectId, ref: "Users" }], //foreign key referencing employees/users: one to many
    created_by: { type: Schema.Types.ObjectId, ref: "Users" },
    company: { type: Schema.Types.ObjectId, ref: "Companies" }, //foreign key referencing the company
    payment_status: {
      type: String,
      enum: ["one time", "subscription", "unpaid"],
      default: "unpaid",
    },
    image: String,
    temps: [{ type: Schema.Types.ObjectId, ref: "Users" }],
  },
  { collection: "Projects", timestamps: true }
);

const backlogSchema = new Schema(
  {
    title: String,
    description: String,
    priority: String,
    due_date: String,
    created_by: { type: Schema.Types.ObjectId, ref: "Users" },
    project: { type: Schema.Types.ObjectId, ref: "Projects" },
  },
  { collection: "Backlogs", timestamps: true }
);

const actionItemSchema = new Schema(
  {
    title: String,
    description: String,
    comments: String,
    priority: String,
    status: {
      type: String,
      enum: ["Not Started", "In Progress", "Completed", "Deferred"],
      default: "Not Started",
    },
    status_set_on: String,
    due_date: String,
    start_date: String,
    assignees: [{ type: Schema.Types.ObjectId, ref: "Users" }], //foreign key referencing users: one to many
    created_by: { type: Schema.Types.ObjectId, ref: "Users" },
    backlog_item: { type: Schema.Types.ObjectId, ref: "Backlogs" },
    project: { type: Schema.Types.ObjectId, ref: "Projects" }, // foreign key references project
  },
  { collection: "ActionItems", timestamps: true }
);

const consultantSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "Users" },
    specialized_area: String,
    description: String,
    hourly_rate: String,
    availability: [
      {
        user_id: { type: Schema.Types.ObjectId, ref: "Users" },
        project_id: { type: Schema.Types.ObjectId, ref: "Projects" },
        date: String,
        time: String,
        is_free: {
          type: Boolean,
          default: false,
        },
      },
    ],
    reviews: [
      {
        title: String,
        user: { type: Schema.Types.ObjectId, ref: "Users" },
        review: String,
        rating: String,
      },
    ],
  },
  { collection: "Consultants", timestamps: true }
);

const Users = mongoose.model("Users", userSchema);
const Backlogs = mongoose.model("Backlogs", backlogSchema);
const ActionItems = mongoose.model("ActionItems", actionItemSchema);
const Companies = mongoose.model("Companies", companySchema);
const Projects = mongoose.model("Projects", projectSchema);
const Consultants = mongoose.model("Consultants", consultantSchema);

module.exports = {
  Users,
  Backlogs,
  ActionItems,
  Companies,
  Projects,
  Consultants,
};
