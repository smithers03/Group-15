/*
 * File: MyGame.js
 * This is the logic of our game.
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, DyePack, Hero, Minion, Brain,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {
  // Array to store border
  this.mBorder = [];
  // Array to store border
  this.mObstacles = [];
  // Array to store pellets
  this.mPellets = [];
  this.mSprites = [];

  var originalX = 450;
  var originalY = 650;
  
  this.kFont = "assets/fonts/Consolas-72";

  this.kMovingPacman = "assets/allPacman.png";
  this.kMovingPacmanRight = "assets/allPacManFlipped.png";

  this.Blinky = [];
  let bUp = "assets/assets-ghosts/blinky_UP.png";
  this.Blinky.push(bUp);
  let bDown = "assets/assets-ghosts/blinky_DOWN.png";
  this.Blinky.push(bDown);
  let bLeft = "assets/assets-ghosts/blinky_LEFT.png";
  this.Blinky.push(bLeft);
  let bRight = "assets/assets-ghosts/blinky_RIGHT.png";
  this.Blinky.push(bRight);

 this.Funky = [];
  let fUp = "assets/assets-ghosts/funky_UP.png";
  this.Funky.push(fUp);
  let fDown = "assets/assets-ghosts/funky_DOWN.png";
  this.Funky.push(fDown);
  let fLeft = "assets/assets-ghosts/funky_LEFT.png";
  this.Funky.push(fLeft);
  let fRight = "assets/assets-ghosts/funky_RIGHT.png";
  this.Funky.push(fRight);

  this.Inky = [];
  let iUp = "assets/assets-ghosts/inky_UP.png";
  this.Inky.push(iUp);
  let iDown = "assets/assets-ghosts/inky_DOWN.png";
  this.Inky.push(iDown);
  let iLeft = "assets/assets-ghosts/inky_LEFT.png";
  this.Inky.push(iLeft);
  let iRight = "assets/assets-ghosts/inky_RIGHT.png";
  this.Inky.push(iRight);

  this.Pinky = [];
  let pUp = "assets/assets-ghosts/pinky_UP.png";
  this.Pinky.push(pUp);
  let pDown = "assets/assets-ghosts/pinky_DOWN.png";
  this.Pinky.push(pDown);
  let pLeft = "assets/assets-ghosts/pinky_LEFT.png";
  this.Pinky.push(pLeft);
  let pRight = "assets/assets-ghosts/pinky_RIGHT.png";
  this.Pinky.push(pRight);


  this.mAnimatedPacman = null; // The animated Pac-Man object

  this.mCamera = null;

}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
  gEngine.Fonts.loadFont(this.kFont);
  gEngine.Textures.loadTexture(this.kMovingPacman);
  gEngine.Textures.loadTexture(this.kMovingPacmanRight);
  for (let i = 0; i < this.Blinky.length; i++) {
    gEngine.Textures.loadTexture(this.Blinky[i]);
  }
  for (let i = 0; i < this.Funky.length; i++) {
    gEngine.Textures.loadTexture(this.Funky[i]);
  }
  for (let i = 0; i < this.Inky.length; i++) {
    gEngine.Textures.loadTexture(this.Inky[i]);
  }
  for (let i = 0; i < this.Pinky.length; i++) {
    gEngine.Textures.loadTexture(this.Pinky[i]);
  }

};

MyGame.prototype.unloadScene = function () {
  gEngine.Textures.unloadTexture(this.kMovingPacman);
  gEngine.Textures.unloadTexture(this.kMovingPacmanRight);
  for (let i = 0; i < this.Blinky.length; i++) {
    gEngine.Textures.unloadTexture(this.Blinky[i]);
  }
  for (let i = 0; i < this.Funky.length; i++) {
    gEngine.Textures.unloadTexture(this.Funky[i]);
  }
  for (let i = 0; i < this.Inky.length; i++) {
    gEngine.Textures.unloadTexture(this.Inky[i]);
  }
  for (let i = 0; i < this.Pinky.length; i++) {
    gEngine.Textures.unloadTexture(this.Pinky[i]);
  }
  gEngine.Fonts.unloadFont(this.kFont);
  var nextLevel = new MyGame2();  // next level to be loaded
  gEngine.Core.startScene(nextLevel);
};

MyGame.prototype.initialize = function () {
  // Step A: set up the cameras
  this.mCamera = new Camera(
      vec2.fromValues(640, 360),   // center of the WC
      720,                        // width of WC
      [280, 0, 720, 720]         // viewport (orgX, orgY, width, height)
  );
  this.mCamera.setBackgroundColor([0, 0, 0, 1]);
  // sets the background to gray

  // Step C: Create the shader
  this.mConstColorShader = new SimpleShader(
      "src/GLSLShaders/SimpleVS.glsl",      // Path to the VertexShader
      "src/GLSLShaders/SimpleFS.glsl");    // Path to the simple FragmentShader



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
    mBRSq.setColor([0.1, 0.9, 0.1, 1]);
    let mBLSq = new Renderable(this.mConstColorShader);
    mBLSq.setColor([0.1, 0.9, 0.1, 1]);

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

    // Right Exit
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



    /*let mUppSq = new Renderable(this.mConstColorShader);
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
    this.mBorder.push(mLowSq)*/

  }

  MyGame.prototype.initializeObstacles = function (){
    // Middle Box - Daniel

    var xRight = 740;
    var xLeft = 540;
    var yUpper = 430;

    for (let i = 0; i <= 4; i++){
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
      this.mObstacles.push(mUppSq);
      this.mObstacles.push(mLowSq);

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
      this.mObstacles.push(mUppSq);
      this.mObstacles.push(mLowSq);

      yUpper -= 10;
    }
    var yLower = 380;
    var xLeft = 540;
    var yUpper = 430;
    for (let i = 0; i <= 20; i++){
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
      this.mObstacles.push(mUppSq);
      this.mObstacles.push(mLowSq);

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
      this.mObstacles.push(mUppSq);
      this.mObstacles.push(mLowSq);

      xLeft += 10;
    }

    // Bottom-left Corner - Daniel

    var x1,y1,x2,y2;

    // Obstacle 1
    x1 = 480;
    y1 = 355;

    let mBlueSq1 = new Renderable(this.mConstColorShader);
    mBlueSq1.setColor([0.0, 0.0, 0.6, 1]);
    mBlueSq1.getXform().setPosition(x1, y1);
    mBlueSq1.getXform().setSize(35, 65);
    let mBlackSq1 = new Renderable(this.mConstColorShader);
    mBlackSq1.setColor([0.0, 0.0, 0.0, 1]);
    mBlackSq1.getXform().setPosition(x1, y1);
    mBlackSq1.getXform().setSize(25, 55);

    //this.mBlueSq1.draw(vpMatrix);
    //this.mBlackSq1.draw(vpMatrix);
    this.mObstacles.push(mBlueSq1);
    this.mObstacles.push(mBlackSq1);

    // Obstacles 2 & 3
    y1 = 205;
    x1 = 640;
    y2 = 330;

    mBlueSq1 = new Renderable(this.mConstColorShader);
    mBlueSq1.setColor([0.0, 0.0, 0.6, 1]);
    mBlueSq1.getXform().setPosition(x1, y1);
    mBlueSq1.getXform().setSize(215, 25);
    let mBlueSq2 = new Renderable(this.mConstColorShader);
    mBlueSq2.setColor([0.0, 0.0, 0.6, 1]);
    mBlueSq2.getXform().setPosition(x1, y2);
    mBlueSq2.getXform().setSize(215, 15);

    mBlackSq1 = new Renderable(this.mConstColorShader);
    mBlackSq1.setColor([0.0, 0.0, 0.0, 1]);
    mBlackSq1.getXform().setPosition(x1, y1);
    mBlackSq1.getXform().setSize(205, 15);
    let mBlackSq2 = new Renderable(this.mConstColorShader);
    mBlackSq2.setColor([0.0, 0.0, 0.0, 1]);
    mBlackSq2.getXform().setPosition(x1, y2);
    mBlackSq2.getXform().setSize(205, 5);

    //this.mBlueSq1.draw(vpMatrix);
    //this.mBlueSq2.draw(vpMatrix);
    //this.mBlackSq1.draw(vpMatrix);
    //this.mBlackSq2.draw(vpMatrix);
    this.mObstacles.push(mBlueSq1);
    this.mObstacles.push(mBlackSq1);
    this.mObstacles.push(mBlueSq2);
    this.mObstacles.push(mBlackSq2);

    x1 = 640;
    y1 = 157.5;
    y2 = 287.5;

    mBlueSq1 = new Renderable(this.mConstColorShader);
    mBlueSq1.setColor([0.0, 0.0, 0.6, 1]);
    mBlueSq1.getXform().setPosition(x1, y1);
    mBlueSq1.getXform().setSize(35, 70);
    mBlueSq2 = new Renderable(this.mConstColorShader);
    mBlueSq2.setColor([0.0, 0.0, 0.6, 1]);
    mBlueSq2.getXform().setPosition(x1, y2);
    mBlueSq2.getXform().setSize(35, 70);

    mBlackSq1 = new Renderable(this.mConstColorShader);
    mBlackSq1.setColor([0.0, 0.0, 0.0, 1]);
    mBlackSq1.getXform().setPosition(x1, y1+5);
    mBlackSq1.getXform().setSize(25, 70);
    mBlackSq2 = new Renderable(this.mConstColorShader);
    mBlackSq2.setColor([0.0, 0.0, 0.0, 1]);
    mBlackSq2.getXform().setPosition(x1, y2+5);
    mBlackSq2.getXform().setSize(25, 70);

    //this.mBlueSq1.draw(vpMatrix);
    //this.mBlueSq2.draw(vpMatrix);
    //this.mBlackSq1.draw(vpMatrix);
    //this.mBlackSq2.draw(vpMatrix);
    this.mObstacles.push(mBlueSq1);
    this.mObstacles.push(mBlackSq1);
    this.mObstacles.push(mBlueSq2);
    this.mObstacles.push(mBlackSq2);

    // Obstacle 4
    y1 = 270;
    x1 = 525;

    mBlueSq1 = new Renderable(this.mConstColorShader);
    mBlueSq1.setColor([0.0, 0.0, 0.6, 1]);
    mBlueSq1.getXform().setPosition(x1, y1);
    mBlueSq1.getXform().setSize(125, 35);
    mBlackSq1 = new Renderable(this.mConstColorShader);
    mBlackSq1.setColor([0.0, 0.0, 0.0, 1]);
    mBlackSq1.getXform().setPosition(x1, y1);
    mBlackSq1.getXform().setSize(115, 25);

    //this.mBlueSq1.draw(vpMatrix);
    //this.mBlackSq1.draw(vpMatrix);
    this.mObstacles.push(mBlueSq1);
    this.mObstacles.push(mBlackSq1);

    // Obstacle 5
    y1 = 270;
    x1 = 377.5;
    x2 = 410;
    y2 = 222.5;

    mBlueSq1 = new Renderable(this.mConstColorShader);
    mBlueSq1.setColor([0.0, 0.0, 0.6, 1]);
    mBlueSq1.getXform().setPosition(x1, y1);
    mBlueSq1.getXform().setSize(100, 35);
    mBlueSq2 = new Renderable(this.mConstColorShader);
    mBlueSq2.setColor([0.0, 0.0, 0.6, 1]);
    mBlueSq2.getXform().setPosition(x2, y2);
    mBlueSq2.getXform().setSize(35, 60);

    mBlackSq1 = new Renderable(this.mConstColorShader);
    mBlackSq1.setColor([0.0, 0.0, 0.0, 1]);
    mBlackSq1.getXform().setPosition(x1, y1);
    mBlackSq1.getXform().setSize(90, 25);
    mBlackSq2 = new Renderable(this.mConstColorShader);
    mBlackSq2.setColor([0.0, 0.0, 0.0, 1]);
    mBlackSq2.getXform().setPosition(x2, y2+5);
    mBlackSq2.getXform().setSize(25, 60);

    //this.mBlueSq1.draw(vpMatrix);
    //this.mBlueSq2.draw(vpMatrix);
    //this.mBlackSq1.draw(vpMatrix);
    //this.mBlackSq2.draw(vpMatrix);
    this.mObstacles.push(mBlueSq1);
    this.mObstacles.push(mBlackSq1);
    this.mObstacles.push(mBlueSq2);
    this.mObstacles.push(mBlackSq2);

    // Obstacle 6
    y1 = 205;
    x1 = 325;

    mBlueSq1 = new Renderable(this.mConstColorShader);
    mBlueSq1.setColor([0.0, 0.0, 0.6, 1]);
    mBlueSq1.getXform().setPosition(x1, y1);
    mBlueSq1.getXform().setSize(65, 25);
    mBlackSq1 = new Renderable(this.mConstColorShader);
    mBlackSq1.setColor([0.0, 0.0, 0.0, 1]);
    mBlackSq1.getXform().setPosition(x1-2, y1);
    mBlackSq1.getXform().setSize(60, 15);

    //this.mBlueSq1.draw(vpMatrix);
    //this.mBlackSq1.draw(vpMatrix);
    this.mObstacles.push(mBlueSq1);
    this.mObstacles.push(mBlackSq1);

    // Obstacle 7
    y1 = 140;
    x1 = 457.5;
    y2 = 187.5;
    x2 = 480;

    mBlueSq1 = new Renderable(this.mConstColorShader);
    mBlueSq1.setColor([0.0, 0.0, 0.6, 1]);
    mBlueSq1.getXform().setPosition(x1, y1);
    mBlueSq1.getXform().setSize(260, 35);
    mBlueSq2 = new Renderable(this.mConstColorShader);
    mBlueSq2.setColor([0.0, 0.0, 0.6, 1]);
    mBlueSq2.getXform().setPosition(x2, y2);
    mBlueSq2.getXform().setSize(35, 60);

    mBlackSq1 = new Renderable(this.mConstColorShader);
    mBlackSq1.setColor([0.0, 0.0, 0.0, 1]);
    mBlackSq1.getXform().setPosition(x1, y1);
    mBlackSq1.getXform().setSize(250, 25);
    mBlackSq2 = new Renderable(this.mConstColorShader);
    mBlackSq2.setColor([0.0, 0.0, 0.0, 1]);
    mBlackSq2.getXform().setPosition(x2, y2-5);
    mBlackSq2.getXform().setSize(25, 60);

    //this.mBlueSq1.draw(vpMatrix);
    //this.mBlueSq2.draw(vpMatrix);
    //this.mBlackSq1.draw(vpMatrix);
    //this.mBlackSq2.draw(vpMatrix);
    this.mObstacles.push(mBlueSq1);
    this.mObstacles.push(mBlackSq1);
    this.mObstacles.push(mBlueSq2);
    this.mObstacles.push(mBlackSq2);


    /////////////////////// Maaheen's Top Right Corner ///////////////////////////

    //Top Right Square//

    var x = 900;
    var yBottom = 580;
    var yTop = 635;
    var y = 607.5;


    let trSquareTRTop = new Renderable(this.mConstColorShader);
    trSquareTRTop.setColor([0.0, 0.0, 0.6, 1]);
    trSquareTRTop.getXform().setPosition(x, y);
    trSquareTRTop.getXform().setSize(95, 60);
    //this.trSquareTRTop.draw(vpMatrix);
    this.mObstacles.push(trSquareTRTop);

    let trSquareTRBottom = new Renderable(this.mConstColorShader);
    trSquareTRBottom.setColor([0.0, 0.0, 0.0, 1]);
    trSquareTRBottom.getXform().setPosition(x, y);
    trSquareTRBottom.getXform().setSize(85, 50);
    //this.trSquareTRBottom.draw(vpMatrix);
    this.mObstacles.push(trSquareTRBottom);

    /* var xLeft = 855;
     var xRight = 950;
     var y = 607.5;


     let trSquareTRLeft = new Renderable(this.mConstColorShader);
     trSquareTRLeft.setColor([0.0, 0.0, 0.6, 1]);
     trSquareTRLeft.getXform().setPosition(xLeft, y);
     trSquareTRLeft.getXform().setSize(5, 60);
     //trSquareTRLeft.draw(vpMatrix);
     this.mObstacles.push(trSquareTRLeft);

     let trSquareTRRight = new Renderable(this.mConstColorShader);
     trSquareTRRight.setColor([0.0, 0.0, 0.6, 1]);
     trSquareTRRight.getXform().setPosition(xRight, y);
     trSquareTRRight.getXform().setSize(5, 60);
     //this.trSquareTRRight.draw(vpMatrix);
     this.mObstacles.push(trSquareTRRight);
   */


    //Bottom Right Rectangle//

    var x = 900;
    var yBottom = 520;
    var yTop = 545;


    let trSquareBRTop = new Renderable(this.mConstColorShader);
    trSquareBRTop.setColor([0.0, 0.0, 0.6, 1]);
    trSquareBRTop.getXform().setPosition(x, yTop);
    trSquareBRTop.getXform().setSize(95, 5);
    //this.trSquareBRTop.draw(vpMatrix);
    this.mObstacles.push(trSquareBRTop);

    let trSquareBRBottom = new Renderable(this.mConstColorShader);
    trSquareBRBottom.setColor([0.0, 0.0, 0.6, 1]);
    trSquareBRBottom.getXform().setPosition(x, yBottom);
    trSquareBRBottom.getXform().setSize(95, 5);
    //this.trSquareBRBottom.draw(vpMatrix);
    this.mObstacles.push(trSquareBRBottom);

    var xLeft = 855;
    var xRight = 950;
    var y = 532.5;


    let trSquareBRLeft = new Renderable(this.mConstColorShader);
    trSquareBRLeft.setColor([0.0, 0.0, 0.6, 1]);
    trSquareBRLeft.getXform().setPosition(xLeft, y);
    trSquareBRLeft.getXform().setSize(5, 30);
    //this.trSquareBRLeft.draw(vpMatrix);
    this.mObstacles.push(trSquareBRLeft);

    let trSquareBRRight = new Renderable(this.mConstColorShader);
    trSquareBRRight.setColor([0.0, 0.0, 0.6, 1]);
    trSquareBRRight.getXform().setPosition(xRight, y);
    trSquareBRRight.getXform().setSize(5, 30);
    //this.trSquareBRRight.draw(vpMatrix);
    this.mObstacles.push(trSquareBRRight);


//   //Top Left Rectangle//


    var x = 760;
    var yBottom = 580;
    var yTop = 635;
    var y = 607.5;

    let trSquareTLTop = new Renderable(this.mConstColorShader);
    trSquareTLTop.setColor([0.0, 0.0, 0.6, 1]);
    trSquareTLTop.getXform().setPosition(x, y);
    trSquareTLTop.getXform().setSize(105, 60);
    //this.trSquareTLTop.draw(vpMatrix);
    this.mObstacles.push(trSquareTLTop);

    let trSquareTLBottom = new Renderable(this.mConstColorShader);
    trSquareTLBottom.setColor([0.0, 0.0, 0.0, 1]);
    trSquareTLBottom.getXform().setPosition(x, y);
    trSquareTLBottom.getXform().setSize(95, 50);
    //this.trSquareTLBottom.draw(vpMatrix);
    this.mObstacles.push(trSquareTLBottom);

    /* var xLeft = 710;
     var xRight = 815;
     var y = 607.5;


     let trSquareTRLeft1 = new Renderable(this.mConstColorShader);
     trSquareTRLeft1.setColor([0.0, 0.0, 0.6, 1]);
     trSquareTRLeft1.getXform().setPosition(xLeft, y);
     trSquareTRLeft1.getXform().setSize(5, 60);
     //this.trSquareTRLeft.draw(vpMatrix);
     this.mObstacles.push(trSquareTRLeft1);

     let trSquareTRRight1 = new Renderable(this.mConstColorShader);
     trSquareTRRight1.setColor([0.0, 0.0, 0.6, 1]);
     trSquareTRRight1.getXform().setPosition(xRight, y);
     trSquareTRRight1.getXform().setSize(5, 60);
     //this.trSquareTRRight.draw(vpMatrix);
     this.mObstacles.push(trSquareTRRight1);  */


    //Top Middle Rectangle//

    var x = 650;
    var yBottom = 580;

    let trSquareMBottom = new Renderable(this.mConstColorShader);
    trSquareMBottom.setColor([0.0, 0.0, 0.6, 1]);
    trSquareMBottom.getXform().setPosition(x, yBottom);
    trSquareMBottom.getXform().setSize(30, 5);
    //this.trSquareMBottom.draw(vpMatrix);
    this.mObstacles.push(trSquareMBottom);

    var xLeft = 635;
    var xRight = 665;
    var y = 625;


    let trSquareMLeft = new Renderable(this.mConstColorShader);
    trSquareMLeft.setColor([0.0, 0.0, 0.6, 1]);
    trSquareMLeft.getXform().setPosition(xLeft, y);
    trSquareMLeft.getXform().setSize(5, 95);
    //this.trSquareMLeft.draw(vpMatrix);
    this.mObstacles.push(trSquareMLeft);

    let trSquareMRight = new Renderable(this.mConstColorShader);
    trSquareMRight.setColor([0.0, 0.0, 0.6, 1]);
    trSquareMRight.getXform().setPosition(xRight, y);
    trSquareMRight.getXform().setSize(5, 95);
    //this.trSquareMRight.draw(vpMatrix);
    this.mObstacles.push(trSquareMRight);


    //Bottom Right T Head//

    var x = 800;
    var yTop = 540;
    var yBottom = 425;

    let trSquareBRTTop = new Renderable(this.mConstColorShader);
    trSquareBRTTop.setColor([0.0, 0.0, 0.6, 1]);
    trSquareBRTTop.getXform().setPosition(x, yTop);
    trSquareBRTTop.getXform().setSize(30, 5);
    //this.trSquareBRTTop.draw(vpMatrix);
    this.mObstacles.push(trSquareBRTTop);

    let trSquareBRTBottom = new Renderable(this.mConstColorShader);
    trSquareBRTBottom.setColor([0.0, 0.0, 0.6, 1]);
    trSquareBRTBottom.getXform().setPosition(x, yBottom);
    trSquareBRTBottom.getXform().setSize(30, 5);
    //this.trSquareBRTBottom.draw(vpMatrix);
    this.mObstacles.push(trSquareBRTBottom);

    var xLeft = 787;
    var xRight = 815;
    var y = 482.5;


    let trSquareBRTLeft = new Renderable(this.mConstColorShader);
    trSquareBRTLeft.setColor([0.0, 0.0, 0.6, 1]);
    trSquareBRTLeft.getXform().setPosition(xLeft, y);
    trSquareBRTLeft.getXform().setSize(5, 120);
    //this.trSquareBRTLeft.draw(vpMatrix);
    this.mObstacles.push(trSquareBRTLeft);

    let trSquareBRTRight = new Renderable(this.mConstColorShader);
    trSquareBRTRight.setColor([0.0, 0.0, 0.6, 1]);
    trSquareBRTRight.getXform().setPosition(xRight, y);
    trSquareBRTRight.getXform().setSize(5, 120);
    //this.trSquareBRTRight.draw(vpMatrix);
    this.mObstacles.push(trSquareBRTRight);


    //Bottom Right T Tail//

    var x = 748;
    var yTop = 487;
    var yBottom = 465;

    let trSquareTLTTop = new Renderable(this.mConstColorShader);
    trSquareTLTTop.setColor([0.0, 0.0, 0.6, 1]);
    trSquareTLTTop.getXform().setPosition(x, yTop);
    trSquareTLTTop.getXform().setSize(82, 5);
    //this.trSquareTLTTop.draw(vpMatrix);
    this.mObstacles.push(trSquareTLTTop);

    let trSquareTLTBottom = new Renderable(this.mConstColorShader);
    trSquareTLTBottom.setColor([0.0, 0.0, 0.6, 1]);
    trSquareTLTBottom.getXform().setPosition(x, yBottom);
    trSquareTLTBottom.getXform().setSize(82, 5);
    //this.trSquareTLTBottom.draw(vpMatrix);
    this.mObstacles.push(trSquareTLTBottom);

    var xLeft = 564;
    var xRight = 735;
    var y = 527.5;


    let trSquareTLTLeft = new Renderable(this.mConstColorShader);
    trSquareTLTLeft.setColor([0.0, 0.0, 0.6, 1]);
    trSquareTLTLeft.getXform().setPosition(xLeft, y);
    trSquareTLTLeft.getXform().setSize(5, 30);
    //this.trSquareTLTLeft.draw(vpMatrix);
    this.mObstacles.push(trSquareTLTLeft);

    let trSquareTLTRight = new Renderable(this.mConstColorShader);
    trSquareTLTRight.setColor([0.0, 0.0, 0.6, 1]);
    trSquareTLTRight.getXform().setPosition(xRight, y);
    trSquareTLTRight.getXform().setSize(5, 30);
    //this.trSquareTLTRight.draw(vpMatrix);
    this.mObstacles.push(trSquareTLTRight);




    //Top Left T Head//

    var x = 650;
    var yTop = 540;
    var yBottom = 515;

    trSquareTLTTop = new Renderable(this.mConstColorShader);
    trSquareTLTTop.setColor([0.0, 0.0, 0.6, 1]);
    trSquareTLTTop.getXform().setPosition(x, yTop);
    trSquareTLTTop.getXform().setSize(170, 5);
    //this.trSquareTLTTop.draw(vpMatrix);
    this.mObstacles.push(trSquareTLTTop);

    trSquareTLTBottom = new Renderable(this.mConstColorShader);
    trSquareTLTBottom.setColor([0.0, 0.0, 0.6, 1]);
    trSquareTLTBottom.getXform().setPosition(x, yBottom);
    trSquareTLTBottom.getXform().setSize(170, 5);
    //this.trSquareTLTBottom.draw(vpMatrix);
    this.mObstacles.push(trSquareTLTBottom);

    var xLeft = 708;
    var xRight = 787;
    var y = 476;


    trSquareTLTLeft = new Renderable(this.mConstColorShader);
    trSquareTLTLeft.setColor([0.0, 0.0, 0.6, 1]);
    trSquareTLTLeft.getXform().setPosition(xLeft, y);
    trSquareTLTLeft.getXform().setSize(5, 27);
    //this.trSquareTLTLeft.draw(vpMatrix);
    this.mObstacles.push(trSquareTLTLeft);

    trSquareTLTRight = new Renderable(this.mConstColorShader);
    trSquareTLTRight.setColor([0.0, 0.0, 0.0, 1]);
    trSquareTLTRight.getXform().setPosition(xRight, y);
    trSquareTLTRight.getXform().setSize(5, 17);
    //this.trSquareTLTRight.draw(vpMatrix);
    this.mObstacles.push(trSquareTLTRight);

    //Top Left T Tail//

    var x = 650;
    var yTop = 515;
    var yBottom = 465;

    trSquareTLTTop = new Renderable(this.mConstColorShader);
    trSquareTLTTop.setColor([0.0, 0.0, 0.0, 1]);
    trSquareTLTTop.getXform().setPosition(x, yTop);
    trSquareTLTTop.getXform().setSize(30, 5);
    //this.trSquareTLTTop.draw(vpMatrix);
    this.mObstacles.push(trSquareTLTTop);

    trSquareTLTBottom = new Renderable(this.mConstColorShader);
    trSquareTLTBottom.setColor([0.0, 0.0, 0.6, 1]);
    trSquareTLTBottom.getXform().setPosition(x, yBottom);
    trSquareTLTBottom.getXform().setSize(30, 5);
    //this.trSquareTLTBottom.draw(vpMatrix);
    this.mObstacles.push(trSquareTLTBottom);

    var xLeft = 633;
    var xRight = 667;
    var y = 490;


    trSquareTLTLeft = new Renderable(this.mConstColorShader);
    trSquareTLTLeft.setColor([0.0, 0.0, 0.6, 1]);
    trSquareTLTLeft.getXform().setPosition(xLeft, y);
    trSquareTLTLeft.getXform().setSize(5, 55);
    //this.trSquareTLTLeft.draw(vpMatrix);
    this.mObstacles.push(trSquareTLTLeft);

    trSquareTLTRight = new Renderable(this.mConstColorShader);
    trSquareTLTRight.setColor([0.0, 0.0, 0.6, 1]);
    trSquareTLTRight.getXform().setPosition(xRight, y);
    trSquareTLTRight.getXform().setSize(5, 55);
    //this.trSquareTLTRight.draw(vpMatrix);
    this.mObstacles.push(trSquareTLTRight);

    //Maaheen Part//
    //Middle Right Rectangle//

    var x = 800;
    var yTop = 382;
    var yBottom = 325;

    trSquareBRTTop = new Renderable(this.mConstColorShader);
    trSquareBRTTop.setColor([0.0, 0.0, 0.6, 1]);
    trSquareBRTTop.getXform().setPosition(x, yTop);
    trSquareBRTTop.getXform().setSize(30, 5);
    //this.trSquareBRTTop.draw(vpMatrix);
    this.mObstacles.push(trSquareBRTTop);

    trSquareBRTBottom = new Renderable(this.mConstColorShader);
    trSquareBRTBottom.setColor([0.0, 0.0, 0.6, 1]);
    trSquareBRTBottom.getXform().setPosition(x, yBottom);
    trSquareBRTBottom.getXform().setSize(30, 5);
    //this.trSquareBRTBottom.draw(vpMatrix);
    this.mObstacles.push(trSquareBRTBottom);

    var xLeft = 787;
    var xRight = 815;
    var y = 353.5;

    trSquareBRTLeft = new Renderable(this.mConstColorShader);
    trSquareBRTLeft.setColor([0.0, 0.0, 0.6, 1]);
    trSquareBRTLeft.getXform().setPosition(xLeft, y);
    trSquareBRTLeft.getXform().setSize(5, 62);
    //this.trSquareBRTLeft.draw(vpMatrix);
    this.mObstacles.push(trSquareBRTLeft);

    trSquareBRTRight = new Renderable(this.mConstColorShader);
    trSquareBRTRight.setColor([0.0, 0.0, 0.6, 1]);
    trSquareBRTRight.getXform().setPosition(xRight, y);
    trSquareBRTRight.getXform().setSize(5, 62);
    //this.trSquareBRTRight.draw(vpMatrix);
    this.mObstacles.push(trSquareBRTRight);



    //**Hetansh Code bottom right


    var centerX = 640;
    var centerY = 360;

    //obstacle 7 mirrored
    // Adjusted coordinates for mirrored obstacle in the bottom right
    var ob7x1 = centerX + (centerX - 457.5); // New x1 for the mirrored position of mBlueSq1 and mBlackSq1
    var ob7x2 = centerX + (centerX - 480); // New x2 for the mirrored position of mBlueSq2 and mBlackSq2, adjusted for width
    var ob7y1 = centerY - (360 - 140) ; // Adjust y1 for bottom alignment, subtracting the height to position it from the bottom
    var ob7y2 = centerY - (360 - 187.5) ; // Adjust y2 similarly, ensuring it's placed above y1 with proper spacing

    let ob7BlueSq1 = new Renderable(this.mConstColorShader);
    ob7BlueSq1.setColor([0.0, 0.0, 0.6, 1]);
    ob7BlueSq1.getXform().setPosition(ob7x1, ob7y1);
    ob7BlueSq1.getXform().setSize(260, 35);

    let ob7BlueSq2 = new Renderable(this.mConstColorShader);
    ob7BlueSq2.setColor([0.0, 0.0, 0.6, 1]);
    ob7BlueSq2.getXform().setPosition(ob7x2, ob7y2);
    ob7BlueSq2.getXform().setSize(35, 60);

    let ob7BlackSq1 = new Renderable(this.mConstColorShader);
    ob7BlackSq1.setColor([0.0, 0.0, 0.0, 1]);
    ob7BlackSq1.getXform().setPosition(ob7x1, ob7y1);
    ob7BlackSq1.getXform().setSize(250, 25);

    let ob7BlackSq2 = new Renderable(this.mConstColorShader);
    ob7BlackSq2.setColor([0.0, 0.0, 0.0, 1]);
    ob7BlackSq2.getXform().setPosition(ob7x2 , ob7y2 - 5);
    ob7BlackSq2.getXform().setSize(25, 60);

    //this.ob7BlueSq1.draw(vpMatrix);
    //this.ob7BlackSq1.draw(vpMatrix);
    //this.ob7BlueSq2.draw(vpMatrix);
    //this.ob7BlackSq2.draw(vpMatrix);
    this.mObstacles.push(ob7BlueSq1);
    this.mObstacles.push(ob7BlackSq1);
    this.mObstacles.push(ob7BlueSq2);
    this.mObstacles.push(ob7BlackSq2);

// Obstacle 4 - Mirror Image (Bottom-Right Corner)
    var ob4x1 = centerX + (centerX - 525); // New x1 for the mirrored position of mBlueSq1 and mBlackSq1
    var ob4y1 = centerY - (360 - 270); // Adjust y1 for bottom alignment, subtracting the height to position it from the bottom

    let ob4BlueSq1 = new Renderable(this.mConstColorShader);
    ob4BlueSq1.setColor([0.0, 0.0, 0.6, 1]);
    ob4BlueSq1.getXform().setPosition(ob4x1, ob4y1);
    ob4BlueSq1.getXform().setSize(125, 35);

    let ob4BlackSq1 = new Renderable(this.mConstColorShader);
    ob4BlackSq1.setColor([0.0, 0.0, 0.0, 1]);
    ob4BlackSq1.getXform().setPosition(ob4x1, ob4y1);
    ob4BlackSq1.getXform().setSize(115, 25);

    //this.ob4BlueSq1.draw(vpMatrix);
    //this.ob4BlackSq1.draw(vpMatrix);
    this.mObstacles.push(ob4BlueSq1);
    this.mObstacles.push(ob4BlackSq1);

// Obstacle 5 - Mirror Image (Bottom-Right Corner)
    var ob5x1 = centerX + ( centerX - 380); // New x1 for the mirrored position of mBlueSq1 and mBlackSq1
    var ob5x2 = centerX + ( centerX - 412); // New x2 for the mirrored position of mBlueSq2 and mBlackSq2
    var ob5y1 = centerY - (360 - 270); // Adjust y1 for bottom alignment, subtracting the height to position it from the bottom
    var ob5y2 = centerY - (360 - 222.5); // Adjust y2 similarly, ensuring it's placed above y1 with proper spacing

    let ob5BlueSq1 = new Renderable(this.mConstColorShader);
    ob5BlueSq1.setColor([0.0, 0.0, 0.6, 1]);
    ob5BlueSq1.getXform().setPosition(ob5x1, ob5y1);
    ob5BlueSq1.getXform().setSize(100, 35);

    let ob5BlueSq2 = new Renderable(this.mConstColorShader);
    ob5BlueSq2.setColor([0.0, 0.0, 0.6, 1]);
    ob5BlueSq2.getXform().setPosition(ob5x2, ob5y2);
    ob5BlueSq2.getXform().setSize(35, 60);

    let ob5BlackSq1 = new Renderable(this.mConstColorShader);
    ob5BlackSq1.setColor([0.0, 0.0, 0.0, 1]);
    ob5BlackSq1.getXform().setPosition(ob5x1, ob5y1);
    ob5BlackSq1.getXform().setSize(90, 25);

    let ob5BlackSq2 = new Renderable(this.mConstColorShader);
    ob5BlackSq2.setColor([0.0, 0.0, 0.0, 1]);
    ob5BlackSq2.getXform().setPosition(ob5x2, ob5y2 + 5);
    ob5BlackSq2.getXform().setSize(25, 60);

    //this.ob5BlueSq1.draw(vpMatrix);
    //this.ob5BlackSq1.draw(vpMatrix);
    //this.ob5BlueSq2.draw(vpMatrix);
    //this.ob5BlackSq2.draw(vpMatrix);
    this.mObstacles.push(ob5BlueSq1);
    this.mObstacles.push(ob5BlackSq1);
    this.mObstacles.push(ob5BlueSq2);
    this.mObstacles.push(ob5BlackSq2);

    // Obstacle 6 - Mirror Image (Bottom-Right Corner)
    var ob6x1 = centerX - ( centerX - 960); // New x1 for the mirrored position of mBlueSq1 and mBlackSq1
    var ob6y1 = centerY - (360 - 205); // Adjust y1 for bottom alignment, subtracting the height to position it from the bottom

    let ob6BlueSq1 = new Renderable(this.mConstColorShader);
    ob6BlueSq1.setColor([0.0, 0.0, 0.6, 1]);
    ob6BlueSq1.getXform().setPosition(ob6x1, ob6y1);
    ob6BlueSq1.getXform().setSize(75, 25);

    let ob6BlackSq1 = new Renderable(this.mConstColorShader);
    ob6BlackSq1.setColor([0.0, 0.0, 0.0, 1]);
    ob6BlackSq1.getXform().setPosition(ob6x1 - 2, ob6y1);
    ob6BlackSq1.getXform().setSize(60, 15);

    //this.ob6BlueSq1.draw(vpMatrix);
    //this.ob6BlackSq1.draw(vpMatrix);
    this.mObstacles.push(ob6BlueSq1);
    this.mObstacles.push(ob6BlackSq1);



    //Tony part
    //Top Left Square//

    var xMirror = 380;  // Adjust the x-coordinate for the mirror image
    var yBottomMirror = 580;
    var yTopMirror = 635;
    var yMirror = 607.5;

    let trSquareTLTopMirror = new Renderable(this.mConstColorShader);
    trSquareTLTopMirror.setColor([0.0, 0.0, 0.6, 1]);
    trSquareTLTopMirror.getXform().setPosition(xMirror, yMirror);
    trSquareTLTopMirror.getXform().setSize(95, 60);
    //this.trSquareTLTopMirror.draw(vpMatrix);
    this.mObstacles.push(trSquareTLTopMirror);

    let trSquareTLBottomMirror = new Renderable(this.mConstColorShader);
    trSquareTLBottomMirror.setColor([0.0, 0.0, 0.0, 1]);
    trSquareTLBottomMirror.getXform().setPosition(xMirror, yMirror);
    trSquareTLBottomMirror.getXform().setSize(85, 50);
    //this.trSquareTLBottomMirror.draw(vpMatrix);
    this.mObstacles.push(trSquareTLBottomMirror);

    /* var xLeftMirror = 335;
    var xRightMirror = 430;
    var yMirror = 607.5;

    let trSquareTLLeftMirror = new Renderable(this.mConstColorShader);
    trSquareTLLeftMirror.setColor([0.0, 0.0, 0.6, 1]);
    trSquareTLLeftMirror.getXform().setPosition(xLeftMirror, yMirror);
    trSquareTLLeftMirror.getXform().setSize(5, 60);
    //this.trSquareTLLeftMirror.draw(vpMatrix);
    this.mObstacles.push(trSquareTLLeftMirror);

    let trSquareTLRightMirror = new Renderable(this.mConstColorShader);
    trSquareTLRightMirror.setColor([0.0, 0.0, 0.6, 1]);
    trSquareTLRightMirror.getXform().setPosition(xRightMirror, yMirror);
    trSquareTLRightMirror.getXform().setSize(5, 60);
    //this.trSquareTLRightMirror.draw(vpMatrix);
    this.mObstacles.push(trSquareTLRightMirror); */

// Bottom Left Square //

    var xMirror = 380;  // Adjust the x-coordinate for the mirror image
    var yBottomMirror = 520;
    var yTopMirror = 545;

    let trSquareBLTopMirror = new Renderable(this.mConstColorShader);
    trSquareBLTopMirror.setColor([0.0, 0.0, 0.6, 1]);
    trSquareBLTopMirror.getXform().setPosition(xMirror, yTopMirror);
    trSquareBLTopMirror.getXform().setSize(95, 5);
    //this.trSquareBLTopMirror.draw(vpMatrix);
    this.mObstacles.push(trSquareBLTopMirror);

    let trSquareBLBottomMirror = new Renderable(this.mConstColorShader);
    trSquareBLBottomMirror.setColor([0.0, 0.0, 0.6, 1]);
    trSquareBLBottomMirror.getXform().setPosition(xMirror, yBottomMirror);
    trSquareBLBottomMirror.getXform().setSize(95, 5);
    //this.trSquareBLBottomMirror.draw(vpMatrix);
    this.mObstacles.push(trSquareBLBottomMirror);

    var xLeftMirror = 335;
    var xRightMirror = 430;
    var yMirror = 532.5;

    let trSquareBLLeftMirror = new Renderable(this.mConstColorShader);
    trSquareBLLeftMirror.setColor([0.0, 0.0, 0.6, 1]);
    trSquareBLLeftMirror.getXform().setPosition(xLeftMirror, yMirror);
    trSquareBLLeftMirror.getXform().setSize(5, 30);
    //this.trSquareBLLeftMirror.draw(vpMatrix);
    this.mObstacles.push(trSquareBLLeftMirror);

    let trSquareBLRightMirror = new Renderable(this.mConstColorShader);
    trSquareBLRightMirror.setColor([0.0, 0.0, 0.6, 1]);
    trSquareBLRightMirror.getXform().setPosition(xRightMirror, yMirror);
    trSquareBLRightMirror.getXform().setSize(5, 30);
    //this.trSquareBLRightMirror.draw(vpMatrix);
    this.mObstacles.push(trSquareBLRightMirror);

// Right Square
    var xMirror = 520;  // Adjust the x-coordinate for the mirror image
    var yBottomMirror = 580;
    var yTopMirror = 635;
    var yMirror = 607.5;

    trSquareTLTopMirror = new Renderable(this.mConstColorShader);
    trSquareTLTopMirror.setColor([0.0, 0.0, 0.6, 1]);
    trSquareTLTopMirror.getXform().setPosition(xMirror, yMirror);
    trSquareTLTopMirror.getXform().setSize(95, 60);
    //this.trSquareTLTopMirror.draw(vpMatrix);
    this.mObstacles.push(trSquareTLTopMirror);

    trSquareTLBottomMirror = new Renderable(this.mConstColorShader);
    trSquareTLBottomMirror.setColor([0.0, 0.0, 0.0, 1]);
    trSquareTLBottomMirror.getXform().setPosition(xMirror, yMirror);
    trSquareTLBottomMirror.getXform().setSize(85, 50);
    //this.trSquareTLBottomMirror.draw(vpMatrix);
    this.mObstacles.push(trSquareTLBottomMirror);

    /* var xLeftMirror = 475;
    var xRightMirror = 570;
    var yMirror = 607.5;

    let trSquareTLLeftMirror = new Renderable(this.mConstColorShader);
    trSquareTLLeftMirror.setColor([0.0, 0.0, 0.6, 1]);
    trSquareTLLeftMirror.getXform().setPosition(xLeftMirror, yMirror);
    trSquareTLLeftMirror.getXform().setSize(5, 60);
    //this.trSquareTLLeftMirror.draw(vpMatrix);
    this.mObstacles.push(trSquareTLLeftMirror);

    let trSquareTLRightMirror = new Renderable(this.mConstColorShader);
    trSquareTLRightMirror.setColor([0.0, 0.0, 0.6, 1]);
    trSquareTLRightMirror.getXform().setPosition(xRightMirror, yMirror);
    trSquareTLRightMirror.getXform().setSize(5, 60);
    //this.trSquareTLRightMirror.draw(vpMatrix);
    this.mObstacles.push(trSquareTLRightMirror); */


    //Maaheen Part

    //Bottom Left T Head//

    var x = 480;
    var yTop = 540;
    var yBottom = 425;

    trSquareBRTTop = new Renderable(this.mConstColorShader);
    trSquareBRTTop.setColor([0.0, 0.0, 0.6, 1]);
    trSquareBRTTop.getXform().setPosition(x, yTop);
    trSquareBRTTop.getXform().setSize(30, 5);
    //this.trSquareBRTTop.draw(vpMatrix);
    this.mObstacles.push(trSquareBRTTop);

    trSquareBRTBottom = new Renderable(this.mConstColorShader);
    trSquareBRTBottom.setColor([0.0, 0.0, 0.6, 1]);
    trSquareBRTBottom.getXform().setPosition(x, yBottom);
    trSquareBRTBottom.getXform().setSize(30, 5);
    //this.trSquareBRTBottom.draw(vpMatrix);
    this.mObstacles.push(trSquareBRTBottom);

    var xLeft = 467.5;
    var xRight = 495;
    var y = 482.5;


    trSquareBRTLeft = new Renderable(this.mConstColorShader);
    trSquareBRTLeft.setColor([0.0, 0.0, 0.6, 1]);
    trSquareBRTLeft.getXform().setPosition(xLeft, y);
    trSquareBRTLeft.getXform().setSize(5, 120);
    //this.trSquareBRTLeft.draw(vpMatrix);
    this.mObstacles.push(trSquareBRTLeft);

    trSquareBRTRight = new Renderable(this.mConstColorShader);
    trSquareBRTRight.setColor([0.0, 0.0, 0.6, 1]);
    trSquareBRTRight.getXform().setPosition(xRight, y);
    trSquareBRTRight.getXform().setSize(5, 120);
    //this.trSquareBRTRight.draw(vpMatrix);
    this.mObstacles.push(trSquareBRTRight);


    // Bottom Left T Tail //

    var xMirror = 545;  // Adjust the x-coordinate for the mirror image
    var yTopMirror = 487;
    var yBottomMirror = 465;

    let trSquareTLTTopMirror = new Renderable(this.mConstColorShader);
    trSquareTLTTopMirror.setColor([0.0, 0.0, 0.6, 1]);
    trSquareTLTTopMirror.getXform().setPosition(xMirror, yTopMirror);
    trSquareTLTTopMirror.getXform().setSize(100, 5);
    //this.trSquareTLTTopMirror.draw(vpMatrix);
    this.mObstacles.push(trSquareTLTTopMirror);

    let trSquareTLTBottomMirror = new Renderable(this.mConstColorShader);
    trSquareTLTBottomMirror.setColor([0.0, 0.0, 0.6, 1]);
    trSquareTLTBottomMirror.getXform().setPosition(xMirror, yBottomMirror);
    trSquareTLTBottomMirror.getXform().setSize(100, 5);
    //this.trSquareTLTBottomMirror.draw(vpMatrix);
    this.mObstacles.push(trSquareTLTBottomMirror);

    var xLeftMirror = 495;
    var xRightMirror = 592.5;
    var yMirror = 476;

    let trSquareTLTLeftMirror = new Renderable(this.mConstColorShader);
    trSquareTLTLeftMirror.setColor([0.0, 0.0, 0.0, 1]);
    trSquareTLTLeftMirror.getXform().setPosition(xLeftMirror, yMirror);
    trSquareTLTLeftMirror.getXform().setSize(5, 17);
    //this.trSquareTLTLeftMirror.draw(vpMatrix);
    this.mObstacles.push(trSquareTLTLeftMirror);

    let trSquareTLTRightMirror = new Renderable(this.mConstColorShader);
    trSquareTLTRightMirror.setColor([0.0, 0.0, 0.6, 1]);
    trSquareTLTRightMirror.getXform().setPosition(xRightMirror, yMirror);
    trSquareTLTRightMirror.getXform().setSize(5, 27);
    //this.trSquareTLTRightMirror.draw(vpMatrix);
    this.mObstacles.push(trSquareTLTRightMirror);


  }

  MyGame.prototype.Maze1Manipulation = function()
  {
    let mtempRU = new Renderable(this.mConstColorShader);
    mtempRU.setColor([0.0, 0.0, 0.0, 1]);
    mtempRU.getXform().setPosition(950, 455);
    mtempRU.getXform().setSize(90, 15);
    let mtempRL = new Renderable(this.mConstColorShader);
    mtempRL.setColor([0.0, 0.0, 0.0, 1]);
    mtempRL.getXform().setPosition(950, 355);
    mtempRL.getXform().setSize(90, 15);

    // this.mtempRL.draw(vpMatrix);
    // this.mtempRU.draw(vpMatrix);
    this.mBorder.push(mtempRL)
    this.mBorder.push(mtempRU)

    let mtempLU = new Renderable(this.mConstColorShader);
    mtempLU.setColor([0.0, 0.0, 0.0, 1]);
    mtempLU.getXform().setPosition(350, 455);
    mtempLU.getXform().setSize(90, 15);
    let mtempLL = new Renderable(this.mConstColorShader);
    mtempLL.setColor([0.0, 0.0, 0.0, 1]);
    mtempLL.getXform().setPosition(350, 355);
    mtempLL.getXform().setSize(90, 15);

    // this.mtempLL.draw(vpMatrix);
    // this.mtempLU.draw(vpMatrix);
    this.mBorder.push(mtempLL)
    this.mBorder.push(mtempLU)

    let mtempMid = new Renderable(this.mConstColorShader);
    mtempMid.setColor([0.0, 0.0, 0.0, 1]);
    mtempMid.getXform().setPosition(640,405);
    mtempMid.getXform().setSize(120, 15);

    // this.mtempMid.draw(vpMatrix);
    this.mBorder.push(mtempMid)

    let mtempMidHigh = new Renderable(this.mConstColorShader);
    mtempMidHigh.setColor([0.0, 0.0, 0.0, 1]);
    mtempMidHigh.getXform().setPosition(650,625);
    mtempMidHigh.getXform().setSize(15, 75);

    // this.mtempMidHigh.draw(vpMatrix);
    this.mBorder.push(mtempMidHigh)

    let mtempMidLow = new Renderable(this.mConstColorShader);
    mtempMidLow.setColor([0.0, 0.0, 0.0, 1]);
    mtempMidLow.getXform().setPosition(650,490);
    mtempMidLow.getXform().setSize(15, 30);

    // this.mtempMidLow.draw(vpMatrix);
    this.mBorder.push(mtempMidLow)

  };


  const routeSize = 15;

  MyGame.prototype.checkPelletObstacleLoc = function(x,y) {
    for (let i = 0; i < this.mObstacles.length; i++) {
      const obstacleX = this.mObstacles[i].getXform().getXPos() + 5;
      const obstacleY = this.mObstacles[i].getXform().getYPos() + 5;
      const obstacleWidth = this.mObstacles[i].getXform().getWidth();
      const obstacleHeight = this.mObstacles[i].getXform().getHeight();

      // Check for overlap
      if (
          (x < (obstacleX + (obstacleWidth/2.0) + (routeSize/2.0))) &&
          (x > (obstacleX - (obstacleWidth/2.0) - (routeSize))) &&
          (y < (obstacleY + (obstacleHeight/2.0) + (routeSize/2.0))) &&
          (y > (obstacleY - (obstacleHeight/2.0) - (routeSize/2.0)))
      ){
        return true;
      }

    }
    return false;
  };



  const aisleSize = 15;

  MyGame.prototype.checkPelletBorderLoc = function(x,y) {
    for (let i = 0; i < this.mBorder.length; i++) {
      const borderX = this.mBorder[i].getXform().getXPos() + 5;
      const borderY = this.mBorder[i].getXform().getYPos() + 5;
      const borderWidth = this.mBorder[i].getXform().getWidth();
      const borderHeight = this.mBorder[i].getXform().getHeight();

      // Check for overlap
      if (
          (x < (borderX + (borderWidth/2.0) + (aisleSize/2.0))) &&
          (x > (borderX - (borderWidth) - (aisleSize/2.0))) &&
          (y < (borderY + (borderHeight/2.0) + (aisleSize/2.0))) &&
          (y > (borderY - (borderHeight/2.0) - (aisleSize/2.0)))
      ){
        return true;
      }

    }
    return false;
  };

  MyGame.prototype.initializePellets = function () {
    var xBound = 290;
    var yUpper = 662.5;
    var yLower = 80;

    // Fill top
    for(let row = 0; row < 30; row ++) {

      var tempxBound = xBound;
      for(let column = 0; column < 37 ; column ++) {
        if(this.checkPelletBorderLoc(tempxBound, yUpper))
        {
          tempxBound+=20;
        }
        else{
          if(this.checkPelletObstacleLoc(tempxBound, yUpper))
          {
            tempxBound+=20;
          }
          else
          {
            this.addPellet(tempxBound, yUpper);
            tempxBound+=20;
          }
        }
      }
      yUpper -= 20;
    }
  };

  MyGame.prototype.addPellet = function (x, y) {
    var pellet = new Renderable(this.mConstColorShader);
    pellet.setColor([1, 0.65, 0.57, 1]); // Yellow color for pellets
    pellet.getXform().setPosition(x, y);
    let randSize = Math.floor((Math.random() * 75) + 1);
    if(randSize === 1)
    {
      pellet.getXform().setSize(15, 15);
    }
    else {
      pellet.getXform().setSize(4.5, 4.5);
    }

    this.mPellets.push(pellet);
  };
  
  MyGame.prototype.initializeText = function () {
    this.mLevelText = new FontRenderable("LEVEL");
    this.mLevelText.setFont(this.kFont);
    this._initText(this.mLevelText, 800, 55, [1, 1, 1, 1], 36);

    this.mScoreText = new FontRenderable("SCORE");
    this.mScoreText.setFont(this.kFont);
    this._initText(this.mScoreText, 330, 55, [1, 1, 1, 1], 36);

    this.mLevelNum = new FontRenderable("01");
    this.mLevelNum.setFont(this.kFont);
    this._initText(this.mLevelNum, 940, 55, [1, 1, 1, 1], 36);

    this.mScoreNum = new FontRenderable("00");
    this.mScoreNum.setFont(this.kFont);
    this._initText(this.mScoreNum, 470, 55, [1, 1, 1, 1], 36);
  };

  this.mAnimatedPacman = new AnimatedPacman(this.kMovingPacman, this.kMovingPacmanRight, 450, 600);

  this.mGhostBlinky = new AnimatedGhost(this.Blinky[0], this.Blinky[1], this.Blinky[2], this.Blinky[3],635, 355)
  this.mGhostFunky = new AnimatedGhost(this.Funky[0], this.Funky[1], this.Funky[2], this.Funky[3],595, 100)
  this.mGhostInky = new AnimatedGhost(this.Inky[0], this.Inky[1], this.Inky[2], this.Inky[3],715, 355)
  this.mGhostPinky = new AnimatedGhost(this.Pinky[0], this.Pinky[1], this.Pinky[2], this.Pinky[3],450, 550)

  this.initializeBorders();
  this.initializeObstacles();
  this.Maze1Manipulation();
  this.initializePellets();
  this.initializeText();
  this.totalScore = 0;
  this.pelletCount = this.mPellets.length;



};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
  // Step A: clear the canvas
  gEngine.Core.clearCanvas([0, 0, 0, 1.0]); // clear to light gray

  // Step  B: Activate the drawing Camera
  this.mCamera.setupViewProjection();
  var vpMatrix = this.mCamera;



  for (let i = 0; i < this.mBorder.length; i++) {
    this.mBorder[i].draw(vpMatrix);
  }

  for (let i = 0; i < this.mObstacles.length; i++) {
    this.mObstacles[i].draw(vpMatrix);
  }

  for (let i = 0; i < this.mPellets.length; i++) {
    this.mPellets[i].draw(vpMatrix);
  }

  this.mAnimatedPacman.draw(vpMatrix);
  this.mGhostBlinky.draw(vpMatrix);
  this.mGhostFunky.draw(vpMatrix);
  this.mGhostInky.draw(vpMatrix);
  this.mGhostPinky.draw(vpMatrix);
  
  this.mLevelText.draw(vpMatrix);
  this.mScoreText.draw(vpMatrix);
  this.mLevelNum.draw(vpMatrix);
  this.mScoreNum.draw(vpMatrix);

};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
    
  

  const pacOgSize = 22.5;


  const resetX = 450;
  const resetY = 600;

  MyGame.prototype.checkCollisionWithPallets = function () {
    const pacmanX = this.mAnimatedPacman.getXform().getXPos();
    const pacmanY = this.mAnimatedPacman.getXform().getYPos();
    //const pacmanWidth = this.mAnimatedPacman.getXform().getWidth();
    //const pacmanHeight = this.mAnimatedPacman.getXform().getHeight();

    // Check collision with each pellet
    for (let i = 0; i < this.mPellets.length; i++) {
      const pelletX = this.mPellets[i].getXform().getXPos();
      const pelletY = this.mPellets[i].getXform().getYPos();
      const pelletWidth = this.mPellets[i].getXform().getWidth();
      const pelletHeight = this.mPellets[i].getXform().getHeight();

      // Check for overlap with PacMan
      if (
          pacmanX < pelletX + pelletWidth &&
          pacmanX + (20) > pelletX &&
          pacmanY < pelletY + pelletHeight &&
          pacmanY + (20) > pelletY
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
    const pacmanX = this.mAnimatedPacman.getXform().getXPos();
    const pacmanY = this.mAnimatedPacman.getXform().getYPos();
    //const pacmanWidth = this.pacManTransform.getWidth();
    //const pacmanHeight = this.pacManTransform.getHeight();

    // Check collision with each border
    for (let i = 0; i < this.mBorder.length; i++) {
      const borderX = this.mBorder[i].getXform().getXPos();
      const borderY = this.mBorder[i].getXform().getYPos();
      const borderWidth = this.mBorder[i].getXform().getWidth();
      const borderHeight = this.mBorder[i].getXform().getHeight();

      // Check for overlap
      if (
          pacmanX < borderX + (borderWidth) &&
          pacmanX + (pacOgSize) > borderX &&
          pacmanY < borderY + (borderHeight) &&
          pacmanY + (pacOgSize) > borderY
      ) {
        // Collision detected
        return true;
      }
    }

    // No collision detected
    return false;
  };

  MyGame.prototype.checkCollisionWithObstacles = function () {
    const pacmanX = this.mAnimatedPacman.getXform().getXPos();
    const pacmanY = this.mAnimatedPacman.getXform().getYPos();
    //const pacmanWidth = this.pacManTransform.getWidth();
    //const pacmanHeight = this.pacManTransform.getHeight();

    // Check collision with each border
    for (let i = 0; i < this.mObstacles.length; i++) {
      const obstacleX = this.mObstacles[i].getXform().getXPos();
      const obstacleY = this.mObstacles[i].getXform().getYPos();
      const obstacleWidth = this.mObstacles[i].getXform().getWidth();
      const obstacleHeight = this.mObstacles[i].getXform().getHeight();

      // Check for overlap
      if (
          pacmanX /*- pacmanWidth*/ < (obstacleX + obstacleWidth/3) &&
          pacmanX + (pacOgSize) > (obstacleX - (obstacleWidth/3)) &&
          pacmanY /*- pacmanHeight*/ < (obstacleY + obstacleHeight/3) &&
          pacmanY + (pacOgSize) > (obstacleY - (obstacleHeight/3))
      ) {
        // Collision detected
        console.log("Collision detected - obstacle")
        return true;
      }
    }

    // No collision detected
    return false;
  };



  console.log("TotalScore : "+this.totalScore);
  if(this.pelletCount===0) {
    console.log("Game Over.....")
  }

  if(this.checkCollisionWithPallets()) {
    this.totalScore+=10;
    this.pelletCount--;
    this.mScoreNum = new FontRenderable(JSON.stringify(this.totalScore));
    this.mScoreNum.setFont(this.kFont);
    this._initText(this.mScoreNum, 470, 55, [1, 1, 1, 1], 36);
  }

  // Check for collision with borders
  if (this.checkCollisionWithBorders()) {
    // If collision, revert to original position
    this.mAnimatedPacman.getXform().setPosition(this.originalX, this.originalY);
  }

  // Check for collision with obstacles
  if (this.checkCollisionWithObstacles()) {
    // If collision, revert to original position
    this.mAnimatedPacman.getXform().setPosition(this.originalX, this.originalY);
  }

  this.originalX = this.mAnimatedPacman.getXform().getXPos();
  this.originalY = this.mAnimatedPacman.getXform().getYPos();


  this.mAnimatedPacman.update();

  if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Two)) {
        gEngine.GameLoop.stop();
  }

};

MyGame.prototype._initText = function (font, posX, posY, color, textH) {
    font.setColor(color);
    font.getXform().setPosition(posX, posY);
    font.setTextHeight(textH);
};
