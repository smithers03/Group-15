"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {
  // scene file
  this.kSceneFile = "assets/scene.xml";

  // all squares
    this.mSqSet = [];        // these are the Renderable objects

  // The camera to view the scene
  this.mCamera = null;
}

MyGame.prototype.loadScene = function() {
  gEngine.TextFileLoader.loadTextFile(this.kSceneFile,
      gEngine.TextFileLoader.eTextFileType.eXMLFile);
};

MyGame.prototype.unloadScene = function () {
  gEngine.TextFileLoader.unloadTextFile(this.kSceneFile);
};

MyGame.prototype.initialize = function() {
  var sceneParser = new SceneFileParser(this.kSceneFile);

    // Step A: Parse the camera
  this.mCamera = sceneParser.parseCamera();

    // Step B: Parse for all the squares
  sceneParser.parseSquares(this.mSqSet);
};


MyGame.prototype.draw = function(){
  gEngine.Core.clearCanvas([0.9, 0.9,0.3,1.0]);
  //activate drawing camera
  this.mCamera.setupViewProjection();

    // drawing  all the squares
  var i;
    for (i = 0; i < this.mSqSet.length; i++) {
    this.mSqSet[i].draw(this.mCamera.getVPMatrix());
  }
};


MyGame.prototype.update = function(){
  var xform = this.mSqSet[0].getXform();
  var deltaX = 0.05;

  if(gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)){
    if(xform.getXPos() > 30) // right boundh of the border
      xform.setPosition(10,60);
    xform.incXPos(deltaX);
  }
  if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Up)) {
    xform.incRotationByDegree(1);
  }

  xform = this.mSqSet[1].getXform();
  if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)) {
    if (xform.getWidth() > 5)
      xform.setSize(2, 2);
    xform.incSizeBy(0.05);
  }
};

