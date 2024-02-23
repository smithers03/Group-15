//Maze 1 Top Right and Bottom Left

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
    this.mUppSq.setColor([0.0, 0.0, 0.6, 1]);
    this.mUppSq.getXform().setPosition(xBound, yUpper);
    this.mUppSq.getXform().setSize(15, 15);
    this.mLowSq = new Renderable(this.mConstColorShader);
    this.mLowSq.setColor([0.0, 0.0, 0.6, 1]);
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

  for (let i = 0; i <= 25; i++){
    this.mUppSq = new Renderable(this.mConstColorShader);
    this.mUppSq.setColor([0.0, 0.0, 0.6, 1]);
    this.mUppSq.getXform().setPosition(xRight, yLower);
    this.mUppSq.getXform().setSize(15, 15);
    this.mLowSq = new Renderable(this.mConstColorShader);
    this.mLowSq.setColor([0.0, 0.0, 0.6, 1]);
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
  var yUpper = 680;

  for (let i = 0; i <= 20; i++){
    this.mUppSq = new Renderable(this.mConstColorShader);
    this.mUppSq.setColor([0.0, 0.0, 0.6, 1]);
    this.mUppSq.getXform().setPosition(xRight, yUpper);
    this.mUppSq.getXform().setSize(15, 15);
    this.mLowSq = new Renderable(this.mConstColorShader);
    this.mLowSq.setColor([0.0, 0.0, 0.6, 1]);
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

  // Left Exit
  var xBound = 280;
  var yMid1U = 480;
  var yMid2U = 430;
  var yMid1L = 330;
  var yMid2L = 380;

  for (let i = 0; i <= 14; i++){
    this.mMUpp1Sq = new Renderable(this.mConstColorShader);
    this.mMUpp1Sq.setColor([0.0, 0.0, 0.6, 1]);
    this.mMUpp1Sq.getXform().setPosition(xBound, yMid1U);
    this.mMUpp1Sq.getXform().setSize(15, 15);
    this.mMLow1Sq = new Renderable(this.mConstColorShader);
    this.mMLow1Sq.setColor([0.0, 0.0, 0.6, 1]);
    this.mMLow1Sq.getXform().setPosition(xBound, yMid2U);
    this.mMLow1Sq.getXform().setSize(15, 15);

    this.mMUpp2Sq = new Renderable(this.mConstColorShader);
    this.mMUpp2Sq.setColor([0.0, 0.0, 0.6, 1]);
    this.mMUpp2Sq.getXform().setPosition(xBound, yMid1L);
    this.mMUpp2Sq.getXform().setSize(15, 15);
    this.mMLow2Sq = new Renderable(this.mConstColorShader);
    this.mMLow2Sq.setColor([0.0, 0.0, 0.6, 1]);
    this.mMLow2Sq.getXform().setPosition(xBound, yMid2L);
    this.mMLow2Sq.getXform().setSize(15, 15);

    this.mMUpp1Sq.draw(vpMatrix);
    this.mMLow1Sq.draw(vpMatrix);
    this.mMUpp2Sq.draw(vpMatrix);
    this.mMLow2Sq.draw(vpMatrix);

    this.mMUpp1Sq = new Renderable(this.mConstColorShader);
    this.mMUpp1Sq.setColor([0.0, 0.0, 0.0, 1]);
    this.mMUpp1Sq.getXform().setPosition(xBound, yMid1U);
    this.mMUpp1Sq.getXform().setSize(5, 5);
    this.mMLow1Sq = new Renderable(this.mConstColorShader);
    this.mMLow1Sq.setColor([0.0, 0.0, 0.0, 1]);
    this.mMLow1Sq.getXform().setPosition(xBound, yMid2U);
    this.mMLow1Sq.getXform().setSize(5, 5);

    this.mMUpp2Sq = new Renderable(this.mConstColorShader);
    this.mMUpp2Sq.setColor([0.0, 0.0, 0.0, 1]);
    this.mMUpp2Sq.getXform().setPosition(xBound, yMid1L);
    this.mMUpp2Sq.getXform().setSize(5, 5);
    this.mMLow2Sq = new Renderable(this.mConstColorShader);
    this.mMLow2Sq.setColor([0.0, 0.0, 0.0, 1]);
    this.mMLow2Sq.getXform().setPosition(xBound, yMid2L);
    this.mMLow2Sq.getXform().setSize(5, 5);

    this.mMUpp1Sq.draw(vpMatrix);
    this.mMLow1Sq.draw(vpMatrix);
    this.mMUpp2Sq.draw(vpMatrix);
    this.mMLow2Sq.draw(vpMatrix);

    xBound += 10;
  }

  // Left Exit
  var xBound = 1000;
  var yMid1U = 480;
  var yMid2U = 430;
  var yMid1L = 330;
  var yMid2L = 380;

  for (let i = 0; i <= 14; i++){
    this.mMUpp1Sq = new Renderable(this.mConstColorShader);
    this.mMUpp1Sq.setColor([0.0, 0.0, 0.6, 1]);
    this.mMUpp1Sq.getXform().setPosition(xBound, yMid1U);
    this.mMUpp1Sq.getXform().setSize(15, 15);
    this.mMLow1Sq = new Renderable(this.mConstColorShader);
    this.mMLow1Sq.setColor([0.0, 0.0, 0.6, 1]);
    this.mMLow1Sq.getXform().setPosition(xBound, yMid2U);
    this.mMLow1Sq.getXform().setSize(15, 15);

    this.mMUpp2Sq = new Renderable(this.mConstColorShader);
    this.mMUpp2Sq.setColor([0.0, 0.0, 0.6, 1]);
    this.mMUpp2Sq.getXform().setPosition(xBound, yMid1L);
    this.mMUpp2Sq.getXform().setSize(15, 15);
    this.mMLow2Sq = new Renderable(this.mConstColorShader);
    this.mMLow2Sq.setColor([0.0, 0.0, 0.6, 1]);
    this.mMLow2Sq.getXform().setPosition(xBound, yMid2L);
    this.mMLow2Sq.getXform().setSize(15, 15);

    this.mMUpp1Sq.draw(vpMatrix);
    this.mMLow1Sq.draw(vpMatrix);
    this.mMUpp2Sq.draw(vpMatrix);
    this.mMLow2Sq.draw(vpMatrix);

    this.mMUpp1Sq = new Renderable(this.mConstColorShader);
    this.mMUpp1Sq.setColor([0.0, 0.0, 0.0, 1]);
    this.mMUpp1Sq.getXform().setPosition(xBound, yMid1U);
    this.mMUpp1Sq.getXform().setSize(5, 5);
    this.mMLow1Sq = new Renderable(this.mConstColorShader);
    this.mMLow1Sq.setColor([0.0, 0.0, 0.0, 1]);
    this.mMLow1Sq.getXform().setPosition(xBound, yMid2U);
    this.mMLow1Sq.getXform().setSize(5, 5);

    this.mMUpp2Sq = new Renderable(this.mConstColorShader);
    this.mMUpp2Sq.setColor([0.0, 0.0, 0.0, 1]);
    this.mMUpp2Sq.getXform().setPosition(xBound, yMid1L);
    this.mMUpp2Sq.getXform().setSize(5, 5);
    this.mMLow2Sq = new Renderable(this.mConstColorShader);
    this.mMLow2Sq.setColor([0.0, 0.0, 0.0, 1]);
    this.mMLow2Sq.getXform().setPosition(xBound, yMid2L);
    this.mMLow2Sq.getXform().setSize(5, 5);

    this.mMUpp1Sq.draw(vpMatrix);
    this.mMLow1Sq.draw(vpMatrix);
    this.mMUpp2Sq.draw(vpMatrix);
    this.mMLow2Sq.draw(vpMatrix);

    xBound -= 10;
  }

  // Left Exit Sides

  var xLeft = 420;
  var yUpper = 480;
  var yLower = 330;

  for (let i = 0; i <= 5; i++){
    this.mUppSq = new Renderable(this.mConstColorShader);
    this.mUppSq.setColor([0.0, 0.0, 0.6, 1]);
    this.mUppSq.getXform().setPosition(xLeft, yUpper);
    this.mUppSq.getXform().setSize(15, 15);
    this.mLowSq = new Renderable(this.mConstColorShader);
    this.mLowSq.setColor([0.0, 0.0, 0.6, 1]);
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

    yUpper -= 10;
    yLower += 10;
  }

  // Right Exit Sides

  var xRight = 860;
  var yUpper = 480;
  var yLower = 330;

  for (let i = 0; i <= 5; i++){
    this.mUppSq = new Renderable(this.mConstColorShader);
    this.mUppSq.setColor([0.0, 0.0, 0.6, 1]);
    this.mUppSq.getXform().setPosition(xRight, yUpper);
    this.mUppSq.getXform().setSize(15, 15);
    this.mLowSq = new Renderable(this.mConstColorShader);
    this.mLowSq.setColor([0.0, 0.0, 0.6, 1]);
    this.mLowSq.getXform().setPosition(xRight, yLower);
    this.mLowSq.getXform().setSize(15, 15);

    this.mUppSq.draw(vpMatrix);
    this.mLowSq.draw(vpMatrix);

    this.mUppSq = new Renderable(this.mConstColorShader);
    this.mUppSq.setColor([0.0, 0.0, 0.0, 1]);
    this.mUppSq.getXform().setPosition(xRight, yUpper);
    this.mUppSq.getXform().setSize(5, 5);
    this.mLowSq = new Renderable(this.mConstColorShader);
    this.mLowSq.setColor([0.0, 0.0, 0.0, 1]);
    this.mLowSq.getXform().setPosition(xRight, yLower);
    this.mLowSq.getXform().setSize(5, 5);

    this.mUppSq.draw(vpMatrix);
    this.mLowSq.draw(vpMatrix);

    yUpper -= 10;
    yLower += 10;
  }
  
  
  
  // Middle Box - Daniel
  
  var xRight = 740;
  var xLeft = 540;
  var yUpper = 430;
  
  for (let i = 0; i <= 4; i++){
    this.mUppSq = new Renderable(this.mConstColorShader);
    this.mUppSq.setColor([0.0, 0.0, 0.6, 1]);
    this.mUppSq.getXform().setPosition(xLeft, yUpper);
    this.mUppSq.getXform().setSize(15, 15);
    this.mLowSq = new Renderable(this.mConstColorShader);
    this.mLowSq.setColor([0.0, 0.0, 0.6, 1]);
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
    this.mUppSq.setColor([0.0, 0.0, 0.6, 1]);
    this.mUppSq.getXform().setPosition(xLeft, yUpper);
    this.mUppSq.getXform().setSize(15, 15);
    this.mLowSq = new Renderable(this.mConstColorShader);
    this.mLowSq.setColor([0.0, 0.0, 0.6, 1]);
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
  
  // Bottom-left Corner - Daniel
  
  var x1,y1,x2,y2;
  
  // Obstacle 1
  x1 = 480;
  y1 = 355;
  
  this.mBlueSq1 = new Renderable(this.mConstColorShader);
  this.mBlueSq1.setColor([0.0, 0.0, 0.6, 1]);
  this.mBlueSq1.getXform().setPosition(x1, y1);
  this.mBlueSq1.getXform().setSize(35, 65);
  this.mBlackSq1 = new Renderable(this.mConstColorShader);
  this.mBlackSq1.setColor([0.0, 0.0, 0.0, 1]);
  this.mBlackSq1.getXform().setPosition(x1, y1);
  this.mBlackSq1.getXform().setSize(25, 55);
    
  this.mBlueSq1.draw(vpMatrix);
  this.mBlackSq1.draw(vpMatrix);
  
  // Obstacles 2 & 3
  y1 = 205;
  x1 = 640;
  y2 = 330;
  
  this.mBlueSq1 = new Renderable(this.mConstColorShader);
  this.mBlueSq1.setColor([0.0, 0.0, 0.6, 1]);
  this.mBlueSq1.getXform().setPosition(x1, y1);
  this.mBlueSq1.getXform().setSize(215, 25);
  this.mBlueSq2 = new Renderable(this.mConstColorShader);
  this.mBlueSq2.setColor([0.0, 0.0, 0.6, 1]);
  this.mBlueSq2.getXform().setPosition(x1, y2);
  this.mBlueSq2.getXform().setSize(215, 15);
  
  this.mBlackSq1 = new Renderable(this.mConstColorShader);
  this.mBlackSq1.setColor([0.0, 0.0, 0.0, 1]);
  this.mBlackSq1.getXform().setPosition(x1, y1);
  this.mBlackSq1.getXform().setSize(205, 15);
  this.mBlackSq2 = new Renderable(this.mConstColorShader);
  this.mBlackSq2.setColor([0.0, 0.0, 0.0, 1]);
  this.mBlackSq2.getXform().setPosition(x1, y2);
  this.mBlackSq2.getXform().setSize(205, 5);
  
  this.mBlueSq1.draw(vpMatrix);
  this.mBlueSq2.draw(vpMatrix);
  this.mBlackSq1.draw(vpMatrix);
  this.mBlackSq2.draw(vpMatrix);

  x1 = 640;
  y1 = 157.5;
  y2 = 287.5;
  
  this.mBlueSq1 = new Renderable(this.mConstColorShader);
  this.mBlueSq1.setColor([0.0, 0.0, 0.6, 1]);
  this.mBlueSq1.getXform().setPosition(x1, y1);
  this.mBlueSq1.getXform().setSize(35, 70);
  this.mBlueSq2 = new Renderable(this.mConstColorShader);
  this.mBlueSq2.setColor([0.0, 0.0, 0.6, 1]);
  this.mBlueSq2.getXform().setPosition(x1, y2);
  this.mBlueSq2.getXform().setSize(35, 70);
  
  this.mBlackSq1 = new Renderable(this.mConstColorShader);
  this.mBlackSq1.setColor([0.0, 0.0, 0.0, 1]);
  this.mBlackSq1.getXform().setPosition(x1, y1+5);
  this.mBlackSq1.getXform().setSize(25, 70);
  this.mBlackSq2 = new Renderable(this.mConstColorShader);
  this.mBlackSq2.setColor([0.0, 0.0, 0.0, 1]);
  this.mBlackSq2.getXform().setPosition(x1, y2+5);
  this.mBlackSq2.getXform().setSize(25, 70);
  
  this.mBlueSq1.draw(vpMatrix);
  this.mBlueSq2.draw(vpMatrix);
  this.mBlackSq1.draw(vpMatrix);
  this.mBlackSq2.draw(vpMatrix);
  
  // Obstacle 4
  y1 = 270;
  x1 = 525;
  
  this.mBlueSq1 = new Renderable(this.mConstColorShader);
  this.mBlueSq1.setColor([0.0, 0.0, 0.6, 1]);
  this.mBlueSq1.getXform().setPosition(x1, y1);
  this.mBlueSq1.getXform().setSize(125, 35);
  this.mBlackSq1 = new Renderable(this.mConstColorShader);
  this.mBlackSq1.setColor([0.0, 0.0, 0.0, 1]);
  this.mBlackSq1.getXform().setPosition(x1, y1);
  this.mBlackSq1.getXform().setSize(115, 25);
    
  this.mBlueSq1.draw(vpMatrix);
  this.mBlackSq1.draw(vpMatrix);
  
  // Obstacle 5
  y1 = 270;
  x1 = 377.5;
  x2 = 410;
  y2 = 222.5;
  
  this.mBlueSq1 = new Renderable(this.mConstColorShader);
  this.mBlueSq1.setColor([0.0, 0.0, 0.6, 1]);
  this.mBlueSq1.getXform().setPosition(x1, y1);
  this.mBlueSq1.getXform().setSize(100, 35);
  this.mBlueSq2 = new Renderable(this.mConstColorShader);
  this.mBlueSq2.setColor([0.0, 0.0, 0.6, 1]);
  this.mBlueSq2.getXform().setPosition(x2, y2);
  this.mBlueSq2.getXform().setSize(35, 60);
  
  this.mBlackSq1 = new Renderable(this.mConstColorShader);
  this.mBlackSq1.setColor([0.0, 0.0, 0.0, 1]);
  this.mBlackSq1.getXform().setPosition(x1, y1);
  this.mBlackSq1.getXform().setSize(90, 25);
  this.mBlackSq2 = new Renderable(this.mConstColorShader);
  this.mBlackSq2.setColor([0.0, 0.0, 0.0, 1]);
  this.mBlackSq2.getXform().setPosition(x2, y2+5);
  this.mBlackSq2.getXform().setSize(25, 60);
  
  this.mBlueSq1.draw(vpMatrix);
  this.mBlackSq1.draw(vpMatrix);
  this.mBlueSq2.draw(vpMatrix);
  this.mBlackSq2.draw(vpMatrix);
 
  // Obstacle 6
  y1 = 205;
  x1 = 325;
  
  this.mBlueSq1 = new Renderable(this.mConstColorShader);
  this.mBlueSq1.setColor([0.0, 0.0, 0.6, 1]);
  this.mBlueSq1.getXform().setPosition(x1, y1);
  this.mBlueSq1.getXform().setSize(65, 25);
  this.mBlackSq1 = new Renderable(this.mConstColorShader);
  this.mBlackSq1.setColor([0.0, 0.0, 0.0, 1]);
  this.mBlackSq1.getXform().setPosition(x1-2, y1);
  this.mBlackSq1.getXform().setSize(60, 15);
    
  this.mBlueSq1.draw(vpMatrix);
  this.mBlackSq1.draw(vpMatrix);
  
  // Obstacle 7
  y1 = 140;
  x1 = 457.5;
  y2 = 187.5;
  x2 = 480;
  
  this.mBlueSq1 = new Renderable(this.mConstColorShader);
  this.mBlueSq1.setColor([0.0, 0.0, 0.6, 1]);
  this.mBlueSq1.getXform().setPosition(x1, y1);
  this.mBlueSq1.getXform().setSize(260, 35);
  this.mBlueSq2 = new Renderable(this.mConstColorShader);
  this.mBlueSq2.setColor([0.0, 0.0, 0.6, 1]);
  this.mBlueSq2.getXform().setPosition(x2, y2);
  this.mBlueSq2.getXform().setSize(35, 60);
  
  this.mBlackSq1 = new Renderable(this.mConstColorShader);
  this.mBlackSq1.setColor([0.0, 0.0, 0.0, 1]);
  this.mBlackSq1.getXform().setPosition(x1, y1);
  this.mBlackSq1.getXform().setSize(250, 25);
  this.mBlackSq2 = new Renderable(this.mConstColorShader);
  this.mBlackSq2.setColor([0.0, 0.0, 0.0, 1]);
  this.mBlackSq2.getXform().setPosition(x2, y2-5);
  this.mBlackSq2.getXform().setSize(25, 60);
  
  this.mBlueSq1.draw(vpMatrix);
  this.mBlackSq1.draw(vpMatrix);
  this.mBlueSq2.draw(vpMatrix);
  this.mBlackSq2.draw(vpMatrix);
  
  
  ///////////////////////Maaheens Top Right Corner ///////////////////////////
  
  //Top Right Square//
  
  var x = 900;
  var yBottom = 580;
  var yTop = 635;
  
  
  this.trSquareTRTop = new Renderable(this.mConstColorShader);
  this.trSquareTRTop.setColor([0.0, 0.0, 0.6, 1]);
  this.trSquareTRTop.getXform().setPosition(x, yTop);
  this.trSquareTRTop.getXform().setSize(95, 5);
  this.trSquareTRTop.draw(vpMatrix);
  
  this.trSquareTRBottom = new Renderable(this.mConstColorShader);
  this.trSquareTRBottom.setColor([0.0, 0.0, 0.6, 1]);
  this.trSquareTRBottom.getXform().setPosition(x, yBottom);
  this.trSquareTRBottom.getXform().setSize(95, 5);
  this.trSquareTRBottom.draw(vpMatrix);
  
  var xLeft = 855;
  var xRight = 950;
  var y = 607.5;
  
  
  this.trSquareTRLeft = new Renderable(this.mConstColorShader);
  this.trSquareTRLeft.setColor([0.0, 0.0, 0.6, 1]);
  this.trSquareTRLeft.getXform().setPosition(xLeft, y);
  this.trSquareTRLeft.getXform().setSize(5, 60);
  this.trSquareTRLeft.draw(vpMatrix);
  
  this.trSquareTRRight = new Renderable(this.mConstColorShader);
  this.trSquareTRRight.setColor([0.0, 0.0, 0.6, 1]);
  this.trSquareTRRight.getXform().setPosition(xRight, y);
  this.trSquareTRRight.getXform().setSize(5, 60);
  this.trSquareTRRight.draw(vpMatrix);
  
  
  
    //Bottom Right Rectangle//
  
  var x = 900;
  var yBottom = 515;
  var yTop = 540;
  
  
  this.trSquareBRTop = new Renderable(this.mConstColorShader);
  this.trSquareBRTop.setColor([0.0, 0.0, 0.6, 1]);
  this.trSquareBRTop.getXform().setPosition(x, yTop);
  this.trSquareBRTop.getXform().setSize(95, 5);
  this.trSquareBRTop.draw(vpMatrix);
  
  this.trSquareBRBottom = new Renderable(this.mConstColorShader);
  this.trSquareBRBottom.setColor([0.0, 0.0, 0.6, 1]);
  this.trSquareBRBottom.getXform().setPosition(x, yBottom);
  this.trSquareBRBottom.getXform().setSize(95, 5);
  this.trSquareBRBottom.draw(vpMatrix);
  
  var xLeft = 855;
  var xRight = 950;
  var y = 527.5;
  
  
  this.trSquareBRLeft = new Renderable(this.mConstColorShader);
  this.trSquareBRLeft.setColor([0.0, 0.0, 0.6, 1]);
  this.trSquareBRLeft.getXform().setPosition(xLeft, y);
  this.trSquareBRLeft.getXform().setSize(5, 30);
  this.trSquareBRLeft.draw(vpMatrix);
  
  this.trSquareBRRight = new Renderable(this.mConstColorShader);
  this.trSquareBRRight.setColor([0.0, 0.0, 0.6, 1]);
  this.trSquareBRRight.getXform().setPosition(xRight, y);
  this.trSquareBRRight.getXform().setSize(5, 30);
  this.trSquareBRRight.draw(vpMatrix);
  
  
//   //Top Left Rectangle//
  
  
  var x = 760;
  var yBottom = 580;
  var yTop = 635;
  
  
  this.trSquareTLTop = new Renderable(this.mConstColorShader);
  this.trSquareTLTop.setColor([0.0, 0.0, 0.6, 1]);
  this.trSquareTLTop.getXform().setPosition(x, yTop);
  this.trSquareTLTop.getXform().setSize(105, 5);
  this.trSquareTLTop.draw(vpMatrix);
  
  this.trSquareTLBottom = new Renderable(this.mConstColorShader);
  this.trSquareTLBottom.setColor([0.0, 0.0, 0.6, 1]);
  this.trSquareTLBottom.getXform().setPosition(x, yBottom);
  this.trSquareTLBottom.getXform().setSize(105, 5);
  this.trSquareTLBottom.draw(vpMatrix);
  
  var xLeft = 710;
  var xRight = 815;
  var y = 607.5;
  
  
  this.trSquareTRLeft = new Renderable(this.mConstColorShader);
  this.trSquareTRLeft.setColor([0.0, 0.0, 0.6, 1]);
  this.trSquareTRLeft.getXform().setPosition(xLeft, y);
  this.trSquareTRLeft.getXform().setSize(5, 60);
  this.trSquareTRLeft.draw(vpMatrix);
  
  this.trSquareTRRight = new Renderable(this.mConstColorShader);
  this.trSquareTRRight.setColor([0.0, 0.0, 0.6, 1]);
  this.trSquareTRRight.getXform().setPosition(xRight, y);
  this.trSquareTRRight.getXform().setSize(5, 60);
  this.trSquareTRRight.draw(vpMatrix);
 
  
  //Top Middle Rectangle//
    
  var x = 650;
  var yBottom = 580;
  
  this.trSquareMBottom = new Renderable(this.mConstColorShader);
  this.trSquareMBottom.setColor([0.0, 0.0, 0.6, 1]);
  this.trSquareMBottom.getXform().setPosition(x, yBottom);
  this.trSquareMBottom.getXform().setSize(30, 5);
  this.trSquareMBottom.draw(vpMatrix);
  
  var xLeft = 635;
  var xRight = 665;
  var y = 625;
  
  
  this.trSquareMLeft = new Renderable(this.mConstColorShader);
  this.trSquareMLeft.setColor([0.0, 0.0, 0.6, 1]);
  this.trSquareMLeft.getXform().setPosition(xLeft, y);
  this.trSquareMLeft.getXform().setSize(5, 95);
  this.trSquareMLeft.draw(vpMatrix);
  
  this.trSquareMRight = new Renderable(this.mConstColorShader);
  this.trSquareMRight.setColor([0.0, 0.0, 0.6, 1]);
  this.trSquareMRight.getXform().setPosition(xRight, y);
  this.trSquareMRight.getXform().setSize(5, 95);
  this.trSquareMRight.draw(vpMatrix);
 
 
   //Bottom Right T Head//
    
  var x = 800;
  var yTop = 540;
  var yBottom = 425;
  
  this.trSquareBRTTop = new Renderable(this.mConstColorShader);
  this.trSquareBRTTop.setColor([0.0, 0.0, 0.6, 1]);
  this.trSquareBRTTop.getXform().setPosition(x, yTop);
  this.trSquareBRTTop.getXform().setSize(30, 5);
  this.trSquareBRTTop.draw(vpMatrix);
  
   this.trSquareBRTBottom = new Renderable(this.mConstColorShader);
  this.trSquareBRTBottom.setColor([0.0, 0.0, 0.6, 1]);
  this.trSquareBRTBottom.getXform().setPosition(x, yBottom);
  this.trSquareBRTBottom.getXform().setSize(30, 5);
  this.trSquareBRTBottom.draw(vpMatrix);
  
  var xLeft = 787;
  var xRight = 815;
  var y = 482.5;
  
  
  this.trSquareBRTLeft = new Renderable(this.mConstColorShader);
  this.trSquareBRTLeft.setColor([0.0, 0.0, 0.6, 1]);
  this.trSquareBRTLeft.getXform().setPosition(xLeft, y);
  this.trSquareBRTLeft.getXform().setSize(5, 120);
  this.trSquareBRTLeft.draw(vpMatrix);
  
  this.trSquareBRTRight = new Renderable(this.mConstColorShader);
  this.trSquareBRTRight.setColor([0.0, 0.0, 0.6, 1]);
  this.trSquareBRTRight.getXform().setPosition(xRight, y);
  this.trSquareBRTRight.getXform().setSize(5, 120);
  this.trSquareBRTRight.draw(vpMatrix);
 
  
    //Bottom Right T Tail//
    
  var x = 748;
  var yTop = 487;
  var yBottom = 465;
  
  this.trSquareTLTTop = new Renderable(this.mConstColorShader);
  this.trSquareTLTTop.setColor([0.0, 0.0, 0.6, 1]);
  this.trSquareTLTTop.getXform().setPosition(x, yTop);
  this.trSquareTLTTop.getXform().setSize(82, 5);
  this.trSquareTLTTop.draw(vpMatrix);
  
   this.trSquareTLTBottom = new Renderable(this.mConstColorShader);
  this.trSquareTLTBottom.setColor([0.0, 0.0, 0.6, 1]);
  this.trSquareTLTBottom.getXform().setPosition(x, yBottom);
  this.trSquareTLTBottom.getXform().setSize(82, 5);
  this.trSquareTLTBottom.draw(vpMatrix);
  
  var xLeft = 564;
  var xRight = 735;
  var y = 527.5;
  
  
  this.trSquareTLTLeft = new Renderable(this.mConstColorShader);
  this.trSquareTLTLeft.setColor([0.0, 0.0, 0.6, 1]);
  this.trSquareTLTLeft.getXform().setPosition(xLeft, y);
  this.trSquareTLTLeft.getXform().setSize(5, 30);
  this.trSquareTLTLeft.draw(vpMatrix);
  
  this.trSquareTLTRight = new Renderable(this.mConstColorShader);
  this.trSquareTLTRight.setColor([0.0, 0.0, 0.6, 1]);
  this.trSquareTLTRight.getXform().setPosition(xRight, y);
  this.trSquareTLTRight.getXform().setSize(5, 30);
  this.trSquareTLTRight.draw(vpMatrix);
 
 
 
   
    //Top Left T Head//
    
  var x = 650;
  var yTop = 540;
  var yBottom = 515;
  
  this.trSquareTLTTop = new Renderable(this.mConstColorShader);
  this.trSquareTLTTop.setColor([0.0, 0.0, 0.6, 1]);
  this.trSquareTLTTop.getXform().setPosition(x, yTop);
  this.trSquareTLTTop.getXform().setSize(170, 5);
  this.trSquareTLTTop.draw(vpMatrix);
  
   this.trSquareTLTBottom = new Renderable(this.mConstColorShader);
  this.trSquareTLTBottom.setColor([0.0, 0.0, 0.6, 1]);
  this.trSquareTLTBottom.getXform().setPosition(x, yBottom);
  this.trSquareTLTBottom.getXform().setSize(170, 5);
  this.trSquareTLTBottom.draw(vpMatrix);
  
  var xLeft = 708;
  var xRight = 787;
  var y = 476;
  
  
  this.trSquareTLTLeft = new Renderable(this.mConstColorShader);
  this.trSquareTLTLeft.setColor([0.0, 0.0, 0.6, 1]);
  this.trSquareTLTLeft.getXform().setPosition(xLeft, y);
  this.trSquareTLTLeft.getXform().setSize(5, 26);
  this.trSquareTLTLeft.draw(vpMatrix);
  
  this.trSquareTLTRight = new Renderable(this.mConstColorShader);
  this.trSquareTLTRight.setColor([0.0, 0.0, 0.0, 1]);
  this.trSquareTLTRight.getXform().setPosition(xRight, y);
  this.trSquareTLTRight.getXform().setSize(5, 17);
  this.trSquareTLTRight.draw(vpMatrix);
 
 //Top Left T Tail//
     
  var x = 650;
  var yTop = 515;
  var yBottom = 465;
  
  this.trSquareTLTTop = new Renderable(this.mConstColorShader);
  this.trSquareTLTTop.setColor([0.0, 0.0, 0.0, 1]);
  this.trSquareTLTTop.getXform().setPosition(x, yTop);
  this.trSquareTLTTop.getXform().setSize(30, 5);
  this.trSquareTLTTop.draw(vpMatrix);
  
   this.trSquareTLTBottom = new Renderable(this.mConstColorShader);
  this.trSquareTLTBottom.setColor([0.0, 0.0, 0.6, 1]);
  this.trSquareTLTBottom.getXform().setPosition(x, yBottom);
  this.trSquareTLTBottom.getXform().setSize(30, 5);
  this.trSquareTLTBottom.draw(vpMatrix);
  
  var xLeft = 633;
  var xRight = 667;
  var y = 490;
  
  
  this.trSquareTLTLeft = new Renderable(this.mConstColorShader);
  this.trSquareTLTLeft.setColor([0.0, 0.0, 0.6, 1]);
  this.trSquareTLTLeft.getXform().setPosition(xLeft, y);
  this.trSquareTLTLeft.getXform().setSize(5, 55);
  this.trSquareTLTLeft.draw(vpMatrix);
  
  this.trSquareTLTRight = new Renderable(this.mConstColorShader);
  this.trSquareTLTRight.setColor([0.0, 0.0, 0.6, 1]);
  this.trSquareTLTRight.getXform().setPosition(xRight, y);
  this.trSquareTLTRight.getXform().setSize(5, 55);
  this.trSquareTLTRight.draw(vpMatrix);
 
 
 
 
 
 
 
 //**Hetansh Code bottom right


  var centerX = 640;
  var centerY = 360;

  //obstacle 7 mirrored
  // Adjusted coordinates for mirrored obstacle in the bottom right
  var ob7x1 = centerX + (centerX - 457.5); // New x1 for the mirrored position of mBlueSq1 and mBlackSq1
  var ob7x2 = centerX + (centerX - 480); // New x2 for the mirrored position of mBlueSq2 and mBlackSq2, adjusted for width
  var ob7y1 = centerY - (360 - 140) ; // Adjust y1 for bottom alignment, subtracting the height to position it from the bottom
  var ob7y2 = centerY - (360 - 187.5) ; // Adjust y2 similarly, ensuring it's placed above y1 with proper spacing

  this.ob7BlueSq1 = new Renderable(this.mConstColorShader);
  this.ob7BlueSq1.setColor([0.0, 0.0, 0.6, 1]);
  this.ob7BlueSq1.getXform().setPosition(ob7x1, ob7y1);
  this.ob7BlueSq1.getXform().setSize(260, 35);

  this.ob7BlueSq2 = new Renderable(this.mConstColorShader);
  this.ob7BlueSq2.setColor([0.0, 0.0, 0.6, 1]);
  this.ob7BlueSq2.getXform().setPosition(ob7x2, ob7y2);
  this.ob7BlueSq2.getXform().setSize(35, 60);

  this.ob7BlackSq1 = new Renderable(this.mConstColorShader);
  this.ob7BlackSq1.setColor([0.0, 0.0, 0.0, 1]);
  this.ob7BlackSq1.getXform().setPosition(ob7x1, ob7y1);
  this.ob7BlackSq1.getXform().setSize(250, 25);

  this.ob7BlackSq2 = new Renderable(this.mConstColorShader);
  this.ob7BlackSq2.setColor([0.0, 0.0, 0.0, 1]);
  this.ob7BlackSq2.getXform().setPosition(ob7x2 , ob7y2 - 5);
  this.ob7BlackSq2.getXform().setSize(25, 60);

  this.ob7BlueSq1.draw(vpMatrix);
  this.ob7BlackSq1.draw(vpMatrix);
  this.ob7BlueSq2.draw(vpMatrix);
  this.ob7BlackSq2.draw(vpMatrix);
 
// Obstacle 4 - Mirror Image (Bottom-Right Corner)
var ob4x1 = centerX + (centerX - 525); // New x1 for the mirrored position of mBlueSq1 and mBlackSq1
var ob4y1 = centerY - (360 - 270); // Adjust y1 for bottom alignment, subtracting the height to position it from the bottom

this.ob4BlueSq1 = new Renderable(this.mConstColorShader);
this.ob4BlueSq1.setColor([0.0, 0.0, 0.6, 1]);
this.ob4BlueSq1.getXform().setPosition(ob4x1, ob4y1);
this.ob4BlueSq1.getXform().setSize(125, 35);

this.ob4BlackSq1 = new Renderable(this.mConstColorShader);
this.ob4BlackSq1.setColor([0.0, 0.0, 0.0, 1]);
this.ob4BlackSq1.getXform().setPosition(ob4x1, ob4y1);
this.ob4BlackSq1.getXform().setSize(115, 25);

this.ob4BlueSq1.draw(vpMatrix);
this.ob4BlackSq1.draw(vpMatrix);

// Obstacle 5 - Mirror Image (Bottom-Right Corner)
var ob5x1 = centerX + ( centerX - 380); // New x1 for the mirrored position of mBlueSq1 and mBlackSq1
var ob5x2 = centerX + ( centerX - 412); // New x2 for the mirrored position of mBlueSq2 and mBlackSq2
var ob5y1 = centerY - (360 - 270); // Adjust y1 for bottom alignment, subtracting the height to position it from the bottom
var ob5y2 = centerY - (360 - 222.5); // Adjust y2 similarly, ensuring it's placed above y1 with proper spacing

this.ob5BlueSq1 = new Renderable(this.mConstColorShader);
this.ob5BlueSq1.setColor([0.0, 0.0, 0.6, 1]);
this.ob5BlueSq1.getXform().setPosition(ob5x1, ob5y1);
this.ob5BlueSq1.getXform().setSize(100, 35);

this.ob5BlueSq2 = new Renderable(this.mConstColorShader);
this.ob5BlueSq2.setColor([0.0, 0.0, 0.6, 1]);
this.ob5BlueSq2.getXform().setPosition(ob5x2, ob5y2);
this.ob5BlueSq2.getXform().setSize(35, 60);

this.ob5BlackSq1 = new Renderable(this.mConstColorShader);
this.ob5BlackSq1.setColor([0.0, 0.0, 0.0, 1]);
this.ob5BlackSq1.getXform().setPosition(ob5x1, ob5y1);
this.ob5BlackSq1.getXform().setSize(90, 25);

this.ob5BlackSq2 = new Renderable(this.mConstColorShader);
this.ob5BlackSq2.setColor([0.0, 0.0, 0.0, 1]);
this.ob5BlackSq2.getXform().setPosition(ob5x2, ob5y2 + 5);
this.ob5BlackSq2.getXform().setSize(25, 60);

this.ob5BlueSq1.draw(vpMatrix);
this.ob5BlackSq1.draw(vpMatrix);
this.ob5BlueSq2.draw(vpMatrix);
this.ob5BlackSq2.draw(vpMatrix);
 
 // Obstacle 6 - Mirror Image (Bottom-Right Corner)
var ob6x1 = centerX - ( centerX - 960); // New x1 for the mirrored position of mBlueSq1 and mBlackSq1
var ob6y1 = centerY - (360 - 205); // Adjust y1 for bottom alignment, subtracting the height to position it from the bottom

this.ob6BlueSq1 = new Renderable(this.mConstColorShader);
this.ob6BlueSq1.setColor([0.0, 0.0, 0.6, 1]);
this.ob6BlueSq1.getXform().setPosition(ob6x1, ob6y1);
this.ob6BlueSq1.getXform().setSize(75, 25);

this.ob6BlackSq1 = new Renderable(this.mConstColorShader);
this.ob6BlackSq1.setColor([0.0, 0.0, 0.0, 1]);
this.ob6BlackSq1.getXform().setPosition(ob6x1 - 2, ob6y1);
this.ob6BlackSq1.getXform().setSize(60, 15);

this.ob6BlueSq1.draw(vpMatrix);
this.ob6BlackSq1.draw(vpMatrix);


//Maaheen Part//
 //Middle Right Rectangle//
    
  var x = 800;
  var yTop = 382;
  var yBottom = 325;
  
  this.trSquareBRTTop = new Renderable(this.mConstColorShader);
  this.trSquareBRTTop.setColor([0.0, 0.0, 0.6, 1]);
  this.trSquareBRTTop.getXform().setPosition(x, yTop);
  this.trSquareBRTTop.getXform().setSize(30, 5);
  this.trSquareBRTTop.draw(vpMatrix);
  
   this.trSquareBRTBottom = new Renderable(this.mConstColorShader);
  this.trSquareBRTBottom.setColor([0.0, 0.0, 0.6, 1]);
  this.trSquareBRTBottom.getXform().setPosition(x, yBottom);
  this.trSquareBRTBottom.getXform().setSize(30, 5);
  this.trSquareBRTBottom.draw(vpMatrix);
  
  var xLeft = 787;
  var xRight = 815;
  var y = 353.5;
  
  
  this.trSquareBRTLeft = new Renderable(this.mConstColorShader);
  this.trSquareBRTLeft.setColor([0.0, 0.0, 0.6, 1]);
  this.trSquareBRTLeft.getXform().setPosition(xLeft, y);
  this.trSquareBRTLeft.getXform().setSize(5, 62);
  this.trSquareBRTLeft.draw(vpMatrix);
  
  this.trSquareBRTRight = new Renderable(this.mConstColorShader);
  this.trSquareBRTRight.setColor([0.0, 0.0, 0.6, 1]);
  this.trSquareBRTRight.getXform().setPosition(xRight, y);
  this.trSquareBRTRight.getXform().setSize(5, 62);
  this.trSquareBRTRight.draw(vpMatrix);
 



//Tony part
//Top Left Square//

var xMirror = 380;  // Adjust the x-coordinate for the mirror image
var yBottomMirror = 580;
var yTopMirror = 635;

this.trSquareTLTopMirror = new Renderable(this.mConstColorShader);
this.trSquareTLTopMirror.setColor([0.0, 0.0, 0.6, 1]);
this.trSquareTLTopMirror.getXform().setPosition(xMirror, yTopMirror);
this.trSquareTLTopMirror.getXform().setSize(95, 5);
this.trSquareTLTopMirror.draw(vpMatrix);

this.trSquareTLBottomMirror = new Renderable(this.mConstColorShader);
this.trSquareTLBottomMirror.setColor([0.0, 0.0, 0.6, 1]);
this.trSquareTLBottomMirror.getXform().setPosition(xMirror, yBottomMirror);
this.trSquareTLBottomMirror.getXform().setSize(95, 5);
this.trSquareTLBottomMirror.draw(vpMatrix);

var xLeftMirror = 335;
var xRightMirror = 430;
var yMirror = 607.5;

this.trSquareTLLeftMirror = new Renderable(this.mConstColorShader);
this.trSquareTLLeftMirror.setColor([0.0, 0.0, 0.6, 1]);
this.trSquareTLLeftMirror.getXform().setPosition(xLeftMirror, yMirror);
this.trSquareTLLeftMirror.getXform().setSize(5, 60);
this.trSquareTLLeftMirror.draw(vpMatrix);

this.trSquareTLRightMirror = new Renderable(this.mConstColorShader);
this.trSquareTLRightMirror.setColor([0.0, 0.0, 0.6, 1]);
this.trSquareTLRightMirror.getXform().setPosition(xRightMirror, yMirror);
this.trSquareTLRightMirror.getXform().setSize(5, 60);
this.trSquareTLRightMirror.draw(vpMatrix);

// Bottom Left Square //

var xMirror = 380;  // Adjust the x-coordinate for the mirror image
var yBottomMirror = 515;
var yTopMirror = 540;

this.trSquareBLTopMirror = new Renderable(this.mConstColorShader);
this.trSquareBLTopMirror.setColor([0.0, 0.0, 0.6, 1]);
this.trSquareBLTopMirror.getXform().setPosition(xMirror, yTopMirror);
this.trSquareBLTopMirror.getXform().setSize(95, 5);
this.trSquareBLTopMirror.draw(vpMatrix);

this.trSquareBLBottomMirror = new Renderable(this.mConstColorShader);
this.trSquareBLBottomMirror.setColor([0.0, 0.0, 0.6, 1]);
this.trSquareBLBottomMirror.getXform().setPosition(xMirror, yBottomMirror);
this.trSquareBLBottomMirror.getXform().setSize(95, 5);
this.trSquareBLBottomMirror.draw(vpMatrix);

var xLeftMirror = 335;
var xRightMirror = 430;
var yMirror = 527.5;

this.trSquareBLLeftMirror = new Renderable(this.mConstColorShader);
this.trSquareBLLeftMirror.setColor([0.0, 0.0, 0.6, 1]);
this.trSquareBLLeftMirror.getXform().setPosition(xLeftMirror, yMirror);
this.trSquareBLLeftMirror.getXform().setSize(5, 30);
this.trSquareBLLeftMirror.draw(vpMatrix);

this.trSquareBLRightMirror = new Renderable(this.mConstColorShader);
this.trSquareBLRightMirror.setColor([0.0, 0.0, 0.6, 1]);
this.trSquareBLRightMirror.getXform().setPosition(xRightMirror, yMirror);
this.trSquareBLRightMirror.getXform().setSize(5, 30);
this.trSquareBLRightMirror.draw(vpMatrix);

// Right Square
var xMirror = 520;  // Adjust the x-coordinate for the mirror image
var yBottomMirror = 580;
var yTopMirror = 635;

this.trSquareTLTopMirror = new Renderable(this.mConstColorShader);
this.trSquareTLTopMirror.setColor([0.0, 0.0, 0.6, 1]);
this.trSquareTLTopMirror.getXform().setPosition(xMirror, yTopMirror);
this.trSquareTLTopMirror.getXform().setSize(95, 5);
this.trSquareTLTopMirror.draw(vpMatrix);

this.trSquareTLBottomMirror = new Renderable(this.mConstColorShader);
this.trSquareTLBottomMirror.setColor([0.0, 0.0, 0.6, 1]);
this.trSquareTLBottomMirror.getXform().setPosition(xMirror, yBottomMirror);
this.trSquareTLBottomMirror.getXform().setSize(95, 5);
this.trSquareTLBottomMirror.draw(vpMatrix);

var xLeftMirror = 475;
var xRightMirror = 570;
var yMirror = 607.5;

this.trSquareTLLeftMirror = new Renderable(this.mConstColorShader);
this.trSquareTLLeftMirror.setColor([0.0, 0.0, 0.6, 1]);
this.trSquareTLLeftMirror.getXform().setPosition(xLeftMirror, yMirror);
this.trSquareTLLeftMirror.getXform().setSize(5, 60);
this.trSquareTLLeftMirror.draw(vpMatrix);

this.trSquareTLRightMirror = new Renderable(this.mConstColorShader);
this.trSquareTLRightMirror.setColor([0.0, 0.0, 0.6, 1]);
this.trSquareTLRightMirror.getXform().setPosition(xRightMirror, yMirror);
this.trSquareTLRightMirror.getXform().setSize(5, 60);
this.trSquareTLRightMirror.draw(vpMatrix);


//Maaheen Part

   //Bottom Left T Head//
    
  var x = 480;
  var yTop = 540;
  var yBottom = 425;
  
  this.trSquareBRTTop = new Renderable(this.mConstColorShader);
  this.trSquareBRTTop.setColor([0.0, 0.0, 0.6, 1]);
  this.trSquareBRTTop.getXform().setPosition(x, yTop);
  this.trSquareBRTTop.getXform().setSize(30, 5);
  this.trSquareBRTTop.draw(vpMatrix);
  
   this.trSquareBRTBottom = new Renderable(this.mConstColorShader);
  this.trSquareBRTBottom.setColor([0.0, 0.0, 0.6, 1]);
  this.trSquareBRTBottom.getXform().setPosition(x, yBottom);
  this.trSquareBRTBottom.getXform().setSize(30, 5);
  this.trSquareBRTBottom.draw(vpMatrix);
  
  var xLeft = 467.5;
  var xRight = 495;
  var y = 482.5;
  
  
  this.trSquareBRTLeft = new Renderable(this.mConstColorShader);
  this.trSquareBRTLeft.setColor([0.0, 0.0, 0.6, 1]);
  this.trSquareBRTLeft.getXform().setPosition(xLeft, y);
  this.trSquareBRTLeft.getXform().setSize(5, 120);
  this.trSquareBRTLeft.draw(vpMatrix);
  
  this.trSquareBRTRight = new Renderable(this.mConstColorShader);
  this.trSquareBRTRight.setColor([0.0, 0.0, 0.6, 1]);
  this.trSquareBRTRight.getXform().setPosition(xRight, y);
  this.trSquareBRTRight.getXform().setSize(5, 120);
  this.trSquareBRTRight.draw(vpMatrix);
 
 
 
 // Bottom Left T Tail //

var xMirror = 545;  // Adjust the x-coordinate for the mirror image
var yTopMirror = 487;
var yBottomMirror = 465;

this.trSquareTLTTopMirror = new Renderable(this.mConstColorShader);
this.trSquareTLTTopMirror.setColor([0.0, 0.0, 0.6, 1]);
this.trSquareTLTTopMirror.getXform().setPosition(xMirror, yTopMirror);
this.trSquareTLTTopMirror.getXform().setSize(100, 5);
this.trSquareTLTTopMirror.draw(vpMatrix);

this.trSquareTLTBottomMirror = new Renderable(this.mConstColorShader);
this.trSquareTLTBottomMirror.setColor([0.0, 0.0, 0.6, 1]);
this.trSquareTLTBottomMirror.getXform().setPosition(xMirror, yBottomMirror);
this.trSquareTLTBottomMirror.getXform().setSize(100, 5);
this.trSquareTLTBottomMirror.draw(vpMatrix);

var xLeftMirror = 495;
var xRightMirror = 592.5;
var yMirror = 476;

this.trSquareTLTLeftMirror = new Renderable(this.mConstColorShader);
this.trSquareTLTLeftMirror.setColor([0.0, 0.0, 0.0, 1]);
this.trSquareTLTLeftMirror.getXform().setPosition(xLeftMirror, yMirror);
this.trSquareTLTLeftMirror.getXform().setSize(5, 17);
this.trSquareTLTLeftMirror.draw(vpMatrix);

this.trSquareTLTRightMirror = new Renderable(this.mConstColorShader);
this.trSquareTLTRightMirror.setColor([0.0, 0.0, 0.6, 1]);
this.trSquareTLTRightMirror.getXform().setPosition(xRightMirror, yMirror);
this.trSquareTLTRightMirror.getXform().setSize(5, 27);
this.trSquareTLTRightMirror.draw(vpMatrix);
}
