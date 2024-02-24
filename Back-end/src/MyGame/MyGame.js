"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {
  this.mWhiteSq = null;
  this.mRedSq = null;
  this.mCamera = null;
}

MyGame.prototype.initialize = function() {
  this.mCamera = new Camera(
      vec2.fromValues(20, 60),
      20,
      [20,40,600,300]
  );
  this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

  // creating renderable objects
  var constColorShader = gEngine.DefaultResources.getConstColorShader();

  this.mWhiteSq = new Renderable(constColorShader);
  this.mWhiteSq.setColor([1, 1, 1, 1]);
  this.mRedSq = new Renderable(constColorShader);
  this.mRedSq.setColor([1, 0, 0, 1]);

  this.mWhiteSq.getXform().setPosition(20,60);
  this.mWhiteSq.getXform().setRotationInRad(0.2);
  this.mWhiteSq.getXform().setSize(5,5);

  this.mRedSq.getXform().setPosition(20,60);
  this.mRedSq.getXform().setSize(2,2);

  // Launch the game loop
  gEngine.GameLoop.start(this);
}

MyGame.prototype.update = function(){
  var whiteXform = this.mWhiteSq.getXform();
  var deltaX = 0.05;

  if(gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)){
    if(whiteXform.getXPos()> 30) // right bounf of the border
      whiteXform.setPosition(10,60);
    whiteXform.incXPos(deltaX);
  }
  if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Up))
    whiteXform.incRotationByDegree(1);

  var redXform = this.mRedSq.getXform();
  if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)) {
    if (redXform.getWidth() > 5)
      redXform.setSize(2, 2);
    redXform.incSizeBy(0.05);
  }
}

MyGame.prototype.draw = function(){
  gEngine.Core.clearCanvas([0.9, 0.9,0.3,1.0]);
  this.mCamera.setupViewProjection();
  this.mWhiteSq.draw(this.mCamera.getVPMatrix());
  this.mRedSq.draw(this.mCamera.getVPMatrix());
}
