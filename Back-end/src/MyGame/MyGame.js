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

  this.kMovingPacman = "assets/allPacman.png";
  this.kMovingPacmanRight = "assets/allPacManFlipped.png";
  this.kBg = "assets/bg.png";

  // The camera to view the scene
  this.mCamera = null;
  this.mBg = null;

  this.mMsg = null;

  // the hero and the support objects

  this.mAnimatedPacman = null; // The animated Pac-Man object

  this.mChoice = 'D';
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {

  gEngine.Textures.loadTexture(this.kMovingPacman);
  gEngine.Textures.loadTexture(this.kMovingPacmanRight);
  gEngine.Textures.loadTexture(this.kBg);
};

MyGame.prototype.unloadScene = function () {

  gEngine.Textures.unloadTexture(this.kMovingPacman);
  gEngine.Textures.unloadTexture(this.kMovingPacmanRight);
  gEngine.Textures.unloadTexture(this.kBg);
};

MyGame.prototype.initialize = function () {
  // Step A: set up the cameras
  this.mCamera = new Camera(
      vec2.fromValues(50, 37.5),   // position of the camera
      100,                       // width of camera
      [0, 0, 640, 480]           // viewport (orgX, orgY, width, height)
  );
  this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
  // sets the background to gray

  // Large background image
  var bgR = new SpriteRenderable(this.kBg);
  bgR.setElementPixelPositions(0, 1024, 0, 1024);
  bgR.getXform().setSize(150, 150);
  bgR.getXform().setPosition(50, 35);
  this.mBg = new GameObject(bgR);


  // Objects in the scene
  this.mAnimatedPacman = new AnimatedPacman(this.kMovingPacman, this.kMovingPacmanRight, 50, 60);

};

// This is the draw function, make sure to set-up proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
  // Step A: clear the canvas
  gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

  // Step  B: Activate the drawing Camera
  this.mCamera.setupViewProjection();

  // Step  C: Draw everything
  this.mBg.draw(this.mCamera);
  this.mAnimatedPacman.draw(this.mCamera);

};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {

  this.mCamera.update();  // for smoother camera movements
  this.mAnimatedPacman.update();

};