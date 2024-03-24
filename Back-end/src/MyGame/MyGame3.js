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
  var yLower = 80;

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
  var yUpper = 665;
  
  for (let i = 0; i <= 26; i++){
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
  var yUpper = 85;
  
  for (let i = 0; i <= 27; i++){
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
  var yUpper = 673.5;
  
  for (let i = 0; i <= 27; i++){
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
  var yUpper = 85;
  
  for (let i = 0; i <= 27; i++){
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




//////////////////////// Top Left Obstacle////////////////
  let tl = new Renderable(this.mConstColorShader);
  tl.setColor([0.0, 0.5, 0.8, 1]);
  tl.getXform().setPosition(228,654);
  tl.getXform().setSize(165, 37.75);
  this.mObstacles.push(tl);
  
  
  //////////////////////// Top Right Obstacle////////////////
  let tr = new Renderable(this.mConstColorShader);
  tr.setColor([0.0, 0.5, 0.8, 1]);
  tr.getXform().setPosition(1053,654);
  tr.getXform().setSize(165, 42.75);
  this.mObstacles.push(tr);
  
  
    //////////////////////// Top Left Second Obstacle////////////////
  let tls = new Renderable(this.mConstColorShader);
  tls.setColor([0.0, 0.5, 0.8, 1]);
  tls.getXform().setPosition(397,654);
  tls.getXform().setSize(100, 37.75);
  this.mObstacles.push(tls);
  
  //////////////////////// Top Left Third Obstacle////////////////
  let tlt = new Renderable(this.mConstColorShader);
  tlt.setColor([0.0, 0.5, 0.8, 1]);
  tlt.getXform().setPosition(509,654);
  tlt.getXform().setSize(50, 37.75);
  this.mObstacles.push(tlt);
  
  
   //////////////////////// Top Middle Obstacle////////////////
  let tm = new Renderable(this.mConstColorShader);
  tm.setColor([0.0, 0.5, 0.8, 1]);
  tm.getXform().setPosition(640,654);
  tm.getXform().setSize(138, 37.75);
  this.mObstacles.push(tm);



  //////////////////////// Top Right Third Obstacle////////////////
  let trt = new Renderable(this.mConstColorShader);
  trt.setColor([0.0, 0.5, 0.8, 1]);
  trt.getXform().setPosition(771,654);
  trt.getXform().setSize(50, 37.75);
  this.mObstacles.push(trt);
  
  
      //////////////////////// Top Right Second Obstacle////////////////
  let trs = new Renderable(this.mConstColorShader);
  trs.setColor([0.0, 0.5, 0.8, 1]);
  trs.getXform().setPosition(883,654);
  trs.getXform().setSize(100, 37.75);
  this.mObstacles.push(trs);
  
  
  
      //////////////////////// Top Left Rectangle Obstacle////////////////
  let tlr = new Renderable(this.mConstColorShader);
  tlr.setColor([0.0, 0.5, 0.8, 1]);
  tlr.getXform().setPosition(356,580);
  tlr.getXform().setSize(350, 37.75);
  this.mObstacles.push(tlr);
  
  
        //////////////////////// Top Right Rectangle Obstacle////////////////
  let trr = new Renderable(this.mConstColorShader);
  trr.setColor([0.0, 0.5, 0.8, 1]);
  trr.getXform().setPosition(923,580);
  trr.getXform().setSize(350, 37.75);
  this.mObstacles.push(trr);
  
  
          //////////////////////// Top Middle Rectangle Obstacle////////////////
  let tmr = new Renderable(this.mConstColorShader);
  tmr.setColor([0.0, 0.5, 0.8, 1]);
  tmr.getXform().setPosition(640,580);
  tmr.getXform().setSize(138, 37.75);
  this.mObstacles.push(tmr);
  
  
// P LEFT SIDE /////
  let pls = new Renderable(this.mConstColorShader);
  pls.setColor([0.0, 0.5, 0.8, 1]);
  pls.getXform().setPosition(190,424);
  pls.getXform().setSize(15, 200);
  this.mObstacles.push(pls);



/// P TOP ////

  let pt = new Renderable(this.mConstColorShader);
  pt.setColor([0.0, 0.5, 0.8, 1]);
  pt.getXform().setPosition(230,516.5);
  pt.getXform().setSize(80, 15);
  this.mObstacles.push(pt);



/// P RIGHT SIDE /////

  let prs = new Renderable(this.mConstColorShader);
  prs.setColor([0.0, 0.5, 0.8, 1]);
  prs.getXform().setPosition(277,474);
  prs.getXform().setSize(15, 100);
  this.mObstacles.push(prs);




//// P BOTTOM  ///////
  let pb = new Renderable(this.mConstColorShader);
  pb.setColor([0.0, 0.5, 0.8, 1]);
  pb.getXform().setPosition(259.5,417);
  pb.getXform().setSize(50, 15);
  this.mObstacles.push(pb);








// A LEFT TOP SIDE /////
  let alts = new Renderable(this.mConstColorShader);
  alts.setColor([0.0, 0.5, 0.8, 1]);
  alts.getXform().setPosition(328,473);
  alts.getXform().setSize(15, 90);
  this.mObstacles.push(alts);
  
  
  
  // A LEFT BOTTOM SIDE /////
  let albs = new Renderable(this.mConstColorShader);
  albs.setColor([0.0, 0.5, 0.8, 1]);
  albs.getXform().setPosition(328,358);
  albs.getXform().setSize(15, 68);
  this.mObstacles.push(albs);
  
  
  
//////////// A TOP ////////////
  let at = new Renderable(this.mConstColorShader);
  at.setColor([0.0, 0.5, 0.8, 1]);
  at.getXform().setPosition(361,516.5);
  at.getXform().setSize(81, 15);
  this.mObstacles.push(at);


// A RIGHT SIDE /////
  let ar = new Renderable(this.mConstColorShader);
  ar.setColor([0.0, 0.5, 0.8, 1]);
  ar.getXform().setPosition(408,424);
  ar.getXform().setSize(15, 200);
  this.mObstacles.push(ar);
  
  
  
  // A MIDDLE  /////
  let am = new Renderable(this.mConstColorShader);
  am.setColor([0.0, 0.5, 0.8, 1]);
  am.getXform().setPosition(361,385);
  am.getXform().setSize(80, 15);
  this.mObstacles.push(am);





// C LEFT SIDE /////
  let cls = new Renderable(this.mConstColorShader);
  cls.setColor([0.0, 0.5, 0.8, 1]);
  cls.getXform().setPosition(460,424);
  cls.getXform().setSize(15, 200);
  this.mObstacles.push(cls);


//////////// C TOP ////////////
  let ct = new Renderable(this.mConstColorShader);
  ct.setColor([0.0, 0.5, 0.8, 1]);
  ct.getXform().setPosition(507,516.5);
  ct.getXform().setSize(80, 15);
  this.mObstacles.push(ct);

//////////// C BOTTOM ////////////
  let cb = new Renderable(this.mConstColorShader);
  cb.setColor([0.0, 0.5, 0.8, 1]);
  cb.getXform().setPosition(507,331.5);
  cb.getXform().setSize(80, 15);
  this.mObstacles.push(cb);


   
    
    
    // M LEFT SIDE /////
  let mls = new Renderable(this.mConstColorShader);
  mls.setColor([0.0, 0.5, 0.8, 1]);
  mls.getXform().setPosition(680,424);
  mls.getXform().setSize(15, 200);
  this.mObstacles.push(mls);
  
  
  
  //////////// M TOP ////////////
  let mt = new Renderable(this.mConstColorShader);
  mt.setColor([0.0, 0.5, 0.8, 1]);
  mt.getXform().setPosition(730,516.5);
  mt.getXform().setSize(115, 15);
  this.mObstacles.push(mt);
  
  
  
     // M RIGHT SIDE /////
  let mrs = new Renderable(this.mConstColorShader);
  mrs.setColor([0.0, 0.5, 0.8, 1]);
  mrs.getXform().setPosition(789,424);
  mrs.getXform().setSize(15, 200);
  this.mObstacles.push(mrs);
  
  
  
       // M MIDDLE SIDE /////
  let mms = new Renderable(this.mConstColorShader);
  mms.setColor([0.0, 0.5, 0.8, 1]);
  mms.getXform().setPosition(735,424);
  mms.getXform().setSize(15, 200);
  this.mObstacles.push(mms);
  
  
  
 
    
    
  // A 2 LEFT TOP SIDE /////
  let a2lts = new Renderable(this.mConstColorShader);
  a2lts.setColor([0.0, 0.5, 0.8, 1]);
  a2lts.getXform().setPosition(840,473);
  a2lts.getXform().setSize(15, 90);
  this.mObstacles.push(a2lts);
  
  
  
  // A 2 LEFT BOTTOM SIDE /////
  let a2lbs = new Renderable(this.mConstColorShader);
  a2lbs.setColor([0.0, 0.5, 0.8, 1]);
  a2lbs.getXform().setPosition(840,358);
  a2lbs.getXform().setSize(15, 68);
  this.mObstacles.push(a2lbs);
  
  
  
//////////// A 2 TOP ////////////
  let a2t = new Renderable(this.mConstColorShader);
  a2t.setColor([0.0, 0.5, 0.8, 1]);
  a2t.getXform().setPosition(882.5,516.5);
  a2t.getXform().setSize(100, 15);
  this.mObstacles.push(a2t);


// A 2 RIGHT SIDE /////
  let a2r = new Renderable(this.mConstColorShader);
  a2r.setColor([0.0, 0.5, 0.8, 1]);
  a2r.getXform().setPosition(926,424);
  a2r.getXform().setSize(15, 200);
  this.mObstacles.push(a2r);
  
  
  
  // A 2 MIDDLE  /////
  let a2m = new Renderable(this.mConstColorShader);
  a2m.setColor([0.0, 0.5, 0.8, 1]);
  a2m.getXform().setPosition(883,384.5);
  a2m.getXform().setSize(80, 15);
  this.mObstacles.push(a2m);
  
  
  
  
  
  // N LEFT SIDE /////
  let nls = new Renderable(this.mConstColorShader);
  nls.setColor([0.0, 0.5, 0.8, 1]);
  nls.getXform().setPosition(978,424);
  nls.getXform().setSize(15, 200);
  this.mObstacles.push(nls);
  
  
  //////////// N  TOP ////////////
  let nt = new Renderable(this.mConstColorShader);
  nt.setColor([0.0, 0.5, 0.8, 1]);
  nt.getXform().setPosition(1000,516.5);
  nt.getXform().setSize(55, 15);
  this.mObstacles.push(nt);
  
  
  
  // N MIDDLE SIDE /////
  let nms = new Renderable(this.mConstColorShader);
  nms.setColor([0.0, 0.5, 0.8, 1]);
  nms.getXform().setPosition(1030,424);
  nms.getXform().setSize(15, 200);
  this.mObstacles.push(nms);
  
  
  
   //////////// N  BOTTOM ////////////
  let nb = new Renderable(this.mConstColorShader);
  nb.setColor([0.0, 0.5, 0.8, 1]);
  nb.getXform().setPosition(1065,331.5);
  nb.getXform().setSize(55, 15);
  this.mObstacles.push(nb);
  
  
    // N RIGHT SIDE /////
  let nrs = new Renderable(this.mConstColorShader);
  nrs.setColor([0.0, 0.5, 0.8, 1]);
  nrs.getXform().setPosition(1085,424);
  nrs.getXform().setSize(15, 200);
  this.mObstacles.push(nrs);
  
  
  
  //////// DASH //////////////
      let d = new Renderable(this.mConstColorShader);
    d.setColor([0.0, 0.5, 0.8, 1]);
    d.getXform().setPosition(572, 425);
    d.getXform().setSize(125, 95);
    this.mObstacles.push(d);
    
     
      let db = new Renderable(this.mConstColorShader);
    db.setColor([0.0, 0.0, 0.0, 1]);
    db.getXform().setPosition(572, 425);
    db.getXform().setSize(100, 75);
    this.mObstacles.push(db);
  
  
  
  ///////////// MIDDLE LEFT L BOTTOM /////////////////
        let mllb = new Renderable(this.mConstColorShader);
    mllb.setColor([0.0, 0.5, 0.8, 1]);
    mllb.getXform().setPosition(233, 268);
    mllb.getXform().setSize(101, 37.75);
    this.mObstacles.push(mllb);
    
   
    
      ///////////// MIDDLE LEFT L SIDE /////////////////
        let mlls = new Renderable(this.mConstColorShader);
    mlls.setColor([0.0, 0.5, 0.8, 1]);
    mlls.getXform().setPosition(259.5, 322);
    mlls.getXform().setSize(48, 100);
    this.mObstacles.push(mlls);
  
  
  
        ///////////// LEFT BOTTOM BRIDGE  /////////////////
        let lbb = new Renderable(this.mConstColorShader);
    lbb.setColor([0.0, 0.5, 0.8, 1]);
    lbb.getXform().setPosition(259, 199);
    lbb.getXform().setSize(153, 25);
    this.mObstacles.push(lbb);
    
    
            ///////////// LEFT SIDE BRIDGE  /////////////////
        let lsb = new Renderable(this.mConstColorShader);
    lsb.setColor([0.0, 0.5, 0.8, 1]);
    lsb.getXform().setPosition(332, 236.5);
    lsb.getXform().setSize(25, 100.5);
    this.mObstacles.push(lsb);
  
  
          /////////////  TOP BRIDGE  /////////////////
        let tb = new Renderable(this.mConstColorShader);
    tb.setColor([0.0, 0.5, 0.8, 1]);
    tb.getXform().setPosition(661, 274.5);
    tb.getXform().setSize(650, 25);
    this.mObstacles.push(tb);
  
  
              ///////////// RIGHT SIDE BRIDGE  /////////////////
        let rsb = new Renderable(this.mConstColorShader);
    rsb.setColor([0.0, 0.5, 0.8, 1]);
    rsb.getXform().setPosition(973.5, 236.5);
    rsb.getXform().setSize(25, 100.5);
    this.mObstacles.push(rsb);
    
    
                  ///////////// MIDDLE BRIDGE RECTANGLE /////////////////
        let mbr = new Renderable(this.mConstColorShader);
    mbr.setColor([0.0, 0.5, 0.8, 1]);
    mbr.getXform().setPosition(653, 206);
    mbr.getXform().setSize(543, 39);
    this.mObstacles.push(mbr);
  
  
  
          ///////////// RIGHT BOTTOM BRIDGE  /////////////////
        let rbb = new Renderable(this.mConstColorShader);
    rbb.setColor([0.0, 0.5, 0.8, 1]);
    rbb.getXform().setPosition(1030, 198);
    rbb.getXform().setSize(138, 25);
    this.mObstacles.push(rbb);
  
  
  
            ///////////// TOP RIGHT BRIDGE RECTANGLE  /////////////////
        let trbr = new Renderable(this.mConstColorShader);
    trbr.setColor([0.0, 0.5, 0.8, 1]);
    trbr.getXform().setPosition(1061, 267);
    trbr.getXform().setSize(75, 42);
    this.mObstacles.push(trbr);
  
  
    /////////// BOTTOM LEFT HORIZONTAL RECTANGLE //////////
    
    let blhr = new Renderable(this.mConstColorShader);
    blhr.setColor([0.0, 0.5, 0.8, 1]);
    blhr.getXform().setPosition(190, 137);
    blhr.getXform().setSize(89, 28);
    this.mObstacles.push(blhr);
  
  
  
  
  ///////// BOTTOM LEFT L TOP ////////////////////
  
      let bllt = new Renderable(this.mConstColorShader);
    bllt.setColor([0.0, 0.5, 0.8, 1]);
    bllt.getXform().setPosition(359, 137);
    bllt.getXform().setSize(175, 28);
    this.mObstacles.push(bllt);
  
  
  
  /////////// BOTTOM LEFT L SIDE ////////////////
    let blls = new Renderable(this.mConstColorShader);
    blls.setColor([0.0, 0.5, 0.8, 1]);
    blls.getXform().setPosition(434, 105);
    blls.getXform().setSize(25, 40);
    this.mObstacles.push(blls);
  
  
  
  //////////// BOTTOM LEFT VERTICAL RECTANGLE ///////////
  let tlvr = new Renderable(this.mConstColorShader);
  tlvr.setColor([0.0, 0.5, 0.8, 1]);
  tlvr.getXform().setPosition(509,119);
  tlvr.getXform().setSize(50, 63);
  this.mObstacles.push(tlvr);
  
  
  ///////////////// BOTTOM MIDDLE BOX ////////////
    let bmb = new Renderable(this.mConstColorShader);
  bmb.setColor([0.0, 0.5, 0.8, 1]);
  bmb.getXform().setPosition(640,136.5);
  bmb.getXform().setSize(138, 27);
  this.mObstacles.push(bmb);
  
  
  
  //////////////// B0TTOM RIGHT VERTICAL RECTANGLE ////////
    let brvr = new Renderable(this.mConstColorShader);
  brvr.setColor([0.0, 0.5, 0.8, 1]);
  brvr.getXform().setPosition(771,119);
  brvr.getXform().setSize(50, 63);
  this.mObstacles.push(brvr);
  
  
  
  
    ///////// BOTTOM RIGHT L TOP ////////////////////
  
      let brlt = new Renderable(this.mConstColorShader);
    brlt.setColor([0.0, 0.5, 0.8, 1]);
    brlt.getXform().setPosition(920, 137);
    brlt.getXform().setSize(175, 28);
    this.mObstacles.push(brlt);
  
  
  
  /////////// BOTTOM RIGHT L SIDE ////////////////
    let brls = new Renderable(this.mConstColorShader);
    brls.setColor([0.0, 0.5, 0.8, 1]);
    brls.getXform().setPosition(845, 105);
    brls.getXform().setSize(25, 40);
    this.mObstacles.push(brls);
  
  
  
  ///////////// BOTTOM RIGHT HORIZONTAL RECTANGLE ////////////
    let brhr = new Renderable(this.mConstColorShader);
    brhr.setColor([0.0, 0.5, 0.8, 1]);
    brhr.getXform().setPosition(1090, 137);
    brhr.getXform().setSize(91, 28);
    this.mObstacles.push(brhr);
  
  
  
  
  
  
  
  
//    var x = 1026;
//    var y = 306;
//    
//    let a = new Renderable(this.mConstColorShader);
//    a.setColor([0.0, 7.0, 0.0, 1.0]);
//    a.getXform().setPosition(x, y);
//    a.getXform().setSize(35, 35);
//    this.mObstacles.push(a);
//////    
//        var x = 1030;
//    var y = 228;
//    
//    let b = new Renderable(this.mConstColorShader);
//    b.setColor([0.0, 7.0, 0.0, 1.0]);
//    b.getXform().setPosition(x, y);
//    b.getXform().setSize(35, 35);
//    this.mObstacles.push(b);
//    
//    
//            var x = 488;
//    var y = 360;
//    
//    let c = new Renderable(this.mConstColorShader);
//    c.setColor([0.0, 7.0, 0.0, 1.0]);
//    c.getXform().setPosition(x, y);
//    c.getXform().setSize(35, 35);
//    this.mObstacles.push(c);
////    
////    
////    
//        let e = new Renderable(this.mConstColorShader);
//    e.setColor([0.0, 7.0, 0.0, 1.0]);
//    e.getXform().setPosition(455, 300);
//    e.getXform().setSize(15, 1000);
//    this.mObstacles.push(e);
    
       MyGame.prototype.drawObstacles = function ()
  {
    for (let i = 0; i < this.mObstacles.length; i++)
    {
        this.mObstacles[i].draw(vpMatrix);
    }
  };
  
    this.drawObstacles(vpMatrix);

 }
