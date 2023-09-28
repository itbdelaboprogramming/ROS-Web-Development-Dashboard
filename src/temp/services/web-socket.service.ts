import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  public socket:any

  constructor() { }

  Init() {

    this.socket = io("http://localhost:3000")
    this.socket.on("hello", (arg:any) => {
    console.log(arg); // world
    // console.log(-6.5360378062373)
  });

  }

  // Function to listen to an event
  listen(eventName: string) {

    return new Observable((subscriber:any) => {
      this.socket.on(eventName, (data: any) => {
        subscriber.next(data);
        // console.log('test')
      })
    })
  }

  // Function to send a message/data in specific event
  emit(eventName : any, data : any) {
    this.socket.emit(eventName, data);
    console.log(data)
  }

}
