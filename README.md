# **TOVrent - BACKEND**
<p align="center">
  <img src="public/images/icon/tov.png" />
</p>

<br>

TOVrent is an example of various vehicle rental websites aimed at helping people make it easier if they want to rent a vehicle while on vacation or rent a vehicle for their hobbies

<br>

### **BUILT WITH**

---

- [Node.js (JavaScript Runtime)](https://nodejs.org/en/)
- [Express.js (Back-end Web Application Framework)](https://expressjs.com/)
- [MySQL (Database)](https://www.mysql.com/)
- [Multer (Upload Middleware)](https://www.npmjs.com/package/multer)
- [Socket.io (Realtime)](https://socket.io/docs/v4/server-installation/)
- [Nodemailer (OTP)](https://nodemailer.com/about/)

### **TOOLS**

---

- [Visual Studio Code](https://code.visualstudio.com/)
- [XAMPP](https://www.apachefriends.org/index.html)
- [Postman](https://www.postman.com/)

### **INSTALLATION**

---

STEP 1 : Add this folder in local computer

```
git clone https://github.com/candrasdkd/TOVrent_Server.git
```

STEP 2 : Install module & Package

```
yarn install
```

STEP 3 : Install DOTENV

```
yarn add dotenv
```

STEP 4 : create ENV

```
DB_HOST = "YOUR HOST"
DB_USER = "YOUR USER "
DB_PASSWORD = ""
DB_DATABASE = "DATABASE"
SECRET_KEY = KEY
SECRET_PORT = PORT

EMAIL_SENDER = "YOUR EMAIL SENDER"
PASSWORD_SENDER = "YOUR PASSWORD SENDER"
```

### **HOW TO RUN**

---

You'll need to run

```
yarn start
```

The application will run on the designated port. Since we used the 8000 port to run the backend, it should run on [http://localhost:8000/](http://localhost:8000/).
<br>

### **AVAILABLE ROUTES**

---

[link dokumentasi postman](https://documenter.getpostman.com/view/16864421/UVC2Fo1U)
There are four main routes, with each route stemming from the base route in this application.

- [("/")] is the base route.
- [("/auth")] is the route which handles anything related to authentication (Login, Register, Logout, Forgot Password).
- [("/users")]handles requests involving user data, such as profile.
- [("/vehicle")] handle requests involving request data, such as vehicle data, add vehicle, edit vehicle.
- [("/history")] manages requests related to the all history users.
  <br>

### **RELATED PROJECT(S)**

- [TOVrent Front-end](https://github.com/candrasdkd/TOVrent_Web)
