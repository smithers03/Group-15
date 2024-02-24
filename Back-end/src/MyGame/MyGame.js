"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {
  // scene file
  this.kSceneFile = "assets/scene.xml";

  // all squares
  this.mSqSet = new Array();

  // The camera to view the scene
  this.mCamera = null;
}

MyGame.prototype.loadScene = function() {
  gEngine.TextFileLoader.loadTextFile(this.kSceneFile,
      gEngine.TextFileLoader.eTextFileType.eXMLFile);
}

MyGame.prototype.unloadScene = function () {
  gEngine.TextFileLoader.unloadTextFile(this.kSceneFile);
};

MyGame.prototype.initialize = function() {
  var sceneParser = new SceneFileParser(this.kSceneFile);

  // Step A
  this.mCamera = sceneParser.parseCamera();

  // Step B
  sceneParser.parseSquares(this.mSqSet)
}


MyGame.prototype.update = function(){
  var whiteXform = this.mSqSet[0].getXform();
  var deltaX = 0.05;

  if(gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)){
    if(whiteXform.getXPos()> 30) // right bounf of the border
      whiteXform.setPosition(10,60);
    whiteXform.incXPos(deltaX);
  }
  if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Up))
    whiteXform.incRotationByDegree(1);

  var redXform = this.mSqSet[1].getXform();
  if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)) {
    if (redXform.getWidth() > 5)
      redXform.setSize(2, 2);
    redXform.incSizeBy(0.05);
  }
}

MyGame.prototype.draw = function(){
  gEngine.Core.clearCanvas([0.9, 0.9,0.3,1.0]);
  //activate drawing camera
  this.mCamera.setupViewProjection();

  for(let i = 0; i < this.kSceneFile; i++){
    this.mSqSet[i].draw(this.mCamera.getVPMatrix());
  }

}
