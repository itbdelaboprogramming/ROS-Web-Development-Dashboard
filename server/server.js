// PACKAGE IMPORT
const express = require("express");
const createError = require("http-errors");
const morgan = require("morgan")
const cors = require("cors")
const dotenv = require("dotenv");


const app = express();

app.use(express.json());
// Morgan Package untuk melihat request yang masuk
app.use(morgan('dev'))
    // CORS
app.use(cors())
app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
});

// Open server on port 3000
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    let ports = server.address().port;
    console.log("App now running on port", ports);
});

// Setup Socket IO and CORS handler
const io = require('socket.io')(server, {
    cors: {
        origin: ["http://localhost:4200"],
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    },
});

// Make an event connection when client connected
io.on("connection", (socket) => {

    // Send a message to the client at "hello" event
    socket.emit("hello","world");

    //  // Listen to a message at "init" event from client
    // socket.on("init",(data) => {
    //   console.log(data)
    // })

    // Listen to gps data at "gps" event from raspberry pi client
    socket.on("gps", (data) => {
        console.log(data)

         // Send received gps data in "gps-next" event in order to be received by angular app client
        io.emit("gps-next",data)

      });


  });

