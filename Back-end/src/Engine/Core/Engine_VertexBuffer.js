"use strict";

var gEngine = gEngine ||{};


// The VertexBuffer object

gEngine.VertexBuffer = (function () {
    // reference to the vertex positions for the square in the gl context
    var mSquareVertexBuffer = null;

    // reference to the texture position for the square vertices in the gl context

    var mTextureCoordBuffer = null;

    //  Defining the vertices for a square

    var verticesOfSquare = [
        0.5, 0.5, 0.0,
       -0.5, 0.5, 0.0,
        0.5, -0.5, 0.0,
       -0.5, -0.5, 0.0
    ];

    // defining the corresponding texture coordinates
    var textureCoordinates = [
        1.0, 1.0,
        0.0, 1.0,
        1.0, 0.0,
        0.0, 0.0
    ];




    var initialize = function () {
        var gl = gEngine.Core.getGL();

        //                                  VERTEX POSITIONS
        // Step A: Create a buffer on the gGL context for our vertex positions
        mSquareVertexBuffer = gl.createBuffer();

        // Step B: Activate vertexBuffer
        gl.bindBuffer(gl.ARRAY_BUFFER, mSquareVertexBuffer);

        // Step C: Loads verticesOfSquare into hte vertexBuffer
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesOfSquare), gl.STATIC_DRAW);
        //                                  TEXTURE POSITION
        mTextureCoordBuffer = gl.createBuffer();

        // Activating vertex Buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, mTextureCoordBuffer);

        // Loads verticesOfSquare into the vertexBuffer
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);
    }


    var getGLTexCoordRef = function () { return mTextureCoordBuffer;}

    var getGLVertexRef = function () {return mSquareVertexBuffer;}

    var mPublic = {
        initialize: initialize,
        getGLVertexRef: getGLVertexRef,
        getGLTexCoordRef: getGLTexCoordRef
    };
    return mPublic
})();