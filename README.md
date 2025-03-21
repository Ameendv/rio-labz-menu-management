# Food Menu Management System

A **Node.js** application with **MongoDB** for managing a **food menu**, with role-based access for **admin** and **users**.

## Features  
✅ **Admin Functionalities:**  
- Login using pre-added credentials.  
- Add, edit, and manage **categories** and **menu items**.
- Nested level sub categories can be added
- View all users and change their roles (make a user an admin).  

✅ **User Functionalities:**  
- Sign up and login.  
- View the **publicly available** food menu.  
- Edit their profile (update email and password).  

✅ **Authentication & Authorization:**  
- **JWT-based authentication** (access token required for all requests except public menu view).  
- **Role-based authorization** (admins have full control, users have limited access).  

---

## Admin Credentials (Pre-Added)  
📧 **Email:** `admin@gmail.com`  
🔑 **Password:** `123123123`  

---

## API Documentation

You can access the API documentation for this project using the following link:

[Postman API Documentation](https://documenter.getpostman.com/view/21629284/2sAYkGLeqN)
