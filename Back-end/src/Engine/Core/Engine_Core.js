"use strict";

var gEngine = gEngine || { };

gEngine.Core = (function () {
    //instance variables
    // The graphical context to draw to
    var mGL = null;

    // initialize the WebGL, the vertex buffer and compile the shaders
    var _initializeWebGL = function (htmlCanvasID) {
        var canvas = document.getElementById(htmlCanvasID);

        // Get the standard or experimental webgl and binds to the Canvas area
        // store the results to the instance variable mGL
        mGL = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

        if (mGL === null) {
            document.write("<br><b>WebGL is not supported!</b>");
            return;
        }
    };

    var getGL = function () { return mGL; };

    var startScene = function (myGame) {
        myGame.loadScene.call(myGame); // Calling this way to ensure the correct context
        myGame.initialize.call(myGame); // Call initialize only after async
        gEngine.GameLoop.start(myGame);
    }

    var initializeEngineCore = function (htmlCanvasID, myGame) {
        _initializeWebGL(htmlCanvasID);
        gEngine.VertexBuffer.initialize();
        gEngine.Input.initialize();
        gEngine.DefaultResources.initialize(function () { startScene(myGame); });

    }

    // Clears the draw area and draws one square
    var clearCanvas = function (color) {
        mGL.clearColor(color[0], color[1], color[2], color[3]);  // set the color to be cleared
        mGL.clear(mGL.COLOR_BUFFER_BIT);      // clear to the color previously set
    };

    // -- end of public methods

    var mPublic = {
        getGL: getGL,
        initializeEngineCore: initializeEngineCore,
        clearCanvas: clearCanvas,
        startScene: startScene
    };

    return mPublic;
}());