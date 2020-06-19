This repository was made for me to practice programming, with this small project I was able to solidify some of my knowledge and I hope it serves to solve doubts about the technologies I used. <br />

## To Run Locally
Clone this repository
>git clone https://github.com/OliveiraCleidson/AuthenticationProject.git

Install the Dependencies
>npm install

Edit the Configurations of Database in 
>src/database/config/config.json

In database folder run
>npx sequelize-cli db:migrate

In root folder run
>nodemon app.js

##### This Project use the following technologies:

# **Express**
Express was used for provide HTTP utility methods and easy use of middleware.

# Sequelize
Sequelize is a ORM, it was used for controlling of database. I used Sequelize because I did want learn about this.

# Celebrate
Celebrate is an express middleware, it was used for validation of requests. I used Celebrate because the API need security in your requests.

# Passport
Passport is authentication middleware, it was used with Bearer Strategy for protect the access the API. I did use it because I did want learn about authentication.


