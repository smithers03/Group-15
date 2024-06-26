/*
 * File: BlueLevel.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine: false, Scene: false, MyGame:false, SceneFileParser: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function BlueLevel() {
    // scene file name
    this.kSceneFile = "assets/BlueLevel.xml";

    // textures: (Note: jpg does not support transparency)
    this.kPortal = "assets/minion_portal.jpg";
    this.kCollector = "assets/pacMan.png";

    // all squares
    this.mSqSet = [];        // these are the Renderable objects

    // The camera to view the scene
    this.mCamera = null;
}
gEngine.Core.inheritPrototype(BlueLevel, Scene);

BlueLevel.prototype.loadScene = function () {
    // load the scene file
    gEngine.TextFileLoader.loadTextFile(this.kSceneFile, gEngine.TextFileLoader.eTextFileType.eXMLFile);

    // load the textures
    gEngine.Textures.loadTexture(this.kPortal);
    gEngine.Textures.loadTexture(this.kCollector);
};

BlueLevel.prototype.unloadScene = function () {
    // unload the scene flie and loaded resources
    gEngine.TextFileLoader.unloadTextFile(this.kSceneFile);
    gEngine.Textures.unloadTexture(this.kPortal);
    gEngine.Textures.unloadTexture(this.kCollector);

    var nextLevel = new MyGame();  // load the next level
    gEngine.Core.startScene(nextLevel);
};

BlueLevel.prototype.initialize = function () {
    var sceneParser = new SceneFileParser(this.kSceneFile);
    // Step A: Read in the camera
    this.mCamera = sceneParser.parseCamera();

    // Step B: Read all the squares and textureSquares
    sceneParser.parseSquares(this.mSqSet);
    sceneParser.parseTextureSquares(this.mSqSet);

};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
BlueLevel.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    // Step  B: Activate the drawing Camera
    this.mCamera.setupViewProjection();

    // Step  C: Draw all the squares
    var i;
    for (i = 0; i < this.mSqSet.length; i++) {
        this.mSqSet[i].draw(this.mCamera.getVPMatrix());
    }
};

// The update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
BlueLevel.prototype.update = function () {
    // For this very simple game, let's move the first square
    var xform = this.mSqSet[0].getXform();
    var deltaX = 0.05;

    /// Move right and swap over
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        xform.incXPos(deltaX);
        if (xform.getXPos() > 30) {  // this is the right-bound of the window
            xform.setPosition(12, 60);
        }
    }

    // Step A: test for white square movement
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
        xform.incXPos(-deltaX);
        if (xform.getXPos() < 11) { // this is the left-boundary
            gEngine.GameLoop.stop();
        }
    }

    // continously change texture tinting
    var c = this.mSqSet[1].getColor();
    var ca = c[3] + deltaX;
    if (ca > 1) {
        ca = 0;
    }
    c[3] = ca;
};