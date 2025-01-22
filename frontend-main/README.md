# Manage-IT
Please follow the instructions below to run the frontend of our web application.
###  Instructions (project setup)
* Before proceeding to read, please make sure you start the backend server as it is described [here](https://github.com/yagmurduman/manage-it/tree/main/backend-main#readme).
* In the project directory, run the following command to install the required packages:
    * ```npm install```
* Start the frontend server with either of the commands below:
    * ```npm start ``` 
    * ```npm run serve ``` 
    * These commands will launch the frontend of Manage-IT on (unless otherwise configured) port 8080 (unless configured otherwise).
    * After running the last command, open up [http://localhost:8080](http://localhost:8080) to view the application in your browser.

* Hint: You can use this demo account to get a feeling of the features we have: manageit-demo@gmail.com with the password "demoaccount" 
* You should now be able to see the homepage as shown below.

![image](https://github.com/user-attachments/assets/7d727f38-53a7-419a-813f-3a023e0cad45)
#### Registration
* Administrators register to the platform on behalf of the company. Using the **Register Your Company** button on the navigation bar, the administrators are prompted with a new page, where they receive a registration email to the platform by filling out the form.
  
![image](https://github.com/user-attachments/assets/0c3a3b92-0ca3-43a3-b7bd-87003d1b13c6)

* After the registration, registration process continues with administrators filling out the form below.
  
![image](https://github.com/user-attachments/assets/01fa9724-dfda-4d22-917e-bb3dc85e23e3)
* Now, the admin is registered to the platform and are authorized for sign in. Administrators can now login to the system using the **Login** button on the navigation bar.
* After logging in to the system using the side bar on the right, a new project can be created. On the new page, project creation form is displayed.
  
![image](https://github.com/user-attachments/assets/9dcb362d-ed70-49b5-a550-653e5ba64f6f)
### Project Creation
* As you can see, the admins assign a project manager and employees to the project as well as several properties such as title, description, start date and due date of the project using the form mentioned above. Once the project is created, the page navigates to Stripe checkout session.
* On the checkout page, there are two options; one-time-payment and subscription payment models. We use [Stripe Checkout API](https://stripe.com/docs/payments/checkout) for both of these payment models.
  
![image](https://github.com/user-attachments/assets/d556fc31-3f15-4b48-a12e-b4846a8db92e)
* Once one of the payment models is selected, the user lands on the Stripe checkout session.
* Once navigated to the checkout session, card number 4242 4242 4242 4242, a valid expiry date and any CVV to make a transaction can be used. If have a credit card is saved on the browser, the session supports Google Pay for the payment models as well.
  
![image](https://github.com/user-attachments/assets/44b0331b-dca4-4159-bb5b-94f7fb1196e8)
* If successful, a success view for checkout is displayed.
  
![image](https://github.com/user-attachments/assets/c877c594-423b-4246-91ac-fa12462aba31)

### Employee Creation
* From the side bar, **Manage Employees** button is clicked. The user lands on the add employee page, where new employees can be added and existing employees can be removed or updated according to the user preferences.
  
![image](https://github.com/user-attachments/assets/dfb12729-cc7d-4508-90a8-5e7558410e6c)
* Adding an employee is straightforward. An employee can be added by clicking **Add Employee** button on the page. Add employee modal appears and the form is filled out.
  
![image](https://github.com/user-attachments/assets/0d652243-7edc-4fc7-85dd-c4343d5f67ba)
* Once the form is filled out, the employee receives a registration e-mail and registers a new account with prefilled information.
  
![image](https://github.com/user-attachments/assets/1d797bd7-fc23-4809-81d4-30e9c78ab767)
* The employee table is then updated accordingly.
  
![image](https://github.com/user-attachments/assets/21c88cec-ea53-4817-9c71-6f6c89994edb)
* Employee page supports a number of update operations including modification of username, first name, last name and email. Employees can also reset their password.
  
![image](https://github.com/user-attachments/assets/2f34c87c-c6ed-4792-a9a8-e83fe5aa04f3)

### Backlog Creation
* Backlog items can be instantiated from the sidebar with a click on **Backlog**. On the new page, backlog items can be expanded to see their attributes on the dropdown. The attributes of a backlog item are displayed such as priority, description, date and creator name.
* Backlog items support update operations similar to the projects and can also be deleted.
  
![image](https://github.com/user-attachments/assets/887f0181-47fb-45b1-969c-5ab25fc266f4)

### Action Items
* Action items can be derived from the backlog as shown below.
  
![image](https://github.com/user-attachments/assets/fbdf4f5c-ddda-4e4b-82f5-a492b775ead9)
* Created action items are immediately available on the action item table.
  
![image](https://github.com/user-attachments/assets/6a2595e0-1be2-4b99-8253-5a56751f9c6c)
* Action items are editable when clicked on the action item displayed on the table.
  
![image](https://github.com/user-attachments/assets/fa4ae8c6-712a-4260-a66b-39490617d962)

### Dashboard
* Dashboard display is fully project-specific. Number of action items sorted by their status (deferred, started, not started and completed) is displayed on the cards as well as number of backlogs associated with the project.
  
![image](https://github.com/user-attachments/assets/ce005a9c-b3a1-4359-b9c9-6bb17a4144ae)
* The application shows the distribution of action items according to their status in sync and area charts as well as the distribution by 
action item priority on a pie chart.
* Finally, the organizational chart is displayed at the bottom of the page, showing the administrator - project manager and employee chain from root to the leaves.
  
![image](https://github.com/user-attachments/assets/329378e0-8955-4028-b0a9-293eb70ddf21)


### Consultation Sessions
* We offer personal consultation sessions by our personal consultants. Consultants with their hourly rate and specialized slot is shown to the user.
  
![image](https://github.com/user-attachments/assets/02df8d9c-2b8f-49e2-a978-65a0ab799312)
* Once selected, consultant profile is displayed.
  
![image](https://github.com/user-attachments/assets/3dc9e914-3de6-4412-b9ff-64e6609747eb)
* Consultants can also view their profiles on the platform to update their availabilities.
  
![image](https://github.com/user-attachments/assets/c797b358-8056-40af-a6c4-89342dd304d8)
