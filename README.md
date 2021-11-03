# **TOVrent project**

TOVrent is a vehicle rental website and application, this first my project in arkademy batch 23

### **Create Files Based on Modularisasi**
BACKEND DEVELOPER VERSION 

A. First step prepare tool 

1. Visual Code (https://code.visualstudio.com/)
2. NodeJs (https://nodejs.org/en/download/)
3. MySQL/Oracle/Prosgate/other
4. Postman (https://www.postman.com/downloads/)
5. XAMPP (option) (https://www.apachefriends.org/index.html)

----

B. First Create files & method request
1. Create folder TOVrent
2. Open visual code, then create file index.js in folder TOVrent, and open terminal write **npm init** to install file package.json, after that install **npm i express** create node_modules and package-lock.json, then install {**npm i morgan, npm i mysql, npm i dotenv**} morgan for monitor status in terminal, mysql for connect to mysql database, dotenv for secret your database/other
3. Create folders routes, models, handlers, database, middlewares, helper because I want to use files by function
4. Create files based on folder functions and individual needed
5. Don't forget to use the method request **GET, POST, PATCH, DELETE** in the desired **files**

----

C. Second Otentikasi dan Otorisasi, CORS, Multer
1. Install package **npm i jsonwebtoken bcrypt multer cors**, function jsonwebtoken for create access token, bcrypt for create normal password become random password (hash), multer for can use function upload something, cors for another server can access from original server
2. Create file **user** and **auth**, in each file **user** and **auth** is used to make login, register, and upload

----

D. Thrid How to Deploy With AWS
1. Have account aws and download putty (https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html)
2. Create instance EC2, finish the procces *Amazon Machine Image (Ubuntu/any), Instance Type, Configure Instance, Add Storage, Add Storage, Configure Security Group, Review*. If the procces done download **KEY PAIR** and save it   
3. Open PuTTY Configuration and PuTTY Key Generator, first PuTTY Key Generator choose load search your **KEY PAIR** if don't have private key can create it, then PuTTY Configuration check "connection" > "ssh" > "auth" > browse (enter the private key that has been created), if done enter the private key back to "session" hostname obtained from AWS open instance and choose connect(SSH CLIENT) copy id and create saved session for checpoint if connection problem
4. After that click button "OPEN" wait until terminal ubuntu comes out
5. Always check update ubuntu (**check sudo apt update**), if need upgrade (**sudo apt upgrade -y**) 
6. Check git, nodeJs, and mysql




