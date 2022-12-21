import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {io} from "socket.io-client";

declare var WebSocket: any;


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socket:any;
  public webSocket:any;
  public gpsdata:any;

  constructor() {
    // this.socket= io("http://localhost:3000",
    // {transports: ['websocket', 'polling', 'flashsocket']})
    // console.log('test')


    // this.socket.on("final", (arg:any) => {
    //   console.log(arg); // world
    //   console.log('test')
    // });

    // console.log('test')
    // this.socket= io("http://localhost:8080", {
    //   withCredentials: true,
    //   extraHeaders: {
    //     "my-custom-header": "abcd"
    //   }
    // });
   }

    // listen(eventName:string) {
    //   this.socket = io("http://localhost:3000")
    //   this.socket.on("hello", (arg:any) => {
    //   console.log(arg); // world
    //   console.log('test')
    // });
    //   this.socket.on(eventName, (data:any) => {
    //     // console.log(data)
    //     this.gpsdata=data
    //   })
    // }
   listen(eventName: string) {
    this.socket = io("http://localhost:3000")
    this.socket.on("hello", (arg:any) => {
    console.log(arg); // world
    // console.log(-6.5360378062373)
  });

    return new Observable((subscriber:any) => {
      this.socket.on(eventName, (data: any) => {
        subscriber.next(data);
        // console.log('test')
      })
    })
  }

  emit(eventName : any, data : any) {
    this.socket.emit(eventName, data);
  }


  //  public openWebSocket() {


  //   this.webSocket = new WebSocket('ws://localhost:3000');

  //   this.webSocket.addEventListener('open', (event:any) => {
  //     console.log("connected to WS server")
  //   })
  //   this.webSocket.addEventListener('message', (event:any) => {
  //     var message = JSON.parse(event.data)
  //     console.log(message)
  //   })
  // }



}
