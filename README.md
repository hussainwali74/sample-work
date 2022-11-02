# submission for respond.io coding assesment 

## The tasks are divided in two folders
<hr>
### Task 1: Facebook Messenger Bot 
#### task 1: facebook chat bot

ngrok was listed as a suggestion for locally development but Facebook did not allow to use ngrok server endpoint as a callback, so I have deploy the app on heroku and used that to test: 
> HeroKU APP link: `https://respond-io-chat.herokuapp.com/`

###### run npm i after cloning the repo
###### scripts 
 -   npm run dev
 -   npm run start
 -   npm run build

##### uncomment index.ts line 14 `await seedData(myDataSource)` to seed the data to your own db (in seeder.ts line 19: uncomment lines to save data to local json file which can be used if database is not available) saves data in myjsonfile.json

##### uncomment index.ts line 14 `await seedData(myDataSource)` to seed the data to your own db
after data seeding is complete you may test the app by chatting with the facebook page:
> facebook page: `https://www.facebook.com/profile.php?id=100087197868813`  

<hr>
### Task 2: Clean and Sort the transactions 