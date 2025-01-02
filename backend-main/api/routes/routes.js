const userBuilder = require("../controllers/userController");
const actionItemBuilder = require("../controllers/actionItemController");
const backlogItemBuilder = require("../controllers/backlogController");
const companyBuilder = require("../controllers/companyController");
const projectBuilder = require("../controllers/projectController");
const authentication = require("../controllers/authController");
const checkout_session = require("../controllers/checkoutController");
const consultantBuilder = require("../controllers/consultantsController");

module.exports = (app, guard, authoriser) => {
  //Add the guard to all get/post requests where the user has to be authenticated

  app
    .route("/users")
    .get(guard, userBuilder.list_employees_of_a_company)
    .post(userBuilder.create_a_user);

  app
    .route("/projectUsers/:projectid")
    .get(guard, userBuilder.list_employees_of_a_project)
    .put(guard, projectBuilder.update_a_project);

  app
    .route("/projectPm/:projectid")
    .get(guard, userBuilder.list_pm_of_a_project);

  app
    .route("/user/:user_id")
    .get(guard, userBuilder.read_a_user)
    .put(guard, userBuilder.update_a_user)
    .delete(guard, userBuilder.delete_a_user);

  app.route("/userImage/:user_id").get(guard, userBuilder.get_user_image);

  app.route("/userContact").post(userBuilder.send_contact_form_mail);

  app
    .route("/assigneesActionItems/:actionItem_id")
    .get(guard, userBuilder.list_assignees_of_an_action_item);

  app
    .route("/companies")
    .get(guard, companyBuilder.list_all_companies)
    .post(companyBuilder.create_a_company);

  app.route("/createCompanyUser").post(companyBuilder.create_company_and_user);

  app
    .route("/projects") // Needs to add authorisation middleware
    .get(guard, projectBuilder.list_projects_of_a_company)
    .post(guard, projectBuilder.create_a_project);

  app
    .route("/projects/:projectid")
    .get(guard, projectBuilder.read_a_project)
    .put(guard, projectBuilder.update_a_project)
    .delete(guard, projectBuilder.delete_a_project);

  app
    .route("/comapny/:company_id")
    .get(guard, companyBuilder.read_a_company)
    .delete(guard, companyBuilder.delete_a_company);

  app
    .route("/backlog")
    .get(guard, backlogItemBuilder.list_all_backlog_items)
    .post(guard, backlogItemBuilder.create_a_backlog_item);

  app
    .route("/backlog/:backlogItem_id")
    .get(guard, backlogItemBuilder.read_a_backlog_item)
    .put(guard, backlogItemBuilder.update_a_backlog_item)
    .delete(guard, backlogItemBuilder.delete_a_backlog_item);

  app
    .route("/actionitems")
    .get(guard, actionItemBuilder.list_all_action_items)
    .post(guard, actionItemBuilder.create_an_action_item);

  app
    .route("/actionitem/:actionItem_id")
    .get(guard, actionItemBuilder.read_an_action_item)
    .put(guard, actionItemBuilder.update_an_action_item)
    .delete(guard, actionItemBuilder.delete_an_action_item);

  app
    .route("/verifyRefreshToken")
    .post(guard, authentication.verifyRefreshToken);

  app
    .route("/createRegisterationLink")
    .post(guard, userBuilder.create_registeration_link);

  app
    .route("/createUserFromRegisterationLink")
    .post(userBuilder.create_user_from_registeration_link);

  app.route("/login").post(authentication.login);

  app.route("/forgot").post(authentication.generatePassToken);

  app.route("/verifyCompany").post(authentication.generateVerificationToken);

  app.route("/updatePassword").post(authentication.updatePassowrd);

  // checkout session for one-time-payments
  app
    .route("/bookconsultationsession")
    .post(guard, checkout_session.bookConsultationSession);

  // checkout session for one-time-payments
  app
    .route("/checkconsultationbookingstatus")
    .post(guard, checkout_session.checkConsultationBookingStatus);

  // checkout session for one-time-payments
  app.route("/onetimepayment").post(guard, checkout_session.checkoutpay);

  // checkout session for subscriptions
  app.route("/subscription").post(guard, checkout_session.checkoutsubscribe);

  // get session state after payment
  app.route("/success").post(guard, checkout_session.checksessionstatus);

  app.route("/consultants").get(guard, consultantBuilder.list_all_consultants);

  app
    .route("/consultant/:consultant_id")
    .get(guard, consultantBuilder.read_a_consultant)
    .put(guard, consultantBuilder.update_a_consultant)
    .post(guard, consultantBuilder.get_consultant_by_userId);

  app
    .route("/consultant_availability")
    .put(guard, consultantBuilder.update_consultant_availability);

  app
    .route("/createConsultantAccount")
    .post(guard, consultantBuilder.create_temp_account);

  app
    .route("/addConsultantReview/:consultant_id")
    .post(guard, consultantBuilder.add_a_review);

  // get backlogs for a project
  app
    .route("/projectBacklogs/:project_id")
    .get(guard, backlogItemBuilder.list_project_backlogs);

  // get action items for a project
  app
    .route("/projectActionItems/:project_id")
    .get(guard, actionItemBuilder.list_project_action_items);

  // get action items for a project
  app
    .route("/backlogActionItems/:backlogItem_id")
    .get(guard, actionItemBuilder.list_backlog_action_items);
};
