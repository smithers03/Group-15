/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */



//////////////////// VVVVVVV Surya Part vvvvvvvvvvv ////////////////
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame(htmlCanvasID) {
    // variables of the shader for drawing: one shader to be shared by two renderables
    this.mConstColorShader = null;

    // variables for the squares
    this.mBlueSq = null;        // these are the Renderable objects
    this.mRedSq = null;

    // Step A: Initialize the webGL Context
    gEngine.Core.initializeWebGL(htmlCanvasID);

    // Step B: Set up the camera
    this.mCamera = new Camera(
        vec2.fromValues(640, 360),   // center of the WC
        1020,                        // width of WC
        [130, 0, 1020, 720]         // viewport (orgX, orgY, width, height)
    );

    // Step C: Create the shader
    this.mConstColorShader = new SimpleShader(
        "src/GLSLShaders/SimpleVS.glsl",      // Path to the VertexShader
        "src/GLSLShaders/SimpleFS.glsl");    // Path to the simple FragmentShader

    gEngine.Core.clearCanvas([0, 0, 0, 1]);        // Clear the canvas

    // Step F: Starts the drawing by activating the camera
    this.mCamera.setupViewProjection();
    var vpMatrix = this.mCamera.getVPMatrix();

    // Step D: Create the Renderable objects:

    this.mTLSq = new Renderable(this.mConstColorShader);
    this.mTLSq.setColor([0.9, 0.1, 0.1, 1]);
    this.mTRSq = new Renderable(this.mConstColorShader);
    this.mTRSq.setColor([0.9, 0.1, 0.1, 1]);
    this.mBRSq = new Renderable(this.mConstColorShader);
    this.mBRSq.setColor([0.1, 0.1, 0.9, 1]);
    this.mBLSq = new Renderable(this.mConstColorShader);
    this.mBLSq.setColor([0.1, 0.1, 0.9, 1]);

    // top left
    this.mTLSq.getXform().setPosition(130, 720);
    this.mTLSq.getXform().setSize(20, 20);
    this.mTLSq.draw(vpMatrix);

    // top right
    this.mTRSq.getXform().setPosition(1150, 720);
    this.mTRSq.getXform().setSize(20, 20);
    this.mTRSq.draw(vpMatrix);

    // bottom right
    this.mBRSq.getXform().setPosition(1150, 0);
    this.mBRSq.getXform().setSize(20, 20);
    this.mBRSq.draw(vpMatrix);

    // bottom left
    this.mBLSq.getXform().setPosition(130, 0);
    this.mBLSq.getXform().setSize(20, 20);
    this.mBLSq.draw(vpMatrix);

//    //Check on maze lower limit - please remove when coding
//    this.mUppSq = new Renderable(this.mConstColorShader);
//    this.mUppSq.setColor([0.4, 0.7, 0.8, 1]);
//    this.mUppSq.getXform().setPosition(640, 80);
//    this.mUppSq.getXform().setSize(15, 15);
//    this.mUppSq.draw(vpMatrix);
//
//    //check on maze upper limit - please remove when coding
//    this.mUppSq = new Renderable(this.mConstColorShader);
//    this.mUppSq.setColor([0.4, 0.7, 0.8, 1]);
//    this.mUppSq.getXform().setPosition(640, 680);
//    this.mUppSq.getXform().setSize(15, 15);
//    this.mUppSq.draw(vpMatrix);


/////////////// ^^^^^^^^^^^^^ Surya Part ^^^^^^^^/////////////////////









//////////////vvvvvvvvvvvv  MAAHEEN PART  vvvvvvvvvvv ///////////////////////////////


///////////////////////// MAZE CODE ///////////////////////////

this.mBorder = [];


//////////////////////// TOP MAZE BORDER /////////////////////////

  var xBound = 138;
  var yUpper = 680;

  for (let i = 0; i <= 170; i++){
    let tb = new Renderable(this.mConstColorShader);
    tb.setColor([0.0, 0.5, 0.8, 1]);
    tb.getXform().setPosition(xBound, yUpper);
    tb.getXform().setSize(15, 15);


    this.mBorder.push(tb);

    let tbb = new Renderable(this.mConstColorShader);
    tbb.setColor([0.0, 0.0, 0.0, 1]);
    tbb.getXform().setPosition(xBound, yUpper);
    tbb.getXform().setSize(5, 5);

    this.mBorder.push(tbb);

    xBound += 10;
  }

    
    
    
    
  //////////////////// BOTTOM MAZE BORDER ///////////////////////
  
  var xBound = 138;
  var yUpper = 680;
  var yLower = 40;

  for (let i = 0; i <= 150; i++){
    let bb = new Renderable(this.mConstColorShader);
    bb.setColor([0.0, 0.5, 0.8, 1]);
    bb.getXform().setPosition(xBound, yLower);
    bb.getXform().setSize(15, 15);
    
    this.mBorder.push(bb);

    let bbb = new Renderable(this.mConstColorShader);
    bbb.setColor([0.0, 0.0, 0.0, 1]);
    bbb.getXform().setPosition(xBound, yLower);
    bbb.getXform().setSize(5, 5);
    
    this.mBorder.push(bbb);

    xBound += 10;
  }  
  
  
  
  
  
  ///////////////////////// LEFT TOP BORDER ////////////////
  var xLeft = 138;
  var yUpper = 671;
  
  for (let i = 0; i <= 29; i++){
    let ltb = new Renderable(this.mConstColorShader);
    ltb.setColor([0.0, 0.5, 0.8, 1]);
    ltb.getXform().setPosition(xLeft, yUpper);
    ltb.getXform().setSize(15, 15);
    
    this.mBorder.push(ltb);
    
    let ltbb = new Renderable(this.mConstColorShader);
    ltbb.setColor([0.0, 0.0, 0.0, 1]);
    ltbb.getXform().setPosition(xLeft, yUpper);
    ltbb.getXform().setSize(5, 5);
    
    this.mBorder.push(ltbb);
    
    yUpper -= 10;

  }  



//  /////////////// LEFT BOTTOM BORDER ///////////////////  
  var xLeft = 138;
  var yUpper = 49;
  
  for (let i = 0; i <= 28; i++){
    let lbb = new Renderable(this.mConstColorShader);
    lbb.setColor([0.0, 0.5, 0.8, 1]);
    lbb.getXform().setPosition(xLeft, yUpper);
    lbb.getXform().setSize(15, 15);

    this.mBorder.push(lbb);
    
    let lbbb = new Renderable(this.mConstColorShader);
    lbbb.setColor([0.0, 0.0, 0.0, 1]);
    lbbb.getXform().setPosition(xLeft, yUpper);
    lbbb.getXform().setSize(5, 5);

    this.mBorder.push(lbbb);
    
    yUpper += 10;
  }
  
  
  
    ///////////////////////// RIGHT TOP BORDER ////////////////
  var xLeft = 1143;
  var yUpper = 671;
  
  for (let i = 0; i <= 29; i++){
    let rtb = new Renderable(this.mConstColorShader);
    rtb.setColor([0.0, 0.5, 0.8, 1]);
    rtb.getXform().setPosition(xLeft, yUpper);
    rtb.getXform().setSize(15, 15);
    
    this.mBorder.push(rtb);
    
    let rtbb = new Renderable(this.mConstColorShader);
    rtbb.setColor([0.0, 0.0, 0.0, 1]);
    rtbb.getXform().setPosition(xLeft, yUpper);
    rtbb.getXform().setSize(5, 5);
    
    this.mBorder.push(rtbb);
    
    yUpper -= 10;

  }  



//  /////////////// RIGHT BOTTOM BORDER ///////////////////  
  var xLeft = 1143;
  var yUpper = 49;
  
  for (let i = 0; i <= 28; i++){
    let rbb = new Renderable(this.mConstColorShader);
    rbb.setColor([0.0, 0.5, 0.8, 1]);
    rbb.getXform().setPosition(xLeft, yUpper);
    rbb.getXform().setSize(15, 15);

    this.mBorder.push(rbb);
    
    let rbbb = new Renderable(this.mConstColorShader);
    rbbb.setColor([0.0, 0.0, 0.0, 1]);
    rbbb.getXform().setPosition(xLeft, yUpper);
    rbbb.getXform().setSize(5, 5);

    this.mBorder.push(rbbb);
    
    yUpper += 10;
  }


    
    
   MyGame.prototype.drawBorders = function ()
  {
    for (let i = 0; i < this.mBorder.length; i++)
    {
        this.mBorder[i].draw(vpMatrix);
    }
  };
  
  this.drawBorders(vpMatrix);
    
  
  
      this.mObstacles = [];

    
//    var x = 1140;
//    var y = 355;
//    
//    let a = new Renderable(this.mConstColorShader);
//    a.setColor([0.0, 7.0, 0.0, 1.0]);
//    a.getXform().setPosition(x, y);
//    a.getXform().setSize(35, 35);
//    this.mObstacles.push(a);
    
       MyGame.prototype.drawObstacles = function ()
  {
    for (let i = 0; i < this.mObstacles.length; i++)
    {
        this.mObstacles[i].draw(vpMatrix);
    }
  };
  
    this.drawObstacles(vpMatrix);

 }
