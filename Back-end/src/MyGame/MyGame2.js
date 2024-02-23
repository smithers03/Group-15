"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame(htmlCanvasID) {
  // variables of the shader for drawing: one shader to be shared by two renderables
  this.mConstColorShader = null;

  // variables for the squares
  this.mBlueSq = null;        // these are the Renderable objects
  this.mRedSq = null;

  // Step A: Initialize the webGL Context
  gEngine.Core.initializeWebGL(htmlCanvasID);

  // Step B: Setup the camera
  this.mCamera = new Camera(
      vec2.fromValues(640, 360),   // center of the WC
      720,                        // width of WC
      [280, 0, 720, 720]         // viewport (orgX, orgY, width, height)
  );

  // Step C: Create the shader
  this.mConstColorShader = new SimpleShader(
      "src/GLSLShaders/SimpleVS.glsl",      // Path to the VertexShader
      "src/GLSLShaders/SimpleFS.glsl");    // Path to the simple FragmentShader

  // Step D: Create the Renderable objects:
  this.mBlueSq = new Renderable(this.mConstColorShader);
  this.mBlueSq.setColor([0.25, 0.25, 0.95, 1]);
  this.mRedSq = new Renderable(this.mConstColorShader);
  this.mRedSq.setColor([1, 0.25, 0.25, 1]);
  this.mTLSq = new Renderable(this.mConstColorShader);
  this.mTLSq.setColor([0.9, 0.1, 0.1, 1]);
  this.mTRSq = new Renderable(this.mConstColorShader);
  this.mTRSq.setColor([0.9, 0.1, 0.1, 1]);
  this.mBRSq = new Renderable(this.mConstColorShader);
  this.mBRSq.setColor([0.1, 0.1, 0.9, 1]);
  this.mBLSq = new Renderable(this.mConstColorShader);
  this.mBLSq.setColor([0.1, 0.1, 0.9, 1]);

  // Step E: Clear the canvas
  gEngine.Core.clearCanvas([0, 0, 0, 1]);        // Clear the canvas

  // Step F: Starts the drawing by activating the camera
  this.mCamera.setupViewProjection();
  var vpMatrix = this.mCamera.getVPMatrix();

  /*// Step G: Draw the blue square
  // Centre Blue, slightly rotated square
  this.mBlueSq.getXform().setPosition(640, 360);
  this.mBlueSq.getXform().setRotationInRad(0.3); // In Radians
  this.mBlueSq.getXform().setSize(100, 100);
  this.mBlueSq.draw(vpMatrix);*/


  // Step H: Draw the center and the corner squares
  // centre red square
  /*this.mRedSq.getXform().setPosition(640, 360);
  this.mRedSq.getXform().setSize(720, 50);
  this.mRedSq.draw(vpMatrix);*/

  // top left
  this.mTLSq.getXform().setPosition(280, 720);
  this.mTLSq.getXform().setSize(20, 20);
  this.mTLSq.draw(vpMatrix);

  // top right
  this.mTRSq.getXform().setPosition(1000, 720);
  this.mTRSq.getXform().setSize(20, 20);
  this.mTRSq.draw(vpMatrix);

  // bottom right
  this.mBRSq.getXform().setPosition(1000, 0);
  this.mBRSq.getXform().setSize(20, 20);
  this.mBRSq.draw(vpMatrix);

  // bottom left
  this.mBLSq.getXform().setPosition(280, 0);
  this.mBLSq.getXform().setSize(20, 20);
  this.mBLSq.draw(vpMatrix);


  var xBound = 280;
  var yUpper = 680;
  var yLower = 80;

  for (let i = 0; i <= 72; i++){
    this.mUppSq = new Renderable(this.mConstColorShader);
    this.mUppSq.setColor([0.4, 0.7, 0.8, 1]);
    this.mUppSq.getXform().setPosition(xBound, yUpper);
    this.mUppSq.getXform().setSize(15, 15);
    this.mLowSq = new Renderable(this.mConstColorShader);
    this.mLowSq.setColor([0.4, 0.7, 0.8, 1]);
    this.mLowSq.getXform().setPosition(xBound, yLower);
    this.mLowSq.getXform().setSize(15, 15);

    this.mUppSq.draw(vpMatrix);
    this.mLowSq.draw(vpMatrix);

    this.mUppSq = new Renderable(this.mConstColorShader);
    this.mUppSq.setColor([0.0, 0.0, 0.0, 1]);
    this.mUppSq.getXform().setPosition(xBound, yUpper);
    this.mUppSq.getXform().setSize(5, 5);
    this.mLowSq = new Renderable(this.mConstColorShader);
    this.mLowSq.setColor([0.0, 0.0, 0.0, 1]);
    this.mLowSq.getXform().setPosition(xBound, yLower);
    this.mLowSq.getXform().setSize(5, 5);

    this.mUppSq.draw(vpMatrix);
    this.mLowSq.draw(vpMatrix);

    xBound += 10;
  }

  // Lower sides

  var xLeft = 285;
  var xRight = 995;
  var yLower = 80;

  for (let i = 0; i <= 9; i++){
    this.mUppSq = new Renderable(this.mConstColorShader);
    this.mUppSq.setColor([0.4, 0.7, 0.8, 1]);
    this.mUppSq.getXform().setPosition(xRight, yLower);
    this.mUppSq.getXform().setSize(15, 15);
    this.mLowSq = new Renderable(this.mConstColorShader);
    this.mLowSq.setColor([0.4, 0.7, 0.8, 1]);
    this.mLowSq.getXform().setPosition(xLeft, yLower);
    this.mLowSq.getXform().setSize(15, 15);

    this.mUppSq.draw(vpMatrix);
    this.mLowSq.draw(vpMatrix);

    this.mUppSq = new Renderable(this.mConstColorShader);
    this.mUppSq.setColor([0.0, 0.0, 0.0, 1]);
    this.mUppSq.getXform().setPosition(xRight, yLower);
    this.mUppSq.getXform().setSize(5, 5);
    this.mLowSq = new Renderable(this.mConstColorShader);
    this.mLowSq.setColor([0.0, 0.0, 0.0, 1]);
    this.mLowSq.getXform().setPosition(xLeft, yLower);
    this.mLowSq.getXform().setSize(5, 5);

    this.mUppSq.draw(vpMatrix);
    this.mLowSq.draw(vpMatrix);

    yLower += 10;
  }

  // Upper sides

  var xLeft = 285;
  var xRight = 995;
  var yUpper = 620;

  for (let i = 0; i <= 29; i++){
    this.mUppSq = new Renderable(this.mConstColorShader);
    this.mUppSq.setColor([0.4, 0.7, 0.8, 1]);
    this.mUppSq.getXform().setPosition(xRight, yUpper);
    this.mUppSq.getXform().setSize(15, 15);
    this.mLowSq = new Renderable(this.mConstColorShader);
    this.mLowSq.setColor([0.4, 0.7, 0.8, 1]);
    this.mLowSq.getXform().setPosition(xLeft, yUpper);
    this.mLowSq.getXform().setSize(15, 15);

    this.mUppSq.draw(vpMatrix);
    this.mLowSq.draw(vpMatrix);

    this.mUppSq = new Renderable(this.mConstColorShader);
    this.mUppSq.setColor([0.0, 0.0, 0.0, 1]);
    this.mUppSq.getXform().setPosition(xRight, yUpper);
    this.mUppSq.getXform().setSize(5, 5);
    this.mLowSq = new Renderable(this.mConstColorShader);
    this.mLowSq.setColor([0.0, 0.0, 0.0, 1]);
    this.mLowSq.getXform().setPosition(xLeft, yUpper);
    this.mLowSq.getXform().setSize(5, 5);

    this.mUppSq.draw(vpMatrix);
    this.mLowSq.draw(vpMatrix);

    yUpper -= 10;
  }


  
  //Middle Box//
    var xRight = 740;
  var xLeft = 540;
  var yUpper = 430;
  
  for (let i = 0; i <= 4; i++){
    this.mUppSq = new Renderable(this.mConstColorShader);
    this.mUppSq.setColor([0.4, 0.7, 0.8, 1]);
    this.mUppSq.getXform().setPosition(xLeft, yUpper);
    this.mUppSq.getXform().setSize(15, 15);
    this.mLowSq = new Renderable(this.mConstColorShader);
    this.mLowSq.setColor([0.4, 0.7, 0.8, 1]);
    this.mLowSq.getXform().setPosition(xRight, yUpper);
    this.mLowSq.getXform().setSize(15, 15);

    this.mUppSq.draw(vpMatrix);
    this.mLowSq.draw(vpMatrix);

    this.mUppSq = new Renderable(this.mConstColorShader);
    this.mUppSq.setColor([0.0, 0.0, 0.0, 1]);
    this.mUppSq.getXform().setPosition(xLeft, yUpper);
    this.mUppSq.getXform().setSize(5, 5);
    this.mLowSq = new Renderable(this.mConstColorShader);
    this.mLowSq.setColor([0.0, 0.0, 0.0, 1]);
    this.mLowSq.getXform().setPosition(xRight, yUpper);
    this.mLowSq.getXform().setSize(5, 5);

    this.mUppSq.draw(vpMatrix);
    this.mLowSq.draw(vpMatrix);

    yUpper -= 10;
  }
  var yLower = 380;
  var xLeft = 540;
  var yUpper = 430;
  
  for (let i = 0; i <= 20; i++){
    this.mUppSq = new Renderable(this.mConstColorShader);
    this.mUppSq.setColor([0.4, 0.7, 0.8, 1]);
    this.mUppSq.getXform().setPosition(xLeft, yUpper);
    this.mUppSq.getXform().setSize(15, 15);
    this.mLowSq = new Renderable(this.mConstColorShader);
    this.mLowSq.setColor([0.4, 0.7, 0.8, 1]);
    this.mLowSq.getXform().setPosition(xLeft, yLower);
    this.mLowSq.getXform().setSize(15, 15);

    this.mUppSq.draw(vpMatrix);
    this.mLowSq.draw(vpMatrix);

    this.mUppSq = new Renderable(this.mConstColorShader);
    this.mUppSq.setColor([0.0, 0.0, 0.0, 1]);
    this.mUppSq.getXform().setPosition(xLeft, yUpper);
    this.mUppSq.getXform().setSize(5, 5);
    this.mLowSq = new Renderable(this.mConstColorShader);
    this.mLowSq.setColor([0.0, 0.0, 0.0, 1]);
    this.mLowSq.getXform().setPosition(xLeft, yLower);
    this.mLowSq.getXform().setSize(5, 5);

    this.mUppSq.draw(vpMatrix);
    this.mLowSq.draw(vpMatrix);

    xLeft += 10;
  }
  
  //Top Left Exit//
   var yLower = 380;
  var xLeft = 300;
 
  var yUpper = 620;
  
  for (let i = 0; i <= 8; i++){
    this.mUppSq = new Renderable(this.mConstColorShader);
    this.mUppSq.setColor([0.4, 0.7, 0.8, 1]);
    this.mUppSq.getXform().setPosition(xLeft, yUpper);
    this.mUppSq.getXform().setSize(15, 15);

    this.mUppSq.draw(vpMatrix);

    this.mUppSq = new Renderable(this.mConstColorShader);
    this.mUppSq.setColor([0.0, 0.0, 0.0, 1]);
    this.mUppSq.getXform().setPosition(xLeft, yUpper);
    this.mUppSq.getXform().setSize(5, 5);

    this.mUppSq.draw(vpMatrix);

    xLeft += 10;
  }
 
 
 //Top Right Exit
  var yLower = 380;
  var xLeft = 900;
 
  var yUpper = 620;
  
  for (let i = 0; i <= 8; i++){
    this.mUppSq = new Renderable(this.mConstColorShader);
    this.mUppSq.setColor([0.4, 0.7, 0.8, 1]);
    this.mUppSq.getXform().setPosition(xLeft, yUpper);
    this.mUppSq.getXform().setSize(15, 15);

    this.mUppSq.draw(vpMatrix);

    this.mUppSq = new Renderable(this.mConstColorShader);
    this.mUppSq.setColor([0.0, 0.0, 0.0, 1]);
    this.mUppSq.getXform().setPosition(xLeft, yUpper);
    this.mUppSq.getXform().setSize(5, 5);

    this.mUppSq.draw(vpMatrix);

    xLeft += 10;
  }
  
   //Top Right Rectangle//
  var xRight = 200;
  var xLeft = 820;
  var yUpper = 665;
  
  for (let i = 0; i <= 5; i++){
    this.mUppSq = new Renderable(this.mConstColorShader);
    this.mUppSq.setColor([0.4, 0.7, 0.8, 1]);
    this.mUppSq.getXform().setPosition(xLeft, yUpper);
    this.mUppSq.getXform().setSize(15, 15);
    
    this.mUppSq.draw(vpMatrix);
      
    this.mUppSq = new Renderable(this.mConstColorShader);
    this.mUppSq.setColor([0.0, 0.0, 0.0, 1]);
    this.mUppSq.getXform().setPosition(xLeft, yUpper);
    this.mUppSq.getXform().setSize(5, 5);
    
    this.mUppSq.draw(vpMatrix);

    yUpper -= 10;

  }
  
  //Top Left Rectangle//
  var xRight = 200;
  var xLeft = 460;
  var yUpper = 665;
  
  for (let i = 0; i <= 5; i++){
    this.mUppSq = new Renderable(this.mConstColorShader);
    this.mUppSq.setColor([0.4, 0.7, 0.8, 1]);
    this.mUppSq.getXform().setPosition(xLeft, yUpper);
    this.mUppSq.getXform().setSize(15, 15);
    
    this.mUppSq.draw(vpMatrix);
      
    this.mUppSq = new Renderable(this.mConstColorShader);
    this.mUppSq.setColor([0.0, 0.0, 0.0, 1]);
    this.mUppSq.getXform().setPosition(xLeft, yUpper);
    this.mUppSq.getXform().setSize(5, 5);
    
    this.mUppSq.draw(vpMatrix);

    yUpper -= 10;

  }
  
  //Middle Left Rectangle//
   var yLower = 200;
  var xLeft = 300;
  var yUpper = 450;
  
  for (let i = 0; i <= 8; i++){
    this.mUppSq = new Renderable(this.mConstColorShader);
    this.mUppSq.setColor([0.4, 0.7, 0.8, 1]);
    this.mUppSq.getXform().setPosition(xLeft, yUpper);
    this.mUppSq.getXform().setSize(15, 15);

    this.mUppSq.draw(vpMatrix);

    this.mUppSq = new Renderable(this.mConstColorShader);
    this.mUppSq.setColor([0.0, 0.0, 0.0, 1]);
    this.mUppSq.getXform().setPosition(xLeft, yUpper);
    this.mUppSq.getXform().setSize(5, 5);

    this.mUppSq.draw(vpMatrix);

    xLeft += 10;
  }
  
   //Middle Right Rectangle
  var yLower = 380;
  var xLeft = 900;
  var yUpper = 450;
  
  for (let i = 0; i <= 8; i++){
    this.mUppSq = new Renderable(this.mConstColorShader);
    this.mUppSq.setColor([0.4, 0.7, 0.8, 1]);
    this.mUppSq.getXform().setPosition(xLeft, yUpper);
    this.mUppSq.getXform().setSize(15, 15);

    this.mUppSq.draw(vpMatrix);

    this.mUppSq = new Renderable(this.mConstColorShader);
    this.mUppSq.setColor([0.0, 0.0, 0.0, 1]);
    this.mUppSq.getXform().setPosition(xLeft, yUpper);
    this.mUppSq.getXform().setSize(5, 5);

    this.mUppSq.draw(vpMatrix);

    xLeft += 10;
  }
  
   //Right Middle Exit Top Rectangle
  var yLower = 380;
  var xLeft = 940;
  var yUpper = 330;
  
  for (let i = 0; i <= 4; i++){
    this.mUppSq = new Renderable(this.mConstColorShader);
    this.mUppSq.setColor([0.4, 0.7, 0.8, 1]);
    this.mUppSq.getXform().setPosition(xLeft, yUpper);
    this.mUppSq.getXform().setSize(15, 15);

    this.mUppSq.draw(vpMatrix);

    this.mUppSq = new Renderable(this.mConstColorShader);
    this.mUppSq.setColor([0.0, 0.0, 0.0, 1]);
    this.mUppSq.getXform().setPosition(xLeft, yUpper);
    this.mUppSq.getXform().setSize(5, 5);

    this.mUppSq.draw(vpMatrix);

    xLeft += 10;
  }
  
  //Right Middle Exit Left Rectangle//
  var xRight = 200;
  var xLeft = 940;
  var yUpper = 315;
  
  for (let i = 0; i <= 5; i++){
    this.mUppSq = new Renderable(this.mConstColorShader);
    this.mUppSq.setColor([0.4, 0.7, 0.8, 1]);
    this.mUppSq.getXform().setPosition(xLeft, yUpper);
    this.mUppSq.getXform().setSize(15, 15);
    
    this.mUppSq.draw(vpMatrix);
      
    this.mUppSq = new Renderable(this.mConstColorShader);
    this.mUppSq.setColor([0.0, 0.0, 0.0, 1]);
    this.mUppSq.getXform().setPosition(xLeft, yUpper);
    this.mUppSq.getXform().setSize(5, 5);
    
    this.mUppSq.draw(vpMatrix);

    yUpper -= 10;

  }
  
     //Right Middle Exit Bottom Rectangle
  var yLower = 380;
  var xLeft = 940;
  var yUpper = 250;
  
  for (let i = 0; i <= 6; i++){
    this.mUppSq = new Renderable(this.mConstColorShader);
    this.mUppSq.setColor([0.4, 0.7, 0.8, 1]);
    this.mUppSq.getXform().setPosition(xLeft, yUpper);
    this.mUppSq.getXform().setSize(15, 15);

    this.mUppSq.draw(vpMatrix);

    this.mUppSq = new Renderable(this.mConstColorShader);
    this.mUppSq.setColor([0.0, 0.0, 0.0, 1]);
    this.mUppSq.getXform().setPosition(xLeft, yUpper);
    this.mUppSq.getXform().setSize(5, 5);

    this.mUppSq.draw(vpMatrix);

    xLeft += 10;
  }
  
  //Right Bottom Exit Rectangle
  var yLower = 380;
  var xLeft = 940;
  var yUpper = 185;
  
  for (let i = 0; i <= 6; i++){
    this.mUppSq = new Renderable(this.mConstColorShader);
    this.mUppSq.setColor([0.4, 0.7, 0.8, 1]);
    this.mUppSq.getXform().setPosition(xLeft, yUpper);
    this.mUppSq.getXform().setSize(15, 15);

    this.mUppSq.draw(vpMatrix);

    this.mUppSq = new Renderable(this.mConstColorShader);
    this.mUppSq.setColor([0.0, 0.0, 0.0, 1]);
    this.mUppSq.getXform().setPosition(xLeft, yUpper);
    this.mUppSq.getXform().setSize(5, 5);

    this.mUppSq.draw(vpMatrix);

    xLeft += 10;
  }
  
  
     //Left Middle Exit Top Rectangle
  var yLower = 380;
  var xLeft = 300;
  var yUpper = 330;
  
  for (let i = 0; i <= 4; i++){
    this.mUppSq = new Renderable(this.mConstColorShader);
    this.mUppSq.setColor([0.4, 0.7, 0.8, 1]);
    this.mUppSq.getXform().setPosition(xLeft, yUpper);
    this.mUppSq.getXform().setSize(15, 15);

    this.mUppSq.draw(vpMatrix);

    this.mUppSq = new Renderable(this.mConstColorShader);
    this.mUppSq.setColor([0.0, 0.0, 0.0, 1]);
    this.mUppSq.getXform().setPosition(xLeft, yUpper);
    this.mUppSq.getXform().setSize(5, 5);

    this.mUppSq.draw(vpMatrix);

    xLeft += 10;
  }
//  
  //Left Middle Exit Left Rectangle//
  var xRight = 200;
  var xLeft = 340;
  var yUpper = 315;
  
  for (let i = 0; i <= 5; i++){
    this.mUppSq = new Renderable(this.mConstColorShader);
    this.mUppSq.setColor([0.4, 0.7, 0.8, 1]);
    this.mUppSq.getXform().setPosition(xLeft, yUpper);
    this.mUppSq.getXform().setSize(15, 15);
    
    this.mUppSq.draw(vpMatrix);
      
    this.mUppSq = new Renderable(this.mConstColorShader);
    this.mUppSq.setColor([0.0, 0.0, 0.0, 1]);
    this.mUppSq.getXform().setPosition(xLeft, yUpper);
    this.mUppSq.getXform().setSize(5, 5);
    
    this.mUppSq.draw(vpMatrix);

    yUpper -= 10;

  }
//  
     //Left Middle Exit Bottom Rectangle
  var yLower = 380;
  var xLeft = 280;
  var yUpper = 250;
  
  for (let i = 0; i <= 6; i++){
    this.mUppSq = new Renderable(this.mConstColorShader);
    this.mUppSq.setColor([0.4, 0.7, 0.8, 1]);
    this.mUppSq.getXform().setPosition(xLeft, yUpper);
    this.mUppSq.getXform().setSize(15, 15);

    this.mUppSq.draw(vpMatrix);

    this.mUppSq = new Renderable(this.mConstColorShader);
    this.mUppSq.setColor([0.0, 0.0, 0.0, 1]);
    this.mUppSq.getXform().setPosition(xLeft, yUpper);
    this.mUppSq.getXform().setSize(5, 5);

    this.mUppSq.draw(vpMatrix);

    xLeft += 10;
  }
//  
  //Left Bottom Exit Rectangle
  var yLower = 380;
  var xLeft = 280;
  var yUpper = 185;
  
  for (let i = 0; i <= 6; i++){
    this.mUppSq = new Renderable(this.mConstColorShader);
    this.mUppSq.setColor([0.4, 0.7, 0.8, 1]);
    this.mUppSq.getXform().setPosition(xLeft, yUpper);
    this.mUppSq.getXform().setSize(15, 15);

    this.mUppSq.draw(vpMatrix);

    this.mUppSq = new Renderable(this.mConstColorShader);
    this.mUppSq.setColor([0.0, 0.0, 0.0, 1]);
    this.mUppSq.getXform().setPosition(xLeft, yUpper);
    this.mUppSq.getXform().setSize(5, 5);

    this.mUppSq.draw(vpMatrix);

    xLeft += 10;
  }
  
  
  ////////////////////Top Rigth Corner///////////
  //
    //Top Right L Side

    
  var x = 878;
  var xLeft = 815;
  var y = 557.5;
  var yBottom = 545;
  var yTop = 570;
  
  
  this.trSquareBRTop = new Renderable(this.mConstColorShader);
  this.trSquareBRTop.setColor([0.4, 0.7, 0.8, 1]);
  this.trSquareBRTop.getXform().setPosition(x, yTop);
  this.trSquareBRTop.getXform().setSize(130, 5);
  this.trSquareBRTop.draw(vpMatrix);
  
  this.trSquareBRBottom = new Renderable(this.mConstColorShader);
  this.trSquareBRBottom.setColor([0.4, 0.7, 0.8, 1]);
  this.trSquareBRBottom.getXform().setPosition(x, yBottom);
  this.trSquareBRBottom.getXform().setSize(130, 5);
  this.trSquareBRBottom.draw(vpMatrix);
    

  this.trSquareTRLeft = new Renderable(this.mConstColorShader);
  this.trSquareTRLeft.setColor([0.4, 0.7, 0.8, 1]);
  this.trSquareTRLeft.getXform().setPosition(xLeft, y);
  this.trSquareTRLeft.getXform().setSize(5, 30);
  this.trSquareTRLeft.draw(vpMatrix);
  

  
  //Top Right L Bottom 
  var xLeft = 920;
  var xRight = 945;
  var x = 932.5;
  var yBottom = 490;
  var yTop = 545;
  var y = 530;
  var xSide = 920;
  var ySide = 557.5;

  
  this.trSquareBRLeft = new Renderable(this.mConstColorShader);
  this.trSquareBRLeft.setColor([0.4, 0.7, 0.8, 1]);
  this.trSquareBRLeft.getXform().setPosition(xLeft, y);
  this.trSquareBRLeft.getXform().setSize(5, 85);
  this.trSquareBRLeft.draw(vpMatrix);
  
  this.trSquareBRRight = new Renderable(this.mConstColorShader);
  this.trSquareBRRight.setColor([0.4, 0.7, 0.8, 1]);
  this.trSquareBRRight.getXform().setPosition(xRight, y);
  this.trSquareBRRight.getXform().setSize(5, 85);
  this.trSquareBRRight.draw(vpMatrix);
  
  this.trRectamgleBRBottom = new Renderable(this.mConstColorShader);
  this.trRectamgleBRBottom.setColor([0.4, 0.7, 0.8, 1]);
  this.trRectamgleBRBottom.getXform().setPosition(x, yBottom);
  this.trRectamgleBRBottom.getXform().setSize(25, 5);
  this.trRectamgleBRBottom.draw(vpMatrix);
  
  this.trRectamgleBRTop = new Renderable(this.mConstColorShader);
  this.trRectamgleBRTop.setColor([0.0, 0.0, 0.0, 1]);
  this.trRectamgleBRTop.getXform().setPosition(x, yTop);
  this.trRectamgleBRTop.getXform().setSize(20, 5);
  this.trRectamgleBRTop.draw(vpMatrix);
  
  this.trSquareTRRight = new Renderable(this.mConstColorShader);
  this.trSquareTRRight.setColor([0.0, 0.0, 0.0, 1]);
  this.trSquareTRRight.getXform().setPosition(xSide, ySide);
  this.trSquareTRRight.getXform().setSize(5, 20);
  this.trSquareTRRight.draw(vpMatrix);
  
  
  //Bottom Left L Side
  var xRight = 850;
  var xLeft = 815;
  var yLeft = 450;
  var yRight = 440;
  var xBottom = 830;
  var yBottom = 402.5;
  
    this.mUppSq = new Renderable(this.mConstColorShader);
    this.mUppSq.setColor([0.4, 0.7, 0.8, 1]);
    this.mUppSq.getXform().setPosition(xLeft, yLeft);
    this.mUppSq.getXform().setSize(5, 100);
    
    this.mUppSq.draw(vpMatrix);
    
    this.mUppSq = new Renderable(this.mConstColorShader);
    this.mUppSq.setColor([0.4, 0.7, 0.8, 1]);
    this.mUppSq.getXform().setPosition(xRight, yRight);
    this.mUppSq.getXform().setSize(5, 80);
    
    this.mUppSq.draw(vpMatrix);
    
    this.mUppSq = new Renderable(this.mConstColorShader);
    this.mUppSq.setColor([0.4, 0.7, 0.8, 1]);
    this.mUppSq.getXform().setPosition(xBottom, yBottom);
    this.mUppSq.getXform().setSize(35, 5);
    
    this.mUppSq.draw(vpMatrix);
    
    
 
  var xTop = 847.5;
  var xBottom = 864;
  var yTop = 500;
  var yBottom = 480;
  var xSide = 880;
  var ySide = 490;
  
    this.mUppSq = new Renderable(this.mConstColorShader);
    this.mUppSq.setColor([0.4, 0.7, 0.8, 1]);
    this.mUppSq.getXform().setPosition(xTop, yTop);
    this.mUppSq.getXform().setSize(70, 5);
    
    this.mUppSq.draw(vpMatrix);
    
    this.mUppSq = new Renderable(this.mConstColorShader);
    this.mUppSq.setColor([0.4, 0.7, 0.8, 1]);
    this.mUppSq.getXform().setPosition(xBottom, yBottom);
    this.mUppSq.getXform().setSize(33, 5);
    
    this.mUppSq.draw(vpMatrix);
    
    this.mUppSq = new Renderable(this.mConstColorShader);
    this.mUppSq.setColor([0.4, 0.7, 0.8, 1]);
    this.mUppSq.getXform().setPosition(xSide, ySide);
    this.mUppSq.getXform().setSize(5, 25);
    
    this.mUppSq.draw(vpMatrix);
      
      
   
   //Middle T Head//
    
  var x = 640;
  var yTop = 625;
  var yBottom = 600;
  
  this.trSquareTLTTop = new Renderable(this.mConstColorShader);
  this.trSquareTLTTop.setColor([0.4, 0.7, 0.8, 1]);
  this.trSquareTLTTop.getXform().setPosition(x, yTop);
  this.trSquareTLTTop.getXform().setSize(220, 5);
  this.trSquareTLTTop.draw(vpMatrix);
  
   this.trSquareTLTBottom = new Renderable(this.mConstColorShader);
  this.trSquareTLTBottom.setColor([0.4, 0.7, 0.8, 1]);
  this.trSquareTLTBottom.getXform().setPosition(x, yBottom);
  this.trSquareTLTBottom.getXform().setSize(220, 5);
  this.trSquareTLTBottom.draw(vpMatrix);
  
  var xLeft = 528;
  var xRight = 750;
  var y = 612.5;
  
  
  this.trSquareTLTLeft = new Renderable(this.mConstColorShader);
  this.trSquareTLTLeft.setColor([0.4, 0.7, 0.8, 1]);
  this.trSquareTLTLeft.getXform().setPosition(xLeft, y);
  this.trSquareTLTLeft.getXform().setSize(5, 30);
  this.trSquareTLTLeft.draw(vpMatrix);
  
  this.trSquareTLTRight = new Renderable(this.mConstColorShader);
  this.trSquareTLTRight.setColor([0.4, 0.7, 0.8, 1]);
  this.trSquareTLTRight.getXform().setPosition(xRight, y);
  this.trSquareTLTRight.getXform().setSize(5, 30);
  this.trSquareTLTRight.draw(vpMatrix);
 
 //Middle T Tail//
     
  var x = 643.5;
  var yTop = 600;
  var yBottom = 520;
  
  this.trSquareTLTTop = new Renderable(this.mConstColorShader);
  this.trSquareTLTTop.setColor([0.0, 0.0, 0.0, 1]);
  this.trSquareTLTTop.getXform().setPosition(x, yTop);
  this.trSquareTLTTop.getXform().setSize(32, 5);
  this.trSquareTLTTop.draw(vpMatrix);
  
   this.trSquareTLTBottom = new Renderable(this.mConstColorShader);
  this.trSquareTLTBottom.setColor([0.4, 0.7, 0.8, 1]);
  this.trSquareTLTBottom.getXform().setPosition(x, yBottom);
  this.trSquareTLTBottom.getXform().setSize(42, 5);
  this.trSquareTLTBottom.draw(vpMatrix);
  
  var xLeft = 625;
  var xRight = 662;
  var y = 558;
  
  
  this.trSquareTLTLeft = new Renderable(this.mConstColorShader);
  this.trSquareTLTLeft.setColor([0.4, 0.7, 0.8, 1]);
  this.trSquareTLTLeft.getXform().setPosition(xLeft, y);
  this.trSquareTLTLeft.getXform().setSize(5, 80);
  this.trSquareTLTLeft.draw(vpMatrix);
  
  this.trSquareTLTRight = new Renderable(this.mConstColorShader);
  this.trSquareTLTRight.setColor([0.4, 0.7, 0.8, 1]);
  this.trSquareTLTRight.getXform().setPosition(xRight, y);
  this.trSquareTLTRight.getXform().setSize(5, 80);
  this.trSquareTLTRight.draw(vpMatrix);
 
 


  

  }