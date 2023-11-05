import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { RoslibService } from '../services/roslib.service';
import { WebSocketService } from '../services/web-socket.service';

declare var ROSLIB:any
declare var ROS2D:any;
declare var NAV2D:any;

@Component({
  selector: 'app-slam',
  templateUrl: './slam.component.html',
  styleUrls: ['./slam.component.css']
})
export class SlamComponent implements OnInit {

  public viewer:any;
  public paN:any;
  public startcoor:any = [];
  public movecoor:any = [];
  public isDrag = false;

  constructor(public rosServ:RoslibService, public websoc:WebSocketService) { }

  ngOnInit(): void {

    this.websoc.Init();


  }

  public startRos(){
    this.rosServ.Init();
    this.doSlam();
  }

  doSlam(){
      // Create the main viewer.
      this.viewer = new ROS2D.Viewer({
        divID : 'slam',
        width :750,
        height : 800,
        background : '#7F7F7F'
      });

      this.paN = new ROS2D.PanView({
        rootObject: this.viewer.scene
      })
      
      var imagemarker = new ROS2D.NavigationImage({
        size : 2.5,
        image : 'assets/arrow.svg',
        pulse : true
      })

      

          // // Setup the nav client.
      var nav = new NAV2D.OccupancyGridClientNav({
        ros : this.rosServ.ros,
        rootObject : this.viewer.scene,
        viewer : this.viewer,
        continuous : true,
        serverName : '/move_base',
        image :'assets/arrow.svg'
      });

      setTimeout(()=>{
        //send command to start robot_pose_publisher
        
      },3000)

  }

  // @HostListener('mousedown',['$event'])
  onMouseDown(event:MouseEvent){
    this.paN.startPan(event.clientX,event.clientY)
    this.isDrag = true;
    this.startcoor[0]=event.clientX;
    this.startcoor[1]=event.clientY;
    // this.paN.pan(event.clientX,event.clientY)
    // this.onMouseMove(event)
  }
  
  onMouseUp(event:MouseEvent){
    this.isDrag = false;
  }

  // @HostListener('mousemove',['$event'])
  onMouseMove(event:MouseEvent){
    if(this.isDrag){
      this.paN.pan(event.clientX,event.clientY)
      this.movecoor[0]=event.clientX
      this.movecoor[1]=event.clientY
    }

  }


  zoomIn(){
    var zoom = new ROS2D.ZoomView({
      ros: this.rosServ.ros,
      rootObject: this.viewer.scene
  });
  zoom.startZoom(250, 250);
  zoom.zoom(1.2);

  }

  zoomOut(){
    var zoom = new ROS2D.ZoomView({
      ros: this.rosServ.ros,
      rootObject: this.viewer.scene
  });
  zoom.startZoom(250, 250);
  zoom.zoom(0.8);

  }

  sendCommand() {
    // const command = new ROSLIB.Message({
    //     data: 'do_slam'
    // });

    // const commandPublisher = new ROSLIB.Topic({
    //     ros: this.rosServ.ros,
    //     name: 'webapp_command',
    //     messageType: 'std_msgs/String'
    // });

    // commandPublisher.publish(command);
    setTimeout(()=>{this.doSlam()},5000)

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

 saveMap(){
this.websoc.emit('save-map',true)
 }

 loadMap(){
  this.websoc.emit('load-map',true)
 }

}
