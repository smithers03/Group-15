/*
 * File: MyGame2.js
 * This is the logic of our game.
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, DyePack, Hero, Minion, Brain,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame2() {
    // Array to store border
    this.mBorder = [];
    // Array to store border
    this.mObstacles = [];
    // Array to store pellets
    this.mPellets = [];
    this.mSprites = [];
    this.lives = 3;

    this.pacStartX = 450;
    this.pacStartY = 575;
    this.BlinkyStX = 635;
    this.BlinkyStY = 530;
    this.InkyStX = 715;
    this.InkyStY = 355;
    this.PinkyStX = 450;
    this.PinkyStY = 520;
    this.FunkyStX = 595;
    this.FunkyStY = 100;

    this.originalX = 450;
    this.originalY = 575;

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
    this.kCredits = "assets/audios/into.mp3";
    this.kBing = "assets/audios/BlueLevel_cue.wav";

    this.mAnimatedPacman = null; // The animated Pac-Man object

    this.mCamera = null;
}
gEngine.Core.inheritPrototype(MyGame2, Scene);

MyGame2.prototype.loadScene = function () {
    //gEngine.Fonts.loadFont(this.kFont);
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
};

MyGame2.prototype.unloadScene = function () {
    //gEngine.Fonts.unloadFont(this.kFont);
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
    var nextLevel = new MyGame3();  // next level to be loaded
    gEngine.Core.startScene(nextLevel);
};

MyGame2.prototype.initialize = function () {
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

    MyGame2.prototype.initializeBorders = function () {

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


        ////////////////////// TOP MAZE BORDER /////////////////////////

        var xBound = 280;
        var yUpper = 680;
        var yLower = 80;

        for (let i = 0; i <= 72; i++){
            let tb = new Renderable(this.mConstColorShader);
            tb.setColor([0.4, 0.7, 0.8, 1]);
            tb.getXform().setPosition(xBound, yUpper);
            tb.getXform().setSize(15, 15);


            this.mBorder.push(tb);

            let tbb = new Renderable(this.mConstColorShader);
            tbb.setColor([0.0, 0.0, 0.0, 1]);
            tbb.getXform().setPosition(xBound, yUpper);
            tbb.getXform().setSize(5, 5);

            this.mBorder.push(tbb);

            xBound += 10;
        }




        //////////////////// BOTTOM MAZE BORDER ///////////////////////

        var xBound = 280;
        var yUpper = 680;
        var yLower = 80;

        for (let i = 0; i <= 72; i++){
            let bb = new Renderable(this.mConstColorShader);
            bb.setColor([0.4, 0.7, 0.8, 1]);
            bb.getXform().setPosition(xBound, yLower);
            bb.getXform().setSize(15, 15);

            this.mBorder.push(bb);

            let bbb = new Renderable(this.mConstColorShader);
            bbb.setColor([0.0, 0.0, 0.0, 1]);
            bbb.getXform().setPosition(xBound, yLower);
            bbb.getXform().setSize(5, 5);

            this.mBorder.push(bbb);

            xBound += 10;
        }



/////////////////////////// BOTTOM RIGHT SIDE //////////////////////////////

        var xRight = 995;
        var yLower = 80;

        for (let i = 0; i <= 9; i++){
            let brb = new Renderable(this.mConstColorShader);
            brb.setColor([0.4, 0.7, 0.8, 1]);
            brb.getXform().setPosition(xRight, yLower);
            brb.getXform().setSize(15, 15);

            this.mBorder.push(brb);

            let brbb = new Renderable(this.mConstColorShader);
            brbb.setColor([0.0, 0.0, 0.0, 1]);
            brbb.getXform().setPosition(xRight, yLower);
            brbb.getXform().setSize(5, 5);

            this.mBorder.push(brbb);

            yLower += 10;
        }






        /////////////////////  BOTTOM LEFT SIDE //////////////////////////

        var xLeft = 285;
        var yLower = 80;

        for (let i = 0; i <= 9; i++){
            let blb = new Renderable(this.mConstColorShader);
            blb.setColor([0.4, 0.7, 0.8, 1]);
            blb.getXform().setPosition(xLeft, yLower);
            blb.getXform().setSize(15, 15);

            this.mBorder.push(blb);

            let blbb = new Renderable(this.mConstColorShader);
            blbb.setColor([0.0, 0.0, 0.0, 1]);
            blbb.getXform().setPosition(xLeft, yLower);
            blbb.getXform().setSize(5, 5);

            this.mBorder.push(blbb);

            yLower += 10;

        }




///////////////////////// TOP RIGHT SIDE ///////////////////////

        var xRight = 995;
        var yUpper = 620;

        for (let i = 0; i <= 29; i++){
            let trb = new Renderable(this.mConstColorShader);
            trb.setColor([0.4, 0.7, 0.8, 1]);
            trb.getXform().setPosition(xRight, yUpper);
            trb.getXform().setSize(15, 15);

            this.mBorder.push(trb);

            let trbb = new Renderable(this.mConstColorShader);
            trbb.setColor([0.0, 0.0, 0.0, 1]);
            trbb.getXform().setPosition(xRight, yUpper);
            trbb.getXform().setSize(5, 5);

            this.mBorder.push(trbb);

            yUpper -= 10;
        }




        ////////////////////// TOP LEFT SIDE ////////////////////

        var xLeft = 285;
        var yUpper = 620;

        for (let i = 0; i <= 29; i++){
            let tlb = new Renderable(this.mConstColorShader);
            tlb.setColor([0.4, 0.7, 0.8, 1]);
            tlb.getXform().setPosition(xLeft, yUpper);
            tlb.getXform().setSize(15, 15);

            this.mBorder.push(tlb);

            let tlbb = new Renderable(this.mConstColorShader);
            tlbb.setColor([0.0, 0.0, 0.0, 1]);
            tlbb.getXform().setPosition(xLeft, yUpper);
            tlbb.getXform().setSize(5, 5);

            this.mBorder.push(tlbb);

            yUpper -= 10;
        }





/////////////////MIDDLE BOX  LEFT AND RIGHT//////////////////////////

        var xRight = 768;
        var xLeft = 518;
        var yUpper = 430;

        for (let i = 0; i <= 4; i++){
            let mbl = new Renderable(this.mConstColorShader);
            mbl.setColor([0.4, 0.7, 0.8, 1]);
            mbl.getXform().setPosition(xLeft, yUpper);
            mbl.getXform().setSize(15, 15);

            let mbr = new Renderable(this.mConstColorShader);
            mbr.setColor([0.4, 0.7, 0.8, 1]);
            mbr.getXform().setPosition(xRight, yUpper);
            mbr.getXform().setSize(15, 15);

            this.mBorder.push(mbl);
            this.mBorder.push(mbr);

            let mblb = new Renderable(this.mConstColorShader);
            mblb.setColor([0.0, 0.0, 0.0, 1]);
            mblb.getXform().setPosition(xLeft, yUpper);
            mblb.getXform().setSize(5, 5);

            let mbrb = new Renderable(this.mConstColorShader);
            mbrb.setColor([0.0, 0.0, 0.0, 1]);
            mbrb.getXform().setPosition(xRight, yUpper);
            mbrb.getXform().setSize(5, 5);

            this.mBorder.push(mblb);
            this.mBorder.push(mbrb);

            yUpper -= 10;
        }




//////////////// MIDDLE BOX TOP LEFT AND BOTTOM  ///////////////////

        var yLower = 380;
        var xLeft = 518;
        var yUpper = 430;
        var xRight = 518;

        for (let i = 0; i <= 10; i++){
            let mbtl = new Renderable(this.mConstColorShader);
            mbtl.setColor([0.4, 0.7, 0.8, 1]);
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

        for (let i = 0; i <= 25; i++){

            let mbb = new Renderable(this.mConstColorShader);
            mbb.setColor([0.4, 0.7, 0.8, 1]);
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


        //////////////////////// MIDDLE BOX TOP RIGHT  /////////////
        var xLeft = 668;
        var yUpper = 430;

        for (let i = 0; i <= 10; i++){
            let mbtr = new Renderable(this.mConstColorShader);
            mbtr.setColor([0.4, 0.7, 0.8, 1]);
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




/////////////////// TOP LEFT EXIT //////////////////////////

        var xLeft = 300;
        var yUpper = 620;

        for (let i = 0; i <= 11; i++){
            let tleb = new Renderable(this.mConstColorShader);
            tleb.setColor([0.4, 0.7, 0.8, 1]);
            tleb.getXform().setPosition(xLeft, yUpper);
            tleb.getXform().setSize(15, 15);

            this.mBorder.push(tleb);

            let tlebb = new Renderable(this.mConstColorShader);
            tlebb.setColor([0.0, 0.0, 0.0, 1]);
            tlebb.getXform().setPosition(xLeft, yUpper);
            tlebb.getXform().setSize(5, 5);

            this.mBorder.push(tlebb);

            xLeft += 10;
        }





//////////////////// TOP RIGHT EXIT /////////////////////////////
        var xLeft = 872;
        var yUpper = 620;

        for (let i = 0; i <= 11; i++){
            let treb = new Renderable(this.mConstColorShader);
            treb.setColor([0.4, 0.7, 0.8, 1]);
            treb.getXform().setPosition(xLeft, yUpper);
            treb.getXform().setSize(15, 15);

            this.mBorder.push(treb);

            let trebb = new Renderable(this.mConstColorShader);
            trebb.setColor([0.0, 0.0, 0.0, 1]);
            trebb.getXform().setPosition(xLeft, yUpper);
            trebb.getXform().setSize(5, 5);

            this.mBorder.push(trebb);

            xLeft += 10;
        }



/////////////////////// TOP RIGHT VERTICLE RECTANGLE BORDER ////////////////
        var xRight = 200;
        var xLeft = 820;
        var yUpper = 665;

        for (let i = 0; i <= 5; i++){
            let trvb = new Renderable(this.mConstColorShader);
            trvb.setColor([0.4, 0.7, 0.8, 1]);
            trvb.getXform().setPosition(xLeft, yUpper);
            trvb.getXform().setSize(15, 15);

            this.mBorder.push(trvb);

            let trvbb = new Renderable(this.mConstColorShader);
            trvbb.setColor([0.0, 0.0, 0.0, 1]);
            trvbb.getXform().setPosition(xLeft, yUpper);
            trvbb.getXform().setSize(5, 5);

            this.mBorder.push(trvbb);

            yUpper -= 10;

        }





        //////////////////////  TOP LEFT VERTICLE RECTANGLE BORDER ////////////////

        var xRight = 200;
        var xLeft = 460;
        var yUpper = 668;

        for (let i = 0; i <= 5; i++){
            let tlvb = new Renderable(this.mConstColorShader);
            tlvb.setColor([0.4, 0.7, 0.8, 1]);
            tlvb.getXform().setPosition(xLeft, yUpper);
            tlvb.getXform().setSize(15, 15);

            this.mBorder.push(tlvb);

            let tlvbb = new Renderable(this.mConstColorShader);
            tlvbb.setColor([0.0, 0.0, 0.0, 1]);
            tlvbb.getXform().setPosition(xLeft, yUpper);
            tlvbb.getXform().setSize(5, 5);

            this.mBorder.push(tlvbb);

            yUpper -= 10;

        }







        ///////////// MIDDLE LEFT HORIZONTAL RECTANGLE BORDER ///////////////

        //Middle Left Rectangle//
        var yLower = 200;
        var xLeft = 300;
        var yUpper = 450;

        for (let i = 0; i <= 10; i++){
            let mlhb = new Renderable(this.mConstColorShader);
            mlhb.setColor([0.4, 0.7, 0.8, 1]);
            mlhb.getXform().setPosition(xLeft, yUpper);
            mlhb.getXform().setSize(15, 15);

            this.mBorder.push(mlhb);

            let mlhbb = new Renderable(this.mConstColorShader);
            mlhbb.setColor([0.0, 0.0, 0.0, 1]);
            mlhbb.getXform().setPosition(xLeft, yUpper);
            mlhbb.getXform().setSize(5, 5);

            this.mBorder.push(mlhbb);

            xLeft += 10;
        }





////////////////// MIDDLE RIGHT HORIZONTAL RECTANGLE BORDER //////////////////
//
        //Middle Right Rectangle
        var yLower = 380;
        var xLeft = 884;
        var yUpper = 450;

        for (let i = 0; i <= 10; i++){
            let mrhb = new Renderable(this.mConstColorShader);
            mrhb.setColor([0.4, 0.7, 0.8, 1]);
            mrhb.getXform().setPosition(xLeft, yUpper);
            mrhb.getXform().setSize(15, 15);

            this.mBorder.push(mrhb);

            let mrhbb = new Renderable(this.mConstColorShader);
            mrhbb.setColor([0.0, 0.0, 0.0, 1]);
            mrhbb.getXform().setPosition(xLeft, yUpper);
            mrhbb.getXform().setSize(5, 5);

            this.mBorder.push(mrhbb);

            xLeft += 10;
        }








        ///////////////////// RIGHT MIDDLE EXIT TOP RECTANGLE BRODER //////////////

        //Right Middle Exit Top Rectangle
        var yLower = 380;
        var xLeft = 940;
        var yUpper = 330;

        for (let i = 0; i <= 4; i++){
            let rmetb = new Renderable(this.mConstColorShader);
            rmetb.setColor([0.4, 0.7, 0.8, 1]);
            rmetb.getXform().setPosition(xLeft, yUpper);
            rmetb.getXform().setSize(15, 15);

            this.mBorder.push(rmetb);

            let rmetbb = new Renderable(this.mConstColorShader);
            rmetbb.setColor([0.0, 0.0, 0.0, 1]);
            rmetbb.getXform().setPosition(xLeft, yUpper);
            rmetbb.getXform().setSize(5, 5);

            this.mBorder.push(rmetbb);

            xLeft += 10;
        }







        ////////////////// RIGHT MIDDLE EXIT LEFT RECTANGLE BORDER ////////////////
//
        //Right Middle Exit Left Rectangle//
        var xRight = 200;
        var xLeft = 940;
        var yUpper = 315;

        for (let i = 0; i <= 7; i++){
            let rmelb = new Renderable(this.mConstColorShader);
            rmelb.setColor([0.4, 0.7, 0.8, 1]);
            rmelb.getXform().setPosition(xLeft, yUpper);
            rmelb.getXform().setSize(15, 15);

            this.mBorder.push(rmelb);

            let rmelbb = new Renderable(this.mConstColorShader);
            rmelbb.setColor([0.0, 0.0, 0.0, 1]);
            rmelbb.getXform().setPosition(xLeft, yUpper);
            rmelbb.getXform().setSize(5, 5);

            this.mBorder.push(rmelbb);

            yUpper -= 10;

        }





/////////////////// RIGHT MIDDLE EXIT BOTTOM RECTANGLE BORDER ///////////////
        var yLower = 380;
        var xLeft = 940;
        var yUpper = 235;

        for (let i = 0; i <= 6; i++){
            let rmebb = new Renderable(this.mConstColorShader);
            rmebb.setColor([0.4, 0.7, 0.8, 1]);
            rmebb.getXform().setPosition(xLeft, yUpper);
            rmebb.getXform().setSize(15, 15);

            this.mBorder.push(rmebb);

            let rmebbb = new Renderable(this.mConstColorShader);
            rmebbb.setColor([0.0, 0.0, 0.0, 1]);
            rmebbb.getXform().setPosition(xLeft, yUpper);
            rmebbb.getXform().setSize(5, 5);

            this.mBorder.push(rmebbb);

            xLeft += 10;
        }







        //////////////////// RIGHT BOTTOM EXIT RECTANGLE BORDER /////////////////

        var yLower = 380;
        var xLeft = 940;
        var yUpper = 185;

        for (let i = 0; i <= 6; i++){
            let rbeb = new Renderable(this.mConstColorShader);
            rbeb.setColor([0.4, 0.7, 0.8, 1]);
            rbeb.getXform().setPosition(xLeft, yUpper);
            rbeb.getXform().setSize(15, 15);

            this.mBorder.push(rbeb);

            let rbebb = new Renderable(this.mConstColorShader);
            rbebb.setColor([0.0, 0.0, 0.0, 1]);
            rbebb.getXform().setPosition(xLeft, yUpper);
            rbebb.getXform().setSize(5, 5);

            this.mBorder.push(rbebb);

            xLeft += 10;
        }







////////////////// LEFT MIDDLE EXIT TOP RECTANGLE BORDER ///////////////
        var yLower = 380;
        var xLeft = 300;
        var yUpper = 330;

        for (let i = 0; i <= 4; i++){
            let lmetb = new Renderable(this.mConstColorShader);
            lmetb.setColor([0.4, 0.7, 0.8, 1]);
            lmetb.getXform().setPosition(xLeft, yUpper);
            lmetb.getXform().setSize(15, 15);

            this.mBorder.push(lmetb);

            let lmetbb = new Renderable(this.mConstColorShader);
            lmetbb.setColor([0.0, 0.0, 0.0, 1]);
            lmetbb.getXform().setPosition(xLeft, yUpper);
            lmetbb.getXform().setSize(5, 5);

            this.mBorder.push(lmetbb);

            xLeft += 10;
        }






//////////////////// LEFT MIDDLE EXIT RIGHT RECTANGLE BORDER ///////////
        var xRight = 200;
        var xLeft = 340;
        var yUpper = 315;

        for (let i = 0; i <= 7; i++){
            let lmerb = new Renderable(this.mConstColorShader);
            lmerb.setColor([0.4, 0.7, 0.8, 1]);
            lmerb.getXform().setPosition(xLeft, yUpper);
            lmerb.getXform().setSize(15, 15);

            this.mBorder.push(lmerb);

            let lmerbb = new Renderable(this.mConstColorShader);
            lmerbb.setColor([0.0, 0.0, 0.0, 1]);
            lmerbb.getXform().setPosition(xLeft, yUpper);
            lmerbb.getXform().setSize(5, 5);

            this.mBorder.push(lmerbb);

            yUpper -= 10;

        }










//////////////// LEFT MIDDLE  EXIT BOTTOM RECTANGLE BORDER /////////////////
        var yLower = 380;
        var xLeft = 280;
        var yUpper = 235;

        for (let i = 0; i <= 6; i++){
            let lmebb = new Renderable(this.mConstColorShader);
            lmebb.setColor([0.4, 0.7, 0.8, 1]);
            lmebb.getXform().setPosition(xLeft, yUpper);
            lmebb.getXform().setSize(15, 15);

            this.mBorder.push(lmebb);

            let lmebbb = new Renderable(this.mConstColorShader);
            lmebbb.setColor([0.0, 0.0, 0.0, 1]);
            lmebbb.getXform().setPosition(xLeft, yUpper);
            lmebbb.getXform().setSize(5, 5);

            this.mBorder.push(lmebbb);

            xLeft += 10;
        }





        /////////////// LEFT BOTTOM EXIT RECTANGLE BORDER ///////////////////
        var yLower = 380;
        var xLeft = 280;
        var yUpper = 185;

        for (let i = 0; i <= 6; i++){
            let lbeb = new Renderable(this.mConstColorShader);
            lbeb.setColor([0.4, 0.7, 0.8, 1]);
            lbeb.getXform().setPosition(xLeft, yUpper);
            lbeb.getXform().setSize(15, 15);

            this.mBorder.push(lbeb);

            let lbebb = new Renderable(this.mConstColorShader);
            lbebb.setColor([0.0, 0.0, 0.0, 1]);
            lbebb.getXform().setPosition(xLeft, yUpper);
            lbebb.getXform().setSize(5, 5);

            this.mBorder.push(lbebb);

            xLeft += 10;
        }
    }

    MyGame2.prototype.initializeObstacles = function (){

        ///////////////////////////////Top Right Corner///////////////////


        //Top Right L Bottom
        let trtrLRectangleBottom = new Renderable(this.mConstColorShader);
        trtrLRectangleBottom.setColor([0.4, 0.7, 0.8, 1]);
        trtrLRectangleBottom.getXform().setPosition(933, 529);
        trtrLRectangleBottom.getXform().setSize(33, 72);
        this.mObstacles.push(trtrLRectangleBottom);

        let trtrLRectangleBottomB = new Renderable(this.mConstColorShader);
        trtrLRectangleBottomB.setColor([0.0, 0.0, 0.0, 1]);
        trtrLRectangleBottomB.getXform().setPosition(933, 531);
        trtrLRectangleBottomB.getXform().setSize(20, 65);
        this.mObstacles.push(trtrLRectangleBottomB);





        //Top Right L Side
        let trtrLSide = new Renderable(this.mConstColorShader);
        trtrLSide.setColor([0.4, 0.7, 0.8, 1]);
        trtrLSide.getXform().setPosition(882, 561);
        trtrLSide.getXform().setSize(135, 25);
        this.mObstacles.push(trtrLSide);
//
        let trtrLSideB= new Renderable(this.mConstColorShader);
        trtrLSideB.setColor([0.0, 0.0, 0.0, 1]);
        trtrLSideB.getXform().setPosition(882, 560);
        trtrLSideB.getXform().setSize(122, 10);
        this.mObstacles.push(trtrLSideB);


        // Top Right L Gap
        let trtrLGap= new Renderable(this.mConstColorShader);
        trtrLGap.setColor([0.0, 0.0, 0.0, 1]);
        trtrLGap.getXform().setPosition(933, 555);
        trtrLGap.getXform().setSize(20, 20);
        this.mObstacles.push(trtrLGap);
//




        //Bottom Right L Side
        let trbrSide = new Renderable(this.mConstColorShader);
        trbrSide.setColor([0.4, 0.7, 0.8, 1]);
        trbrSide.getXform().setPosition(826, 458);
        trbrSide.getXform().setSize(25, 100);
        this.mObstacles.push(trbrSide);

        let trbrSideB = new Renderable(this.mConstColorShader);
        trbrSideB.setColor([0.0, 0.0, 0.0, 1]);
        trbrSideB.getXform().setPosition(826, 447);
        trbrSideB.getXform().setSize(13, 70);
        this.mObstacles.push(trbrSideB);



//Bottom Right L Top//
        let trbrTop = new Renderable(this.mConstColorShader);
        trbrTop.setColor([0.4, 0.7, 0.8, 1]);
        trbrTop.getXform().setPosition(846, 503);
        trbrTop.getXform().setSize(65, 20);
        this.mObstacles.push(trbrTop);

        let trbrTopB = new Renderable(this.mConstColorShader);
        trbrTopB.setColor([0.0, 0.0, 0.0, 1]);
        trbrTopB.getXform().setPosition(846.5, 503);
        trbrTopB.getXform().setSize(54, 10);
        this.mObstacles.push(trbrTopB);
//
//
        // Bottom Right L Gap
        let trbrTopGap= new Renderable(this.mConstColorShader);
        trbrTopGap.setColor([0.0, 0.0, 0.0, 1]);
        trbrTopGap.getXform().setPosition(826, 490);
        trbrTopGap.getXform().setSize(13, 20);
        this.mObstacles.push(trbrTopGap);








///////////////////////// TOP MIDDLE /////////////////////////////////////




        //Middle T Head//
        let tmTHead = new Renderable(this.mConstColorShader);
        tmTHead.setColor([0.4, 0.7, 0.8, 1]);
        tmTHead.getXform().setPosition(640, 622);
        tmTHead.getXform().setSize(269, 25);
        this.mObstacles.push(tmTHead);



//Middle T Tail//
        let tmTTail = new Renderable(this.mConstColorShader);
        tmTTail.setColor([0.4, 0.7, 0.8, 1]);
        tmTTail.getXform().setPosition(642, 596);
        tmTTail.getXform().setSize(63, 77);
        this.mObstacles.push(tmTTail);

        let tmTTailB = new Renderable(this.mConstColorShader);
        tmTTailB.setColor([0.0, 0.0, 0.0, 1]);
        tmTTailB.getXform().setPosition(642, 596);
        tmTTailB.getXform().setSize(51, 65);
        this.mObstacles.push(tmTTailB);

//
        //Middle T Gap
        let tmTGap = new Renderable(this.mConstColorShader);
        tmTGap.setColor([0.0, 0.0, 0.0, 1]);
        tmTGap.getXform().setPosition(640, 622);
        tmTGap.getXform().setSize(258, 13);
        this.mObstacles.push(tmTGap);






// Middle U Left side//
        let tmULSide = new Renderable(this.mConstColorShader);
        tmULSide.setColor([0.4, 0.7, 0.8, 1]);
        tmULSide.getXform().setPosition(540, 540);
        tmULSide.getXform().setSize(65, 65);
        this.mObstacles.push(tmULSide);





//Middle U Right side//
        let tmURSide = new Renderable(this.mConstColorShader);
        tmURSide.setColor([0.4, 0.7, 0.8, 1]);
        tmURSide.getXform().setPosition(744, 540);
        tmURSide.getXform().setSize(65, 65);
        this.mObstacles.push(tmURSide);






//Middle U Bottom//
        let tmUBottom = new Renderable(this.mConstColorShader);
        tmUBottom.setColor([0.4, 0.7, 0.8, 1]);
        tmUBottom.getXform().setPosition(642, 498);
        tmUBottom.getXform().setSize(269, 45);
        this.mObstacles.push(tmUBottom);

        let tmUBottomB = new Renderable(this.mConstColorShader);
        tmUBottomB.setColor([0.0, 0.0, 0.0, 1]);
        tmUBottomB.getXform().setPosition(642, 498);
        tmUBottomB.getXform().setSize(253, 30);
        this.mObstacles.push(tmUBottomB);


//Middle U Left Gap
        let tmULGap = new Renderable(this.mConstColorShader);
        tmULGap.setColor([0.0, 0.0, 0.0, 1]);
        tmULGap.getXform().setPosition(540, 540);
        tmULGap.getXform().setSize(49, 55);
        this.mObstacles.push(tmULGap);


        //Middle U Right Gap
        let tmURGap = new Renderable(this.mConstColorShader);
        tmURGap.setColor([0.0, 0.0, 0.0, 1]);
        tmURGap.getXform().setPosition(744, 540);
        tmURGap.getXform().setSize(49, 55);
        this.mObstacles.push(tmURGap);




/////////////////////////////// TOP LEFT CORNER /////////////////////////////


        //Top Left L Bottom
        let tltlLBottom = new Renderable(this.mConstColorShader);
        tltlLBottom.setColor([0.4, 0.7, 0.8, 1]);
        tltlLBottom.getXform().setPosition(347, 529);
        tltlLBottom.getXform().setSize(33, 72);
        this.mObstacles.push(tltlLBottom);

        let tltlLBottomB = new Renderable(this.mConstColorShader);
        tltlLBottomB.setColor([0.0, 0.0, 0.0, 1]);
        tltlLBottomB.getXform().setPosition(347, 531);
        tltlLBottomB.getXform().setSize(20, 65);
        this.mObstacles.push(tltlLBottomB);



//Top Left L Side
        let tltlLSide= new Renderable(this.mConstColorShader);
        tltlLSide.setColor([0.4, 0.7, 0.8, 1]);
        tltlLSide.getXform().setPosition(398, 561);
        tltlLSide.getXform().setSize(135, 25);
        this.mObstacles.push(tltlLSide);

        let tltlLSideB= new Renderable(this.mConstColorShader);
        tltlLSideB.setColor([0.0, 0.0, 0.0, 1]);
        tltlLSideB.getXform().setPosition(398.5, 560);
        tltlLSideB.getXform().setSize(122.5, 10);
        this.mObstacles.push(tltlLSideB);


        // Top Left L Gap
        let tltlLGap= new Renderable(this.mConstColorShader);
        tltlLGap.setColor([0.0, 0.0, 0.0, 1]);
        tltlLGap.getXform().setPosition(347, 555);
        tltlLGap.getXform().setSize(20, 20);
        this.mObstacles.push(tltlLGap);








//Bottom Left L Side
        let tlbrLSide = new Renderable(this.mConstColorShader);
        tlbrLSide.setColor([0.4, 0.7, 0.8, 1]);
        tlbrLSide.getXform().setPosition(455.5, 450);
        tlbrLSide.getXform().setSize(24, 86);
        this.mObstacles.push(tlbrLSide);

        let tlbrLSideB = new Renderable(this.mConstColorShader);
        tlbrLSideB.setColor([0.0, 0.0, 0.0, 1]);
        tlbrLSideB.getXform().setPosition(455, 447);
        tlbrLSideB.getXform().setSize(13, 68);
        this.mObstacles.push(tlbrLSideB);






// //Bottom Left L Top//
        let tlbrLTop = new Renderable(this.mConstColorShader);
        tlbrLTop.setColor([0.4, 0.7, 0.8, 1]);
        tlbrLTop.getXform().setPosition(435, 503);
        tlbrLTop.getXform().setSize(65, 20);
        this.mObstacles.push(tlbrLTop);

        let tlbrLTopB = new Renderable(this.mConstColorShader);
        tlbrLTopB.setColor([0.0, 0.0, 0.0, 1]);
        tlbrLTopB.getXform().setPosition(434.5, 503);
        tlbrLTopB.getXform().setSize(54, 10);
        this.mObstacles.push(tlbrLTopB);


        // Bottom Left L Gap
        let tlbrLGap= new Renderable(this.mConstColorShader);
        tlbrLGap.setColor([0.0, 0.0, 0.0, 1]);
        tlbrLGap.getXform().setPosition(455, 490);
        tlbrLGap.getXform().setSize(13, 20);
        this.mObstacles.push(tlbrLGap);





////////////////^^^^^^^^^^ MAAHEEN PART ^^^^^^^^^^^^////////////////////








//Tony Part

        //bigBox
        let bigBox = new Renderable(this.mConstColorShader);
        bigBox.setColor([0.4, 0.7, 0.8, 1]);
        bigBox.getXform().setPosition(647,283.5);
        bigBox.getXform().setSize(130, 107);
        this.mObstacles.push(bigBox);

        let bigBoxFill = new Renderable(this.mConstColorShader);
        bigBoxFill.setColor([0.0, 0.0, 0.0, 1]);
        bigBoxFill.getXform().setPosition(647,284);
        bigBoxFill.getXform().setSize(100, 83);
        this.mObstacles.push(bigBoxFill);


// bottom left upside down L
        let BottomUpDownLLeftSideBlue = new Renderable(this.mConstColorShader);
        BottomUpDownLLeftSideBlue.setColor([0.4, 0.7, 0.8, 1]); // Adjusted color
        BottomUpDownLLeftSideBlue.getXform().setPosition(393, 356); // Adjusted position
        BottomUpDownLLeftSideBlue.getXform().setSize(20, 100);
        this.mObstacles.push(BottomUpDownLLeftSideBlue);

        let BottomUpDownLAboveSideBlue = new Renderable(this.mConstColorShader);
        BottomUpDownLAboveSideBlue.setColor([0.4, 0.7, 0.8, 1]);
        BottomUpDownLAboveSideBlue.getXform().setPosition(366, 390); // Adjusted position
        BottomUpDownLAboveSideBlue.getXform().setSize(75, 34);
        this.mObstacles.push(BottomUpDownLAboveSideBlue);

        let BottomUpDownLLeftSideBlack = new Renderable(this.mConstColorShader);
        BottomUpDownLLeftSideBlack.setColor([0.0, 0.0, 0.0, 1.0]);
        BottomUpDownLLeftSideBlack.getXform().setPosition(393, 356); // Adjusted position
        BottomUpDownLLeftSideBlack.getXform().setSize(10, 90);
        this.mObstacles.push(BottomUpDownLLeftSideBlack);

        let BottomUpDownLAboveSideBlack = new Renderable(this.mConstColorShader);
        BottomUpDownLAboveSideBlack.setColor([0.0, 0.0, 0.0, 1.0]);
        BottomUpDownLAboveSideBlack.getXform().setPosition(366, 390); // Adjusted position
        BottomUpDownLAboveSideBlack.getXform().setSize(58, 25);
        this.mObstacles.push(BottomUpDownLAboveSideBlack);
// bottom rect
        // needs to be moved down with the T
        let bottomRect = new Renderable(this.mConstColorShader);
        bottomRect.setColor([0.4, 0.7, 0.8, 1]);
        bottomRect.getXform().setPosition(534, 130);
        bottomRect.getXform().setSize(140, 13);
        this.mObstacles.push(bottomRect);

        let bottomRectGap = new Renderable(this.mConstColorShader);
        bottomRectGap.setColor([0.0, 0.0, 0.0, 1.0]);
        bottomRectGap.getXform().setPosition(534, 130);
        bottomRectGap.getXform().setSize(120, 5);
        this.mObstacles.push(bottomRectGap);

        // very bottom left corner L
        let bottomLeftLVert = new Renderable(this.mConstColorShader);
        bottomLeftLVert.setColor([0.4, 0.7, 0.8, 1]);
        bottomLeftLVert.getXform().setPosition(380, 133);
        bottomLeftLVert.getXform().setSize(100, 19);
        this.mObstacles.push(bottomLeftLVert);

        let bottomLeftHor = new Renderable(this.mConstColorShader);
        bottomLeftHor.setColor([0.4, 0.7, 0.8, 1]);
        bottomLeftHor.getXform().setPosition(406.5, 160);
        bottomLeftHor.getXform().setSize(47, 65);
        this.mObstacles.push(bottomLeftHor);

        let bottomLeftLVertGap = new Renderable(this.mConstColorShader);
        bottomLeftLVertGap.setColor([0.0, 0.0, 0.0, 1.0]);
        bottomLeftLVertGap.getXform().setPosition(380, 133);
        bottomLeftLVertGap.getXform().setSize( 90, 12);
        this.mObstacles.push(bottomLeftLVertGap);

        let bottomLeftHorGap = new Renderable(this.mConstColorShader);
        bottomLeftHorGap.setColor([0.0, 0.0, 0.0, 1.0]);
        bottomLeftHorGap.getXform().setPosition(406.5, 160);
        bottomLeftHorGap.getXform().setSize(37, 58);
        this.mObstacles.push(bottomLeftHorGap);
        //Bottom left corner T

        let bottomLeftT1 = new Renderable(this.mConstColorShader)
        bottomLeftT1.setColor([0.4, 0.7, 0.8, 1]);
        bottomLeftT1.getXform().setPosition(464.5, 250);
        bottomLeftT1.getXform().setSize(163, 45);
        this.mObstacles.push(bottomLeftT1);

        let bottomLeftT2 = new Renderable(this.mConstColorShader)
        bottomLeftT2.setColor([0.4, 0.7, 0.8, 1]);
        bottomLeftT2.getXform().setPosition(472, 200);
        bottomLeftT2.getXform().setSize(20, 56);
        this.mObstacles.push(bottomLeftT2);

        let bottomLeftT1Black = new Renderable(this.mConstColorShader)
        bottomLeftT1Black.setColor([0.0, 0.0, 0.0, 1.0]);
        bottomLeftT1Black.getXform().setPosition(464.5, 250);
        bottomLeftT1Black.getXform().setSize(140, 30);
        this.mObstacles.push(bottomLeftT1Black);

        let bottomLeftT2Black = new Renderable(this.mConstColorShader)
        bottomLeftT2Black.setColor([0.0, 0.0, 0.0, 1.0]);
        bottomLeftT2Black.getXform().setPosition(472, 210);
        bottomLeftT2Black.getXform().setSize(10, 50);
        this.mObstacles.push(bottomLeftT2Black);

        // small L
        let smallLBot =new Renderable(this.mConstColorShader)
        smallLBot.setColor([0.4, 0.7, 0.8, 1]);
        smallLBot.getXform().setPosition(454, 334);
        smallLBot.getXform().setSize(30, 50);
        this.mObstacles.push(smallLBot);

        let smallLTop = new Renderable(this.mConstColorShader)
        smallLTop.setColor([0.4, 0.7, 0.8, 1]);
        smallLTop.getXform().setPosition(507, 323);
        smallLTop.getXform().setSize(76, 28);
        this.mObstacles.push(smallLTop);

        let smallLBotBlack =new Renderable(this.mConstColorShader)
        smallLBotBlack.setColor([0.0, 0.0, 0.0, 1.0]);
        smallLBotBlack.getXform().setPosition(454, 334);
        smallLBotBlack.getXform().setSize(20, 40);
        this.mObstacles.push(smallLBotBlack);

        let smallLTopBlack = new Renderable(this.mConstColorShader)
        smallLTopBlack.setColor([0.0, 0.0, 0.0, 1.0]);
        smallLTopBlack.getXform().setPosition(497, 323);
        smallLTopBlack.getXform().setSize(80, 18);
        this.mObstacles.push(smallLTopBlack);




        ///////////////////HETANSH PART////////////////////
        //this.mObstacles = [];



        //Bottom Right L
        let BottomLLeftSideblue = new Renderable(this.mConstColorShader);
        BottomLLeftSideblue.setColor([0.4, 0.7, 0.8, 1]);
        BottomLLeftSideblue.getXform().setPosition(887.5,158);
        BottomLLeftSideblue.getXform().setSize(20, 70);
        this.mObstacles.push(BottomLLeftSideblue);


        let BottomLLeftSideblack = new Renderable(this.mConstColorShader);
        BottomLLeftSideblack.setColor([0.0, 0.0, 0.0, 1.0]);
        BottomLLeftSideblack.getXform().setPosition(887.5,158);
        BottomLLeftSideblack.getXform().setSize(10, 60);
        this.mObstacles.push(BottomLLeftSideblack);


        let BottomLdownSideblue = new Renderable(this.mConstColorShader);
        BottomLdownSideblue.setColor([0.4, 0.7, 0.8, 1]);
        BottomLdownSideblue.getXform().setPosition(925,133);
        BottomLdownSideblue.getXform().setSize(55, 20);
        this.mObstacles.push(BottomLdownSideblue);

        let BottomLdownSideblack = new Renderable(this.mConstColorShader);
        BottomLdownSideblack.setColor([0.0, 0.0, 0.0, 1.0]);
        BottomLdownSideblack.getXform().setPosition(915,133);
        BottomLdownSideblack.getXform().setSize(60, 10);
        this.mObstacles.push(BottomLdownSideblack);

        // Bottom Right horizontal

        let BottomRightHorizontalblue = new Renderable(this.mConstColorShader);
        BottomRightHorizontalblue.setColor([0.4, 0.7, 0.8, 1]);
        BottomRightHorizontalblue.getXform().setPosition(770,132);
        BottomRightHorizontalblue.getXform().setSize(143, 20);
        this.mObstacles.push(BottomRightHorizontalblue);

        let BottomRightHorizontalblack = new Renderable(this.mConstColorShader);
        BottomRightHorizontalblack.setColor([0.0, 0.0, 0.0, 1.0]);
        BottomRightHorizontalblack.getXform().setPosition(770,132);
        BottomRightHorizontalblack.getXform().setSize(133, 10);
        this.mObstacles.push(BottomRightHorizontalblack);



        //bottom right middle T

        let BottomRightMiddleTbluehoriz = new Renderable(this.mConstColorShader);
        BottomRightMiddleTbluehoriz.setColor([0.4, 0.7, 0.8, 1]);
        BottomRightMiddleTbluehoriz.getXform().setPosition(823,238);
        BottomRightMiddleTbluehoriz.getXform().setSize(147, 20);
        this.mObstacles.push(BottomRightMiddleTbluehoriz);

        let BottomRightMiddleTblackhoriz = new Renderable(this.mConstColorShader);
        BottomRightMiddleTblackhoriz.setColor([0.0, 0.0, 0.0, 1.0]);
        BottomRightMiddleTblackhoriz.getXform().setPosition(823,238);
        BottomRightMiddleTblackhoriz.getXform().setSize(137, 10);
        this.mObstacles.push(BottomRightMiddleTblackhoriz);

        let BottomRightMiddleTbluevert = new Renderable(this.mConstColorShader);
        BottomRightMiddleTbluevert.setColor([0.4, 0.7, 0.8, 1]);
        BottomRightMiddleTbluevert.getXform().setPosition(832,208);
        BottomRightMiddleTbluevert.getXform().setSize(20, 50);
        this.mObstacles.push(BottomRightMiddleTbluevert);

        let BottomRightMiddleTblackvert = new Renderable(this.mConstColorShader);
        BottomRightMiddleTblackvert.setColor([0.0, 0.0, 0.0, 1.0]);
        BottomRightMiddleTblackvert.getXform().setPosition(832,213);
        BottomRightMiddleTblackvert.getXform().setSize(10, 50);
        this.mObstacles.push(BottomRightMiddleTblackvert);


        // Bottom Right Backward L

        let BottombackwardLRightSideblue = new Renderable(this.mConstColorShader);
        BottombackwardLRightSideblue.setColor([0.4, 0.7, 0.8, 1]);
        BottombackwardLRightSideblue.getXform().setPosition(826,328.5);
        BottombackwardLRightSideblue.getXform().setSize(25, 87);
        this.mObstacles.push(BottombackwardLRightSideblue);


        let BottombackwardLRightSideblack = new Renderable(this.mConstColorShader);
        BottombackwardLRightSideblack.setColor([0.0, 0.0, 0.0, 1.0]);
        BottombackwardLRightSideblack.getXform().setPosition(826,328.5);
        BottombackwardLRightSideblack.getXform().setSize(15, 77);
        this.mObstacles.push(BottombackwardLRightSideblack);


        let BottombackwardLdownSideblue = new Renderable(this.mConstColorShader);
        BottombackwardLdownSideblue.setColor([0.4, 0.7, 0.8, 1]);
        BottombackwardLdownSideblue.getXform().setPosition(782,310);
        BottombackwardLdownSideblue.getXform().setSize(66, 50);
        this.mObstacles.push(BottombackwardLdownSideblue);

        let BottombackwardLdownSideblack = new Renderable(this.mConstColorShader);
        BottombackwardLdownSideblack.setColor([0.0, 0.0, 0.0, 1.0]);
        BottombackwardLdownSideblack.getXform().setPosition(793,310);
        BottombackwardLdownSideblack.getXform().setSize(79, 40);
        this.mObstacles.push(BottombackwardLdownSideblack);





        // bottom right upside down L




        let BottomupdownLleftSideBlue = new Renderable(this.mConstColorShader);
        BottomupdownLleftSideBlue.setColor([0.4, 0.7, 0.8, 1]);
        BottomupdownLleftSideBlue.getXform().setPosition(887,343);
        BottomupdownLleftSideBlue.getXform().setSize(20, 120);
        this.mObstacles.push(BottomupdownLleftSideBlue);

        let BottomupdownLleftSideBlack = new Renderable(this.mConstColorShader);
        BottomupdownLleftSideBlack.setColor([0.0, 0.0, 0.0, 1.0]);
        BottomupdownLleftSideBlack.getXform().setPosition(887,343);
        BottomupdownLleftSideBlack.getXform().setSize(10, 110);
        this.mObstacles.push(BottomupdownLleftSideBlack);

        let BottomupdownLaboveSideBlue = new Renderable(this.mConstColorShader);
        BottomupdownLaboveSideBlue.setColor([0.4, 0.7, 0.8, 1]);
        BottomupdownLaboveSideBlue.getXform().setPosition(920,388);
        BottomupdownLaboveSideBlue.getXform().setSize(47, 30);
        this.mObstacles.push(BottomupdownLaboveSideBlue);

        let BottomupdownLaboveSideBlack = new Renderable(this.mConstColorShader);
        BottomupdownLaboveSideBlack.setColor([0.0, 0.0, 0.0, 1.0]);
        BottomupdownLaboveSideBlack.getXform().setPosition(915,388);
        BottomupdownLaboveSideBlack.getXform().setSize(47, 20);
        this.mObstacles.push(BottomupdownLaboveSideBlack);


        //Bottom T

        let BottomTbluehoriz = new Renderable(this.mConstColorShader);
        BottomTbluehoriz.setColor([0.4, 0.7, 0.8, 1]);
        BottomTbluehoriz.getXform().setPosition(650,185);
        BottomTbluehoriz.getXform().setSize(265, 20);
        this.mObstacles.push(BottomTbluehoriz);

        let BottomTblackhoriz = new Renderable(this.mConstColorShader);
        BottomTblackhoriz.setColor([0.0, 0.0, 0.0, 1.0]);
        BottomTblackhoriz.getXform().setPosition(650,185);
        BottomTblackhoriz.getXform().setSize(255, 10);
        this.mObstacles.push(BottomTblackhoriz);

        let BottomTbluevert = new Renderable(this.mConstColorShader);
        BottomTbluevert.setColor([0.4, 0.7, 0.8, 1]);
        BottomTbluevert.getXform().setPosition(650,150);
        BottomTbluevert.getXform().setSize(20, 56);
        this.mObstacles.push(BottomTbluevert);

        let BottomTblackvert = new Renderable(this.mConstColorShader);
        BottomTblackvert.setColor([0.0, 0.0, 0.0, 1.0]);
        BottomTblackvert.getXform().setPosition(650,155);
        BottomTblackvert.getXform().setSize(10, 56);
        this.mObstacles.push(BottomTblackvert);


    };

    MyGame2.prototype.Maze1Manipulation = function()
    {
        let mtempRU = new Renderable(this.mConstColorShader);
        mtempRU.setColor([0.0, 0.0, 0.0, 1]);
        mtempRU.getXform().setPosition(980, 280);
        mtempRU.getXform().setSize(50, 50);

        // this.mtempRU.draw(vpMatrix);
        this.mBorder.push(mtempRU)

        let mtempLU = new Renderable(this.mConstColorShader);
        mtempLU.setColor([0.0, 0.0, 0.0, 1]);
        mtempLU.getXform().setPosition(300, 280);
        mtempLU.getXform().setSize(50, 50);

        // this.mtempLU.draw(vpMatrix);
        this.mBorder.push(mtempLU)

        let mtempMid = new Renderable(this.mConstColorShader);
        mtempMid.setColor([0.0, 0.0, 0.0, 1]);
        mtempMid.getXform().setPosition(650,410);
        mtempMid.getXform().setSize(190, 25);

        // this.mtempMid.draw(vpMatrix);
        this.mBorder.push(mtempMid)

    };


    const routeSize = 15;

    MyGame2.prototype.checkPelletObstacleLoc = function(x,y) {
        for (let i = 0; i < this.mObstacles.length; i++) {
            const obstacleX = this.mObstacles[i].getXform().getXPos();
            const obstacleY = this.mObstacles[i].getXform().getYPos();
            const obstacleWidth = this.mObstacles[i].getXform().getWidth();
            const obstacleHeight = this.mObstacles[i].getXform().getHeight();

            // Check for overlap
            if (
                (x < (obstacleX + (obstacleWidth/2.0) + (routeSize/2.0))) &&
                (x > (obstacleX - (obstacleWidth/2.0) - (routeSize/2.0))) &&
                (y < (obstacleY + (obstacleHeight/2.0) + (routeSize/2.0))) &&
                (y > (obstacleY - (obstacleHeight/2.0) - (routeSize/2.0)))
            ){
                return true;
            }

        }
        return false;
    };



    const aisleSize = 15;

    MyGame2.prototype.checkPelletBorderLoc = function(x,y) {
        for (let i = 0; i < this.mBorder.length; i++) {
            const borderX = this.mBorder[i].getXform().getXPos();
            const borderY = this.mBorder[i].getXform().getYPos();
            const borderWidth = this.mBorder[i].getXform().getWidth();
            const borderHeight = this.mBorder[i].getXform().getHeight();

            // Check for overlap
            if (
                (x < (borderX + (borderWidth/2.0) + (aisleSize/2.0))) &&
                (x > (borderX - (borderWidth/2.0) - (aisleSize/2.0))) &&
                (y < (borderY + (borderHeight/2.0) + (aisleSize/2.0))) &&
                (y > (borderY - (borderHeight/2.0) - (aisleSize/2.0)))
            ){
                return true;
            }

        }
        return false;
    };

    MyGame2.prototype.initializePellets = function () {
        var xBound = 290;
        var yUpper = 650;
        var yLower = 80;

        // Fill top
        for(let row = 0; row < 30; row ++) {

            var tempxBound = xBound;
            for(let column = 0; column < 37 ; column ++) {
                if(this.checkPelletBorderLoc(tempxBound, yUpper))
                {
                    tempxBound+=22;
                }
                else{
                    if(this.checkPelletObstacleLoc(tempxBound, yUpper))
                    {
                        tempxBound+=22;
                    }
                    else
                    {
                        this.addPellet(tempxBound, yUpper);
                        tempxBound+=22;
                    }
                }
            }
            yUpper -= 18.95;
        }
    };

    MyGame2.prototype.addPellet = function (x, y) {
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

    MyGame2.prototype.initializeText = function () {
        this.mLevelText = new FontRenderable("LEVEL");
        this.mLevelText.setFont(this.kFont);
        this._initText(this.mLevelText, 800, 55, [1, 1, 1, 1], 36);

        this.mScoreText = new FontRenderable("SCORE");
        this.mScoreText.setFont(this.kFont);
        this._initText(this.mScoreText, 330, 55, [1, 1, 1, 1], 36);

        this.mLevelNum = new FontRenderable("02");
        this.mLevelNum.setFont(this.kFont);
        this._initText(this.mLevelNum, 940, 55, [1, 1, 1, 1], 36);

        this.mScoreNum = new FontRenderable("00");
        this.mScoreNum.setFont(this.kFont);
        this._initText(this.mScoreNum, 470, 55, [1, 1, 1, 1], 36);
    };

    this.mAnimatedPacman = new AnimatedPacman(this.kMovingPacman, this.kMovingPacmanRight, 450, 575);

    this.mGhostBlinky = new AnimatedGhost(this.Blinky[0], this.Blinky[1], this.Blinky[2], this.Blinky[3],635, 530)
    this.mGhostFunky = new AnimatedGhost(this.Funky[0], this.Funky[1], this.Funky[2], this.Funky[3],595, 100)
    this.mGhostInky = new AnimatedGhost(this.Inky[0], this.Inky[1], this.Inky[2], this.Inky[3],715, 355)
    this.mGhostPinky = new AnimatedGhost(this.Pinky[0], this.Pinky[1], this.Pinky[2], this.Pinky[3],400, 520)

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
MyGame2.prototype.draw = function () {
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
MyGame2.prototype.update = function () {
    const pacOgSize = 22.5;


    const resetX = 450;
    const resetY = 600;

    MyGame2.prototype.checkCollisionWithPallets = function () {
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

    MyGame2.prototype.checkCollisionWithBorders = function () {
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

    MyGame2.prototype.checkCollisionWithObstacles = function () {
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

    MyGame2.prototype.collisionGhost = function (mGhost)
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
        )
        {
            this.collide = true;
            this.lives--;
            if (this.lives < 1) {
                // Delay the redirection to the game over screen
                setTimeout(() => {
                    window.location.href = "../gameoverscreen.html";
                }, 700); // Adjust the delay time as needed (in milliseconds)
                pause;
            }
        }

        return this.collide;

    }

    MyGame2.prototype.checkCollisionWithGhost = function (){
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

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Three)) {
        gEngine.GameLoop.stop();
    }

    if (this.totalScore === 3770)
    {
        gEngine.GameLoop.stop();
    }

};

MyGame2.prototype._initText = function (font, posX, posY, color, textH) {
    font.setColor(color);
    font.getXform().setPosition(posX, posY);
    font.setTextHeight(textH);
};