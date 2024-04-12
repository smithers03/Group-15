/*
 * File: Engine_Test.js
 * This tests our game engine.
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, DyePack, Hero, Minion, Brain,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Engine_Test() {
    this.missingAsset = false;
    this.numTestsPassed = 0;

  this.mAssets = [];

  //Check assets
  this.mAssets.push("assets/fonts/system-default-font");
  this.mAssets.push("assets/allPacman.png");
  this.mAssets.push("assets/allPacManFlipped.png");

  //Check ghost assets
  this.mAssets.push("assets/assets-ghosts/blinky_UP.png");
  this.mAssets.push("assets/assets-ghosts/blinky_DOWN.png");
  this.mAssets.push("assets/assets-ghosts/blinky_LEFT.png");
  this.mAssets.push("assets/assets-ghosts/blinky_RIGHT.png");
  this.mAssets.push("assets/assets-ghosts/funky_UP.png");
  this.mAssets.push("assets/assets-ghosts/funky_DOWN.png");
  this.mAssets.push("assets/assets-ghosts/funky_LEFT.png");
  this.mAssets.push("assets/assets-ghosts/funky_RIGHT.png");
  this.mAssets.push("assets/assets-ghosts/inky_UP.png");
  this.mAssets.push("assets/assets-ghosts/inky_DOWN.png");
  this.mAssets.push("assets/assets-ghosts/inky_LEFT.png");
  this.mAssets.push("assets/assets-ghosts/inky_RIGHT.png");
  this.mAssets.push("assets/assets-ghosts/pinky_UP.png");
  this.mAssets.push("assets/assets-ghosts/pinky_DOWN.png");
  this.mAssets.push("assets/assets-ghosts/pinky_LEFT.png");
  this.mAssets.push("assets/assets-ghosts/pinky_RIGHT.png");

  //Check audio assets
    this.kBgClip = "assets/audios/BGClip.mp3";
    this.mAssets.push("");
    this.kCue = "assets/audios/MyGame_cue.wav";
    this.mAssets.push("");
    this.kPelletChomp = "assets/audios/Pacman_chomp1.wav";
    this.mAssets.push("");
    this.kPacmanDeath = "assets/audios/Pacman_death.wav";
    this.mAssets.push("");
    this.kEatFruit = "assets/audios/Pacman_eatfruit.wav";
    this.mAssets.push("");
    this.kEatGhost = "assets/audios/Pacman_eatghost.wav";
    this.mAssets.push("");
    this.kPacmanOpening = "assets/audios/pacman_beginning.wav";
    this.mAssets.push("");
    this.kCredits = "assets/audios/into.wav";
    this.mAssets.push("");
    this.kBing = "assets/audios/BlueLevel_cue.wav";
    this.mAssets.push("");
    this.kBackground = "assets/audios/backgroundMusic.wav";
    this.mAssets.push("");

    //Find each asset
    for (let i=0; i<this.mAssets.length; i++) {
        fetch(this.mAssets[i])
            .then(response => {if (!response.ok) this.missingAsset = true})
    }

    this.mCamera = null;
}
//Test Engine Core
gEngine.Core.inheritPrototype(Engine_Test, Scene);

//Check that the engine can load scenes, textures & audios
Engine_Test.prototype.loadScene = function () {
  gEngine.Fonts.loadFont(this.mAssets[0]);
  gEngine.Textures.loadTexture(this.mAssets[1]);
  gEngine.Textures.loadTexture(this.mAssets[2]);
  for (let i = 2; i < 6; i++) {
    gEngine.Textures.loadTexture(this.mAssets[i]);
  }
  for (let i = 6; i < 10; i++) {
    gEngine.Textures.loadTexture(this.mAssets[i]);
  }
  for (let i = 10; i < 14; i++) {
    gEngine.Textures.loadTexture(this.mAssets[i]);
  }
  for (let i = 14; i < 18; i++) {
    gEngine.Textures.loadTexture(this.mAssets[i]);
  }
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

//Unloads Scene and starts level 1
Engine_Test.prototype.unloadScene = function () {
  gEngine.Fonts.unloadFont(this.mAssets[0]);
  gEngine.Textures.unloadTexture(this.mAssets[1]);
  gEngine.Textures.unloadTexture(this.mAssets[2]);
    for (let i = 2; i < 6; i++) {
        gEngine.Textures.unloadTexture(this.mAssets[i]);
    }
    for (let i = 6; i < 10; i++) {
        gEngine.Textures.unloadTexture(this.mAssets[i]);
    }
    for (let i = 10; i < 14; i++) {
        gEngine.Textures.unloadTexture(this.mAssets[i]);
    }
    for (let i = 14; i < 18; i++) {
        gEngine.Textures.unloadTexture(this.mAssets[i]);
    }
  var nextLevel = new MyGame();  // next level to be loaded
  gEngine.Core.startScene(nextLevel);
};

//Individual tests
Engine_Test.prototype.initialize = function () {

    //Tests all Camera components
    Engine_Test.prototype.testCamera = function () {
        let cameraWorks = false;
        this.mCamera = new Camera(
            vec2.fromValues(640, 360),   // center of the WC
            720,                        // width of WC
            [280, 0, 720, 720]         // viewport (orgX, orgY, width, height)
        );
        if (this.mCamera != null && this.mCamera.getWCCenter() != null) {
            cameraWorks = true;
            this.mCamera.setBackgroundColor([0, 0, 0, 1]);
        }
        return cameraWorks;
    }

    //Checks for right glsl files
    Engine_Test.prototype.testShader = function () {
        let shaderWorks = true;
        fetch("src/GLSLShaders/SimpleVS.glsl")
            .then(response => {if (!response.ok) shaderWorks = false})
        fetch("src/GLSLShaders/SimpleFS.glsl")
            .then(response => {if (!response.ok) shaderWorks = false})
        this.mConstColorShader = new SimpleShader(
            "src/GLSLShaders/SimpleVS.glsl",      // Path to the VertexShader
            "src/GLSLShaders/SimpleFS.glsl");    // Path to the simple FragmentShader
        return shaderWorks;
    }

     //Tests Renderables, Transform and Shader
     Engine_Test.prototype.testObject = function () {
         let obstacleWorks = false;
         let tmp = new Renderable(this.mConstColorShader);
         tmp.setColor([0.0, 0.0, 0.6, 1.0]);
         tmp.getXform().setPosition(378, 611);
         tmp.getXform().setSize(100, 50);
         if (tmp.getColor() != null && tmp.getXform() != null) obstacleWorks = true;
         return obstacleWorks;
     }

     //Tests Fonts, Sprites and Textures
     Engine_Test.prototype.testText = function () {
        let textWorks = false;
        this.mTextTest = new FontRenderable("Test");
        this.mTextTest.setFont(this.mAssets[0]);
        this._initText(this.mTextTest, 800, 55, [1, 1, 1, 1], 36);
         if (this. mTextTest.getColor() != null && this.mTextTest.getXform() != null) textWorks = true;
         return textWorks;
    };

    if (this.missingAsset == true) {
        console.log("-Assets Present");
        this.numTestsPassed = this.numTestsPassed + 1;
    }
    else console.error("Assets Missing");
    if (this.testCamera() == true) {
        console.log("-Camera Passed");
        this.numTestsPassed = this.numTestsPassed + 1;
    }
    else console.error("Camera Failed");
    if (this.testShader() == true) {
        console.log("-Shader Passed");
        this.numTestsPassed = this.numTestsPassed + 1;
    }
    else console.error("Shader Failed");
    if (this.testObject() == true) {
        console.log("-Objects Passed");
        this.numTestsPassed = this.numTestsPassed + 1;
    }
    else console.error("Objects Failed");
    if (this.testText() == true) {
        console.log("-Text Passed");
        this.numTestsPassed = this.numTestsPassed + 1;
    }
    else console.error("Text Failed");

};

//Checks that all tests completed
Engine_Test.prototype.update = function () {
    if (this.numTestsPassed ==  5) {
        console.log("--5/5 Tests Passed\n" + "Starting Game");
        gEngine.GameLoop.stop();
    }
    else console.log("-" + this.numTestsPassed + "/5 Tests Passed\n" + "Suspending Game");
}

//For text initialization
Engine_Test.prototype._initText = function (font, posX, posY, color, textH) {
  font.setColor(color);
  font.getXform().setPosition(posX, posY);
  font.setTextHeight(textH);
};
