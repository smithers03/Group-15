/*
 * File: MyGame3.js
 * This is the logic of our game.
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, DyePack, Hero, Minion, Brain,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame3() {
    // Array to store border
    this.mBorder = [];
    // Array to store border
    this.mObstacles = [];
    // Array to store pellets
    this.mPellets = [];
    this.mSprites = [];
    this.lives = 3;

    this.pacStartX = 450;
    this.pacStartY = 610;
    this.BlinkyStX = 635;
    this.BlinkyStY = 530;
    this.InkyStX = 715;
    this.InkyStY = 315;
    this.PinkyStX = 435;
    this.PinkyStY = 540;
    this.FunkyStX = 595;
    this.FunkyStY = 100;

    this.originalX = 450;
    this.originalY = 610;

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
gEngine.Core.inheritPrototype(MyGame3, Scene);

MyGame3.prototype.loadScene = function () {
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
};

MyGame3.prototype.unloadScene = function () {
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
    var nextLevel = new MyGame();  // next level to be loaded
    gEngine.Core.startScene(nextLevel);
};

MyGame3.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(640, 360),   // center of the WC
        1020,                        // width of WC
        [130, 0, 1020, 720]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0, 0, 0, 1]);
    // sets the background to gray

    // Step C: Create the shader
    this.mConstColorShader = new SimpleShader(
        "src/GLSLShaders/SimpleVS.glsl",      // Path to the VertexShader
        "src/GLSLShaders/SimpleFS.glsl");    // Path to the simple FragmentShader

    MyGame3.prototype.initializeBorders = function () {

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


        //////////////////////// TOP MAZE BORDER /////////////////////////

        var xBound = 138;
        var yUpper = 680;

        for (let i = 0; i <= 170; i++){
            let tb = new Renderable(this.mConstColorShader);
            tb.setColor([0.0, 0.5, 0.8, 1]);
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

        var xBound = 138;
        var yLower = 80;

        for (let i = 0; i <= 150; i++){
            let bb = new Renderable(this.mConstColorShader);
            bb.setColor([0.0, 0.5, 0.8, 1]);
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





        ///////////////////////// LEFT TOP BORDER ////////////////
        var xLeft = 138;
        var yUpper = 665;

        for (let i = 0; i <= 26; i++){
            let ltb = new Renderable(this.mConstColorShader);
            ltb.setColor([0.0, 0.5, 0.8, 1]);
            ltb.getXform().setPosition(xLeft, yUpper);
            ltb.getXform().setSize(15, 15);

            this.mBorder.push(ltb);

            let ltbb = new Renderable(this.mConstColorShader);
            ltbb.setColor([0.0, 0.0, 0.0, 1]);
            ltbb.getXform().setPosition(xLeft, yUpper);
            ltbb.getXform().setSize(5, 5);

            this.mBorder.push(ltbb);

            yUpper -= 10;

        }



//  /////////////// LEFT BOTTOM BORDER ///////////////////
        var xLeft = 138;
        var yUpper = 85;

        for (let i = 0; i <= 27; i++){
            let lbb = new Renderable(this.mConstColorShader);
            lbb.setColor([0.0, 0.5, 0.8, 1]);
            lbb.getXform().setPosition(xLeft, yUpper);
            lbb.getXform().setSize(15, 15);

            this.mBorder.push(lbb);

            let lbbb = new Renderable(this.mConstColorShader);
            lbbb.setColor([0.0, 0.0, 0.0, 1]);
            lbbb.getXform().setPosition(xLeft, yUpper);
            lbbb.getXform().setSize(5, 5);

            this.mBorder.push(lbbb);

            yUpper += 10;
        }



        ///////////////////////// RIGHT TOP BORDER ////////////////
        var xLeft = 1143;
        var yUpper = 673.5;

        for (let i = 0; i <= 27; i++){
            let rtb = new Renderable(this.mConstColorShader);
            rtb.setColor([0.0, 0.5, 0.8, 1]);
            rtb.getXform().setPosition(xLeft, yUpper);
            rtb.getXform().setSize(15, 15);

            this.mBorder.push(rtb);

            let rtbb = new Renderable(this.mConstColorShader);
            rtbb.setColor([0.0, 0.0, 0.0, 1]);
            rtbb.getXform().setPosition(xLeft, yUpper);
            rtbb.getXform().setSize(5, 5);

            this.mBorder.push(rtbb);

            yUpper -= 10;

        }


//  /////////////// RIGHT BOTTOM BORDER ///////////////////
        var xLeft = 1143;
        var yUpper = 85;

        for (let i = 0; i <= 27; i++){
            let rbb = new Renderable(this.mConstColorShader);
            rbb.setColor([0.0, 0.5, 0.8, 1]);
            rbb.getXform().setPosition(xLeft, yUpper);
            rbb.getXform().setSize(15, 15);

            this.mBorder.push(rbb);

            let rbbb = new Renderable(this.mConstColorShader);
            rbbb.setColor([0.0, 0.0, 0.0, 1]);
            rbbb.getXform().setPosition(xLeft, yUpper);
            rbbb.getXform().setSize(5, 5);

            this.mBorder.push(rbbb);

            yUpper += 10;
        }

    }

    MyGame3.prototype.initializeObstacles = function (){

        //////////////////////// Top Left Obstacle////////////////
        let tl = new Renderable(this.mConstColorShader);
        tl.setColor([0.0, 0.5, 0.8, 1]);
        tl.getXform().setPosition(228,654);
        tl.getXform().setSize(165, 37.75);
        this.mObstacles.push(tl);

        let tlb = new Renderable(this.mConstColorShader);
        tlb.setColor([0.0, 0.0, 0.0, 1]);
        tlb.getXform().setPosition(225,654);
        tlb.getXform().setSize(150, 22);
        this.mObstacles.push(tlb);

        //////////////////////// Top Right Obstacle////////////////
        let tr = new Renderable(this.mConstColorShader);
        tr.setColor([0.0, 0.5, 0.8, 1]);
        tr.getXform().setPosition(1053,654);
        tr.getXform().setSize(165, 42.75);
        this.mObstacles.push(tr);

        let trb = new Renderable(this.mConstColorShader);
        trb.setColor([0.0, 0.0, 0.0, 1]);
        trb.getXform().setPosition(1053,655);
        trb.getXform().setSize(150, 22);
        this.mObstacles.push(trb);

        //////////////////////// Top Left Second Obstacle////////////////
        let tls = new Renderable(this.mConstColorShader);
        tls.setColor([0.0, 0.5, 0.8, 1]);
        tls.getXform().setPosition(397,654);
        tls.getXform().setSize(100, 37.75);
        this.mObstacles.push(tls);

        let tlsb = new Renderable(this.mConstColorShader);
        tlsb.setColor([0.0, 0.0, 0.0, 1]);
        tlsb.getXform().setPosition(397,654);
        tlsb.getXform().setSize(80, 22);
        this.mObstacles.push(tlsb);

        //////////////////////// Top Left Third Obstacle////////////////
        let tlt = new Renderable(this.mConstColorShader);
        tlt.setColor([0.0, 0.5, 0.8, 1]);
        tlt.getXform().setPosition(509,654);
        tlt.getXform().setSize(50, 37.75);
        this.mObstacles.push(tlt);

        let tltb = new Renderable(this.mConstColorShader);
        tltb.setColor([0.0, 0.0, 0.0, 1]);
        tltb.getXform().setPosition(509,654);
        tltb.getXform().setSize(30, 22);
        this.mObstacles.push(tltb);

        //////////////////////// Top Middle Obstacle////////////////
        let tm = new Renderable(this.mConstColorShader);
        tm.setColor([0.0, 0.5, 0.8, 1]);
        tm.getXform().setPosition(640,654);
        tm.getXform().setSize(138, 37.75);
        this.mObstacles.push(tm);

        let tmb = new Renderable(this.mConstColorShader);
        tmb.setColor([0.0, 0.0, 0.0, 1]);
        tmb.getXform().setPosition(640,654);
        tmb.getXform().setSize(118, 22);
        this.mObstacles.push(tmb);

        //////////////////////// Top Right Third Obstacle////////////////
        let trt = new Renderable(this.mConstColorShader);
        trt.setColor([0.0, 0.5, 0.8, 1]);
        trt.getXform().setPosition(771,654);
        trt.getXform().setSize(50, 37.75);
        this.mObstacles.push(trt);

        let trtb = new Renderable(this.mConstColorShader);
        trtb.setColor([0.0, 0, 0, 1]);
        trtb.getXform().setPosition(771,654);
        trtb.getXform().setSize(30, 22);
        this.mObstacles.push(trtb);

        //////////////////////// Top Right Second Obstacle////////////////
        let trs = new Renderable(this.mConstColorShader);
        trs.setColor([0.0, 0.5, 0.8, 1]);
        trs.getXform().setPosition(883,654);
        trs.getXform().setSize(100, 37.75);
        this.mObstacles.push(trs);

        let trsb = new Renderable(this.mConstColorShader);
        trsb.setColor([0.0, 0, 0, 1]);
        trsb.getXform().setPosition(883,654);
        trsb.getXform().setSize(80, 22);
        this.mObstacles.push(trsb);


        //////////////////////// Top Left Rectangle Obstacle////////////////
        let tlr = new Renderable(this.mConstColorShader);
        tlr.setColor([0.0, 0.5, 0.8, 1]);
        tlr.getXform().setPosition(356,580);
        tlr.getXform().setSize(350, 37.75);
        this.mObstacles.push(tlr);

        let tlrb = new Renderable(this.mConstColorShader);
        tlrb.setColor([0.0, 0, 0, 1]);
        tlrb.getXform().setPosition(356,580);
        tlrb.getXform().setSize(330, 22);
        this.mObstacles.push(tlrb);

        //////////////////////// Top Right Rectangle Obstacle////////////////
        let trr = new Renderable(this.mConstColorShader);
        trr.setColor([0.0, 0.5, 0.8, 1]);
        trr.getXform().setPosition(923,580);
        trr.getXform().setSize(350, 37.75);
        this.mObstacles.push(trr);

        let trrb = new Renderable(this.mConstColorShader);
        trrb.setColor([0.0, 0, 0, 1]);
        trrb.getXform().setPosition(923,580);
        trrb.getXform().setSize(330, 22);
        this.mObstacles.push(trrb);

        //////////////////////// Top Middle Rectangle Obstacle////////////////
        let tmr = new Renderable(this.mConstColorShader);
        tmr.setColor([0.0, 0.5, 0.8, 1]);
        tmr.getXform().setPosition(640,580);
        tmr.getXform().setSize(138, 37.75);
        this.mObstacles.push(tmr);

        let tmrb = new Renderable(this.mConstColorShader);
        tmrb.setColor([0.0, 0, 0, 1]);
        tmrb.getXform().setPosition(640,580);
        tmrb.getXform().setSize(118, 22);
        this.mObstacles.push(tmrb);

// P LEFT SIDE /////
        let pls = new Renderable(this.mConstColorShader);
        pls.setColor([0.0, 0.5, 0.8, 1]);
        pls.getXform().setPosition(190,424);
        pls.getXform().setSize(15, 200);
        this.mObstacles.push(pls);



/// P TOP ////

        let pt = new Renderable(this.mConstColorShader);
        pt.setColor([0.0, 0.5, 0.8, 1]);
        pt.getXform().setPosition(230,516.5);
        pt.getXform().setSize(80, 15);
        this.mObstacles.push(pt);



/// P RIGHT SIDE /////

        let prs = new Renderable(this.mConstColorShader);
        prs.setColor([0.0, 0.5, 0.8, 1]);
        prs.getXform().setPosition(277,474);
        prs.getXform().setSize(15, 100);
        this.mObstacles.push(prs);




//// P BOTTOM  ///////
        let pb = new Renderable(this.mConstColorShader);
        pb.setColor([0.0, 0.5, 0.8, 1]);
        pb.getXform().setPosition(259.5,417);
        pb.getXform().setSize(50, 15);
        this.mObstacles.push(pb);








// A LEFT TOP SIDE /////
        let alts = new Renderable(this.mConstColorShader);
        alts.setColor([0.0, 0.5, 0.8, 1]);
        alts.getXform().setPosition(328,473);
        alts.getXform().setSize(15, 90);
        this.mObstacles.push(alts);



        // A LEFT BOTTOM SIDE /////
        let albs = new Renderable(this.mConstColorShader);
        albs.setColor([0.0, 0.5, 0.8, 1]);
        albs.getXform().setPosition(328,358);
        albs.getXform().setSize(15, 68);
        this.mObstacles.push(albs);



//////////// A TOP ////////////
        let at = new Renderable(this.mConstColorShader);
        at.setColor([0.0, 0.5, 0.8, 1]);
        at.getXform().setPosition(361,516.5);
        at.getXform().setSize(81, 15);
        this.mObstacles.push(at);


// A RIGHT SIDE /////
        let ar = new Renderable(this.mConstColorShader);
        ar.setColor([0.0, 0.5, 0.8, 1]);
        ar.getXform().setPosition(408,424);
        ar.getXform().setSize(15, 200);
        this.mObstacles.push(ar);



        // A MIDDLE  /////
        let am = new Renderable(this.mConstColorShader);
        am.setColor([0.0, 0.5, 0.8, 1]);
        am.getXform().setPosition(361,385);
        am.getXform().setSize(80, 15);
        this.mObstacles.push(am);





// C LEFT SIDE /////
        let cls = new Renderable(this.mConstColorShader);
        cls.setColor([0.0, 0.5, 0.8, 1]);
        cls.getXform().setPosition(460,424);
        cls.getXform().setSize(15, 200);
        this.mObstacles.push(cls);


//////////// C TOP ////////////
        let ct = new Renderable(this.mConstColorShader);
        ct.setColor([0.0, 0.5, 0.8, 1]);
        ct.getXform().setPosition(507,516.5);
        ct.getXform().setSize(80, 15);
        this.mObstacles.push(ct);

//////////// C BOTTOM ////////////
        let cb = new Renderable(this.mConstColorShader);
        cb.setColor([0.0, 0.5, 0.8, 1]);
        cb.getXform().setPosition(507,331.5);
        cb.getXform().setSize(80, 15);
        this.mObstacles.push(cb);





        // M LEFT SIDE /////
        let mls = new Renderable(this.mConstColorShader);
        mls.setColor([0.0, 0.5, 0.8, 1]);
        mls.getXform().setPosition(680,424);
        mls.getXform().setSize(15, 200);
        this.mObstacles.push(mls);



        //////////// M TOP ////////////
        let mt = new Renderable(this.mConstColorShader);
        mt.setColor([0.0, 0.5, 0.8, 1]);
        mt.getXform().setPosition(730,516.5);
        mt.getXform().setSize(115, 15);
        this.mObstacles.push(mt);



        // M RIGHT SIDE /////
        let mrs = new Renderable(this.mConstColorShader);
        mrs.setColor([0.0, 0.5, 0.8, 1]);
        mrs.getXform().setPosition(789,424);
        mrs.getXform().setSize(15, 200);
        this.mObstacles.push(mrs);



        // M MIDDLE SIDE /////
        let mms = new Renderable(this.mConstColorShader);
        mms.setColor([0.0, 0.5, 0.8, 1]);
        mms.getXform().setPosition(735,424);
        mms.getXform().setSize(15, 200);
        this.mObstacles.push(mms);






        // A 2 LEFT TOP SIDE /////
        let a2lts = new Renderable(this.mConstColorShader);
        a2lts.setColor([0.0, 0.5, 0.8, 1]);
        a2lts.getXform().setPosition(840,473);
        a2lts.getXform().setSize(15, 90);
        this.mObstacles.push(a2lts);



        // A 2 LEFT BOTTOM SIDE /////
        let a2lbs = new Renderable(this.mConstColorShader);
        a2lbs.setColor([0.0, 0.5, 0.8, 1]);
        a2lbs.getXform().setPosition(840,358);
        a2lbs.getXform().setSize(15, 68);
        this.mObstacles.push(a2lbs);



//////////// A 2 TOP ////////////
        let a2t = new Renderable(this.mConstColorShader);
        a2t.setColor([0.0, 0.5, 0.8, 1]);
        a2t.getXform().setPosition(882.5,516.5);
        a2t.getXform().setSize(100, 15);
        this.mObstacles.push(a2t);


// A 2 RIGHT SIDE /////
        let a2r = new Renderable(this.mConstColorShader);
        a2r.setColor([0.0, 0.5, 0.8, 1]);
        a2r.getXform().setPosition(926,424);
        a2r.getXform().setSize(15, 200);
        this.mObstacles.push(a2r);



        // A 2 MIDDLE  /////
        let a2m = new Renderable(this.mConstColorShader);
        a2m.setColor([0.0, 0.5, 0.8, 1]);
        a2m.getXform().setPosition(883,384.5);
        a2m.getXform().setSize(80, 15);
        this.mObstacles.push(a2m);





        // N LEFT SIDE /////
        let nls = new Renderable(this.mConstColorShader);
        nls.setColor([0.0, 0.5, 0.8, 1]);
        nls.getXform().setPosition(978,424);
        nls.getXform().setSize(15, 200);
        this.mObstacles.push(nls);


        //////////// N  TOP ////////////
        let nt = new Renderable(this.mConstColorShader);
        nt.setColor([0.0, 0.5, 0.8, 1]);
        nt.getXform().setPosition(1000,516.5);
        nt.getXform().setSize(55, 15);
        this.mObstacles.push(nt);



        // N MIDDLE SIDE /////
        let nms = new Renderable(this.mConstColorShader);
        nms.setColor([0.0, 0.5, 0.8, 1]);
        nms.getXform().setPosition(1030,424);
        nms.getXform().setSize(15, 200);
        this.mObstacles.push(nms);



        //////////// N  BOTTOM ////////////
        let nb = new Renderable(this.mConstColorShader);
        nb.setColor([0.0, 0.5, 0.8, 1]);
        nb.getXform().setPosition(1065,331.5);
        nb.getXform().setSize(55, 15);
        this.mObstacles.push(nb);


        // N RIGHT SIDE /////
        let nrs = new Renderable(this.mConstColorShader);
        nrs.setColor([0.0, 0.5, 0.8, 1]);
        nrs.getXform().setPosition(1085,424);
        nrs.getXform().setSize(15, 200);
        this.mObstacles.push(nrs);



        //////// DASH //////////////
        let d = new Renderable(this.mConstColorShader);
        d.setColor([0.0, 0.5, 0.8, 1]);
        d.getXform().setPosition(572, 425);
        d.getXform().setSize(125, 95);
        this.mObstacles.push(d);


        let db = new Renderable(this.mConstColorShader);
        db.setColor([0.0, 0.0, 0.0, 1]);
        db.getXform().setPosition(572, 425);
        db.getXform().setSize(100, 75);
        this.mObstacles.push(db);




        ///////////// MIDDLE LEFT L SIDE /////////////////
        let mlls = new Renderable(this.mConstColorShader);
        mlls.setColor([0.0, 0.5, 0.8, 1]);
        mlls.getXform().setPosition(259.5, 322);
        mlls.getXform().setSize(48, 100);
        this.mObstacles.push(mlls);

        let mllsb = new Renderable(this.mConstColorShader);
        mllsb.setColor([0.0, 0, 0, 1]);
        mllsb.getXform().setPosition(259.5, 322);
        mllsb.getXform().setSize(28, 85);
        this.mObstacles.push(mllsb);


        ///////////// MIDDLE LEFT L BOTTOM /////////////////
        let mllb = new Renderable(this.mConstColorShader);
        mllb.setColor([0.0, 0.5, 0.8, 1]);
        mllb.getXform().setPosition(233, 268);
        mllb.getXform().setSize(101, 37.75);
        this.mObstacles.push(mllb);

        let mllbb = new Renderable(this.mConstColorShader);
        mllbb.setColor([0.0, 0, 0, 1]);
        mllbb.getXform().setPosition(233, 268);
        mllbb.getXform().setSize(81, 22);
        this.mObstacles.push(mllbb);


        let mllgap = new Renderable(this.mConstColorShader);
        mllgap.setColor([0.0, 0, 0, 1]);
        mllgap.getXform().setPosition(259.5, 280);
        mllgap.getXform().setSize(28, 22);
        this.mObstacles.push(mllgap);


        ///////////// LEFT BOTTOM BRIDGE  /////////////////
        let lbb = new Renderable(this.mConstColorShader);
        lbb.setColor([0.0, 0.5, 0.8, 1]);
        lbb.getXform().setPosition(259, 199);
        lbb.getXform().setSize(153, 25);
        this.mObstacles.push(lbb);

        let lbbb = new Renderable(this.mConstColorShader);
        lbbb.setColor([0.0, 0, 0, 1]);
        lbbb.getXform().setPosition(259, 199);
        lbbb.getXform().setSize(133, 10);
        this.mObstacles.push(lbbb);

        ///////////// LEFT SIDE BRIDGE  /////////////////
        let lsb = new Renderable(this.mConstColorShader);
        lsb.setColor([0.0, 0.5, 0.8, 1]);
        lsb.getXform().setPosition(332, 236.5);
        lsb.getXform().setSize(25, 100.5);
        this.mObstacles.push(lsb);

        let lsbb = new Renderable(this.mConstColorShader);
        lsbb.setColor([0.0, 0, 0, 1]);
        lsbb.getXform().setPosition(332, 236.5);
        lsbb.getXform().setSize(10, 85.5);
        this.mObstacles.push(lsbb);

        let lsbgap = new Renderable(this.mConstColorShader);
        lsbgap.setColor([0.0, 0, 0, 1]);
        lsbgap.getXform().setPosition(323, 199);
        lsbgap.getXform().setSize(10, 10);
        this.mObstacles.push(lsbgap);

        /////////////  TOP BRIDGE  /////////////////
        let tb = new Renderable(this.mConstColorShader);
        tb.setColor([0.0, 0.5, 0.8, 1]);
        tb.getXform().setPosition(662, 274.5);
        tb.getXform().setSize(648, 24.5);
        this.mObstacles.push(tb);

        let tbb = new Renderable(this.mConstColorShader);
        tbb.setColor([0.0, 0, 0, 1]);
        tbb.getXform().setPosition(662, 274.5);
        tbb.getXform().setSize(628, 9.5);
        this.mObstacles.push(tbb);


        let tbgap = new Renderable(this.mConstColorShader);
        tbgap.setColor([0.0, 0, 0, 1]);
        tbgap.getXform().setPosition(342, 274.5);
        tbgap.getXform().setSize(13, 9.5);
        this.mObstacles.push(tbgap);


        ///////////// RIGHT SIDE BRIDGE  /////////////////
        let rsb = new Renderable(this.mConstColorShader);
        rsb.setColor([0.0, 0.5, 0.8, 1]);
        rsb.getXform().setPosition(973.5, 236.5);
        rsb.getXform().setSize(25, 100.5);
        this.mObstacles.push(rsb);

        let rsbb = new Renderable(this.mConstColorShader);
        rsbb.setColor([0.0, 0, 0, 1]);
        rsbb.getXform().setPosition(973.5, 236.5);
        rsbb.getXform().setSize(10, 85.5);
        this.mObstacles.push(rsbb);


        let rsbgap = new Renderable(this.mConstColorShader);
        rsbgap.setColor([0.0, 0, 0, 1]);
        rsbgap.getXform().setPosition(965, 274.5);
        rsbgap.getXform().setSize(10, 9.5);
        this.mObstacles.push(rsbgap);


        ///////////// MIDDLE BRIDGE RECTANGLE /////////////////
        let mbr = new Renderable(this.mConstColorShader);
        mbr.setColor([0.0, 0.5, 0.8, 1]);
        mbr.getXform().setPosition(653, 206);
        mbr.getXform().setSize(543, 39);
        this.mObstacles.push(mbr);

        let mbrb = new Renderable(this.mConstColorShader);
        mbrb.setColor([0.0, 0, 0, 1]);
        mbrb.getXform().setPosition(653, 206);
        mbrb.getXform().setSize(524, 24);
        this.mObstacles.push(mbrb);


        ///////////// RIGHT BOTTOM BRIDGE  /////////////////
        let rbb = new Renderable(this.mConstColorShader);
        rbb.setColor([0.0, 0.5, 0.8, 1]);
        rbb.getXform().setPosition(1030, 198);
        rbb.getXform().setSize(138, 25);
        this.mObstacles.push(rbb);

        let rbbb = new Renderable(this.mConstColorShader);
        rbbb.setColor([0.0, 0, 0, 1]);
        rbbb.getXform().setPosition(1030, 198);
        rbbb.getXform().setSize(118, 10);
        this.mObstacles.push(rbbb);

        let rbbgap = new Renderable(this.mConstColorShader);
        rbbgap.setColor([0.0, 0, 0, 1]);
        rbbgap.getXform().setPosition(973.5, 206);
        rbbgap.getXform().setSize(10, 26);
        this.mObstacles.push(rbbgap);


        ///////////// TOP RIGHT BRIDGE RECTANGLE  /////////////////
        let trbr = new Renderable(this.mConstColorShader);
        trbr.setColor([0.0, 0.5, 0.8, 1]);
        trbr.getXform().setPosition(1061, 267);
        trbr.getXform().setSize(75, 42);
        this.mObstacles.push(trbr);


        let trbrb = new Renderable(this.mConstColorShader);
        trbrb.setColor([0.0, 0, 0, 1]);
        trbrb.getXform().setPosition(1061, 267);
        trbrb.getXform().setSize(55, 27);
        this.mObstacles.push(trbrb);

        /////////// BOTTOM LEFT HORIZONTAL RECTANGLE //////////

        let blhr = new Renderable(this.mConstColorShader);
        blhr.setColor([0.0, 0.5, 0.8, 1]);
        blhr.getXform().setPosition(190, 137);
        blhr.getXform().setSize(89, 28);
        this.mObstacles.push(blhr);

        let blhrb = new Renderable(this.mConstColorShader);
        blhrb.setColor([0.0, 0, 0, 1]);
        blhrb.getXform().setPosition(190, 137);
        blhrb.getXform().setSize(69, 13);
        this.mObstacles.push(blhrb);



        ///////// BOTTOM LEFT L TOP ////////////////////

        let bllt = new Renderable(this.mConstColorShader);
        bllt.setColor([0.0, 0.5, 0.8, 1]);
        bllt.getXform().setPosition(359, 137);
        bllt.getXform().setSize(175, 28);
        this.mObstacles.push(bllt);

        let blltb = new Renderable(this.mConstColorShader);
        blltb.setColor([0.0, 0, 0, 1]);
        blltb.getXform().setPosition(359, 137);
        blltb.getXform().setSize(155, 13);
        this.mObstacles.push(blltb);


        /////////// BOTTOM LEFT L SIDE ////////////////
        let blls = new Renderable(this.mConstColorShader);
        blls.setColor([0.0, 0.5, 0.8, 1]);
        blls.getXform().setPosition(434, 105);
        blls.getXform().setSize(25, 40);
        this.mObstacles.push(blls);

        let bllsb = new Renderable(this.mConstColorShader);
        bllsb.setColor([0.0, 0, 0, 1]);
        bllsb.getXform().setPosition(434, 105);
        bllsb.getXform().setSize(10, 25);
        this.mObstacles.push(bllsb);

        let bllgap = new Renderable(this.mConstColorShader);
        bllgap.setColor([0.0, 0, 0, 1]);
        bllgap.getXform().setPosition(434, 130.5);
        bllgap.getXform().setSize(10, 26);
        this.mObstacles.push(bllgap);


        //////////// BOTTOM LEFT VERTICAL RECTANGLE ///////////
        let tlvr = new Renderable(this.mConstColorShader);
        tlvr.setColor([0.0, 0.5, 0.8, 1]);
        tlvr.getXform().setPosition(509,119);
        tlvr.getXform().setSize(50, 63);
        this.mObstacles.push(tlvr);

        let tlvrb = new Renderable(this.mConstColorShader);
        tlvrb.setColor([0.0, 0, 0, 1]);
        tlvrb.getXform().setPosition(509,119);
        tlvrb.getXform().setSize(30, 48);
        this.mObstacles.push(tlvrb);

        ///////////////// BOTTOM MIDDLE BOX ////////////
        let bmb = new Renderable(this.mConstColorShader);
        bmb.setColor([0.0, 0.5, 0.8, 1]);
        bmb.getXform().setPosition(640,136.5);
        bmb.getXform().setSize(138, 27);
        this.mObstacles.push(bmb);

        let bmbb = new Renderable(this.mConstColorShader);
        bmbb.setColor([0.0, 0, 0, 1]);
        bmbb.getXform().setPosition(640,136.5);
        bmbb.getXform().setSize(118, 12);
        this.mObstacles.push(bmbb);

        //////////////// B0TTOM RIGHT VERTICAL RECTANGLE ////////
        let brvr = new Renderable(this.mConstColorShader);
        brvr.setColor([0.0, 0.5, 0.8, 1]);
        brvr.getXform().setPosition(771,119);
        brvr.getXform().setSize(50, 63);
        this.mObstacles.push(brvr);

        let brvrb = new Renderable(this.mConstColorShader);
        brvrb.setColor([0.0, 0, 0, 1]);
        brvrb.getXform().setPosition(771,119);
        brvrb.getXform().setSize(30, 48);
        this.mObstacles.push(brvrb);


        ///////// BOTTOM RIGHT L TOP ////////////////////

        let brlt = new Renderable(this.mConstColorShader);
        brlt.setColor([0.0, 0.5, 0.8, 1]);
        brlt.getXform().setPosition(920, 137);
        brlt.getXform().setSize(175, 28);
        this.mObstacles.push(brlt);

        let brltb = new Renderable(this.mConstColorShader);
        brltb.setColor([0.0, 0, 0, 1]);
        brltb.getXform().setPosition(920, 137);
        brltb.getXform().setSize(155, 13);
        this.mObstacles.push(brltb);

        /////////// BOTTOM RIGHT L SIDE ////////////////
        let brls = new Renderable(this.mConstColorShader);
        brls.setColor([0.0, 0.5, 0.8, 1]);
        brls.getXform().setPosition(845, 105);
        brls.getXform().setSize(25, 40);
        this.mObstacles.push(brls);

        let brlsb = new Renderable(this.mConstColorShader);
        brlsb.setColor([0.0, 0, 0, 1]);
        brlsb.getXform().setPosition(845, 105);
        brlsb.getXform().setSize(10, 25);
        this.mObstacles.push(brlsb);

        let brlgap = new Renderable(this.mConstColorShader);
        brlgap.setColor([0.0, 0, 0, 1]);
        brlgap.getXform().setPosition(845, 128.5);
        brlgap.getXform().setSize(10, 30);
        this.mObstacles.push(brlgap);

        ///////////// BOTTOM RIGHT HORIZONTAL RECTANGLE ////////////
        let brhr = new Renderable(this.mConstColorShader);
        brhr.setColor([0.0, 0.5, 0.8, 1]);
        brhr.getXform().setPosition(1090, 137);
        brhr.getXform().setSize(91, 28);
        this.mObstacles.push(brhr);

        let brhrb = new Renderable(this.mConstColorShader);
        brhrb.setColor([0.0, 0, 0, 1]);
        brhrb.getXform().setPosition(1090, 137);
        brhrb.getXform().setSize(71, 13);
        this.mObstacles.push(brhrb);


    };

    MyGame3.prototype.Maze1Manipulation = function()
    {
        /*let mtempRU = new Renderable(this.mConstColorShader);
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
        this.mBorder.push(mtempMid)*/

    };


    const routeSize = 15;

    MyGame3.prototype.checkPelletObstacleLoc = function(x,y) {
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

    MyGame3.prototype.checkPelletBorderLoc = function(x,y) {
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

    MyGame3.prototype.initializePellets = function () {
        var xBound = 150;
        var yUpper = 650;
        var yLower = 80;

        // Fill top
        for(let row = 0; row < 30; row ++) {

            var tempxBound = xBound;
            for(let column = 0; column < 47 ; column ++) {
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

    MyGame3.prototype.addPellet = function (x, y) {
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

    MyGame3.prototype.initializeText = function () {
        this.mLevelText = new FontRenderable("LEVEL");
        this.mLevelText.setFont(this.kFont);
        this._initText(this.mLevelText, 800, 55, [1, 1, 1, 1], 36);

        this.mScoreText = new FontRenderable("SCORE");
        this.mScoreText.setFont(this.kFont);
        this._initText(this.mScoreText, 330, 55, [1, 1, 1, 1], 36);

        this.mLevelNum = new FontRenderable("03");
        this.mLevelNum.setFont(this.kFont);
        this._initText(this.mLevelNum, 940, 55, [1, 1, 1, 1], 36);

        this.mScoreNum = new FontRenderable("00");
        this.mScoreNum.setFont(this.kFont);
        this._initText(this.mScoreNum, 470, 55, [1, 1, 1, 1], 36);
    };

    this.mAnimatedPacman = new AnimatedPacman(this.kMovingPacman, this.kMovingPacmanRight, 450, 610);

    this.mGhostBlinky = new AnimatedGhost(this.Blinky[0], this.Blinky[1], this.Blinky[2], this.Blinky[3],635, 530)
    this.mGhostFunky = new AnimatedGhost(this.Funky[0], this.Funky[1], this.Funky[2], this.Funky[3],595, 100)
    this.mGhostInky = new AnimatedGhost(this.Inky[0], this.Inky[1], this.Inky[2], this.Inky[3],715, 315)
    this.mGhostPinky = new AnimatedGhost(this.Pinky[0], this.Pinky[1], this.Pinky[2], this.Pinky[3],435, 540)

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
MyGame3.prototype.draw = function () {
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
MyGame3.prototype.update = function () {
    const pacOgSize = 22.5;


    const resetX = 450;
    const resetY = 600;

    MyGame3.prototype.checkCollisionWithPallets = function () {
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

    MyGame3.prototype.checkCollisionWithBorders = function () {
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

    MyGame3.prototype.checkCollisionWithObstacles = function () {
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
                pacmanX  < (obstacleX + obstacleWidth/3) &&
                pacmanX + (pacOgSize) > (obstacleX - (obstacleWidth/3)) &&
                pacmanY  < (obstacleY + obstacleHeight/3) &&
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

    MyGame3.prototype.collisionGhost = function (mGhost)
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

    MyGame3.prototype.checkCollisionWithGhost = function (){
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


    if(this.mAnimatedPacman.getXform().getXPos()>(1150+10))
    {
        this.mAnimatedPacman.getXform().setXPos(130);
    }
    if(this.mAnimatedPacman.getXform().getXPos()<(130-10))
    {
        this.mAnimatedPacman.getXform().setXPos(1150);
    }

    this.originalX = this.mAnimatedPacman.getXform().getXPos();
    this.originalY = this.mAnimatedPacman.getXform().getYPos();


    this.mAnimatedPacman.update();
    this.mGhostBlinky.update(this.mBorder, this.mObstacles);
    this.mGhostPinky.update(this.mBorder, this.mObstacles);
    this.mGhostInky.update(this.mBorder, this.mObstacles);
    this.mGhostFunky.update(this.mBorder, this.mObstacles);

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.One)) {
        gEngine.GameLoop.stop();
    }

    if (this.totalScore === 5970)
    {
        gEngine.GameLoop.stop();
    }

};

MyGame3.prototype._initText = function (font, posX, posY, color, textH) {
    font.setColor(color);
    font.getXform().setPosition(posX, posY);
    font.setTextHeight(textH);
};