/**
 * @author Russell Toris - rctoris@wpi.edu
 * @author Lars Kunze - l.kunze@cs.bham.ac.uk
 * @author Raffaello Bonghi - raffaello.bonghi@officinerobotiche.it
 */

/**
 * A navigator can be used to add click-to-navigate options to an object. If
 * withOrientation is set to true, the user can also specify the orientation of
 * the robot by clicking at the goal position and pointing into the desired
 * direction (while holding the button pressed).
 *
 * @constructor
 * @param options - object with following keys:
 *   * ros - the ROSLIB.Ros connection handle
 *   * tfClient (optional) - the TF client
 *   * robot_pose (optional) - the robot topic or TF to listen position
 *   * serverName (optional) - the action server name to use for navigation, like '/move_base'
 *   * actionName (optional) - the navigation action name, like 'move_base_msgs/MoveBaseAction'
 *   * rootObject (optional) - the root object to add the click listeners to and render robot markers to
 *   * withOrientation (optional) - if the Navigator should consider the robot orientation (default: false)
 *   * init_pose (optional) - if true then the Navigator will be use to set 2D Pose Estimate (default: false)
 */
NAV2D.Navigator = function (options) {
  var that = this;
  options = options || {};
  var ros = options.ros;
  var tfClient = options.tfClient || null;
  var robot_pose = options.robot_pose || "/robot_pose";
  var serverName = options.serverName || "/move_base";
  var actionName = options.actionName || "move_base_msgs/MoveBaseAction";
  var withOrientation = options.withOrientation || false;
  var use_image = options.image;
  var init_pose = options.init_pose || false;
  var multiPoint = false;
  this.rootObject = options.rootObject || new createjs.Container();

  this.goalMarker = null;

  var currentGoal;

  this.multigoalMark = [];
  this.multiPose = [];
  this.poseList = [];

  // setup the actionlib client
  var actionClient = new ROSLIB.ActionClient({
    ros: ros,
    actionName: actionName,
    serverName: serverName,
  });

  /**
   * Send a goal to the navigation stack with the given pose.
   *
   * @param pose - the goal pose
   */
  function sendGoal(pose) {
    // create a goal
    var goal = new ROSLIB.Goal({
      actionClient: actionClient,
      goalMessage: {
        target_pose: {
          header: {
            frame_id: "map",
          },
          pose: pose,
        },
      },
    });
    goal.send();

    that.currentGoal = goal;

    // create a marker for the goal
    if (that.goalMarker === null) {
      if (use_image && ROS2D.hasOwnProperty("ImageNavigator")) {
        that.goalMarker = new ROS2D.ImageNavigator({
          size: 2.5,
          image: use_image,
          alpha: 0.7,
          pulse: true,
        });
      } else {
        that.goalMarker = new ROS2D.NavigationArrow({
          size: 15,
          strokeSize: 1,
          fillColor: createjs.Graphics.getRGB(255, 64, 128, 0.66),
          pulse: true,
        });
      }
      that.rootObject.addChild(that.goalMarker);
    }
    that.goalMarker.x = pose.position.x;
    that.goalMarker.y = -pose.position.y;
    that.goalMarker.rotation = stage.rosQuaternionToGlobalTheta(
      pose.orientation
    );
    that.goalMarker.scaleX = 1.0 / stage.scaleX;
    that.goalMarker.scaleY = 1.0 / stage.scaleY;

    goal.on("result", function () {
      that.rootObject.removeChild(that.goalMarker);
      that.goalMarker = null;
    });
  }

    /**
   * Send a goal to the navigation stack with the given pose.
   *
   * @param pose - the goal pose
   */
    function multiGoal(pose) {

      var length = that.multigoalMark.length;
      var x;

      if (length < 1) {
        x = 0;
      }
      else {
        x = length;
      }

      that.multiPose[x] = pose;
      // that.poseList[x] = {id: x, px: pose.position.x, py: pose.position.y, pw: stage.rosQuaternionToGlobalTheta(pose.orientation)}
      that.multigoalMark[x] = new ROS2D.NavigationArrow({
        size: 15,
        strokeSize: 1,
        fillColor: createjs.Graphics.getRGB(255, 64, 128, 0.66),
        pulse: true,
      });
      that.rootObject.addChild(that.multigoalMark[x]);
  

      that.multigoalMark[x].x = pose.position.x;
      that.multigoalMark[x].y = -pose.position.y;
      that.multigoalMark[x].rotation = stage.rosQuaternionToGlobalTheta(
        pose.orientation
      );
      that.multigoalMark[x].scaleX = 1.0 / stage.scaleX;
      that.multigoalMark[x].scaleY = 1.0 / stage.scaleY;
  
      // goal.on("result", function () {
      //   that.rootObject.removeChild(that.goalMarker);
      // });
    }

      /**
   * Send a goal to the navigation stack with the given pose.
   *
   * @param pose - the goal pose
   */
    function asyncFunc(ind){
        return new Promise((resolve)=>{
          var goal = new ROSLIB.Goal({
            actionClient: actionClient,
            goalMessage: {
              target_pose: {
                header: {
                  frame_id: "map",
                },
                pose: that.multiPose[ind],
              },
            },
          });
          goal.send();
          goal.on("result", function () {
            // that.rootObject.removeChild(that.multigoalMark[i]);
            resolve()
          });
  
        })
      }

        /**
   * Send a goal to the navigation stack with the given pose.
   *
   * @param pose - the goal pose
   */
  async function startNav(){
        // create a goal
        var length = that.multiPose.length;
        for(var i=0;i<length;i++){
          // var goal = new ROSLIB.Goal({
          //   actionClient: actionClient,
          //   goalMessage: {
          //     target_pose: {
          //       header: {
          //         frame_id: "map",
          //       },
          //       pose: that.multiPose[i],
          //     },
          //   },
          // });
          // goal.send();
      
          // that.currentGoal = goal;
          // var loop = true;
          await asyncFunc(i);
          that.rootObject.removeChild(that.multigoalMark[i]);

        }
        that.multigoalMark = [];
        that.multiPose = [];
        that.poseList = [];

  }



  /**
   * Cancel the currently active goal.
   */
  this.cancelGoal = function () {
    console.log("Cancel Goals");
    if (typeof that.currentGoal !== "undefined") {
      console.log(that.currentGoal);
      that.currentGoal.cancel();
    }
  };

  // get a handle to the stage
  var stage;
  if (that.rootObject instanceof createjs.Stage) {
    stage = that.rootObject;
  } else {
    stage = that.rootObject.getStage();
  }

  // marker for the robot
  var robotMarker = null;
  if (use_image && ROS2D.hasOwnProperty("ImageNavigator")) {
    robotMarker = new ROS2D.ImageNavigator({
      size: 2.5,
      image: use_image,
      pulse: true,
    });
  } else {
    robotMarker = new ROS2D.NavigationArrow({
      size: 15,
      strokeSize: 1,
      fillColor: createjs.Graphics.getRGB(255, 128, 0, 0.66),
      pulse: true,
    });
  }

  var homeBaseMarker = new ROS2D.NavigationArrow({
    size: 15,
    strokeSize: 1,
    fillColor: createjs.Graphics.getRGB(0, 0, 255, 0.66),
    pulse: false,
  });
  homeBaseMarker.visible = false;
  this.rootObject.addChild(homeBaseMarker);

  // wait for a pose to come in first
  robotMarker.visible = false;
  this.rootObject.addChild(robotMarker);
  var initScaleSet = false;

  homeBaseMarker.x = 0;
  homeBaseMarker.y = 0;

  var updateRobotPosition = function (pose, orientation) {
    // update the robots position on the map
    robotMarker.x = pose.x;
    robotMarker.y = -pose.y;
    console.log(initScaleSet);
    if (!initScaleSet) {
      robotMarker.scaleX = 1.0 / stage.scaleX;
      robotMarker.scaleY = 1.0 / stage.scaleY;
      homeBaseMarker.scaleX = 1.0 / stage.scaleX;
      homeBaseMarker.scaleY = 1.0 / stage.scaleY;
      homeBaseMarker.visible = true;
      initScaleSet = true;
    }
    // change the angle
    robotMarker.rotation = stage.rosQuaternionToGlobalTheta(orientation);
    // Set visible
    robotMarker.visible = true;
  };

  if (tfClient !== null) {
    tfClient.subscribe(robot_pose, function (tf) {
      updateRobotPosition(tf.translation, tf.rotation);
    });
  } else {
    // setup a listener for the robot pose
    var poseListener = new ROSLIB.Topic({
      ros: ros,
      name: robot_pose,
      messageType: "geometry_msgs/Pose",
      throttle_rate: 100,
    });
    poseListener.subscribe(function (pose) {
      //console.log(pose.position);
      //console.log(pose.orientation);
      // console.log(that.rootObject);
      // console.log(robotMarker);
      // console.log("add robot marker");
      updateRobotPosition(pose.position, pose.orientation);
    });
  }

  if (withOrientation === false) {
    // setup a double click listener (no orientation)
    this.rootObject.addEventListener("dblclick", function (event) {
      // convert to ROS coordinates
      var coords = stage.globalToRos(event.stageX, event.stageY);
      var pose = new ROSLIB.Pose({
        position: new ROSLIB.Vector3(coords),
      });
      // send the goal
      sendGoal(pose);
    });
  } else {
    // withOrientation === true
    // setup a click-and-point listener (with orientation)
    var position = null;
    var positionVec3 = null;
    var thetaRadians = 0;
    var thetaDegrees = 0;
    var orientationMarker = null;
    var mouseDown = false;
    var xDelta = 0;
    var yDelta = 0;

    var mouseEventHandler = function (event, mouseState) {
      if (event.nativeEvent.button === 0) {
      if (mouseState === "down") {
        // get position when mouse button is pressed down
        position = stage.globalToRos(event.stageX, event.stageY);
        positionVec3 = new ROSLIB.Vector3(position);
        mouseDown = true;
      } 
      
      else if (mouseState === "move") {
        // remove obsolete orientation marker
        that.rootObject.removeChild(orientationMarker);

        if (mouseDown === true) {
          // if mouse button is held down:
          // - get current mouse position
          // - calulate direction between stored <position> and current position
          // - place orientation marker
          var currentPos = stage.globalToRos(event.stageX, event.stageY);
          var currentPosVec3 = new ROSLIB.Vector3(currentPos);

          if (use_image && ROS2D.hasOwnProperty("ImageNavigator")) {
            orientationMarker = new ROS2D.ImageNavigator({
              size: 2.5,
              image: use_image,
              alpha: 0.7,
              pulse: false,
            });
          } else {
            orientationMarker = new ROS2D.NavigationArrow({
              size: 25,
              strokeSize: 1,
              fillColor: createjs.Graphics.getRGB(0, 255, 0, 0.66),
              pulse: false,
            });
          }

          xDelta = currentPosVec3.x - positionVec3.x;
          yDelta = currentPosVec3.y - positionVec3.y;

          thetaRadians = Math.atan2(xDelta, yDelta);

          thetaDegrees = thetaRadians * (180.0 / Math.PI);

          if (thetaDegrees >= 0 && thetaDegrees <= 180) {
            thetaDegrees += 270;
          } else {
            thetaDegrees -= 90;
          }

          orientationMarker.x = positionVec3.x;
          orientationMarker.y = -positionVec3.y;
          orientationMarker.rotation = thetaDegrees;
          orientationMarker.scaleX = 1.0 / stage.scaleX;
          orientationMarker.scaleY = 1.0 / stage.scaleY;

          that.rootObject.addChild(orientationMarker);
        }
      } else if (mouseDown) {
        // mouseState === 'up'
        // if mouse button is released
        // - get current mouse position (goalPos)
        // - calulate direction between stored <position> and goal position
        // - set pose with orientation
        // - send goal
        mouseDown = false;

        var goalPos = stage.globalToRos(event.stageX, event.stageY);

        var goalPosVec3 = new ROSLIB.Vector3(goalPos);

        xDelta = goalPosVec3.x - positionVec3.x;
        yDelta = goalPosVec3.y - positionVec3.y;

        thetaRadians = Math.atan2(xDelta, yDelta);

        if (thetaRadians >= 0 && thetaRadians <= Math.PI) {
          thetaRadians += (3 * Math.PI) / 2;
        } else {
          thetaRadians -= Math.PI / 2;
        }

        var qz = Math.sin(-thetaRadians / 2.0);
        var qw = Math.cos(-thetaRadians / 2.0);

        var orientation = new ROSLIB.Quaternion({ x: 0, y: 0, z: qz, w: qw });

        var pose = new ROSLIB.Pose({
          position: positionVec3,
          orientation: orientation,
        });

        if (init_pose == false) {
        // send the goal
          if (multiPoint == false) {
            sendGoal(pose);
          }
          else {
            multiGoal(pose);
          }
        }
        if (init_pose == true) {
          var pub = new ROSLIB.Topic({
            ros : ros,
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
            pose : {pose}
            
          });
  
          pub.publish(msg);
          that.rootObject.removeChild(orientationMarker);
          console.log("initial pose published")
        }
      } 
      else if (mouseState === 'dblclick' && multiPoint == false){
        that.cancelGoal();
      }

    }
    
    };

    this.rootObject.addEventListener("stagemousedown", function (event) {
      mouseEventHandler(event, "down");
    });

    this.rootObject.addEventListener("stagemousemove", function (event) {
      mouseEventHandler(event, "move");
    });

    this.rootObject.addEventListener("stagemouseup", function (event) {
      mouseEventHandler(event, "up");
    });

    this.rootObject.addEventListener('dblclick', function(event) {
      mouseEventHandler(event,'dblclick');
    });
  }

  NAV2D.Navigator.prototype.testNaav = function() {
    console.log("this is from navigator");
  }

  NAV2D.Navigator.prototype.startNaav = function() {
    console.log("navigation started");
    startNav();
  }

  NAV2D.Navigator.prototype.initPose = function(state) {
    console.log("Initpose");
    init_pose = state;
  }

  NAV2D.Navigator.prototype.multiPointMode = function(state) {
    console.log("multipoint mode");
    multiPoint = state;
  }

  NAV2D.Navigator.prototype.pinPointList = function() {
    console.log("pin point list updated");
    return(that.poseList);
  }

};
