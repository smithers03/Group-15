"use strict"


function BlueLevel(){
    // scene file name
    this.kSceneFile = "assets/BlueLevel.xml";
    // all squares
    this.mSqSet = [];
    // camera to view the scene
    this.mCamera = null;
}

gEngine.Core.inheritPrototype(BlueLevel, Scene);

BlueLevel.prototype.loadScene = function(){
    gEngine.TextFileLoader.loadTextFile(this.kSceneFile,
        gEngine.TextFileLoader.eTextFileType.eXMLFile);
}
BlueLevel.prototype.initialize = function() {
    var sceneParser = new SceneFileParser(this.kSceneFile);

    // Step A: Parse the camera
    this.mCamera = sceneParser.parseCamera();

    // Step B: Parse for all the squares
    sceneParser.parseSquares(this.mSqSet);
}

BlueLevel.prototype.draw = function(){
    gEngine.Core.clearCanvas([0.9, 0.9,0.3,1.0]);
    //activate drawing camera
    this.mCamera.setupViewProjection();

    // drawing  all the squares
    var i;
    for (i = 0; i < this.mSqSet.length; i++) {
        this.mSqSet[i].draw(this.mCamera.getVPMatrix());
    }
};

BlueLevel.prototype.update = function() {
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

    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)){
        xform.incXPos(-deltaX);
        if(xform.getXPos() < 11) { // transition to the next level condition
            gEngine.GameLoop.stop();
        }
    }
}
BlueLevel.prototype.unloadScene = function () {
    gEngine.TextFileLoader.unloadTextFile(this.kSceneFile); // unloads current scene

    var nextLevel = new MyGame(); // creates next level
    gEngine.Core.startScene(nextLevel); // start scene of the next level
}