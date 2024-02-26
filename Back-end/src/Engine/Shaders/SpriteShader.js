"use strict"


function SpriteShader(vertexShaderPath, fragmentShaderPath) {
    // calling superclass
    TextureShader.call(this,vertexShaderPath,fragmentShaderPath);


    this.mTexCoordBuffer = null; // gl buffer containing texture coordinate
    var initTexCoord = [
        1.0, 1.0,
        0.0, 1.0,
        1.0, 0.0,
        0.0, 0.0
    ];

    var gl = gEngine.Core.getGL();
    this.mTexCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.mTexCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(initTexCoord),
        gl.DYNAMIC_DRAW);
}

// same functions as in Simple Shader
gEngine.Core.inheritPrototype(SpriteShader, TextureShader);
gEngine.Core.inheritPrototype(SpriteShader, TextureShader);

//</editor-fold>

// Overriding the Activation of the shader for rendering
SpriteShader.prototype.activateShader = function (pixelColor, vpMatrix) {
    // first call the super class's activate
    SimpleShader.prototype.activateShader.call(this, pixelColor, vpMatrix);

    // now binds the proper texture coordinate buffer
    var gl = gEngine.Core.getGL();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.mTexCoordBuffer);
    gl.vertexAttribPointer(this.mShaderTextureCoordAttribute,
        2,
        gl.FLOAT,
        false,
        0,
        0);
    gl.enableVertexAttribArray(this.mShaderTextureCoordAttribute);
};

SpriteShader.prototype.setTextureCoordinate = function (texCoord) {
    var gl = gEngine.Core.getGL();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.mTexCoordBuffer);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(texCoord));
};
