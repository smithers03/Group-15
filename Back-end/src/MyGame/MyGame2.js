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
    tb.setColor([0.4, 0.7, 0.8, 1]);
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

 
 
 
//////////////// MIDDLE BOX TOP LEFT AND BOTTOM  ///////////////////
 
  var yLower = 380;
  var xLeft = 518;
  var yUpper = 430;
  var xRight = 518;
  
  for (let i = 0; i <= 10; i++){
    let mbtl = new Renderable(this.mConstColorShader);
    mbtl.setColor([0.4, 0.7, 0.8, 1]);
    mbtl.getXform().setPosition(xLeft, yUpper);
    mbtl.getXform().setSize(15, 15);
    

    this.mBorder.push(mbtl);
    
    let mbtlb = new Renderable(this.mConstColorShader);
    mbtlb.setColor([0.0, 0.0, 0.0, 1]);
    mbtlb.getXform().setPosition(xLeft, yUpper);
    mbtlb.getXform().setSize(5, 5);

    this.mBorder.push(mbtlb);
    
    xLeft += 10;
  }
  
  for (let i = 0; i <= 25; i++){  
    
    let mbb = new Renderable(this.mConstColorShader);
    mbb.setColor([0.4, 0.7, 0.8, 1]);
    mbb.getXform().setPosition(xRight, yLower);
    mbb.getXform().setSize(15, 15);

    this.mBorder.push(mbb);
    
    let mbbb = new Renderable(this.mConstColorShader);
    mbbb.setColor([0.0, 0.0, 0.0, 1]);
    mbbb.getXform().setPosition(xRight, yLower);
    mbbb.getXform().setSize(5, 5);

    this.mBorder.push(mbbb);
    
    xRight += 10;
  }
  
  
  //////////////////////// MIDDLE BOX TOP RIGHT  /////////////
  var xLeft = 668;
  var yUpper = 430;
  
  for (let i = 0; i <= 10; i++){
    let mbtr = new Renderable(this.mConstColorShader);
    mbtr.setColor([0.4, 0.7, 0.8, 1]);
    mbtr.getXform().setPosition(xLeft, yUpper);
    mbtr.getXform().setSize(15, 15);

    this.mBorder.push(mbtr);
    
    let mbtrb = new Renderable(this.mConstColorShader);
    mbtrb.setColor([0.0, 0.0, 0.0, 1]);
    mbtrb.getXform().setPosition(xLeft, yUpper);
    mbtrb.getXform().setSize(5, 5);

    this.mBorder.push(mbtrb);
    
    xLeft += 10;
  }
  

  
  
/////////////////// TOP LEFT EXIT //////////////////////////

  var xLeft = 300;
  var yUpper = 620;
  
  for (let i = 0; i <= 11; i++){
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
  var xLeft = 872;
  var yUpper = 620;
  
  for (let i = 0; i <= 11; i++){
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
  
  for (let i = 0; i <= 10; i++){
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
  var xLeft = 884;
  var yUpper = 450;
  
  for (let i = 0; i <= 10; i++){
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
  
  for (let i = 0; i <= 7; i++){
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
  var yUpper = 235;
  
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
  
  for (let i = 0; i <= 7; i++){
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
  var yUpper = 235;
  
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
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
 
    
    
    
    
    
    
    
    
    
    
    
    
    
    this.mObstacles = [];


 ///////////////////////////////Top Right Corner///////////////////

  
  //Top Right L Bottom
  let trtrLRectangleBottom = new Renderable(this.mConstColorShader);
  trtrLRectangleBottom.setColor([0.4, 0.7, 0.8, 1]);
  trtrLRectangleBottom.getXform().setPosition(933, 529);
  trtrLRectangleBottom.getXform().setSize(33, 72);
  this.mObstacles.push(trtrLRectangleBottom);
  
    let trtrLRectangleBottomB = new Renderable(this.mConstColorShader);
  trtrLRectangleBottomB.setColor([0.0, 0.0, 0.0, 1]);
  trtrLRectangleBottomB.getXform().setPosition(933, 531);
  trtrLRectangleBottomB.getXform().setSize(20, 65);
  this.mObstacles.push(trtrLRectangleBottomB);
  
  
  
    
  
  //Top Right L Side
  let trtrLSide = new Renderable(this.mConstColorShader);
  trtrLSide.setColor([0.4, 0.7, 0.8, 1]);
  trtrLSide.getXform().setPosition(882, 561);
  trtrLSide.getXform().setSize(135, 25);
  this.mObstacles.push(trtrLSide);
  
   let trtrLSideB= new Renderable(this.mConstColorShader);
  trtrLSideB.setColor([0.0, 0.0, 0.0, 1]);
  trtrLSideB.getXform().setPosition(882, 560);
  trtrLSideB.getXform().setSize(122, 10);
  this.mObstacles.push(trtrLSideB);
  
  
  // Top Right L Gap
  let trtrLGap= new Renderable(this.mConstColorShader);
  trtrLGap.setColor([0.0, 0.0, 0.0, 1]);
  trtrLGap.getXform().setPosition(933, 555);
  trtrLGap.getXform().setSize(20, 20);
  this.mObstacles.push(trtrLGap); 
  
  
  
  
  
 //Bottom Right L Side 
    let trbrSide = new Renderable(this.mConstColorShader);
    trbrSide.setColor([0.4, 0.7, 0.8, 1]);
    trbrSide.getXform().setPosition(826, 458);
    trbrSide.getXform().setSize(25, 100);
    this.mObstacles.push(trbrSide);

    let trbrSideB = new Renderable(this.mConstColorShader);
    trbrSideB.setColor([0.0, 0.0, 0.0, 1]);
    trbrSideB.getXform().setPosition(826, 447);
    trbrSideB.getXform().setSize(13, 70);
    this.mObstacles.push(trbrSideB);



//Bottom Right L Top//   
    let trbrTop = new Renderable(this.mConstColorShader);
    trbrTop.setColor([0.4, 0.7, 0.8, 1]);
    trbrTop.getXform().setPosition(846, 503);
    trbrTop.getXform().setSize(65, 20);
    this.mObstacles.push(trbrTop);
    
    let trbrTopB = new Renderable(this.mConstColorShader);
    trbrTopB.setColor([0.0, 0.0, 0.0, 1]);
    trbrTopB.getXform().setPosition(846.5, 503);
    trbrTopB.getXform().setSize(54, 10);
    this.mObstacles.push(trbrTopB);
    
    
  // Bottom Right L Gap
  let trbrTopGap= new Renderable(this.mConstColorShader);
  trbrTopGap.setColor([0.0, 0.0, 0.0, 1]);
  trbrTopGap.getXform().setPosition(826, 490);
  trbrTopGap.getXform().setSize(13, 20);
  this.mObstacles.push(trbrTopGap); 








///////////////////////// TOP MIDDLE /////////////////////////////////////




 //Middle T Head//
  let tmTHead = new Renderable(this.mConstColorShader);
  tmTHead.setColor([0.4, 0.7, 0.8, 1]);
  tmTHead.getXform().setPosition(640, 622);
  tmTHead.getXform().setSize(269, 25);
  this.mObstacles.push(tmTHead);



//Middle T Tail//
  let tmTTail = new Renderable(this.mConstColorShader);
  tmTTail.setColor([0.4, 0.7, 0.8, 1]);
  tmTTail.getXform().setPosition(642, 596);
  tmTTail.getXform().setSize(63, 77);
  this.mObstacles.push(tmTTail);

  let tmTTailB = new Renderable(this.mConstColorShader);
  tmTTailB.setColor([0.0, 0.0, 0.0, 1]);
  tmTTailB.getXform().setPosition(642, 596);
  tmTTailB.getXform().setSize(51, 65);
  this.mObstacles.push(tmTTailB);
  
  
  //Middle T Gap
    let tmTGap = new Renderable(this.mConstColorShader);
  tmTGap.setColor([0.0, 0.0, 0.0, 1]);
  tmTGap.getXform().setPosition(640, 622);
  tmTGap.getXform().setSize(258, 13);
  this.mObstacles.push(tmTGap);






// Middle U Left side// 
  let tmULSide = new Renderable(this.mConstColorShader);
  tmULSide.setColor([0.4, 0.7, 0.8, 1]);
  tmULSide.getXform().setPosition(540, 540);
  tmULSide.getXform().setSize(65, 65);
  this.mObstacles.push(tmULSide);




    
//Middle U Right side//
  let tmURSide = new Renderable(this.mConstColorShader);
  tmURSide.setColor([0.4, 0.7, 0.8, 1]);
  tmURSide.getXform().setPosition(744, 540);
  tmURSide.getXform().setSize(65, 65);
  this.mObstacles.push(tmURSide);

    
    
    


//Middle U Bottom//
  let tmUBottom = new Renderable(this.mConstColorShader);
  tmUBottom.setColor([0.4, 0.7, 0.8, 1]);
  tmUBottom.getXform().setPosition(642, 498);
  tmUBottom.getXform().setSize(269, 45);
  this.mObstacles.push(tmUBottom);
  
   let tmUBottomB = new Renderable(this.mConstColorShader);
  tmUBottomB.setColor([0.0, 0.0, 0.0, 1]);
  tmUBottomB.getXform().setPosition(642, 498);
  tmUBottomB.getXform().setSize(253, 30);
  this.mObstacles.push(tmUBottomB);


//Middle U Left Gap
  let tmULGap = new Renderable(this.mConstColorShader);
  tmULGap.setColor([0.0, 0.0, 0.0, 1]);
  tmULGap.getXform().setPosition(540, 540);
  tmULGap.getXform().setSize(49, 55);
  this.mObstacles.push(tmULGap);
  
  
  //Middle U Right Gap
  let tmURGap = new Renderable(this.mConstColorShader);
  tmURGap.setColor([0.0, 0.0, 0.0, 1]);
  tmURGap.getXform().setPosition(744, 540);
  tmURGap.getXform().setSize(49, 55);
  this.mObstacles.push(tmURGap);




/////////////////////////////// TOP LEFT CORNER /////////////////////////////


  //Top Left L Bottom 
  let tltlLBottom = new Renderable(this.mConstColorShader);
  tltlLBottom.setColor([0.4, 0.7, 0.8, 1]);
  tltlLBottom.getXform().setPosition(347, 529);
  tltlLBottom.getXform().setSize(33, 72);
  this.mObstacles.push(tltlLBottom);
  
  let tltlLBottomB = new Renderable(this.mConstColorShader);
  tltlLBottomB.setColor([0.0, 0.0, 0.0, 1]);
  tltlLBottomB.getXform().setPosition(347, 531);
  tltlLBottomB.getXform().setSize(20, 65);
  this.mObstacles.push(tltlLBottomB);
  
  
  
//Top Left L Side
  let tltlLSide= new Renderable(this.mConstColorShader);
  tltlLSide.setColor([0.4, 0.7, 0.8, 1]);
  tltlLSide.getXform().setPosition(398, 561);
  tltlLSide.getXform().setSize(135, 25);
  this.mObstacles.push(tltlLSide);
  
  let tltlLSideB= new Renderable(this.mConstColorShader);
  tltlLSideB.setColor([0.0, 0.0, 0.0, 1]);
  tltlLSideB.getXform().setPosition(398.5, 560);
  tltlLSideB.getXform().setSize(122.5, 10);
  this.mObstacles.push(tltlLSideB);
  
  
  // Top Left L Gap
  let tltlLGap= new Renderable(this.mConstColorShader);
  tltlLGap.setColor([0.0, 0.0, 0.0, 1]);
  tltlLGap.getXform().setPosition(347, 555);
  tltlLGap.getXform().setSize(20, 20);
  this.mObstacles.push(tltlLGap); 
  







//Bottom Left L Side
  let tlbrLSide = new Renderable(this.mConstColorShader);
  tlbrLSide.setColor([0.4, 0.7, 0.8, 1]);
  tlbrLSide.getXform().setPosition(455.5, 450);
  tlbrLSide.getXform().setSize(24, 86);
  this.mObstacles.push(tlbrLSide);
  
    let tlbrLSideB = new Renderable(this.mConstColorShader);
    tlbrLSideB.setColor([0.0, 0.0, 0.0, 1]);
    tlbrLSideB.getXform().setPosition(455, 447);
    tlbrLSideB.getXform().setSize(13, 68);
    this.mObstacles.push(tlbrLSideB);






// //Bottom Left L Top//   
  let tlbrLTop = new Renderable(this.mConstColorShader);
  tlbrLTop.setColor([0.4, 0.7, 0.8, 1]);
  tlbrLTop.getXform().setPosition(435, 503);
  tlbrLTop.getXform().setSize(65, 20);
  this.mObstacles.push(tlbrLTop);

    let tlbrLTopB = new Renderable(this.mConstColorShader);
    tlbrLTopB.setColor([0.0, 0.0, 0.0, 1]);
    tlbrLTopB.getXform().setPosition(434.5, 503);
    tlbrLTopB.getXform().setSize(54, 10);
    this.mObstacles.push(tlbrLTopB);
    
    
  // Bottom Left L Gap
  let tlbrLGap= new Renderable(this.mConstColorShader);
  tlbrLGap.setColor([0.0, 0.0, 0.0, 1]);
  tlbrLGap.getXform().setPosition(455, 490);
  tlbrLGap.getXform().setSize(13, 20);
  this.mObstacles.push(tlbrLGap); 


 
 

////////////////^^^^^^^^^^ MAAHEEN PART ^^^^^^^^^^^^////////////////////

///////////////////HETANSH PART////////////////////
  //this.mObstacles = [];
  

  
  //Bottom Right L
  let BottomLLeftSideblue = new Renderable(this.mConstColorShader);
  BottomLLeftSideblue.setColor([0.4, 0.7, 0.8, 1]);
  BottomLLeftSideblue.getXform().setPosition(887.5,158);
  BottomLLeftSideblue.getXform().setSize(20, 70);
  this.mObstacles.push(BottomLLeftSideblue);
   
   
  let BottomLLeftSideblack = new Renderable(this.mConstColorShader);
  BottomLLeftSideblack.setColor([0.0, 0.0, 0.0, 1.0]);
  BottomLLeftSideblack.getXform().setPosition(887.5,158);
  BottomLLeftSideblack.getXform().setSize(10, 60);
  this.mObstacles.push(BottomLLeftSideblack);
  
  
  let BottomLdownSideblue = new Renderable(this.mConstColorShader);
  BottomLdownSideblue.setColor([0.4, 0.7, 0.8, 1]);
  BottomLdownSideblue.getXform().setPosition(925,133);
  BottomLdownSideblue.getXform().setSize(55, 20);
  this.mObstacles.push(BottomLdownSideblue);
   
  let BottomLdownSideblack = new Renderable(this.mConstColorShader);
  BottomLdownSideblack.setColor([0.0, 0.0, 0.0, 1.0]);
  BottomLdownSideblack.getXform().setPosition(915,133);
  BottomLdownSideblack.getXform().setSize(60, 10);
  this.mObstacles.push(BottomLdownSideblack);
  
  // Bottom Right horizontal
  
  let BottomRightHorizontalblue = new Renderable(this.mConstColorShader);
  BottomRightHorizontalblue.setColor([0.4, 0.7, 0.8, 1]);
  BottomRightHorizontalblue.getXform().setPosition(770,132);
  BottomRightHorizontalblue.getXform().setSize(143, 20);
  this.mObstacles.push(BottomRightHorizontalblue);
   
  let BottomRightHorizontalblack = new Renderable(this.mConstColorShader);
  BottomRightHorizontalblack.setColor([0.0, 0.0, 0.0, 1.0]);
  BottomRightHorizontalblack.getXform().setPosition(770,132);
  BottomRightHorizontalblack.getXform().setSize(133, 10);
  this.mObstacles.push(BottomRightHorizontalblack);
  
   
  
  //bottom right middle T
  
  let BottomRightMiddleTbluehoriz = new Renderable(this.mConstColorShader);
  BottomRightMiddleTbluehoriz.setColor([0.4, 0.7, 0.8, 1]);
  BottomRightMiddleTbluehoriz.getXform().setPosition(823,238);
  BottomRightMiddleTbluehoriz.getXform().setSize(147, 20);
  this.mObstacles.push(BottomRightMiddleTbluehoriz);
   
  let BottomRightMiddleTblackhoriz = new Renderable(this.mConstColorShader);
  BottomRightMiddleTblackhoriz.setColor([0.0, 0.0, 0.0, 1.0]);
  BottomRightMiddleTblackhoriz.getXform().setPosition(823,238);
  BottomRightMiddleTblackhoriz.getXform().setSize(137, 10);
  this.mObstacles.push(BottomRightMiddleTblackhoriz);
  
  let BottomRightMiddleTbluevert = new Renderable(this.mConstColorShader);
  BottomRightMiddleTbluevert.setColor([0.4, 0.7, 0.8, 1]);
  BottomRightMiddleTbluevert.getXform().setPosition(832,208);
  BottomRightMiddleTbluevert.getXform().setSize(20, 50);
  this.mObstacles.push(BottomRightMiddleTbluevert);
   
  let BottomRightMiddleTblackvert = new Renderable(this.mConstColorShader);
  BottomRightMiddleTblackvert.setColor([0.0, 0.0, 0.0, 1.0]);
  BottomRightMiddleTblackvert.getXform().setPosition(832,213);
  BottomRightMiddleTblackvert.getXform().setSize(10, 50);
  this.mObstacles.push(BottomRightMiddleTblackvert);
       
  
 // Bottom Right Backward L
  
   let BottombackwardLRightSideblue = new Renderable(this.mConstColorShader);
  BottombackwardLRightSideblue.setColor([0.4, 0.7, 0.8, 1]);
  BottombackwardLRightSideblue.getXform().setPosition(826,328.5);
  BottombackwardLRightSideblue.getXform().setSize(25, 87);
  this.mObstacles.push(BottombackwardLRightSideblue);
   
   
  let BottombackwardLRightSideblack = new Renderable(this.mConstColorShader);
  BottombackwardLRightSideblack.setColor([0.0, 0.0, 0.0, 1.0]);
  BottombackwardLRightSideblack.getXform().setPosition(826,328.5);
  BottombackwardLRightSideblack.getXform().setSize(15, 77);
  this.mObstacles.push(BottombackwardLRightSideblack);
  
  
  let BottombackwardLdownSideblue = new Renderable(this.mConstColorShader);
  BottombackwardLdownSideblue.setColor([0.4, 0.7, 0.8, 1]);
  BottombackwardLdownSideblue.getXform().setPosition(782,310);
  BottombackwardLdownSideblue.getXform().setSize(66, 50);
  this.mObstacles.push(BottombackwardLdownSideblue);
   
  let BottombackwardLdownSideblack = new Renderable(this.mConstColorShader);
  BottombackwardLdownSideblack.setColor([0.0, 0.0, 0.0, 1.0]);
  BottombackwardLdownSideblack.getXform().setPosition(793,310);
  BottombackwardLdownSideblack.getXform().setSize(79, 40);
  this.mObstacles.push(BottombackwardLdownSideblack);
  
   
  
  
  
  // bottom right upside down L
  
  
 
  
  let BottomupdownLleftSideBlue = new Renderable(this.mConstColorShader);
  BottomupdownLleftSideBlue.setColor([0.4, 0.7, 0.8, 1]);
  BottomupdownLleftSideBlue.getXform().setPosition(887,343);
  BottomupdownLleftSideBlue.getXform().setSize(20, 120);
  this.mObstacles.push(BottomupdownLleftSideBlue);
   
  let BottomupdownLleftSideBlack = new Renderable(this.mConstColorShader);
  BottomupdownLleftSideBlack.setColor([0.0, 0.0, 0.0, 1.0]);
  BottomupdownLleftSideBlack.getXform().setPosition(887,343);
  BottomupdownLleftSideBlack.getXform().setSize(10, 110);
  this.mObstacles.push(BottomupdownLleftSideBlack);
  
  let BottomupdownLaboveSideBlue = new Renderable(this.mConstColorShader);
  BottomupdownLaboveSideBlue.setColor([0.4, 0.7, 0.8, 1]);
  BottomupdownLaboveSideBlue.getXform().setPosition(920,388);
  BottomupdownLaboveSideBlue.getXform().setSize(47, 30);
  this.mObstacles.push(BottomupdownLaboveSideBlue);
  
  let BottomupdownLaboveSideBlack = new Renderable(this.mConstColorShader);
  BottomupdownLaboveSideBlack.setColor([0.0, 0.0, 0.0, 1.0]);
  BottomupdownLaboveSideBlack.getXform().setPosition(915,388);
  BottomupdownLaboveSideBlack.getXform().setSize(47, 20);
  this.mObstacles.push(BottomupdownLaboveSideBlack);
  
  
  //Bottom T
  
   let BottomTbluehoriz = new Renderable(this.mConstColorShader);
  BottomTbluehoriz.setColor([0.4, 0.7, 0.8, 1]);
  BottomTbluehoriz.getXform().setPosition(650,185);
  BottomTbluehoriz.getXform().setSize(265, 20);
  this.mObstacles.push(BottomTbluehoriz);
   
  let BottomTblackhoriz = new Renderable(this.mConstColorShader);
  BottomTblackhoriz.setColor([0.0, 0.0, 0.0, 1.0]);
  BottomTblackhoriz.getXform().setPosition(650,185);
  BottomTblackhoriz.getXform().setSize(255, 10);
  this.mObstacles.push(BottomTblackhoriz);
  
  let BottomTbluevert = new Renderable(this.mConstColorShader);
  BottomTbluevert.setColor([0.4, 0.7, 0.8, 1]);
  BottomTbluevert.getXform().setPosition(650,150);
  BottomTbluevert.getXform().setSize(20, 56);
  this.mObstacles.push(BottomTbluevert);
   
  let BottomTblackvert = new Renderable(this.mConstColorShader);
  BottomTblackvert.setColor([0.0, 0.0, 0.0, 1.0]);
  BottomTblackvert.getXform().setPosition(650,155);
  BottomTblackvert.getXform().setSize(10, 56);
  this.mObstacles.push(BottomTblackvert);

  

  MyGame.prototype.drawObstacles = function()
  {
    for (let i = 0; i< this.mObstacles.length; i++)
    {
        this.mObstacles[i].draw(vpMatrix);
    }
  };
  
  this.drawObstacles(vpMatrix);
  }