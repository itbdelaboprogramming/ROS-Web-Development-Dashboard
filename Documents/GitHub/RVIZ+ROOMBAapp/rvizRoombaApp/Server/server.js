const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const ROSLIB = require('roslib');
// const easeljs = require('../src/assets/easeljs')
// const eventemitter2 = require('../src/assets/eventemitter2.min.js')

// Connect to rosbridge instance
io.on('connection', socket => {
  const ros = new ROSLIB.Ros({
    url: 'ws://192.168.18.43:9090'
  });

  // Use roslib to subscribe to topics, call services, etc.
});

server.listen(3000, () => {
  console.log('Express server listening on port 3000');
});
