"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame(htmlCanvasID) {
  // variables of the shader for drawing: one shader to be shared by two renderables
  this.mConstColorShader = null;

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

  // Step D: Starts the drawing by activating the camera
  this.mCamera.setupViewProjection();
  var vpMatrix = this.mCamera.getVPMatrix();

  //Create PacMan
  this.pacMan = null;
  this.addPacMan(700, 205);
  // Store the Transform object for easier access
  this.pacManTransform = this.pacMan.getXform();
  // Array to store pellets
  this.mPellets = [];
  this.initializePellets();
  this.totalScore = 0;
  this.pelletCount = this.mPellets.length;
  // Array to store border
  this.mBorder = [];
  this.initializeBorders();

  this.renderGame(vpMatrix);

  // Add event listener for keyboard input
  const that = this;
  document.addEventListener("keydown", function (event) {
    that.handleKeyDown(event);
    that.renderGame(vpMatrix);
  });
}

MyGame.prototype.renderGame = function (vpMatrix) {
  // Step E: Clear the canvas
  gEngine.Core.clearCanvas([0, 0, 0, 1]);        // Clear the canvas
  this.drawBorders(vpMatrix);
  this.drawPellets(vpMatrix);
  this.drawPacMan(vpMatrix);
}


MyGame.prototype.handleKeyDown = function (event) {
  const keyCode = event.keyCode;
  const pacmanSpeed = 5;
  // Save current position
  const originalX = this.pacManTransform.getXPos();
  const originalY = this.pacManTransform.getYPos();
  // Update PacMan's position based on the arrow keys
  switch (keyCode) {
    case 37: // Left arrow key
      this.pacManTransform.incXPosBy(-pacmanSpeed);
      // console.log(this.pacManTransform.getXPos())
      break;
    case 39: // Right arrow key
      this.pacManTransform.incXPosBy(pacmanSpeed);
      break;
    case 38: // Up arrow key
      this.pacManTransform.incYPosBy(pacmanSpeed);
      break;
    case 40: // Down arrow key
      this.pacManTransform.incYPosBy(-pacmanSpeed);
      break;
  }

  console.log("TotalScore : "+this.totalScore);
  if(this.pelletCount===0) {
    console.log("Game Over.....")
  }

  if(this.checkCollisionWithPallets()) {
    this.totalScore+=10;
    this.pelletCount--;
  }

  // Check for collision with borders
  if (this.checkCollisionWithBorders()) {
    // If collision, revert to original position
    this.pacManTransform.setPosition(originalX, originalY);
  }
};

MyGame.prototype.checkCollisionWithPallets = function () {
  const pacmanX = this.pacManTransform.getXPos();
  const pacmanY = this.pacManTransform.getYPos();
  const pacmanWidth = this.pacManTransform.getWidth();
  const pacmanHeight = this.pacManTransform.getHeight();

  // Check collision with each pellet
  for (let i = 0; i < this.mPellets.length; i++) {
    const pelletX = this.mPellets[i].getXform().getXPos()+10;
    const pelletY = this.mPellets[i].getXform().getYPos()+10;
    const pelletWidth = this.mPellets[i].getXform().getWidth();
    const pelletHeight = this.mPellets[i].getXform().getHeight();

    // Check for overlap with PacMan
    if (
        pacmanX < pelletX + pelletWidth &&
        pacmanX + pacmanWidth > pelletX &&
        pacmanY < pelletY + pelletHeight &&
        pacmanY + pacmanHeight > pelletY
    ) {
      // Remove the pellet
      this.mPellets.splice(i, 1);

      // Return true since collision detected
      return true;
    }
  }

  // No collision detected
  return false;
};



MyGame.prototype.checkCollisionWithBorders = function () {
  const pacmanX = this.pacManTransform.getXPos();
  const pacmanY = this.pacManTransform.getYPos();
  const pacmanWidth = this.pacManTransform.getWidth();
  const pacmanHeight = this.pacManTransform.getHeight();

  // Check collision with each border
  for (let i = 0; i < this.mBorder.length; i++) {
    const borderX = this.mBorder[i].getXform().getXPos()+5;
    const borderY = this.mBorder[i].getXform().getYPos()+5;
    const borderWidth = this.mBorder[i].getXform().getWidth();
    const borderHeight = this.mBorder[i].getXform().getHeight();

    // Check for overlap
    if (
        pacmanX < borderX + borderWidth &&
        pacmanX + pacmanWidth > borderX &&
        pacmanY < borderY + borderHeight &&
        pacmanY + pacmanHeight > borderY
    ) {
      // Collision detected
      return true;
    }
  }

  // No collision detected
  return false;
};

Transform.prototype.incXPosBy = function (delta) {
  this.mPosition[0] += delta;
};

Transform.prototype.incYPosBy = function (delta) {
  this.mPosition[1] += delta;
};

MyGame.prototype.addPacMan = function (x, y) {
  this.pacMan = new Renderable(this.mConstColorShader);
  this.pacMan.setColor([0.34, 1, 0, 1]);

  // Ensure that getXform returns a valid Transform object
  if (!this.pacMan.getXform().getXform) {
    this.pacMan.getXform().getXform = function () {
      return this.mXform; // Assuming that the Xform is stored in mXform
    };
  }

  this.pacMan.getXform().setPosition(x, y);
  this.pacMan.getXform().setSize(25, 25);
  this.pacManTransform = this.pacMan.getXform(); // Store Xform object
};


MyGame.prototype.drawPacMan = function (vpMatrix) {
  this.pacMan.draw(vpMatrix);
};

MyGame.prototype.initializeBorders = function () {

  // Step D: Create the Renderable objects:
  let mBlueSq = new Renderable(this.mConstColorShader);
  mBlueSq.setColor([0.25, 0.25, 0.95, 1]);
  let mRedSq = new Renderable(this.mConstColorShader);
  mRedSq.setColor([1, 0.25, 0.25, 1]);
  let mTLSq = new Renderable(this.mConstColorShader);
  mTLSq.setColor([0.9, 0.1, 0.1, 1]);
  let mTRSq = new Renderable(this.mConstColorShader);
  mTRSq.setColor([0.9, 0.1, 0.1, 1]);
  let mBRSq = new Renderable(this.mConstColorShader);
  mBRSq.setColor([0.1, 0.1, 0.9, 1]);
  let mBLSq = new Renderable(this.mConstColorShader);
  mBLSq.setColor([0.1, 0.1, 0.9, 1]);

  // top left
  mTLSq.getXform().setPosition(280, 720);
  mTLSq.getXform().setSize(20, 20);
  // mTLSq.draw(vpMatrix);
  this.mBorder.push(mTLSq);

  // top right
  mTRSq.getXform().setPosition(1000, 720);
  mTRSq.getXform().setSize(20, 20);
  // mTRSq.draw(vpMatrix);
  this.mBorder.push(mTRSq);

  // bottom right
  mBRSq.getXform().setPosition(1000, 0);
  mBRSq.getXform().setSize(20, 20);
  // this.mBRSq.draw(vpMatrix);
  this.mBorder.push(mBRSq);

  // bottom left
  mBLSq.getXform().setPosition(280, 0);
  mBLSq.getXform().setSize(20, 20);
  // mBLSq.draw(vpMatrix);
  this.mBorder.push(mBLSq);


  var xBound = 280;
  var yUpper = 680;
  var yLower = 80;

  for (let i = 0; i <= 72; i++){
    let mUppSq = new Renderable(this.mConstColorShader);
    mUppSq.setColor([0.0, 0.0, 0.6, 1]);
    mUppSq.getXform().setPosition(xBound, yUpper);
    mUppSq.getXform().setSize(15, 15);
    let mLowSq = new Renderable(this.mConstColorShader);
    mLowSq.setColor([0.0, 0.0, 0.6, 1]);
    mLowSq.getXform().setPosition(xBound, yLower);
    mLowSq.getXform().setSize(15, 15);

    // this.mUppSq.draw(vpMatrix);
    // this.mLowSq.draw(vpMatrix);
    this.mBorder.push(mUppSq)
    this.mBorder.push(mLowSq)

    mUppSq = new Renderable(this.mConstColorShader);
    mUppSq.setColor([0.0, 0.0, 0.0, 1]);
    mUppSq.getXform().setPosition(xBound, yUpper);
    mUppSq.getXform().setSize(5, 5);
    mLowSq = new Renderable(this.mConstColorShader);
    mLowSq.setColor([0.0, 0.0, 0.0, 1]);
    mLowSq.getXform().setPosition(xBound, yLower);
    mLowSq.getXform().setSize(5, 5);

    // this.mUppSq.draw(vpMatrix);
    // this.mLowSq.draw(vpMatrix);
    this.mBorder.push(mUppSq)
    this.mBorder.push(mLowSq)

    xBound += 10;
  }

  // Lower sides

  var xLeft = 285;
  var xRight = 995;
  var yLower = 80;

  for (let i = 0; i <= 25; i++){
    let mUppSq = new Renderable(this.mConstColorShader);
    mUppSq.setColor([0.0, 0.0, 0.6, 1]);
    mUppSq.getXform().setPosition(xRight, yLower);
    mUppSq.getXform().setSize(15, 15);
    let mLowSq = new Renderable(this.mConstColorShader);
    mLowSq.setColor([0.0, 0.0, 0.6, 1]);
    mLowSq.getXform().setPosition(xLeft, yLower);
    mLowSq.getXform().setSize(15, 15);

    // this.mUppSq.draw(vpMatrix);
    // this.mLowSq.draw(vpMatrix);
    this.mBorder.push(mUppSq)
    this.mBorder.push(mLowSq)

    mUppSq = new Renderable(this.mConstColorShader);
    mUppSq.setColor([0.0, 0.0, 0.0, 1]);
    mUppSq.getXform().setPosition(xRight, yLower);
    mUppSq.getXform().setSize(5, 5);
    mLowSq = new Renderable(this.mConstColorShader);
    mLowSq.setColor([0.0, 0.0, 0.0, 1]);
    mLowSq.getXform().setPosition(xLeft, yLower);
    mLowSq.getXform().setSize(5, 5);

    // this.mUppSq.draw(vpMatrix);
    // this.mLowSq.draw(vpMatrix);
    this.mBorder.push(mUppSq)
    this.mBorder.push(mLowSq)

    yLower += 10;
  }

  // Upper sides

  var xLeft = 285;
  var xRight = 995;
  var yUpper = 680;

  for (let i = 0; i <= 20; i++){
    let mUppSq = new Renderable(this.mConstColorShader);
    mUppSq.setColor([0.0, 0.0, 0.6, 1]);
    mUppSq.getXform().setPosition(xRight, yUpper);
    mUppSq.getXform().setSize(15, 15);
    let mLowSq = new Renderable(this.mConstColorShader);
    mLowSq.setColor([0.0, 0.0, 0.6, 1]);
    mLowSq.getXform().setPosition(xLeft, yUpper);
    mLowSq.getXform().setSize(15, 15);

    // this.mUppSq.draw(vpMatrix);
    // this.mLowSq.draw(vpMatrix);
    this.mBorder.push(mUppSq)
    this.mBorder.push(mLowSq)

    mUppSq = new Renderable(this.mConstColorShader);
    mUppSq.setColor([0.0, 0.0, 0.0, 1]);
    mUppSq.getXform().setPosition(xRight, yUpper);
    mUppSq.getXform().setSize(5, 5);
    mLowSq = new Renderable(this.mConstColorShader);
    mLowSq.setColor([0.0, 0.0, 0.0, 1]);
    mLowSq.getXform().setPosition(xLeft, yUpper);
    mLowSq.getXform().setSize(5, 5);

    // this.mUppSq.draw(vpMatrix);
    // this.mLowSq.draw(vpMatrix);
    this.mBorder.push(mUppSq)
    this.mBorder.push(mLowSq)

    yUpper -= 10;
  }

  // Left Exit
  var xBound = 280;
  var yMid1U = 480;
  var yMid2U = 430;
  var yMid1L = 330;
  var yMid2L = 380;

  for (let i = 0; i <= 14; i++){
    let mMUpp1Sq = new Renderable(this.mConstColorShader);
    mMUpp1Sq.setColor([0.0, 0.0, 0.6, 1]);
    mMUpp1Sq.getXform().setPosition(xBound, yMid1U);
    mMUpp1Sq.getXform().setSize(15, 15);
    let mMLow1Sq = new Renderable(this.mConstColorShader);
    mMLow1Sq.setColor([0.0, 0.0, 0.6, 1]);
    mMLow1Sq.getXform().setPosition(xBound, yMid2U);
    mMLow1Sq.getXform().setSize(15, 15);

    let mMUpp2Sq = new Renderable(this.mConstColorShader);
    mMUpp2Sq.setColor([0.0, 0.0, 0.6, 1]);
    mMUpp2Sq.getXform().setPosition(xBound, yMid1L);
    mMUpp2Sq.getXform().setSize(15, 15);
    let mMLow2Sq = new Renderable(this.mConstColorShader);
    mMLow2Sq.setColor([0.0, 0.0, 0.6, 1]);
    mMLow2Sq.getXform().setPosition(xBound, yMid2L);
    mMLow2Sq.getXform().setSize(15, 15);

    // this.mMUpp1Sq.draw(vpMatrix);
    // this.mMLow1Sq.draw(vpMatrix);
    // this.mMUpp2Sq.draw(vpMatrix);
    // this.mMLow2Sq.draw(vpMatrix);
    this.mBorder.push(mMUpp1Sq)
    this.mBorder.push(mMLow1Sq)
    this.mBorder.push(mMUpp2Sq)
    this.mBorder.push(mMLow2Sq)

    mMUpp1Sq = new Renderable(this.mConstColorShader);
    mMUpp1Sq.setColor([0.0, 0.0, 0.0, 1]);
    mMUpp1Sq.getXform().setPosition(xBound, yMid1U);
    mMUpp1Sq.getXform().setSize(5, 5);
    mMLow1Sq = new Renderable(this.mConstColorShader);
    mMLow1Sq.setColor([0.0, 0.0, 0.0, 1]);
    mMLow1Sq.getXform().setPosition(xBound, yMid2U);
    mMLow1Sq.getXform().setSize(5, 5);

    mMUpp2Sq = new Renderable(this.mConstColorShader);
    mMUpp2Sq.setColor([0.0, 0.0, 0.0, 1]);
    mMUpp2Sq.getXform().setPosition(xBound, yMid1L);
    mMUpp2Sq.getXform().setSize(5, 5);
    mMLow2Sq = new Renderable(this.mConstColorShader);
    mMLow2Sq.setColor([0.0, 0.0, 0.0, 1]);
    mMLow2Sq.getXform().setPosition(xBound, yMid2L);
    mMLow2Sq.getXform().setSize(5, 5);

    // this.mMUpp1Sq.draw(vpMatrix);
    // this.mMLow1Sq.draw(vpMatrix);
    // this.mMUpp2Sq.draw(vpMatrix);
    // this.mMLow2Sq.draw(vpMatrix);
    this.mBorder.push(mMUpp1Sq)
    this.mBorder.push(mMLow1Sq)
    this.mBorder.push(mMUpp2Sq)
    this.mBorder.push(mMLow2Sq)

    xBound += 10;
  }

  // Left Exit
  var xBound = 1000;
  var yMid1U = 480;
  var yMid2U = 430;
  var yMid1L = 330;
  var yMid2L = 380;

  for (let i = 0; i <= 14; i++){
    let mMUpp1Sq = new Renderable(this.mConstColorShader);
    mMUpp1Sq.setColor([0.0, 0.0, 0.6, 1]);
    mMUpp1Sq.getXform().setPosition(xBound, yMid1U);
    mMUpp1Sq.getXform().setSize(15, 15);
    let mMLow1Sq = new Renderable(this.mConstColorShader);
    mMLow1Sq.setColor([0.0, 0.0, 0.6, 1]);
    mMLow1Sq.getXform().setPosition(xBound, yMid2U);
    mMLow1Sq.getXform().setSize(15, 15);

    let mMUpp2Sq = new Renderable(this.mConstColorShader);
    mMUpp2Sq.setColor([0.0, 0.0, 0.6, 1]);
    mMUpp2Sq.getXform().setPosition(xBound, yMid1L);
    mMUpp2Sq.getXform().setSize(15, 15);
    let mMLow2Sq = new Renderable(this.mConstColorShader);
    mMLow2Sq.setColor([0.0, 0.0, 0.6, 1]);
    mMLow2Sq.getXform().setPosition(xBound, yMid2L);
    mMLow2Sq.getXform().setSize(15, 15);

    // this.mMUpp1Sq.draw(vpMatrix);
    // this.mMLow1Sq.draw(vpMatrix);
    // this.mMUpp2Sq.draw(vpMatrix);
    // this.mMLow2Sq.draw(vpMatrix);
    this.mBorder.push(mMUpp1Sq)
    this.mBorder.push(mMLow1Sq)
    this.mBorder.push(mMUpp2Sq)
    this.mBorder.push(mMLow2Sq)

    mMUpp1Sq = new Renderable(this.mConstColorShader);
    mMUpp1Sq.setColor([0.0, 0.0, 0.0, 1]);
    mMUpp1Sq.getXform().setPosition(xBound, yMid1U);
    mMUpp1Sq.getXform().setSize(5, 5);
    mMLow1Sq = new Renderable(this.mConstColorShader);
    mMLow1Sq.setColor([0.0, 0.0, 0.0, 1]);
    mMLow1Sq.getXform().setPosition(xBound, yMid2U);
    mMLow1Sq.getXform().setSize(5, 5);

    mMUpp2Sq = new Renderable(this.mConstColorShader);
    mMUpp2Sq.setColor([0.0, 0.0, 0.0, 1]);
    mMUpp2Sq.getXform().setPosition(xBound, yMid1L);
    mMUpp2Sq.getXform().setSize(5, 5);
    mMLow2Sq = new Renderable(this.mConstColorShader);
    mMLow2Sq.setColor([0.0, 0.0, 0.0, 1]);
    mMLow2Sq.getXform().setPosition(xBound, yMid2L);
    mMLow2Sq.getXform().setSize(5, 5);

    // mMUpp1Sq.draw(vpMatrix);
    // mMLow1Sq.draw(vpMatrix);
    // mMUpp2Sq.draw(vpMatrix);
    // mMLow2Sq.draw(vpMatrix);
    this.mBorder.push(mMUpp1Sq)
    this.mBorder.push(mMLow1Sq)
    this.mBorder.push(mMUpp2Sq)
    this.mBorder.push(mMLow2Sq)

    xBound -= 10;
  }

  // Left Exit Sides

  var xLeft = 420;
  var yUpper = 480;
  var yLower = 330;

  for (let i = 0; i <= 5; i++){
    let mUppSq = new Renderable(this.mConstColorShader);
    mUppSq.setColor([0.0, 0.0, 0.6, 1]);
    mUppSq.getXform().setPosition(xLeft, yUpper);
    mUppSq.getXform().setSize(15, 15);
    let mLowSq = new Renderable(this.mConstColorShader);
    mLowSq.setColor([0.0, 0.0, 0.6, 1]);
    mLowSq.getXform().setPosition(xLeft, yLower);
    mLowSq.getXform().setSize(15, 15);

    // this.mUppSq.draw(vpMatrix);
    // this.mLowSq.draw(vpMatrix);
    this.mBorder.push(mUppSq);
    this.mBorder.push(mLowSq);

    mUppSq = new Renderable(this.mConstColorShader);
    mUppSq.setColor([0.0, 0.0, 0.0, 1]);
    mUppSq.getXform().setPosition(xLeft, yUpper);
    mUppSq.getXform().setSize(5, 5);
    mLowSq = new Renderable(this.mConstColorShader);
    mLowSq.setColor([0.0, 0.0, 0.0, 1]);
    mLowSq.getXform().setPosition(xLeft, yLower);
    mLowSq.getXform().setSize(5, 5);

    // this.mUppSq.draw(vpMatrix);
    // this.mLowSq.draw(vpMatrix);
    this.mBorder.push(mUppSq);
    this.mBorder.push(mLowSq);

    yUpper -= 10;
    yLower += 10;
  }

  // Right Exit Sides

  var xRight = 860;
  var yUpper = 480;
  var yLower = 330;

  for (let i = 0; i <= 5; i++){
    let mUppSq = new Renderable(this.mConstColorShader);
    mUppSq.setColor([0.0, 0.0, 0.6, 1]);
    mUppSq.getXform().setPosition(xRight, yUpper);
    mUppSq.getXform().setSize(15, 15);
    let mLowSq = new Renderable(this.mConstColorShader);
    mLowSq.setColor([0.0, 0.0, 0.6, 1]);
    mLowSq.getXform().setPosition(xRight, yLower);
    mLowSq.getXform().setSize(15, 15);

    // this.mUppSq.draw(vpMatrix);
    // this.mLowSq.draw(vpMatrix);
    this.mBorder.push(mUppSq);
    this.mBorder.push(mLowSq);

    mUppSq = new Renderable(this.mConstColorShader);
    mUppSq.setColor([0.0, 0.0, 0.0, 1]);
    mUppSq.getXform().setPosition(xRight, yUpper);
    mUppSq.getXform().setSize(5, 5);
    mLowSq = new Renderable(this.mConstColorShader);
    mLowSq.setColor([0.0, 0.0, 0.0, 1]);
    mLowSq.getXform().setPosition(xRight, yLower);
    mLowSq.getXform().setSize(5, 5);

    // this.mUppSq.draw(vpMatrix);
    // this.mLowSq.draw(vpMatrix);
    this.mBorder.push(mUppSq);
    this.mBorder.push(mLowSq);

    yUpper -= 10;
    yLower += 10;
  }

}

MyGame.prototype.drawBorders = function (vpMatrix) {
  for (let i = 0; i < this.mBorder.length; i++) {
    this.mBorder[i].draw(vpMatrix);
  }
};

MyGame.prototype.initializePellets = function () {
  var xBound = 300;
  var yUpper = 680;
  var yLower = 80;

  // Fill top
  for(let row = 0; row < 9; row ++) {
    yUpper -=20;
    var tempxBound = xBound;
    for(let column = 0; column < 35 ; column ++) {
      this.addPellet(tempxBound, yUpper);
      tempxBound+=20;
    }
  }

  // Fill Botton
  for(let row = 0; row < 11; row ++) {
    yLower +=20;
    var tempxBound = xBound;
    for(let column = 0; column < 35 ; column ++) {
      this.addPellet(tempxBound, yLower);
      tempxBound+=20;
    }
  }

  // Fill middle
  xBound = 440;
  yUpper = 500;
  for(let row = 0; row < 9; row ++) {
    yUpper -=20;
    var tempxBound = xBound;
    for(let column = 0; column < 21 ; column ++) {
      this.addPellet(tempxBound, yUpper);
      tempxBound+=20;
    }
  }

  // Fill pallet in left exit
  xBound = 325;
  yUpper = 425;
  for(let row = 0; row < 1; row ++) {
    yUpper -=20;
    var tempxBound = xBound;
    for(let column = 0; column < 6 ; column ++) {
      this.addPellet(tempxBound, yUpper);
      tempxBound+=20;
    }
  }

  // Fill pallet in right exit
  xBound = 855;
  yUpper = 425;
  for(let row = 0; row < 1; row ++) {
    yUpper -=20;
    var tempxBound = xBound;
    for(let column = 0; column < 8 ; column ++) {
      this.addPellet(tempxBound, yUpper);
      tempxBound+=20;
    }
  }
};

MyGame.prototype.addPellet = function (x, y) {
  var pellet = new Renderable(this.mConstColorShader);
  pellet.setColor([1, 1, 0, 1]); // Yellow color for pellets
  pellet.getXform().setPosition(x, y);
  pellet.getXform().setSize(5, 5);
  this.mPellets.push(pellet);
};

MyGame.prototype.drawPellets = function (vpMatrix) {
  for (let i = 0; i < this.mPellets.length; i++) {
    this.mPellets[i].draw(vpMatrix);
  }
};
