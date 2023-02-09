import { Component, OnInit } from '@angular/core';
import { RoslibService } from '../services/roslib.service';

declare var ROSLIB:any
declare var ROS2D:any;
declare var NAV2D:any;

@Component({
  selector: 'app-slam',
  templateUrl: './slam.component.html',
  styleUrls: ['./slam.component.css']
})
export class SlamComponent implements OnInit {

  constructor(private rosServ:RoslibService) { }

  ngOnInit(): void {
    this.rosServ.Init();
    this.doSlam();
  }

  doSlam(){
      // Create the main viewer.
      var viewer = new ROS2D.Viewer({
        divID : 'slam',
        width :750,
        height : 800
      });
          // // Setup the nav client.
      var nav = new NAV2D.OccupancyGridClientNav({
        ros : this.rosServ.ros,
        rootObject : viewer.scene,
        viewer : viewer,
        continuous : true,
        serverName : '/move_base'
        // image :"assets/arrow.svg"
      });

  }

  Fwd(){
    var pub = new ROSLIB.Topic({
     ros : this.rosServ.ros,
     name : "/cmd_vel",
     messageType : "geometry_msgs/Twist"
    })
    var mess = new ROSLIB.Message({
     linear:{
       x : 2,
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
  Bwd(){
    var pub = new ROSLIB.Topic({
     ros : this.rosServ.ros,
     name : "/cmd_vel",
     messageType : "geometry_msgs/Twist"
    })
    var mess = new ROSLIB.Message({
     linear:{
       x : -2,
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
  RotR(){
    var pub = new ROSLIB.Topic({
     ros : this.rosServ.ros,
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
       z : 2
     }

    })
    pub.publish(mess)
  }
  RotL(){
    var pub = new ROSLIB.Topic({
     ros : this.rosServ.ros,
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
       z : -2
     }

    })
    pub.publish(mess)
  }
 Stop(){
   var pub = new ROSLIB.Topic({
    ros : this.rosServ.ros,
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

}
