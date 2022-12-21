// PACKAGE IMPORT
const express = require("express");
const createError = require("http-errors");
const morgan = require("morgan")
const cors = require("cors")
const dotenv = require("dotenv");


const app = express();

app.use(express.json());
// 2). Morgan Package untuk melihat request yang masuk
app.use(morgan('dev'))
    // 3). CORS
app.use(cors())
app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    let ports = server.address().port;
    console.log("App now running on port", ports);
});

const io = require('socket.io')(server, {
    cors: {
        origin: ["http://localhost:4200"],
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    },
});

io.on("connection", (socket) => {
    // send a message to the client
    socket.emit("hello","world");

    socket.on("init",(data) => {
      console.log(data)
    })

    socket.on("gps", (data) => {
        console.log(data)
        io.emit("gps-next",data)

      });


  });

