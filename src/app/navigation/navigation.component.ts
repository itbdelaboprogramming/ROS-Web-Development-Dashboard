import { Component, OnInit, Renderer2 } from '@angular/core';
import { RoslibService } from '../services/roslib.service';
import { AddscriptService } from '../services/addscript.service';
// import * as ROSLIB from 'roslib';
// const ROS2D = require('../../../node_modules/ros2d')

// const SCRIPT_PATH = "http://cdn.robotwebtools.org/ros2djs/current/ros2d.min.js";
// // const SCRIPT_PATH = "rvizRoombaApp/js/js/ros2d.js";
// const JSON_LD_DATA  = `
// {
//   "@context": "http://schema.org",
//   "@type": "WebSite",
//   "url": "http://cdn.robotwebtools.org/ros2djs/current/ros2d.min.js",
//   "name": "ROS2D",
//   "description": "Web Studio"
// }
// `;
// declare var ROSLIB:any;
declare var ROS2D:any;
declare var NAV2D:any;
declare var getToday: any;
declare var greetings: any;
// declare function ROS2D.Viewer();
// declare function ROS2D.OccupancyGridClient();

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  // public myScriptElement : HTMLScriptElement;
  public ros:any

  constructor(public rosServ:RoslibService, private renderer:Renderer2, private addscript:AddscriptService) {
    // this.myScriptElement = document.createElement("script");
    // this.myScriptElement.src = "https://cdn.jsdelivr.net/npm/roslib@1/build/roslib.js";
    // document.body.appendChild(this.myScriptElement);

   }

  ngOnInit(): void {

  }

  public startRos(){
    this.rosServ.Init();
    this.navv();
  }

  public navv(){
    // Create the main viewer.
    var viewer = new ROS2D.Viewer({
      divID : 'nav',
      width :750,
      height : 800
    });
        // // Setup the nav client.
    var nav = new NAV2D.OccupancyGridClientNav({
      ros : this.rosServ.ros,
      rootObject : viewer.scene,
      viewer : viewer,
      serverName : '/move_base'
      // image :"assets/arrow.svg"
    });

    //  // Setup the map client.
    //  var gridClient = new ROS2D.OccupancyGridClient({
    //   ros : this.rosServ.ros,
    //   continuous : true,
    //   rootObject : viewer.scene
    // });
    // // Scale the canvas to fit to the map
    // gridClient.on('change', function(){
    //   viewer.scaleToDimensions(gridClient.currentGrid.width, gridClient.currentGrid.height);
    // });
    // var zoom = new ROS2D.ZoomView({
    //   rootObject : viewer.scene
    // })
  }





  // }


  public fwd(){
    this.rosServ.Pubs();
  }
  public stop(){
    this.rosServ.Stop();
  }
}
