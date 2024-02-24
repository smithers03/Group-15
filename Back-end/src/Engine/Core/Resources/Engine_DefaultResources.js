"use strict";

var gEngine = gEngine || { };

gEngine.DefaultResources = (function () {
//Simple shader GLSL Shader file paths
    var kSimpleVS = "src/GLSLShaders/SimpleVS.glsl";
    var kSimpleFS = "src/GLSLShaders/SimpleFS.glsl";
    var mConstColorShader = null;

    var getConstColorShader = function () { return mConstColorShader;}





    //call back function after loading are done
    var _createShaders = function (callBackFunction) {
        mConstColorShader = new SimpleShader(kSimpleVS, kSimpleFS);
        callBackFunction();
    };

    // initiate asynchronous loading af GLSL Shader files
    var initialize = function (callBackFunction) {
        // constant color shader: SimpleVS, and Simple FS
        gEngine.TextFileLoader.loadTextFile(kSimpleVS,
            gEngine.TextFileLoader.eTextFileType.eTextFile);
        gEngine.TextFileLoader.loadTextFile(kSimpleFS,
            gEngine.TextFileLoader.eTextFileType.eTextFile);

        gEngine.ResourceMap.setLoadCompleteCallback(
            function() {_createShaders(callBackFunction)});
    };

    var mPublic = {
        initialize: initialize,
        getConstColorShader: getConstColorShader
    };
    return mPublic;

}())



