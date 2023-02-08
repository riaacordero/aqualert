# Welcome to Aqualert!
This is a software project created for CS140-1P (Software Engineering 1). Aqualert is a water utility supply complaint management system that allows you to communicate your concerns with Davao City Water District's services through a Progressive Web Application. Aqualert is built using ReactJS, Mantine UI Kit, and Firebase, and compiled through ViteJS.  

---

## Launching the app:
So, you're excited to test the app? Let me walk you through:

1) Install dependencies by `npm install`
2) Run the app by `npm run dev`
3) The URL should display in `localhost` or `IP address format.`
4) Enjoy testing!

---
## How to use?
### For the Public User:
1) Create an account using your email and billing account number registered on DCWD's database. Check your billing statement for your account number. 
  > Note: Since this project currently uses a mock data, your billing account number should be "100000" + any value ranging from 345 to 366. For example: 100000356.
2) Click on location pin to access the status drawer. Missing pin? Click on the button beside your address to locate your pin.
3) You can see your current status and the report button on the drawer. Click on the report button to access the complaint form.
4) Enter the details required. A success screen will display after sending your complaint successfully.
5) Return to the home screen. Your status should change to "Interruption Reported." Wait for your status to be changed by the admin.

### For the admin
1) Access the admin login website by clicking the "Login as admin" button on the main website.
2) Enter your login and password credentials. 
  > For testing purposes: kindly enter _"admin@gmail.com"_ as your email address and _"testadmin" as your password. We can only provide admin access through the database itself.
3) View all complaints through the table provided.
4) Click a complaint to review its details and location on map on the right side of the screen.
5) To set a status, click on the dropdown menu and select the applicable status for the complaint provided. 
6) Click "Set Status." A notification should appear at the bottom of the screen. Changes will reflect instantly on the table.
7) For users: Refresh the app to check the status update.

---

### What are we missing?
- Status history and notifications are not yet enabled.


---
## Meet the Developers!
- **Ria Cordero**
   - **Contributions:** Full front-end and part-backend development
   - GDSC Mapúa-MCM's Lead. An freelance illustrator, full-time student and aspiring front-end web/software developer. Connect with me via [LinkedIn](https://www.linkedin.com/in/riritheartist/) and [GitHub](https://github.com/riaacordero).

- **John Joshua Mesia**
   - **Contributions:** Full backend development, algorithm design
   - GDSC Mapúa-MCM's Technical Officer. Connect with me via [GitHub](https://github.com/Jjmesia).

- **Angelie Badar**
   - **Contributions:** Full front-end development
   - GDSC Mapúa-MCM's Project Development Officer. Connect with me via [GitHub](https://github.com/rasangelie).

---
© 2023 [Ria](https://github.com/riaacordero), [Joshua](https://github.com/Jjmesia), & [Angelie](https://github.com/rasangelie)
