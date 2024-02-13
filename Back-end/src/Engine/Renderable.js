function Renderable(shader) {
    this.mShader = shader; // the shader for shading this object
    this.mColor = [1, 1, 1, 1];// Color for fragment shader
    this.mXform = new Transform();
}

Renderable.prototype.draw = function() {
    var gl = gEngine.Core.getGL();
    this.mShader.activateShader(this.mColor);
    this.mShader.loadObjectTransform(this.mXform.getXform());
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}

Renderable.prototype.setColor = function(color) { this.mColor = color; }
Renderable.prototype.getColor = function() { return this.mColor; }

// getter for mXform
Renderable.prototype.getXform = function() {return this.mXform;}