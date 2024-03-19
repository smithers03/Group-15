/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame(htmlCanvasID) {
  // variables of the shader for drawing: one shader to be shared by two renderables
  this.mConstColorShader = null;






////////////vvvvvvvvvvvv  MAAHEEN PART  vvvvvvvvvvv ///////////////////////////////




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


///////////////////////Creating small red and blue coordinating squares/////////////////////

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


/////////////////////// MAZE CODE ///////////////////////////

this.mBorder = [];


////////////////////// TOP MAZE BORDER /////////////////////////

  var xBound = 280;
  var yUpper = 680;
  var yLower = 80;

  for (let i = 0; i <= 72; i++){
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
  
  var xBound = 280;
  var yUpper = 680;
  var yLower = 80;

  for (let i = 0; i <= 72; i++){
    let bb = new Renderable(this.mConstColorShader);
    bb.setColor([0.4, 0.7, 0.8, 1]);
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
    


/////////////////////////// BOTTOM RIGHT SIDE //////////////////////////////

  var xRight = 995;
  var yLower = 80;

  for (let i = 0; i <= 9; i++){
    let brb = new Renderable(this.mConstColorShader);
    brb.setColor([0.4, 0.7, 0.8, 1]);
    brb.getXform().setPosition(xRight, yLower);
    brb.getXform().setSize(15, 15);

    this.mBorder.push(brb);

    let brbb = new Renderable(this.mConstColorShader);
    brbb.setColor([0.0, 0.0, 0.0, 1]);
    brbb.getXform().setPosition(xRight, yLower);
    brbb.getXform().setSize(5, 5);

    this.mBorder.push(brbb);

    yLower += 10;
  }
  
  
  
  
  
  
  /////////////////////  BOTTOM LEFT SIDE //////////////////////////
  
   var xLeft = 285;
   var yLower = 80;

   for (let i = 0; i <= 9; i++){
    let blb = new Renderable(this.mConstColorShader);
    blb.setColor([0.4, 0.7, 0.8, 1]);
    blb.getXform().setPosition(xLeft, yLower);
    blb.getXform().setSize(15, 15);
 
    this.mBorder.push(blb);

    let blbb = new Renderable(this.mConstColorShader);
    blbb.setColor([0.0, 0.0, 0.0, 1]);
    blbb.getXform().setPosition(xLeft, yLower);
    blbb.getXform().setSize(5, 5);

    this.mBorder.push(blbb);
    
    yLower += 10;
    
    }
  
  
  
  
///////////////////////// TOP RIGHT SIDE ///////////////////////

  var xRight = 995;
  var yUpper = 620;

  for (let i = 0; i <= 29; i++){
    let trb = new Renderable(this.mConstColorShader);
    trb.setColor([0.4, 0.7, 0.8, 1]);
    trb.getXform().setPosition(xRight, yUpper);
    trb.getXform().setSize(15, 15);

    this.mBorder.push(trb);
    
    let trbb = new Renderable(this.mConstColorShader);
    trbb.setColor([0.0, 0.0, 0.0, 1]);
    trbb.getXform().setPosition(xRight, yUpper);
    trbb.getXform().setSize(5, 5);

    this.mBorder.push(trbb);
    
    yUpper -= 10;
  }
  
  
  
  
 ////////////////////// TOP LEFT SIDE ////////////////////
 
  var xLeft = 285;
  var yUpper = 620;

  for (let i = 0; i <= 29; i++){
    let tlb = new Renderable(this.mConstColorShader);
    tlb.setColor([0.4, 0.7, 0.8, 1]);
    tlb.getXform().setPosition(xLeft, yUpper);
    tlb.getXform().setSize(15, 15);

    this.mBorder.push(tlb);
    
    let tlbb = new Renderable(this.mConstColorShader);
    tlbb.setColor([0.0, 0.0, 0.0, 1]);
    tlbb.getXform().setPosition(xLeft, yUpper);
    tlbb.getXform().setSize(5, 5);

    this.mBorder.push(tlbb);
    
    yUpper -= 10;
  }

    
    
 
    
/////////////////MIDDLE BOX  LEFT AND RIGHT//////////////////////////
    
  var xRight = 768;
  var xLeft = 518;
  var yUpper = 430;
  
  for (let i = 0; i <= 4; i++){
    let mbl = new Renderable(this.mConstColorShader);
    mbl.setColor([0.4, 0.7, 0.8, 1]);
    mbl.getXform().setPosition(xLeft, yUpper);
    mbl.getXform().setSize(15, 15);
    
    let mbr = new Renderable(this.mConstColorShader);
    mbr.setColor([0.4, 0.7, 0.8, 1]);
    mbr.getXform().setPosition(xRight, yUpper);
    mbr.getXform().setSize(15, 15);

    this.mBorder.push(mbl);
    this.mBorder.push(mbr);
    
    let mblb = new Renderable(this.mConstColorShader);
    mblb.setColor([0.0, 0.0, 0.0, 1]);
    mblb.getXform().setPosition(xLeft, yUpper);
    mblb.getXform().setSize(5, 5);
    
    let mbrb = new Renderable(this.mConstColorShader);
    mbrb.setColor([0.0, 0.0, 0.0, 1]);
    mbrb.getXform().setPosition(xRight, yUpper);
    mbrb.getXform().setSize(5, 5);

    this.mBorder.push(mblb);
    this.mBorder.push(mbrb);
    
    yUpper -= 10;
  }

 
 
 
//////////////// MIDDLE BOX TOP AND BOTTOM ///////////////////
 
  var yLower = 380;
  var xLeft = 518;
  var yUpper = 430;
  
  for (let i = 0; i <= 25; i++){
    let mbt = new Renderable(this.mConstColorShader);
    mbt.setColor([0.4, 0.7, 0.8, 1]);
    mbt.getXform().setPosition(xLeft, yUpper);
    mbt.getXform().setSize(15, 15);
    
    let mbb = new Renderable(this.mConstColorShader);
    mbb.setColor([0.4, 0.7, 0.8, 1]);
    mbb.getXform().setPosition(xLeft, yLower);
    mbb.getXform().setSize(15, 15);

    this.mBorder.push(mbt);
    this.mBorder.push(mbb);
    
    let mbtb = new Renderable(this.mConstColorShader);
    mbtb.setColor([0.0, 0.0, 0.0, 1]);
    mbtb.getXform().setPosition(xLeft, yUpper);
    mbtb.getXform().setSize(5, 5);
    
    let mbbb = new Renderable(this.mConstColorShader);
    mbbb.setColor([0.0, 0.0, 0.0, 1]);
    mbbb.getXform().setPosition(xLeft, yLower);
    mbbb.getXform().setSize(5, 5);

    this.mBorder.push(mbtb);
    this.mBorder.push(mbbb);
    
    xLeft += 10;
  }
  
  
  
  
  
  
/////////////////// TOP LEFT EXIT //////////////////////////

  var xLeft = 300;
  var yUpper = 620;
  
  for (let i = 0; i <= 8; i++){
    let tleb = new Renderable(this.mConstColorShader);
    tleb.setColor([0.4, 0.7, 0.8, 1]);
    tleb.getXform().setPosition(xLeft, yUpper);
    tleb.getXform().setSize(15, 15);

    this.mBorder.push(tleb);
    
    let tlebb = new Renderable(this.mConstColorShader);
    tlebb.setColor([0.0, 0.0, 0.0, 1]);
    tlebb.getXform().setPosition(xLeft, yUpper);
    tlebb.getXform().setSize(5, 5);

    this.mBorder.push(tlebb);
    
    xLeft += 10;
  }
  
  
  
  
  
//////////////////// TOP RIGHT EXIT ///////////////////////////// 
  var xLeft = 900;
  var yUpper = 620;
  
  for (let i = 0; i <= 8; i++){
    let treb = new Renderable(this.mConstColorShader);
    treb.setColor([0.4, 0.7, 0.8, 1]);
    treb.getXform().setPosition(xLeft, yUpper);
    treb.getXform().setSize(15, 15);

    this.mBorder.push(treb);
    
    let trebb = new Renderable(this.mConstColorShader);
    trebb.setColor([0.0, 0.0, 0.0, 1]);
    trebb.getXform().setPosition(xLeft, yUpper);
    trebb.getXform().setSize(5, 5);

    this.mBorder.push(trebb);
    
    xLeft += 10;
  }

    
 
/////////////////////// TOP RIGHT VERTICLE RECTANGLE BORDER ////////////////
  var xRight = 200;
  var xLeft = 820;
  var yUpper = 665;
  
  for (let i = 0; i <= 5; i++){
    let trvb = new Renderable(this.mConstColorShader);
    trvb.setColor([0.4, 0.7, 0.8, 1]);
    trvb.getXform().setPosition(xLeft, yUpper);
    trvb.getXform().setSize(15, 15);
    
    this.mBorder.push(trvb);
    
    let trvbb = new Renderable(this.mConstColorShader);
    trvbb.setColor([0.0, 0.0, 0.0, 1]);
    trvbb.getXform().setPosition(xLeft, yUpper);
    trvbb.getXform().setSize(5, 5);
    
    this.mBorder.push(trvbb);
    
    yUpper -= 10;

  }
  
  
  
  
  
  //////////////////////  TOP LEFT VERTICLE RECTANGLE BORDER ////////////////
  
  var xRight = 200;
  var xLeft = 460;
  var yUpper = 668;
  
  for (let i = 0; i <= 5; i++){
    let tlvb = new Renderable(this.mConstColorShader);
    tlvb.setColor([0.4, 0.7, 0.8, 1]);
    tlvb.getXform().setPosition(xLeft, yUpper);
    tlvb.getXform().setSize(15, 15);
    
    this.mBorder.push(tlvb);
    
    let tlvbb = new Renderable(this.mConstColorShader);
    tlvbb.setColor([0.0, 0.0, 0.0, 1]);
    tlvbb.getXform().setPosition(xLeft, yUpper);
    tlvbb.getXform().setSize(5, 5);
    
    this.mBorder.push(tlvbb);
    
    yUpper -= 10;

  }
  
  
  
  
  
  
  
  ///////////// MIDDLE LEFT HORIZONTAL RECTANGLE BORDER ///////////////

  //Middle Left Rectangle//
  var yLower = 200;
  var xLeft = 300;
  var yUpper = 450;
  
  for (let i = 0; i <= 8; i++){
    let mlhb = new Renderable(this.mConstColorShader);
    mlhb.setColor([0.4, 0.7, 0.8, 1]);
    mlhb.getXform().setPosition(xLeft, yUpper);
    mlhb.getXform().setSize(15, 15);

    this.mBorder.push(mlhb);
    
    let mlhbb = new Renderable(this.mConstColorShader);
    mlhbb.setColor([0.0, 0.0, 0.0, 1]);
    mlhbb.getXform().setPosition(xLeft, yUpper);
    mlhbb.getXform().setSize(5, 5);

    this.mBorder.push(mlhbb);
    
    xLeft += 10;
  }

    
    
    
    
////////////////// MIDDLE RIGHT HORIZONTAL RECTANGLE BORDER //////////////////
//
   //Middle Right Rectangle
  var yLower = 380;
  var xLeft = 900;
  var yUpper = 450;
  
  for (let i = 0; i <= 8; i++){
    let mrhb = new Renderable(this.mConstColorShader);
    mrhb.setColor([0.4, 0.7, 0.8, 1]);
    mrhb.getXform().setPosition(xLeft, yUpper);
    mrhb.getXform().setSize(15, 15);

    this.mBorder.push(mrhb);
    
    let mrhbb = new Renderable(this.mConstColorShader);
    mrhbb.setColor([0.0, 0.0, 0.0, 1]);
    mrhbb.getXform().setPosition(xLeft, yUpper);
    mrhbb.getXform().setSize(5, 5);

    this.mBorder.push(mrhbb);
    
    xLeft += 10;
  }
  
  
  
  
  
  
  
  
 ///////////////////// RIGHT MIDDLE EXIT TOP RECTANGLE BRODER //////////////
  
   //Right Middle Exit Top Rectangle
  var yLower = 380;
  var xLeft = 940;
  var yUpper = 330;
  
  for (let i = 0; i <= 4; i++){
    let rmetb = new Renderable(this.mConstColorShader);
    rmetb.setColor([0.4, 0.7, 0.8, 1]);
    rmetb.getXform().setPosition(xLeft, yUpper);
    rmetb.getXform().setSize(15, 15);

    this.mBorder.push(rmetb);
    
    let rmetbb = new Renderable(this.mConstColorShader);
    rmetbb.setColor([0.0, 0.0, 0.0, 1]);
    rmetbb.getXform().setPosition(xLeft, yUpper);
    rmetbb.getXform().setSize(5, 5);

    this.mBorder.push(rmetbb);
    
    xLeft += 10;
  }
  
  
  
  
  
  
  
  ////////////////// RIGHT MIDDLE EXIT LEFT RECTANGLE BORDER ////////////////
//  
  //Right Middle Exit Left Rectangle//
  var xRight = 200;
  var xLeft = 940;
  var yUpper = 315;
  
  for (let i = 0; i <= 5; i++){
    let rmelb = new Renderable(this.mConstColorShader);
    rmelb.setColor([0.4, 0.7, 0.8, 1]);
    rmelb.getXform().setPosition(xLeft, yUpper);
    rmelb.getXform().setSize(15, 15);
    
    this.mBorder.push(rmelb);
    
    let rmelbb = new Renderable(this.mConstColorShader);
    rmelbb.setColor([0.0, 0.0, 0.0, 1]);
    rmelbb.getXform().setPosition(xLeft, yUpper);
    rmelbb.getXform().setSize(5, 5);
    
    this.mBorder.push(rmelbb);
    
    yUpper -= 10;

  }





/////////////////// RIGHT MIDDLE EXIT BOTTOM RECTANGLE BORDER ///////////////
  var yLower = 380;
  var xLeft = 940;
  var yUpper = 250;
  
  for (let i = 0; i <= 6; i++){
    let rmebb = new Renderable(this.mConstColorShader);
    rmebb.setColor([0.4, 0.7, 0.8, 1]);
    rmebb.getXform().setPosition(xLeft, yUpper);
    rmebb.getXform().setSize(15, 15);

    this.mBorder.push(rmebb);
    
    let rmebbb = new Renderable(this.mConstColorShader);
    rmebbb.setColor([0.0, 0.0, 0.0, 1]);
    rmebbb.getXform().setPosition(xLeft, yUpper);
    rmebbb.getXform().setSize(5, 5);

    this.mBorder.push(rmebbb);
    
    xLeft += 10;
  }
  
  
  
  
  
  
  
  //////////////////// RIGHT BOTTOM EXIT RECTANGLE BORDER /////////////////
  
  var yLower = 380;
  var xLeft = 940;
  var yUpper = 185;
  
  for (let i = 0; i <= 6; i++){
    let rbeb = new Renderable(this.mConstColorShader);
    rbeb.setColor([0.4, 0.7, 0.8, 1]);
    rbeb.getXform().setPosition(xLeft, yUpper);
    rbeb.getXform().setSize(15, 15);

    this.mBorder.push(rbeb);
    
    let rbebb = new Renderable(this.mConstColorShader);
    rbebb.setColor([0.0, 0.0, 0.0, 1]);
    rbebb.getXform().setPosition(xLeft, yUpper);
    rbebb.getXform().setSize(5, 5);

    this.mBorder.push(rbebb);
    
    xLeft += 10;
  }

    
    
    
    
    
    
////////////////// LEFT MIDDLE EXIT TOP RECTANGLE BORDER ///////////////
  var yLower = 380;
  var xLeft = 300;
  var yUpper = 330;
  
  for (let i = 0; i <= 4; i++){
    let lmetb = new Renderable(this.mConstColorShader);
    lmetb.setColor([0.4, 0.7, 0.8, 1]);
    lmetb.getXform().setPosition(xLeft, yUpper);
    lmetb.getXform().setSize(15, 15);

    this.mBorder.push(lmetb);
    
    let lmetbb = new Renderable(this.mConstColorShader);
    lmetbb.setColor([0.0, 0.0, 0.0, 1]);
    lmetbb.getXform().setPosition(xLeft, yUpper);
    lmetbb.getXform().setSize(5, 5);

    this.mBorder.push(lmetbb);
    
    xLeft += 10;
  }






//////////////////// LEFT MIDDLE EXIT RIGHT RECTANGLE BORDER ///////////
  var xRight = 200;
  var xLeft = 340;
  var yUpper = 315;
  
  for (let i = 0; i <= 5; i++){
    let lmerb = new Renderable(this.mConstColorShader);
    lmerb.setColor([0.4, 0.7, 0.8, 1]);
    lmerb.getXform().setPosition(xLeft, yUpper);
    lmerb.getXform().setSize(15, 15);
    
    this.mBorder.push(lmerb);
    
    let lmerbb = new Renderable(this.mConstColorShader);
    lmerbb.setColor([0.0, 0.0, 0.0, 1]);
    lmerbb.getXform().setPosition(xLeft, yUpper);
    lmerbb.getXform().setSize(5, 5);
    
    this.mBorder.push(lmerbb);
    
    yUpper -= 10;

  }










//////////////// LEFT MIDDLE  EXIT BOTTOM RECTANGLE BORDER /////////////////
  var yLower = 380;
  var xLeft = 280;
  var yUpper = 250;
  
  for (let i = 0; i <= 6; i++){
    let lmebb = new Renderable(this.mConstColorShader);
    lmebb.setColor([0.4, 0.7, 0.8, 1]);
    lmebb.getXform().setPosition(xLeft, yUpper);
    lmebb.getXform().setSize(15, 15);

    this.mBorder.push(lmebb);
    
    let lmebbb = new Renderable(this.mConstColorShader);
    lmebbb.setColor([0.0, 0.0, 0.0, 1]);
    lmebbb.getXform().setPosition(xLeft, yUpper);
    lmebbb.getXform().setSize(5, 5);

    this.mBorder.push(lmebbb);
    
    xLeft += 10;
  }

  
  
  
  
  /////////////// LEFT BOTTOM EXIT RECTANGLE BORDER ///////////////////  
  var yLower = 380;
  var xLeft = 280;
  var yUpper = 185;
  
  for (let i = 0; i <= 6; i++){
    let lbeb = new Renderable(this.mConstColorShader);
    lbeb.setColor([0.4, 0.7, 0.8, 1]);
    lbeb.getXform().setPosition(xLeft, yUpper);
    lbeb.getXform().setSize(15, 15);

    this.mBorder.push(lbeb);
    
    let lbebb = new Renderable(this.mConstColorShader);
    lbebb.setColor([0.0, 0.0, 0.0, 1]);
    lbebb.getXform().setPosition(xLeft, yUpper);
    lbebb.getXform().setSize(5, 5);

    this.mBorder.push(lbebb);
    
    xLeft += 10;
  }
//  
   MyGame.prototype.drawBorders = function ()
  {
    for (let i = 0; i < this.mBorder.length; i++)
    {
        this.mBorder[i].draw(vpMatrix);
    }
  };
  
  this.drawBorders(vpMatrix);
    
    
 }
