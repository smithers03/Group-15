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
  
 ///////////// // Right Top Corner//////////////////
 //
  //  Right Top Square //
  
  //TOP AND BOTTOM//
  var xRight = 900;
  var yUpper = 640;
  var yLower = 585;
  

  for (let i = 0; i <= 5; i++){
    this.trSquareRightTop = new Renderable(this.mConstColorShader);
    this.trSquareRightTop.setColor([0.0, 0.0, 0.6, 1]);
    this.trSquareRightTop.getXform().setPosition(xRight, yUpper);
    this.trSquareRightTop.getXform().setSize(90, 5);
    this.trSquareRightTop.draw(vpMatrix);
     
    this.trSquareRightBottom = new Renderable(this.mConstColorShader);
    this.trSquareRightBottom.setColor([0.0, 0.0, 0.6, 1]);
    this.trSquareRightBottom.getXform().setPosition(xRight, yLower);
    this.trSquareRightBottom.getXform().setSize(90, 5);
    this.trSquareRightBottom.draw(vpMatrix); 
     
}

//LEFT AND RIGHT//
  var y = 612.5;
  var xLeft = 854;
  var xRight = 945;
  

  for (let i = 0; i <= 5; i++){
    this.trSquareRightLeft = new Renderable(this.mConstColorShader);
    this.trSquareRightLeft.setColor([0.0, 0.0, 0.6, 1]);
    this.trSquareRightLeft.getXform().setPosition(xLeft, y);
    this.trSquareRightLeft.getXform().setSize(5, 60);
    this.trSquareRightLeft.draw(vpMatrix);
    
    this.trSquareRightRight = new Renderable(this.mConstColorShader);
    this.trSquareRightRight.setColor([0.0, 0.0, 0.6, 1]);
    this.trSquareRightRight.getXform().setPosition(xRight, y);
    this.trSquareRightRight.getXform().setSize(5, 60);
    this.trSquareRightRight.draw(vpMatrix);
    }
    
    
    
   //  Right Bottom Square //
  
  //TOP AND BOTTOM//
  var xRight = 900;
  var yUpper = 545;
  var yLower = 520;
  

  for (let i = 0; i <= 5; i++){
    this.trSquareBottomTop = new Renderable(this.mConstColorShader);
    this.trSquareBottomTop.setColor([0.0, 0.0, 0.6, 1]);
    this.trSquareBottomTop.getXform().setPosition(xRight, yUpper);
    this.trSquareBottomTop.getXform().setSize(90, 5);
    this.trSquareBottomTop.draw(vpMatrix);
     
    this.trSquareBottomBottom = new Renderable(this.mConstColorShader);
    this.trSquareBottomBottom.setColor([0.0, 0.0, 0.6, 1]);
    this.trSquareBottomBottom.getXform().setPosition(xRight, yLower);
    this.trSquareBottomBottom.getXform().setSize(90, 5);
    this.trSquareBottomBottom.draw(vpMatrix); 
     
}

//LEFT AND RIGHT//
  var y = 532.5;
  var xLeft = 854;
  var xRight = 945;
  

  for (let i = 0; i <= 5; i++){
    this.trSquareBottomLeft = new Renderable(this.mConstColorShader);
    this.trSquareBottomLeft.setColor([0.0, 0.0, 0.6, 1]);
    this.trSquareBottomLeft.getXform().setPosition(xLeft, y);
    this.trSquareBottomLeft.getXform().setSize(5, 29.5);
    this.trSquareBottomLeft.draw(vpMatrix);
    
    this.trSquareBottomRight = new Renderable(this.mConstColorShader);
    this.trSquareBottomRight.setColor([0.0, 0.0, 0.6, 1]);
    this.trSquareBottomRight.getXform().setPosition(xRight, y);
    this.trSquareBottomRight.getXform().setSize(5, 29.5);
    this.trSquareBottomRight.draw(vpMatrix);
    }
    
    
    /// TOP MIDDLE RECTANGLE //
    
      //TOP AND BOTTOM//
  var xRight = 650;
  var yLower = 585;
  

  for (let i = 0; i <= 5; i++){
     
    this.mtRectangleBottom = new Renderable(this.mConstColorShader);
    this.mtRectangleBottom.setColor([0.0, 0.0, 0.6, 1]);
    this.mtRectangleBottom.getXform().setPosition(xRight, yLower);
    this.mtRectangleBottom.getXform().setSize(29.5, 5);
    this.mtRectangleBottom.draw(vpMatrix); 
     
}

//LEFT AND RIGHT//
  var y = 633;
  var xLeft = 635;
  var xRight = 665;
  

  for (let i = 0; i <= 5; i++){
    this.mtRectangleLeft = new Renderable(this.mConstColorShader);
    this.mtRectangleLeft.setColor([0.0, 0.0, 0.6, 1]);
    this.mtRectangleLeft.getXform().setPosition(xLeft, y);
    this.mtRectangleLeft.getXform().setSize(5, 100);
    this.mtRectangleLeft.draw(vpMatrix);
    
    this.mtRectangleRight = new Renderable(this.mConstColorShader);
    this.mtRectangleRight.setColor([0.0, 0.0, 0.6, 1]);
    this.mtRectangleRight.getXform().setPosition(xRight, y);
    this.mtRectangleRight.getXform().setSize(5, 100);
    this.mtRectangleRight.draw(vpMatrix);
    }
    
    
    //TOP LEFT SQUARE //
    //
  //TOP AND BOTTOM//
  var xRight = 757;
  var yUpper = 640;
  var yLower = 585;
  

  for (let i = 0; i <= 5; i++){
    this.trSquareLeftTop = new Renderable(this.mConstColorShader);
    this.trSquareLeftTop.setColor([0.0, 0.0, 0.6, 1]);
    this.trSquareLeftTop.getXform().setPosition(xRight, yUpper);
    this.trSquareLeftTop.getXform().setSize(97, 5);
    this.trSquareLeftTop.draw(vpMatrix);
     
    this.trSquareLeftBottom = new Renderable(this.mConstColorShader);
    this.trSquareLeftBottom.setColor([0.0, 0.0, 0.6, 1]);
    this.trSquareLeftBottom.getXform().setPosition(xRight, yLower);
    this.trSquareLeftBottom.getXform().setSize(100, 5);
    this.trSquareLeftBottom.draw(vpMatrix); 
     
}

//LEFT AND RIGHT//
  var y = 612.5;
  var xLeft = 708;
  var xRight = 805;
  

  for (let i = 0; i <= 5; i++){
    this.trSquareLeftLeft = new Renderable(this.mConstColorShader);
    this.trSquareLeftLeft.setColor([0.0, 0.0, 0.6, 1]);
    this.trSquareLeftLeft.getXform().setPosition(xLeft, y);
    this.trSquareLeftLeft.getXform().setSize(5, 60);
    this.trSquareLeftLeft.draw(vpMatrix);
    
    this.trSquareLeftRight = new Renderable(this.mConstColorShader);
    this.trSquareLeftRight.setColor([0.0, 0.0, 0.6, 1]);
    this.trSquareLeftRight.getXform().setPosition(xRight, y);
    this.trSquareLeftRight.getXform().setSize(5, 60);
    this.trSquareLeftRight.draw(vpMatrix);
    }
    
    
    //Right T Right //
    //
  //TOP AND BOTTOM//
  var xRight = 790;
  var yTop = 545;
  var yLower = 425;
  

  for (let i = 0; i <= 5; i++){
     
    this.trTRRightBottom = new Renderable(this.mConstColorShader);
    this.trTRRightBottom.setColor([0.0, 0.0, 0.6, 1]);
    this.trTRRightBottom.getXform().setPosition(xRight, yLower);
    this.trTRRightBottom.getXform().setSize(29.5, 5);
    this.trTRRightBottom.draw(vpMatrix); 
    
         
    this.trTRRightTop = new Renderable(this.mConstColorShader);
    this.trTRRightTop.setColor([0.0, 0.0, 0.6, 1]);
    this.trTRRightTop.getXform().setPosition(xRight, yTop);
    this.trTRRightTop.getXform().setSize(29.5, 5);
    this.trTRRightTop.draw(vpMatrix); 
     
}

//LEFT AND RIGHT//
  var y = 485;
  var xLeft = 775;
  var xRight = 805;
  

  for (let i = 0; i <= 5; i++)
  {
    this.trTRRightLeft = new Renderable(this.mConstColorShader);
    this.trTRRightLeft.setColor([0.0, 0.0, 0.6, 1]);
    this.trTRRightLeft.getXform().setPosition(xLeft, y);
    this.trTRRightLeft.getXform().setSize(5, 125);
    this.trTRRightLeft.draw(vpMatrix);
    
    this.trTRRightRight = new Renderable(this.mConstColorShader);
    this.trTRRightRight.setColor([0.0, 0.0, 0.6, 1]);
    this.trTRRightRight.getXform().setPosition(xRight, y);
    this.trTRRightRight.getXform().setSize(5, 125);
    this.trTRRightRight.draw(vpMatrix);
    }


    //Right T Left //
    //
  //TOP AND BOTTOM//
  var xRight = 743;
  var yTop = 490;
  var yLower = 475;
  

  for (let i = 0; i <= 5; i++){
     
    this.trTRLeftBottom = new Renderable(this.mConstColorShader);
    this.trTRLeftBottom.setColor([0.0, 0.0, 0.6, 1]);
    this.trTRLeftBottom.getXform().setPosition(xRight, yLower);
    this.trTRLeftBottom.getXform().setSize(69, 5);
    this.trTRLeftBottom.draw(vpMatrix); 
    
         
    this.trTRLeftTop = new Renderable(this.mConstColorShader);
    this.trTRLeftTop.setColor([0.0, 0.0, 0.6, 1]);
    this.trTRLeftTop.getXform().setPosition(xRight, yTop);
    this.trTRLeftTop.getXform().setSize(69, 5);
    this.trTRLeftTop.draw(vpMatrix); 
     
}

//LEFT AND RIGHT//
  var y = 482.5;
  var xLeft = 706;
  var xRight = 775;
  

  for (let i = 0; i <= 5; i++)
  {
    this.trTRLeftLeft = new Renderable(this.mConstColorShader);
    this.trTRLeftLeft.setColor([0.0, 0.0, 0.6, 1]);
    this.trTRLeftLeft.getXform().setPosition(xLeft, y);
    this.trTRLeftLeft.getXform().setSize(5, 20);
    this.trTRLeftLeft.draw(vpMatrix);
    
    this.trTRLeftRight = new Renderable(this.mConstColorShader);
    this.trTRLeftRight.setColor([0.0, 0.0, 0.0, 1]);
    this.trTRLeftRight.getXform().setPosition(xRight, y);
    this.trTRLeftRight.getXform().setSize(5, 10);
    this.trTRLeftRight.draw(vpMatrix);
    }
    
    
    
    
    //Left T Top //
    //
  //TOP AND BOTTOM//
  var xRight = 650;
  var yTop = 545;
  var yLower = 530;
  

  for (let i = 0; i <= 5; i++){
     
    this.trTLRightBottom = new Renderable(this.mConstColorShader);
    this.trTLRightBottom.setColor([0.0, 0.0, 0.6, 1]);
    this.trTLRightBottom.getXform().setPosition(xRight, yLower);
    this.trTLRightBottom.getXform().setSize(160, 5);
    this.trTLRightBottom.draw(vpMatrix); 
    
         
    this.trTLRightTop = new Renderable(this.mConstColorShader);
    this.trTLRightTop.setColor([0.0, 0.0, 0.6, 1]);
    this.trTLRightTop.getXform().setPosition(xRight, yTop);
    this.trTLRightTop.getXform().setSize(160, 5);
    this.trTLRightTop.draw(vpMatrix); 
     
}

//LEFT AND RIGHT//
  var y = 537.5;
  var xLeft = 570;
  var xRight = 730;
  

  for (let i = 0; i <= 5; i++)
  {
    this.trTLRightLeft = new Renderable(this.mConstColorShader);
    this.trTLRightLeft.setColor([0.0, 0.0, 0.6, 1]);
    this.trTLRightLeft.getXform().setPosition(xLeft, y);
    this.trTLRightLeft.getXform().setSize(5, 20);
    this.trTLRightLeft.draw(vpMatrix);
    
    this.trTLRightRight = new Renderable(this.mConstColorShader);
    this.trTLRightRight.setColor([0.0, 0.0, 0.6, 1]);
    this.trTLRightRight.getXform().setPosition(xRight, y);
    this.trTLRightRight.getXform().setSize(5, 20);
    this.trTLRightRight.draw(vpMatrix);
    }


    //Left T Bottom //
    //
  //TOP AND BOTTOM//
  var xRight = 650;
  var yTop = 530;
  var yLower = 470;
  

  for (let i = 0; i <= 5; i++){
     
    this.trTLLeftBottom = new Renderable(this.mConstColorShader);
    this.trTLLeftBottom.setColor([0.0, 0.0, 0.6, 1]);
    this.trTLLeftBottom.getXform().setPosition(xRight, yLower);
    this.trTLLeftBottom.getXform().setSize(40, 5);
    this.trTLLeftBottom.draw(vpMatrix); 
    
         
    this.trTLLeftTop = new Renderable(this.mConstColorShader);
    this.trTLLeftTop.setColor([0.0, 0.0, 0.0, 1]);
    this.trTLLeftTop.getXform().setPosition(xRight, yTop);
    this.trTLLeftTop.getXform().setSize(40, 5);
    this.trTLLeftTop.draw(vpMatrix); 
     
}
//
//LEFT AND RIGHT//
  var y = 500;
  var xLeft = 630;
  var xRight = 670;
  

  for (let i = 0; i <= 5; i++)
  {
    this.trTLLeftLeft = new Renderable(this.mConstColorShader);
    this.trTLLeftLeft.setColor([0.0, 0.0, 0.6, 1]);
    this.trTLLeftLeft.getXform().setPosition(xLeft, y);
    this.trTLLeftLeft.getXform().setSize(5, 64);
    this.trTLLeftLeft.draw(vpMatrix);
    
    this.trTLLeftRight = new Renderable(this.mConstColorShader);
    this.trTLLeftRight.setColor([0.0, 0.0, 0.6, 1]);
    this.trTLLeftRight.getXform().setPosition(xRight, y);
    this.trTLLeftRight.getXform().setSize(5, 64);
    this.trTLLeftRight.draw(vpMatrix);
    }
}
