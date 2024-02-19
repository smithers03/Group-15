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
}
