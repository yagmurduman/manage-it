# Manage-IT
Please follow the instructions below to run the frontend of our web application.
###  Instructions (project setup)
* Before proceeding to read, please make sure you start the backend server as it is described [here](https://gitlab.lrz.de/seba-master-2022/team-41/backend/-/blob/main/README.md).
* In the project directory, run the following command to install the required packages:
    * ```npm install```
* Start the frontend server with either of the commands below:
    * ```npm start ``` 
    * ```npm run serve ``` 
    * These commands will launch the frontend of Manage-IT on (unless otherwise configured) port 8080 (unless configured otherwise).
    * After running the last command, open up [http://localhost:8080](http://localhost:8080) to view the application in your browser.

* Hint: You can use this demo account to get a feeling of the features we have: manageit-demo@gmail.com with the password "demoaccount" 
* You should now be able to see the homepage as shown below.
![Manage-IT Home Page](https://gitlab.lrz.de/seba-master-2022/team-41/frontend/-/raw/main/src/assets/img/home_page/home.png)
#### Registration
* Administrators register to the platform on behalf of the company. Using the **Register Your Company** button on the navigation bar, the administrators are prompted with a new page, where they receive a registration email to the platform by filling out the form.
![SignUp](https://gitlab.lrz.de/seba-master-2022/team-41/frontend/-/raw/main/src/assets/img/project_creation/signup.png)
* After the registration, registration process continues with administrators filling out the form below.
![Registration Form](https://gitlab.lrz.de/seba-master-2022/team-41/frontend/-/raw/main/src/assets/img/project_creation/registration-form.png)
* Now, the admin is registered to the platform and are authorized for sign in. Administrators can now login to the system using the **Login** button on the navigation bar.
* After logging in to the system using the side bar on the right, a new project can be created. On the new page, project creation form is displayed.
![Side Bar](https://gitlab.lrz.de/seba-master-2022/team-41/frontend/-/raw/main/src/assets/img/project_creation/sidebar.png)
### Project Creation
* As you can see, the admins assign a project manager and employees to the project as well as several properties such as title, description, start date and due date of the project using the form mentioned above. Once the project is created, the page navigates to Stripe checkout session.
* On the checkout page, there are two options; one-time-payment and subscription payment models. We use [Stripe Checkout API](https://stripe.com/docs/payments/checkout) for both of these payment models.
![Checkout Options](https://gitlab.lrz.de/seba-master-2022/team-41/frontend/-/raw/main/src/assets/img/checkout/checkout-options.png)
* Once one of the payment models is selected, the user lands on the Stripe checkout session.
* Once navigated to the checkout session, card number 4242 4242 4242 4242, a valid expiry date and any CVV to make a transaction can be used. If have a credit card is saved on the browser, the session supports Google Pay for the payment models as well.
![Checkout Session](https://gitlab.lrz.de/seba-master-2022/team-41/frontend/-/raw/main/src/assets/img/checkout/checkout-session.png)
* If successful, a success view for checkout is displayed.
![Checkout Success](https://gitlab.lrz.de/seba-master-2022/team-41/frontend/-/raw/main/src/assets/img/checkout/successful-checkout.png)

### Employee Creation
* From the side bar, **Manage Employees** button is clicked. The user lands on the add employee page, where new employees can be added and existing employees can be removed or updated according to the user preferences.
![Employee Default](https://gitlab.lrz.de/seba-master-2022/team-41/frontend/-/raw/main/src/assets/img/employee_creation/employee-default.png)
* Adding an employee is straightforward. An employee can be added by clicking **Add Employee** button on the page. Add employee modal appears and the form is filled out.
![Add Employee](https://gitlab.lrz.de/seba-master-2022/team-41/frontend/-/raw/main/src/assets/img/employee_creation/add-employee.png)
* Once the form is filled out, the employee receives a registration e-mail and registers a new account with prefilled information.
![Employee Signup](https://gitlab.lrz.de/seba-master-2022/team-41/frontend/-/raw/main/src/assets/img/employee_creation/employee-signup.png)
* The employee table is then updated accordingly.
![Employee Updated](https://gitlab.lrz.de/seba-master-2022/team-41/frontend/-/raw/main/src/assets/img/employee_creation/employee-updated.png)
* Employee page supports a number of update operations including modification of username, first name, last name and email. Employees can also reset their password.
![Employee Update Modal](https://gitlab.lrz.de/seba-master-2022/team-41/frontend/-/raw/main/src/assets/img/employee_creation/employee-update-modal.png)

### Backlog Creation
* Backlog items can be instantiated from the sidebar with a click on **Backlog**. On the new page, backlog items can be expanded to see their attributes on the dropdown. The attributes of a backlog item are displayed such as priority, description, date and creator name.
![Backlog Default](https://gitlab.lrz.de/seba-master-2022/team-41/frontend/-/raw/main/src/assets/img/backlog_creation/backlog-default.png)
* Backlog items support update operations similar to the projects and can also be deleted.
![Backlog Edit](https://gitlab.lrz.de/seba-master-2022/team-41/frontend/-/raw/main/src/assets/img/backlog_creation/backlog-edit.png)

### Action Items
* Action items can be derived from the backlog as shown below.
![AI Default](https://gitlab.lrz.de/seba-master-2022/team-41/frontend/-/raw/main/src/assets/img/action_items/ai-default.png)
* Created action items are immediately available on the action item table.
![AI Table](https://gitlab.lrz.de/seba-master-2022/team-41/frontend/-/raw/main/src/assets/img/action_items/ai-table.png)
* Action items are editable when clicked on the action item displayed on the table.
![AI Edit](https://gitlab.lrz.de/seba-master-2022/team-41/frontend/-/raw/main/src/assets/img/action_items/ai-edit.png)

### Dashboard
* Dashboard display is fully project-specific. Number of action items sorted by their status (deferred, started, not started and completed) is displayed on the cards as well as number of backlogs associated with the project.
![Dashboard Upper](https://gitlab.lrz.de/seba-master-2022/team-41/frontend/-/raw/main/src/assets/img/dashboard/dashboard-uppersec.png)
* The application shows the distribution of action items according to their status in sync and area charts as well as the distribution by 
action item priority on a pie chart.
* Finally, the organizational chart is displayed at the bottom of the page, showing the administrator - project manager and employee chain from root to the leaves.
![Dashboard Bottom](https://gitlab.lrz.de/seba-master-2022/team-41/frontend/-/raw/main/src/assets/img/dashboard/dashboard-bottomsec.png)


### Consultation Sessions
* We offer personal consultation sessions by our personal consultants. Consultants with their hourly rate and specialized slot is shown to the user.
![Consultant Default](https://gitlab.lrz.de/seba-master-2022/team-41/frontend/-/raw/main/src/assets/img/consultants/consultant-default.png)
* Once selected, consultant profile is displayed.
![Consultant Profile](https://gitlab.lrz.de/seba-master-2022/team-41/frontend/-/raw/main/src/assets/img/consultants/consultant.png)
* Consultants can also view their profiles on the platform to update their availabilities.
![Consultant Update](https://gitlab.lrz.de/seba-master-2022/team-41/frontend/-/raw/main/src/assets/img/consultants/consultant-availability.png)
