"use strict";

function Renderable(shader) {
    this.mShader = gEngine.DefaultResources.getConstColorShader();
    this.mXform = new Transform();
    this.mColor = [1, 1, 1, 1];// Color for fragment shader
}

Renderable.prototype.draw = function (aCamera) {
    var gl = gEngine.Core.getGL();
    this.mShader.activateShader(this.mColor, aCamera);  // always activate the shader first!
    this.mShader.loadObjectTransform(this.mXform.getXform());
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};

Renderable.prototype._setShader = function (s) {this.mShader = s;}
Renderable.prototype.setColor = function(color) { this.mColor = color;}
Renderable.prototype.getColor = function() { return this.mColor;}

// getter for mXform
Renderable.prototype.getXform = function() {return this.mXform;}