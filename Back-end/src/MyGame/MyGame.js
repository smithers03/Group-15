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

}
