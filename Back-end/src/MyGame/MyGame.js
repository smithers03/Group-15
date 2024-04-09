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

  this.pacStartX = 450;
  this.pacStartY = 650;
  this.BlinkyStX = 635;
  this.BlinkyStY = 560;
  this.InkyStX = 715;
  this.InkyStY = 355;
  this.PinkyStX = 450;
  this.PinkyStY = 550;
  this.FunkyStX = 395;
  this.FunkyStY = 100;

  this.originalX = 450;
  this.originalY = 650;

  this.kFont = "assets/fonts/system-default-font";

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

  this.kBgClip = "assets/audios/BGClip.mp3";
  this.kCue = "assets/audios/MyGame_cue.wav";
  this.kPelletChomp = "assets/audios/Pacman_chomp1.wav";
  this.kPacmanDeath = "assets/audios/Pacman_death.wav";
  this.kEatFruit = "assets/audios/Pacman_eatfruit.wav";
  this.kEatGhost = "assets/audios/Pacman_eatghost.wav";
  this.kPacmanOpening = "assets/audios/pacman_beginning.wav";
  this.kCredits = "assets/audios/into.wav";
  this.kBing = "assets/audios/BlueLevel_cue.wav";
  this.kBackground = "assets/audios/backgroundMusic.wav";

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
  // loads the audios
  gEngine.AudioClips.loadAudio(this.kBgClip);
  gEngine.AudioClips.loadAudio(this.kCue);
  gEngine.AudioClips.loadAudio(this.kPelletChomp);
  gEngine.AudioClips.loadAudio(this.kPacmanDeath);
  gEngine.AudioClips.loadAudio(this.kEatFruit);
  gEngine.AudioClips.loadAudio(this.kEatGhost);
  gEngine.AudioClips.loadAudio(this.kPacmanOpening);
  gEngine.AudioClips.loadAudio(this.kCredits);
  gEngine.AudioClips.loadAudio(this.kBing);
  gEngine.AudioClips.loadAudio(this.kBackground);

};

MyGame.prototype.unloadScene = function () {
  gEngine.Fonts.unloadFont(this.kFont);
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

  // Play the background audio
  gEngine.AudioClips.playACue(this.kBackground, 1, true);


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

    ///////////////////MIDDLE BOX  LEFT AND RIGHT//////////////////////////

    var xRight = 748;
    var xLeft = 533;
    var yUpperL = 430;
    var yUpper = 420;

    for (let i = 0; i <= 4; i++){
      let mbl = new Renderable(this.mConstColorShader);
      mbl.setColor([0.0, 0.0, 0.6, 1]);
      mbl.getXform().setPosition(xLeft, yUpperL);
      mbl.getXform().setSize(15, 15);

      let mbr = new Renderable(this.mConstColorShader);
      mbr.setColor([0.0, 0.0, 0.6, 1]);
      mbr.getXform().setPosition(xRight, yUpper);
      mbr.getXform().setSize(15, 15);

      this.mBorder.push(mbl);
      this.mBorder.push(mbr);

      let mblb = new Renderable(this.mConstColorShader);
      mblb.setColor([0.0, 0.0, 0.0, 1]);
      mblb.getXform().setPosition(xLeft, yUpperL);
      mblb.getXform().setSize(5, 5);

      let mbrb = new Renderable(this.mConstColorShader);
      mbrb.setColor([0.0, 0.0, 0.0, 1]);
      mbrb.getXform().setPosition(xRight, yUpper);
      mbrb.getXform().setSize(5, 5);

      this.mBorder.push(mblb);
      this.mBorder.push(mbrb);

      yUpper -= 10;
      yUpperL -= 10;
    }




//////////////// MIDDLE BOX TOP LEFT AND BOTTOM  ///////////////////
//
    var yLower = 380;
    var xLeft = 535;
    var yUpper = 430;
    var xRight = 533;

    for (let i = 0; i <= 8; i++){
      let mbtl = new Renderable(this.mConstColorShader);
      mbtl.setColor([0.0, 0.0, 0.6, 1]);
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

    for (let i = 0; i <= 21; i++){

      let mbb = new Renderable(this.mConstColorShader);
      mbb.setColor([0.0, 0.0, 0.6, 1]);
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
//

    //////////////////////// MIDDLE BOX TOP RIGHT  /////////////
    var xLeft = 668;
    var yUpper = 430;

    for (let i = 0; i <= 8; i++) {
      let mbtr = new Renderable(this.mConstColorShader);
      mbtr.setColor([0.0, 0.0, 0.6, 1]);
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


  }

  MyGame.prototype.initializeObstacles = function (){
    ///////////////////// Obstacles ////////////////////

    //////////////// TOP LEFT CORNER UPPER BOX /////////////////
    let tlcup = new Renderable(this.mConstColorShader);
    tlcup.setColor([0.0, 0.0, 0.6, 1.0]);
    tlcup.getXform().setPosition(378,611);
    tlcup.getXform().setSize(100, 50);
    this.mObstacles.push(tlcup);

    let tlcupb = new Renderable(this.mConstColorShader);
    tlcupb.setColor([0.0, 0.0, 0.0, 1.0]);
    tlcupb.getXform().setPosition(378,611);
    tlcupb.getXform().setSize(80, 30);
    this.mObstacles.push(tlcupb);


    //////////////// TOP LEFT CORNER LOWER BOX /////////////////
    let tlclp = new Renderable(this.mConstColorShader);
    tlclp.setColor([0.0, 0.0, 0.6, 1.0]);
    tlclp.getXform().setPosition(378,536);
    tlclp.getXform().setSize(100, 28);
    this.mObstacles.push(tlclp);

    let tlclpb = new Renderable(this.mConstColorShader);
    tlclpb.setColor([0.0, 0.0, 0.0, 1.0]);
    tlclpb.getXform().setPosition(378,536);
    tlclpb.getXform().setSize(80, 13);
    this.mObstacles.push(tlclpb);

    //////////////// TOP RIGHT CORNER UPPER BOX /////////////////
    let trcup = new Renderable(this.mConstColorShader);
    trcup.setColor([0.0, 0.0, 0.6, 1.0]);
    trcup.getXform().setPosition(902,611);
    trcup.getXform().setSize(100, 50);
    this.mObstacles.push(trcup);

    let trcupb = new Renderable(this.mConstColorShader);
    trcupb.setColor([0.0, 0.0, 0.0, 1.0]);
    trcupb.getXform().setPosition(902,611);
    trcupb.getXform().setSize(80, 30);
    this.mObstacles.push(trcupb);


    //////////////// TOP RIGHT CORNER BOTTOM BOX /////////////////
    let trcbp = new Renderable(this.mConstColorShader);
    trcbp.setColor([0.0, 0.0, 0.6, 1.0]);
    trcbp.getXform().setPosition(902,536);
    trcbp.getXform().setSize(100, 28);
    this.mObstacles.push(trcbp);

    let trcbpb = new Renderable(this.mConstColorShader);
    trcbpb.setColor([0.0, 0.0, 0.0, 1.0]);
    trcbpb.getXform().setPosition(902,536);
    trcbpb.getXform().setSize(80, 13);
    this.mObstacles.push(trcbpb);

    //////////////// TOP LEFT CORNER RIGHT BOX /////////////////
    let tlcrp = new Renderable(this.mConstColorShader);
    tlcrp.setColor([0.0, 0.0, 0.6, 1.0]);
    tlcrp.getXform().setPosition(526,611);
    tlcrp.getXform().setSize(122, 50);
    this.mObstacles.push(tlcrp);

    let tlcrpb = new Renderable(this.mConstColorShader);
    tlcrpb.setColor([0.0, 0.0, 0.0, 1.0]);
    tlcrpb.getXform().setPosition(526,611);
    tlcrpb.getXform().setSize(102, 30);
    this.mObstacles.push(tlcrpb);

    //////////////// TOP RIGHT CORNER LEFT BOX /////////////////
    let trclp = new Renderable(this.mConstColorShader);
    trclp.setColor([0.0, 0.0, 0.6, 1.0]);
    trclp.getXform().setPosition(754,611);
    trclp.getXform().setSize(122, 50);
    this.mObstacles.push(trclp);

    let trclpb = new Renderable(this.mConstColorShader);
    trclpb.setColor([0.0, 0.0, 0.0, 1.0]);
    trclpb.getXform().setPosition(754,611);
    trclpb.getXform().setSize(102, 30);
    this.mObstacles.push(trclpb);

    //////////////// TOP MIDDLE RECTANGLE /////////////////
    let tmr = new Renderable(this.mConstColorShader);
    tmr.setColor([0.0, 0.0, 0.6, 1.0]);
    tmr.getXform().setPosition(640,630);
    tmr.getXform().setSize(34, 89);
    this.mObstacles.push(tmr);

    let tmrb = new Renderable(this.mConstColorShader);
    tmrb.setColor([0.0, 0.0, 0.0, 1.0]);
    tmrb.getXform().setPosition(640,636);
    tmrb.getXform().setSize(14, 79);
    this.mObstacles.push(tmrb);

    //////////////////////////// TOP LEFT T TOP ///////////////
    let tltt = new Renderable(this.mConstColorShader);
    tltt.setColor([0.0, 0.0, 0.6, 1.0]);
    tltt.getXform().setPosition(478,486.5);
    tltt.getXform().setSize(25, 127);
    this.mObstacles.push(tltt);

    let tlttb = new Renderable(this.mConstColorShader);
    tlttb.setColor([0.0, 0.0, 0.0, 1.0]);
    tlttb.getXform().setPosition(478,486.5);
    tlttb.getXform().setSize(10, 110);
    this.mObstacles.push(tlttb);

    //////////////////////////// TOP LEFT T BOTTOM ///////////////
    let tltb = new Renderable(this.mConstColorShader);
    tltb.setColor([0.0, 0.0, 0.6, 1.0]);
    tltb.getXform().setPosition(536,477);
    tltb.getXform().setSize(100, 20);
    this.mObstacles.push(tltb);

    let tltbb = new Renderable(this.mConstColorShader);
    tltbb.setColor([0.0, 0.0, 0.0, 1.0]);
    tltbb.getXform().setPosition(530,477);
    tltbb.getXform().setSize(100, 8);
    this.mObstacles.push(tltbb);

    //////////////////////////// TOP RIGHT T TOP ///////////////
    let trtt = new Renderable(this.mConstColorShader);
    trtt.setColor([0.0, 0.0, 0.6, 1.0]);
    trtt.getXform().setPosition(803,486.5);
    trtt.getXform().setSize(25, 127);
    this.mObstacles.push(trtt);

    let trttb = new Renderable(this.mConstColorShader);
    trttb.setColor([0.0, 0.0, 0.0, 1.0]);
    trttb.getXform().setPosition(803,486.5);
    trttb.getXform().setSize(10, 110);
    this.mObstacles.push(trttb);

    //////////////////////////// TOP RIGHT T BOTTOM ///////////////
    let trtb = new Renderable(this.mConstColorShader);
    trtb.setColor([0.0, 0.0, 0.6, 1.0]);
    trtb.getXform().setPosition(743,477);
    trtb.getXform().setSize(100, 20);
    this.mObstacles.push(trtb);

    let trtbb = new Renderable(this.mConstColorShader);
    trtbb.setColor([0.0, 0.0, 0.0, 1.0]);
    trtbb.getXform().setPosition(750,477);
    trtbb.getXform().setSize(100, 8);
    this.mObstacles.push(trtbb);

    //////////////////////////// TOP MIDDLE T TOP ///////////////
    let tmtt = new Renderable(this.mConstColorShader);
    tmtt.setColor([0.0, 0.0, 0.6, 1.0]);
    tmtt.getXform().setPosition(640.5,536);
    tmtt.getXform().setSize(229, 26);
    this.mObstacles.push(tmtt);

    let tmttb = new Renderable(this.mConstColorShader);
    tmttb.setColor([0.0, 0.0, 0.0, 1.0]);
    tmttb.getXform().setPosition(640.5,536);
    tmttb.getXform().setSize(209, 10);
    this.mObstacles.push(tmttb);

    ////////////////////////////// TOP MIDDLE T BOTTOM //////////////////
    let tmtb = new Renderable(this.mConstColorShader);
    tmtb.setColor([0.0, 0.0, 0.6, 1.0]);
    tmtb.getXform().setPosition(640,497);
    tmtb.getXform().setSize(35, 60);
    this.mObstacles.push(tmtb);

    let tmtbb = new Renderable(this.mConstColorShader);
    tmtbb.setColor([0.0, 0.0, 0.0, 1.0]);
    tmtbb.getXform().setPosition(640,505);
    tmtbb.getXform().setSize(15, 60);
    this.mObstacles.push(tmtbb);

    /////////////////////////// MIDDLE LEFT RECTANGLE /////////////
    let mlr = new Renderable(this.mConstColorShader);
    mlr.setColor([0.0, 0.0, 0.6, 1.0]);
    mlr.getXform().setPosition(478,355);
    mlr.getXform().setSize(25, 64);
    this.mObstacles.push(mlr);

    let mlrb = new Renderable(this.mConstColorShader);
    mlrb.setColor([0.0, 0.0, 0.0, 1.0]);
    mlrb.getXform().setPosition(478,355);
    mlrb.getXform().setSize(10, 47);
    this.mObstacles.push(mlrb);

    /////////////////////////// MIDDLE RIGHT RECTANGLE /////////////
    let mrr = new Renderable(this.mConstColorShader);
    mrr.setColor([0.0, 0.0, 0.6, 1.0]);
    mrr.getXform().setPosition(803,355);
    mrr.getXform().setSize(25, 64);
    this.mObstacles.push(mrr);

    let mrrb = new Renderable(this.mConstColorShader);
    mrrb.setColor([0.0, 0.0, 0.0, 1.0]);
    mrrb.getXform().setPosition(803,355);
    mrrb.getXform().setSize(10, 47);
    this.mObstacles.push(mrrb);

    //////////////////////////// BOTTOM MIDDLE MIDDLE T TOP ///////////////
    let bmmtt = new Renderable(this.mConstColorShader);
    bmmtt.setColor([0.0, 0.0, 0.6, 1.0]);
    bmmtt.getXform().setPosition(640.5,330);
    bmmtt.getXform().setSize(229, 15);
    this.mObstacles.push(bmmtt);

    let bmmttb = new Renderable(this.mConstColorShader);
    bmmttb.setColor([0.0, 0.0, 0.0, 1.0]);
    bmmttb.getXform().setPosition(640.5,330);
    bmmttb.getXform().setSize(212, 5);
    this.mObstacles.push(bmmttb);

    ////////////////////////////// BOTTOM MIDDLE MIDDLE T BOTTOM //////////////////
    let bmmtb = new Renderable(this.mConstColorShader);
    bmmtb.setColor([0.0, 0.0, 0.6, 1.0]);
    bmmtb.getXform().setPosition(640,290);
    bmmtb.getXform().setSize(35, 66);
    this.mObstacles.push(bmmtb);

    let bmmtbb = new Renderable(this.mConstColorShader);
    bmmtbb.setColor([0.0, 0.0, 0.0, 1.0]);
    bmmtbb.getXform().setPosition(640,297);
    bmmtbb.getXform().setSize(15, 65);
    this.mObstacles.push(bmmtbb);

    //////////////////////////// BOTTOM LEFT HORIZONTAL RECTANGLE ///////////////
    let blhr = new Renderable(this.mConstColorShader);
    blhr.setColor([0.0, 0.0, 0.6, 1.0]);
    blhr.getXform().setPosition(526.5,273);
    blhr.getXform().setSize(121, 29);
    this.mObstacles.push(blhr);

    let blhrb = new Renderable(this.mConstColorShader);
    blhrb.setColor([0.0, 0.0, 0.0, 1.0]);
    blhrb.getXform().setPosition(526.5,273);
    blhrb.getXform().setSize(101, 13);
    this.mObstacles.push(blhrb);


    //////////////////////////// BOTTOM RIGHT HORIZONTAL RECTANGLE ///////////////
    let brhr = new Renderable(this.mConstColorShader);
    brhr.setColor([0.0, 0.0, 0.6, 1.0]);
    brhr.getXform().setPosition(755,273);
    brhr.getXform().setSize(121, 29);
    this.mObstacles.push(brhr);

    let brhrb = new Renderable(this.mConstColorShader);
    brhrb.setColor([0.0, 0.0, 0.0, 1.0]);
    brhrb.getXform().setPosition(755,273);
    brhrb.getXform().setSize(101, 13);
    this.mObstacles.push(brhrb);


    /////////////////////// BOTTOM LEFT L SIDE /////////////
    let blls = new Renderable(this.mConstColorShader);
    blls.setColor([0.0, 0.0, 0.6, 1.0]);
    blls.getXform().setPosition(417.5,240);
    blls.getXform().setSize(25, 90);
    this.mObstacles.push(blls);

    let bllsb = new Renderable(this.mConstColorShader);
    bllsb.setColor([0.0, 0.0, 0.0, 1.0]);
    bllsb.getXform().setPosition(417.5,240);
    bllsb.getXform().setSize(11, 75);
    this.mObstacles.push(bllsb);

    //////////////////////////// BOTTOM LEFT L BOTTOM ///////////////
    let bllb = new Renderable(this.mConstColorShader);
    bllb.setColor([0.0, 0.0, 0.6, 1.0]);
    bllb.getXform().setPosition(379,273);
    bllb.getXform().setSize(102, 29);
    this.mObstacles.push(bllb);

    let bllbb = new Renderable(this.mConstColorShader);
    bllbb.setColor([0.0, 0.0, 0.0, 1.0]);
    bllbb.getXform().setPosition(379,273);
    bllbb.getXform().setSize(85, 13);
    this.mObstacles.push(bllbb);

    let bllbbgap = new Renderable(this.mConstColorShader);
    bllbbgap.setColor([0.0, 0.0, 0.0, 1.0]);
    bllbbgap.getXform().setPosition(417.5,259.5);
    bllbbgap.getXform().setSize(11, 40);
    this.mObstacles.push(bllbbgap);


    /////////////////////// BOTTOM RIGHT L SIDE /////////////
    let brls = new Renderable(this.mConstColorShader);
    brls.setColor([0.0, 0.0, 0.6, 1.0]);
    brls.getXform().setPosition(864,240);
    brls.getXform().setSize(25, 90);
    this.mObstacles.push(brls);

    let brlsb = new Renderable(this.mConstColorShader);
    brlsb.setColor([0.0, 0.0, 0.0, 1.0]);
    brlsb.getXform().setPosition(864,240);
    brlsb.getXform().setSize(11, 75);
    this.mObstacles.push(brlsb);

    //////////////////////////// BOTTOM RIGHT L BOTTOM ///////////////
    let brlb = new Renderable(this.mConstColorShader);
    brlb.setColor([0.0, 0.0, 0.6, 1.0]);
    brlb.getXform().setPosition(902,273);
    brlb.getXform().setSize(100, 29);
    this.mObstacles.push(brlb);

    let brlbb = new Renderable(this.mConstColorShader);
    brlbb.setColor([0.0, 0.0, 0.0, 1.0]);
    brlbb.getXform().setPosition(902,273);
    brlbb.getXform().setSize(85, 13);
    this.mObstacles.push(brlbb);

    let brlbbgap = new Renderable(this.mConstColorShader);
    brlbbgap.setColor([0.0, 0.0, 0.0, 1.0]);
    brlbbgap.getXform().setPosition(864,264.5);
    brlbbgap.getXform().setSize(11, 30);
    this.mObstacles.push(brlbbgap);



    ///////////////////// BOTTOM LEFT BORDER HORIZONTAL RECTANGLE ///////////////
    let blbhr = new Renderable(this.mConstColorShader);
    blbhr.setColor([0.0, 0.0, 0.6, 1.0]);
    blbhr.getXform().setPosition(330,210);
    blbhr.getXform().setSize(80, 29);
    this.mObstacles.push(blbhr);

    let blbhrb = new Renderable(this.mConstColorShader);
    blbhrb.setColor([0.0, 0.0, 0.0, 1.0]);
    blbhrb.getXform().setPosition(327,210);
    blbhrb.getXform().setSize(70, 13);
    this.mObstacles.push(blbhrb);

    ///////////////////// BOTTOM RIGHT BORDER HORIZONTAL RECTANGLE ///////////////
    let brbhr = new Renderable(this.mConstColorShader);
    brbhr.setColor([0.0, 0.0, 0.6, 1.0]);
    brbhr.getXform().setPosition(953                                          ,210);
    brbhr.getXform().setSize(80, 29);
    this.mObstacles.push(brbhr);

    let brbhrb = new Renderable(this.mConstColorShader);
    brbhrb.setColor([0.0, 0.0, 0.0, 1.0]);
    brbhrb.getXform().setPosition(955                                          ,210);
    brbhrb.getXform().setSize(70, 13);
    this.mObstacles.push(brbhrb);


    ///////////////////// BOTTOM LEFT T HEAD  //////////////////////////
    let blth = new Renderable(this.mConstColorShader);
    blth.setColor([0.0, 0.0, 0.6, 1.0]);
    blth.getXform().setPosition(457,141);
    blth.getXform().setSize(258, 35);
    this.mObstacles.push(blth);

    let blthb = new Renderable(this.mConstColorShader);
    blthb.setColor([0.0, 0.0, 0.0, 1.0]);
    blthb.getXform().setPosition(457,141);
    blthb.getXform().setSize(238, 15);
    this.mObstacles.push(blthb);

    /////////////////////////// BOTTOM LEFT T TAIL /////////////
    let bltt = new Renderable(this.mConstColorShader);
    bltt.setColor([0.0, 0.0, 0.6, 1.0]);
    bltt.getXform().setPosition(478,191);
    bltt.getXform().setSize(25, 66);
    this.mObstacles.push(bltt);

    let blttb = new Renderable(this.mConstColorShader);
    blttb.setColor([0.0, 0.0, 0.0, 1.0]);
    blttb.getXform().setPosition(478,183);
    blttb.getXform().setSize(10, 70);
    this.mObstacles.push(blttb);



    ///////////////////// BOTTOM RIGHT T HEAD  //////////////////////////
    let brth = new Renderable(this.mConstColorShader);
    brth.setColor([0.0, 0.0, 0.6, 1.0]);
    brth.getXform().setPosition(823,141);
    brth.getXform().setSize(257, 35);
    this.mObstacles.push(brth);

    let brthb = new Renderable(this.mConstColorShader);
    brthb.setColor([0.0, 0.0, 0.0, 1.0]);
    brthb.getXform().setPosition(823,141);
    brthb.getXform().setSize(236, 15);
    this.mObstacles.push(brthb);


    /////////////////////////// BOTTOM RIGHT T TAIL /////////////
    let brtt = new Renderable(this.mConstColorShader);
    brtt.setColor([0.0, 0.0, 0.6, 1.0]);
    brtt.getXform().setPosition(803,191);
    brtt.getXform().setSize(25, 66);
    this.mObstacles.push(brtt);

    let brttb = new Renderable(this.mConstColorShader);
    brttb.setColor([0.0, 0.0, 0.0, 1.0]);
    brttb.getXform().setPosition(803,183);
    brttb.getXform().setSize(10, 70);
    this.mObstacles.push(brttb);

    //////////////////////////// BOTTOM  MIDDLE T TOP ///////////////
    let bmtt = new Renderable(this.mConstColorShader);
    bmtt.setColor([0.0, 0.0, 0.6, 1.0]);
    bmtt.getXform().setPosition(640.5,210);
    bmtt.getXform().setSize(229, 28);
    this.mObstacles.push(bmtt);

    let bmttb = new Renderable(this.mConstColorShader);
    bmttb.setColor([0.0, 0.0, 0.0, 1.0]);
    bmttb.getXform().setPosition(640.5,210);
    bmttb.getXform().setSize(209, 12);
    this.mObstacles.push(bmttb);

    ////////////////////////////// BOTTOM  MIDDLE T BOTTOM //////////////////
    let bmtb = new Renderable(this.mConstColorShader);
    bmtb.setColor([0.0, 0.0, 0.6, 1.0]);
    bmtb.getXform().setPosition(640,160);
    bmtb.getXform().setSize(35, 73);
    this.mObstacles.push(bmtb);

    let bmtbb = new Renderable(this.mConstColorShader);
    bmtbb.setColor([0.0, 0.0, 0.0, 1.0]);
    bmtbb.getXform().setPosition(640,170);
    bmtbb.getXform().setSize(15, 75);
    this.mObstacles.push(bmtbb);


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
    mtempMid.getXform().setPosition(655,415);
    mtempMid.getXform().setSize(135, 17);

    // this.mtempMid.draw(vpMatrix);
    this.mBorder.push(mtempMid)

  };


  const routeSize = 15;

  MyGame.prototype.checkPelletObstacleLoc = function(x,y) {
    for (let i = 0; i < this.mObstacles.length; i++) {
      const obstacleX = this.mObstacles[i].getXform().getXPos() + 5;
      const obstacleY = this.mObstacles[i].getXform().getYPos() ;
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
      const borderY = this.mBorder[i].getXform().getYPos() ;
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
    var yUpper = 650;
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

  this.mGhostBlinky = new AnimatedGhost(this.Blinky[0], this.Blinky[1], this.Blinky[2], this.Blinky[3],635, 560)
  this.mGhostFunky = new AnimatedGhost(this.Funky[0], this.Funky[1], this.Funky[2], this.Funky[3],595, 100)
  this.mGhostInky = new AnimatedGhost(this.Inky[0], this.Inky[1], this.Inky[2], this.Inky[3],715, 355)
  this.mGhostPinky = new AnimatedGhost(this.Pinky[0], this.Pinky[1], this.Pinky[2], this.Pinky[3],350, 550)

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

        // play the pellet eaten audio
        gEngine.AudioClips.playACue(this.kPelletChomp);

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

  MyGame.prototype.collisionGhost = function (mGhost)
  {
    const pacmanX = this.mAnimatedPacman.getXform().getXPos();
    const pacmanY = this.mAnimatedPacman.getXform().getYPos();

    this.tempGhost = mGhost;
    this.collide = false;

    var ghX = this.tempGhost.getXform().getXPos();
    var ghY = this.tempGhost.getXform().getYPos();

    if(
        (pacmanX+7.5)>(ghX-7.5) &&
        (pacmanY+7.5)>(ghY-7.5) &&
        (pacmanX-7.5)<(ghX+7.5) &&
        (pacmanY-7.5)<(ghY+7.5)
    ) {
      this.collide = true;

      // Delay the redirection to the game over screen
      setTimeout(() => {
        window.location.href = "../gameoverscreen.html";
      }, 700); // Adjust the delay time as needed (in milliseconds)
      pause;
    }
    return this.collide;

  }

  MyGame.prototype.checkCollisionWithGhost = function (){
    if(this.collisionGhost(this.mGhostBlinky)){
      return true;
    }
    if(this.collisionGhost(this.mGhostFunky)){
      return true;
    }
    if(this.collisionGhost(this.mGhostInky)){
      return true;
    }
    if(this.collisionGhost(this.mGhostPinky)){
      return true;
    }
    return false;
  }

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

  if(this.checkCollisionWithGhost()){
    this.mAnimatedPacman.getXform().setPosition(this.pacStartX, this.pacStartY);
    this.mGhostBlinky.getXform().setPosition(this.BlinkyStX, this.BlinkyStY);
    this.mGhostFunky.getXform().setPosition(this.FunkyStX, this.FunkyStY);
    this.mGhostInky.getXform().setPosition(this.InkyStX, this.InkyStY);
    this.mGhostPinky.getXform().setPosition(this.PinkyStX, this.PinkyStY);
  }


  if(this.mAnimatedPacman.getXform().getXPos()>(1000+10))
  {
    this.mAnimatedPacman.getXform().setXPos(280);
  }
  if(this.mAnimatedPacman.getXform().getXPos()<(280-10))
  {
    this.mAnimatedPacman.getXform().setXPos(1000);
  }

  this.originalX = this.mAnimatedPacman.getXform().getXPos();
  this.originalY = this.mAnimatedPacman.getXform().getYPos();


  this.mAnimatedPacman.update();
  this.mGhostBlinky.update(this.mBorder, this.mObstacles);
  this.mGhostPinky.update(this.mBorder, this.mObstacles);
  this.mGhostInky.update(this.mBorder, this.mObstacles);
  this.mGhostFunky.update(this.mBorder, this.mObstacles);

  if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Two)) {
    gEngine.GameLoop.stop();
  }

  if (this.totalScore === 3650)
  {
    gEngine.GameLoop.stop();
  }

};

MyGame.prototype._initText = function (font, posX, posY, color, textH) {
  font.setColor(color);
  font.getXform().setPosition(posX, posY);
  font.setTextHeight(textH);
};