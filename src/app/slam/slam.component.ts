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
  public nav:any;
  public getInit = false;
  public multiPointMode = false;
  public homePoint:any;
  public navmode = false;
  public setHomePoint = false;
  public pinPointList = [{id: 0, px: 0, py: 0, pw: 0}];
  public data = [
    { id: 0, x: 10, y: 20, z: 30 },
    { id: 1, x: 15, y: 25, z: 35 },
    { id: 2, x: 12, y: 22, z: 32 },
    // Add more data as needed
  ];

  constructor(public rosServ:RoslibService, public websoc:WebSocketService) { }

  ngOnInit(): void {

    this.websoc.Init();
    this.renderTable();


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
      this.nav = new NAV2D.OccupancyGridClientNav({
        ros : this.rosServ.ros,
        rootObject : this.viewer.scene,
        viewer : this.viewer,
        continuous : true,
        serverName : '/move_base',
        withOrientation : true,
        withCommand : this.navmode,
        image : 'assets/arrow.svg'
      });

      this.nav.navigator.testNaav();

      if (this.navmode == false) {
        setTimeout(()=>{
          this.getHomeBasePoint();
        },1000)
      }

      // var canv = document.getElementById('slam')

      // if(canv != null) {
      //   canv.removeAllEventListener()
      // }


      // setTimeout(()=>{
      //   //send command to start robot_pose_publisher
      //   const command = new ROSLIB.Message({
      //     data : 'start_robot_pose_publisher'
      //   });

      //   const commandPublisher = new ROSLIB.Topic({
      //     ros : this.rosServ.ros,
      //     name : 'webapp_command',
      //     messageType : 'std_msgs/String'
      //   });
      //   commandPublisher.publish(command);
        
      // },3000)

  }

  cancelGoal(){
    this.nav.navigator.cancelMultiGoal();
  }

  getHomeBasePoint(){
    this.homePoint = this.nav.navigator.getHomeBasePoint();
    console.log(this.homePoint);
  }

  setHomeBase(){
    if (this.setHomePoint == false) {
      this.setHomePoint = true;
      this.nav.navigator.setHomeBasePoint(true);
      var button = document.getElementById("setHomebtn")
      if(button != null){
        button.innerText = "Done Set Home Base"
        console.log("button changes")
      }
    }
    else if (this.setHomePoint == true) {
      this.setHomePoint = false;
      this.nav.navigator.setHomeBasePoint(false);
      this.getHomeBasePoint();
      var button = document.getElementById("setHomebtn")
      if(button != null){
        button.innerText = "Set Home Base"
        console.log("button changes")
      }
    }

  }

  updateHomeBase(){
    if (this.homePoint != null) {
      this.nav.navigator.updateHome(this.homePoint);
    }
  }

  returnToHome(){
    if (this.homePoint != null) {
      this.nav.navigator.returnToHome(this.homePoint);
    }
  }

  startNavigation(){
    this.nav.navigator.startNaav();
  }

  multiPoint(){
        // console.log(this.nav)
        if (this.multiPointMode == false) {
          this.multiPointMode = true;
          this.nav.navigator.multiPointMode(true);
          var button = document.getElementById("multiModeButton")
          if(button != null){
            button.innerText = "Multi Pin Point Mode"
            console.log("button changes")
          }
        }
    
        else if (this.multiPointMode == true) {
          this.multiPointMode = false
          this.nav.navigator.multiPointMode(false);
          var button = document.getElementById("multiModeButton")
          if(button != null){
            button.innerText = "Single Pin Point Mode"
            console.log("button changes")
          }
        }
  }

  navigationState(){
    // console.log(this.nav)
    if (this.navmode == false) {
      this.navmode = true;
      this.nav.navigator.setNavigation(true);
      this.updateHomeBase();
      var button = document.getElementById("navStatebtn")
      if(button != null){
        button.innerText = "Navigation Mode"
        console.log("button changes")
      }
    }
    else if (this.navmode == true) {
      this.navmode = false;
      this.nav.navigator.setNavigation(false);
      var button = document.getElementById("navStatebtn")
      if(button != null){
        button.innerText = "SLAM Mode"
        console.log("button changes")
      }
    }
}


  getPinPoint(){
    if(this.multiPointMode == true && this.getInit == false){
      this.pinPointList = this.nav.pinPointList();
      this.renderTable();
    }
  }

  removeAll(){
    this.nav = undefined
    console.log(this.nav)

    var rmv = new ROS2D.Remove({
      rootObject : this.viewer.scene
    })
    rmv.removeAllEvent()
  }

  // @HostListener('mousedown',['$event'])
  onMouseDown(event:MouseEvent){
    this.paN.startPan(event.clientX,event.clientY)
    this.isDrag = true;

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
    }

  }

  renderTable() {
    const tableBody = document.querySelector('#data-table tbody') as HTMLTableSectionElement;
    if(tableBody != null) {
      tableBody.innerHTML = '';
      this.pinPointList.forEach((item, index) => {
        const row = tableBody.insertRow();
        const cellId = row.insertCell(0);
        const cellX = row.insertCell(1);
        const cellY = row.insertCell(2);
        const cellZ = row.insertCell(3);
        const cellAction = row.insertCell(4);
  
        cellId.textContent = item.id.toString();
        cellX.textContent = item.px.toString();
        cellY.textContent = item.py.toString();
        cellZ.textContent = item.pw.toString();
        const deleteButton = document.createElement('button');
        if(deleteButton != null) {
          deleteButton.className = 'delete-button';
          deleteButton.textContent = 'Delete';
          deleteButton.onclick = ()=>{
            this.deleteRow(index);
          };
    
          cellAction.appendChild(deleteButton);
        }
    })

    }
  }

 deleteRow(index:any) {
    this.data.splice(index, 1);

    // Update IDs after deletion
    this.data.forEach((item, i) => {
      item.id = i;
    });

    this.renderTable();
  }


  initPose(){
    var pub = new ROSLIB.Topic({
      ros : this.rosServ.ros,
      name : "/initialpose",
      messageType : "geometry_msgs/PoseWithCovarianceStamped"
    })

    var currentTime = new Date();
    var secs = Math.floor(currentTime.getTime()/1000);
    var nsecs = Math.round(
      1000000000 * (currentTime.getTime() / 1000 - secs)
    );
    var msg = new ROSLIB.Message({
      header : {
        stamp : {
          secs: secs,
          nsecs : nsecs
        },
        frame_id : "map"
      },
      pose : {
        pose : {
          position : {
            x : -1,
            y : 1,
            z : 0
          },
          orientation : {
            x : 0,
            y : 0,
            z : 0,
            w : 1
          }
        }
      }


    });
    // msg.header.stamp.secs = secs;
    // msg.header.stamp.nsecs = nsecs;
    // msg.header.frame_id = "map";

    // msg.pose.pose.position.x = -5;
    // msg.pose.pose.position.y = 1;
    // msg.pose.pose.orientation.w = 1;

    pub.publish(msg);
    console.log("initial pose published")
  }

  init_Pose(){
    // console.log(this.nav)
    if (this.getInit == false) {
      this.getInit = true;
      this.nav.navigator.initPose(true);
      // this.nav = undefined
      // console.log(this.nav)
  
      // var rmv = new ROS2D.Remove({
      //   rootObject : this.viewer.scene
      // })
      // rmv.removeAllEvent()

      // this.nav = NAV2D.OccupancyGridClientNav({
      //   ros : this.rosServ.ros,
      //   rootObject : this.viewer.scene,
      //   viewer : this.viewer,
      //   continuous : true,
      //   serverName : '/move_base',
      //   withOrientation : true,
      //   image : 'assets/arrow.svg',
      //   init_pose : true
      // });
      var button = document.getElementById("initButton")
      if(button != null){
        button.innerText = "Done Initial Pose"
        console.log("button changes")
      }
      console.log("initial pose")
    }

    else if (this.getInit == true) {
      this.getInit = false
      this.nav.navigator.initPose(false);
      var button = document.getElementById("initButton")
      // this.nav = undefined
      // console.log(this.nav)
      // var rmv = new ROS2D.Remove({
      //   rootObject : this.viewer.scene
      // })
      // rmv.removeAllEvent()
      // this.nav = NAV2D.OccupancyGridClientNav({
      //   ros : this.rosServ.ros,
      //   rootObject : this.viewer.scene,
      //   viewer : this.viewer,
      //   continuous : true,
      //   serverName : '/move_base',
      //   withOrientation : true,
      //   image : 'assets/arrow.svg',
      //   init_pose : false
      // });
      if(button != null){
        button.innerText = "Initial Pose"
        console.log("button changes")
      }
      console.log("initial pose done")
    }
  }





  RotMapCW(){
    var rotate = new ROS2D.Rotate({
      rootObject: this.viewer.scene
    });
    rotate.startRotate(10);
  }

  RotMapCCW(){
    var rotate = new ROS2D.Rotate({
      rootObject: this.viewer.scene
    });
    rotate.startRotate(-10);
  }

  ResetRot(){
    var rotate = new ROS2D.Rotate({
      rootObject: this.viewer.scene
    });
    rotate.resetRotate();
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
