## Installation 

1. Install Node js and NPM from browser 
[Download Node js](https://nodejs.org/en/).
check node js and npm version :
```bash
node -v
npm -v
```
2. install Angular cli
```bash
npm i @angular/cli
```
3. install Socket IO library
```bash
npm i socket.io
```
4. install openlayers library
```bash
npm i ol
```
5. install express
```bash
npm install express
```

## Running Program 
if the server running websocket is in the same device as the angular app then we need two terminal to run the program (one to run node server and the other for running the frontend angular) 

1. Running Node to start the server
make sure the directory is on ../server 
```bash
node server.js
```
**Note: this is done if the server running websocket is in the same device as the angular app, skip this if the server is already running on other device

2. Running Angular 
make sure the directory is on ../
```bash
ng serve
```
**Note: to make sure the websocket connection established please turn off the firewall on your computer
