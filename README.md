### NodeJS-course
The repository contains 4 projects completed under [The Complete Node.js Developer Course](https://www.udemy.com/course/the-complete-nodejs-developer-course-2/) on Udemy.

## 1. Notes App
This is a Note taking app built using Node.js. It uses Filesystem module to store notes locally in a JSON file, and supports Add, Remove, Read and List operations on the command line interface. NPM packages [Yargs](https://www.npmjs.com/package/yargs) and [Chalk](https://www.npmjs.com/package/chalk) have been used to make the command line interface efficient and aesthetic.

## 2. Weather App
This is a Live Weather Broadcasting app built using Express.js, Node.js and Handlebars. It generates the current weather conditions and temperature at any given place using [Mapbox](https://www.mapbox.com) and [WeatherStack](https://www.weatherstack.com) APIs. NPM packages [Request](https://www.npmjs.com/package/request) and [hbs](https://www.npmjs.com/package/hbs) have been used in this app. The app is currently hosted [here](https://kanungo-weather-app.herokuapp.com/).

## 3. Task App
This is a comprehensive backend setup of a Task management app built using a MongoDB database and an Express.js server.It stores Users and Tasks in a MongoDB database deployed on Atlas and supports CRUD operations along with User Authentication. NPM packages [Mongoose](https://www.npmjs.com/package/mongoose), [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken), [Bcrypt.js](https://www.npmjs.com/package/bcryptjs), [Validator](https://www.npmjs.com/package/validator), [Multer](https://www.npmjs.com/package/multer) and [Sharp](https://www.npmjs.com/package/sharp) were used in this project. The server is currently hosted [here](https://kanungo-task-app.herokuapp.com/). The endpoints supported on the server are listed in the [Postman](https://www.postman.com/) collection [here](https://www.getpostman.com/collections/0ecc8d099ba03168df9d).

## 4. Chat App
This is a Real Time Chat app built using Web Sockets. The complete and easy to use framework for building web sockets provided by [Socket.io](https://socket.io/) has been used in the app in the form of an NPM module. Users can join Rooms identified by unique names, chat with other users present in the room and share their current location with them. The app is currently hosted [here](https://kanungo-chat-app.herokuapp.com/). 