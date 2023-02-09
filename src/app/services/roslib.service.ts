import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
// import * as ROSLIB from 'roslib';
// import ROS2D from '../../../js/js/ros2d.js';
// import * as NAV2D from 'nav2d';

declare var ROSLIB:any;

@Injectable({
  providedIn: 'root'
})
export class RoslibService {

  public ros:any
  public subs:any
  public socket:any
  constructor() {


   }

   Init(){
    this.socket = io('http://localhost:3000')
    this.socket.on('connect', () => {
      this.ros = new ROSLIB.Ros({
        url: 'ws://192.168.18.43:9090'
      });
      })
    // this.ros= new ROSLIB.Ros({
    //   url : 'ws://192.168.18.43:9090'
    // })
    this.ros.on("connection",()=>{
      console.log("connection established")
    })

    this.subs = new ROSLIB.Topic({
      ros: this.ros,
      name : "/odom",
      messageType : "nav_msgs/Odometry"
    })

    this.subs.subscribe((message:any)=>{
      console.log(message.twist.twist.linear.x)
    })

   }

   Pubs(){
     var pub = new ROSLIB.Topic({
      ros : this.ros,
      name : "/cmd_vel",
      messageType : "geometry_msgs/Twist"
     })
     var mess = new ROSLIB.Message({
      linear:{
        x : 3,
        y : 0,
        z : 0
      },
      angular:{
        x : 0,
        y : 0,
        z : 0
      }

     })
     pub.publish(mess)
   }
  Stop(){
    var pub = new ROSLIB.Topic({
     ros : this.ros,
     name : "/cmd_vel",
     messageType : "geometry_msgs/Twist"
    })
    var mess = new ROSLIB.Message({
     linear:{
       x : 0,
       y : 0,
       z : 0
     },
     angular:{
       x : 0,
       y : 0,
       z : 0
     }

    })
    pub.publish(mess)
  }
  // Map(){
  //   var viewer = new ROS2D.Viewer({
  //     divID : 'map',
  //     width : 600,
  //     height : 500
  //   })
  // }
}
