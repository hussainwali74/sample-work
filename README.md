
### Task 1: Facebook Messenger Bot 

ngrok was listed as a suggestion for local development but Facebook did not allow to use ngrok server endpoint as a callback, so I have deployed the app on heroku and used that to test: 
> HeroKU APP link: `https://respond-io-chat.herokuapp.com/`

###### run npm i after cloning the repo
###### scripts 
 -   npm run dev
 -   npm run start
 -   npm run build

##### uncomment index.ts line 14 `await seedData(myDataSource)` to seed the data to your own db (*in seeder.ts line 19: uncomment lines to save data to local json file which can be used later if database is not available*) saves data in myjsonfile.json

after data seeding is complete you may test the app by chatting with the facebook page:
> facebook page: `https://www.facebook.com/profile.php?id=100087197868813`  


### EMAIL NOTIFICATION:
sendgrid is integrated successfully on personal email if required can give a demo with personal email

### TypeORM has been implemented for DB communication

### Nodemon integrated for development

check package.json 

---

create a .env with the following keys and your own values:
- PORT
- DB_TYPE
- DB_PORT
- DB_USERNAME
- DB_PASSWORD
- DB_NAME
- PAGE_ACCESS_TOKEN
- verifyToken
- FACEBOOK_PAGE_ID
- FACEBOOK_APP_ID
- FACEBOOK_APP_SECRET
- SENDGRID_API_KEY

---

postman collection with local api testing is available in project root folder: `respondio.postman_collection.json`

---
### SwaggerUI docs

OpenAPI swagger ui has also been implemented

> docs link <strong> <a href="https://respond-io-chat.herokuapp.com/docs/">OpenAPI documentation with SwaggerUI </a> </strong>

<br />
<br />

![image](https://user-images.githubusercontent.com/24194686/199650123-bd7b1aaa-ebb5-41b0-b463-c2628b7fdef1.png)

