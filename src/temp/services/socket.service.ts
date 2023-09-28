import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

declare var ROSLIB:any;

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  public socket:any
  constructor() { }

  connect(){
    this.socket=io('http://localhost:3000');

    // Connect to rosbridge and setup the roslib library
this.socket.on('connect', () => {
  const ros = new ROSLIB.Ros({
    url: 'ws://192.168.33.132:3000'
  });
  })
}

}
