// PACKAGE IMPORT
const express = require("express");
const createError = require("http-errors");
const cors = require("cors")
const dotenv = require("dotenv");
// const map = require("./routes/map")
const WebSocket = require("ws")


const app = express();

app.use(express.json());

    // CORS
app.use(cors())
// app.use('/map',map)

app.get('/',function(req,res){
  res.send('this is from server')
})

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

// create WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

// connect to other WebSocket server
const rosbrg = new WebSocket('ws://192.168.18.43:9090');

// handle WebSocket server connection
wss.on('connection', function connection(ws) {
  console.log('Client connected');

  // handle WebSocket server message
  ws.on('message', function incoming(message) {
    // console.log(`Received message: ${message}`);

    // send message to other WebSocket server
    rosbrg.send(message);
  });

  // handle other WebSocket server message
  rosbrg.on('message', function incoming(message) {
    console.log(`Received message from other server: ${message}`);


    // send message to client
    ws.send(message);
  });

  // handle WebSocket server close
  ws.on('close', function close() {
    console.log('Client disconnected');
  });
});


// Make an event connection when client connected
io.on("connection", (socket) => {

    // Send a message to the client at "hello" event
    socket.emit("hello","world");

    socket.on("save-map",(data) => {
        console.log(data)

        io.emit("savemp", data)
    })

    socket.on("load-map",(data) => {
      console.log(data)

      io.emit("loadmp", data)
  })


  });

