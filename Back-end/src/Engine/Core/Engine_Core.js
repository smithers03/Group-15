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
        mGL = canvas.getContext("webgl" , {alpha: false})||
            canvas.getContext("experimental-webgl", {alpha: false});

        // Allows transparency around the textures
        mGL.blendFunc(mGL.SRC_ALPHA, mGL.ONE_MINUS_SRC_ALPHA);
        mGL.enable(mGL.BLEND);

        // set images to flip the y-axis to match te texture coordinate space
        // defines the origin of the uv coordinate to be in the lower-left corner
        mGL.pixelStorei(mGL.UNPACK_FLIP_Y_WEBGL, true);

        if (mGL === null) {
            document.write("<br><b>WebGL is not supported!</b>");
        }
    };

    var getGL = function () { return mGL; };

    var startScene = function (scene) {

        scene.loadScene.call(scene); // Calling this way to ensure the correct context  of the loading function
        gEngine.GameLoop.start(scene); //
    }

    var initializeEngineCore = function (htmlCanvasID, myGame) {
        _initializeWebGL(htmlCanvasID);
        gEngine.VertexBuffer.initialize();
        gEngine.Input.initialize();
        gEngine.DefaultResources.initialize(function () { startScene(myGame); });

    }

    var inheritPrototype = function(subClass, superClass) {
        var prototype = Object.create(superClass.prototype);
        prototype.constructor = subClass;
        subClass.prototype = prototype;
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
        inheritPrototype: inheritPrototype,
        startScene: startScene
    };

    return mPublic;
}());