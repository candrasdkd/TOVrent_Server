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
DB_HOST = "HOST"
DB_USER = "USER"
DB_PASSWORD = ""
DB_DATABASE = "DATABASE"
SECRET_KEY = KEY
SECRET_PORT = PORT

EMAIL_SENDER = "EMAIL"
PASSWORD_SENDER = "PASSWORD"
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

- [("/")](http://localhost:8000/) is the base route.
- [("/auth")](https://documenter.getpostman.com/view/16864421/UV5WEJc9#5abd0c28-d996-44fe-ae81-69a4087da3a1) is the route which handles anything related to authentication (Login, Register, Logout, Forgot Password).
- [("/users")](https://documenter.getpostman.com/view/16864421/UV5WEJc9#43335b07-61ef-49f1-b64e-585049cb6a2b) handles requests involving user data, such as profile.
- [("/vehicle")](https://documenter.getpostman.com/view/16864421/UV5WEJc9#7fafa750-5949-4a58-a228-ffa93edbdc54) handle requests involving request data, such as vehicle data, add vehicle, edit vehicle.
- [("/history")](https://documenter.getpostman.com/view/16864421/UV5WEJc9#7fafa750-5949-4a58-a228-ffa93edbdc54) manages requests related to the all history users.
  <br>

### **RELATED PROJECT(S)**

- [TOVrent Front-end](https://github.com/candrasdkd/TOVrent_Web)
