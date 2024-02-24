"use strict"

var gEngine = gEngine || {};
gEngine.GameLoop = (function(){

    var kFPS = 60;
    var kMPF = 1000/kFPS;

    //Variables for timing loop
    var mPreviousTime = Date.now();
    var mLagTime;

    //The current loop state
    var mIsLoopRunning = false;

    //Reference to game
    var mMyGame = null;
    var _runLoop = function () {
        if(mIsLoopRunning) {
            //set up for next call to run loop and update input
            requestAnimationFrame(function () {
                _runLoop.call(mMyGame);
            });

            //Computing elapsed time
            var currentTime = Date.now();
            var elapsedTime = currentTime - mPreviousTime;
            mPreviousTime = currentTime;
            mLagTime += elapsedTime;

            // updating the game n number of times.
            while ((mLagTime >= kMPF) && mIsLoopRunning) {
                gEngine.Input.update();
                this.update();
                mLagTime -= kMPF;
            }
            this.draw(); // call Renderable.draw()
        }
    }

    var _startLoop = function () {
        // Step A: reset frame time
        mPreviousTime = Date.now();
        mLagTime = 0.0;

        // Step B: remember that loop is now running
        mIsLoopRunning = true;

        // Step C: request _runLoop to start when loading is done
        requestAnimationFrame(function () { _runLoop.call(mMyGame); });
    };


    var start = function (myGame) {
        mMyGame = myGame;


        mMyGame = myGame;
        gEngine.ResourceMap.setLoadCompleteCallback(
            function () {
                mMyGame.initialize();
                _startLoop();
            }
        );

    }

    var mPublic = {
        start: start
    }


    return mPublic;
}());