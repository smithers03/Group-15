"use strict"
function Transform() {
    this.mPosition = vec2.fromValues(0, 0); // translation operator
    this.mScale = vec2.mScale = vec2.fromValues(1,1); // scaling operator
    this.mRotationInRad = 0.0; // rotatio  in radians
}

// position getters and setters
Transform.prototype.setPosition = function(xPos,yPos) {
    this.setXPos(xPos);
    this.setYPos(yPos);
}
Transform.prototype.getPosition = function() { return this.mPosition;}

// get Y and X
Transform.prototype.getXPos = function() { return this.mPosition[0];}
Transform.prototype.setXPos = function(xPos) {  this.mPosition[0] = xPos;}
Transform.prototype.getYPos = function() { return this.mPosition[1];}
Transform.prototype.setYPos = function(yPos) {this.mPosition[1] = yPos;}

// Incrementing X and Y by some value
Transform.prototype.incXPos = function(delta) {this.mPosition[0] += delta;}
Transform.prototype.incYPos = function(delta) {this.mPosition[1] += delta;}

Transform.prototype.setSize = function(width, height) {
    this.setWidth(width);
    this.setHeight(height);
}

Transform.prototype.getSize = function(){ return this.mScale; };



// Setting/getting width and height of the object
Transform.prototype.setWidth = function (width) {this.mScale[0] = width;}
Transform.prototype.getWidth = function () {return this.mScale[0];}
Transform.prototype.incWidthBy = function (delta) {this.mScale[0] += delta;}
Transform.prototype.setHeight = function (height)  { this.mScale[1] = height;}
Transform.prototype.getHeight = function () {return this.mScale[1];}
Transform.prototype.incHeightBy = function (delta) {this.mScale[1] += delta;}



//Rotating the object
Transform.prototype.setRotationInRad = function(rotationInRadians) {
    this.mRotationInRad = rotationInRadians;
    while (this.mRotationInRad > (2*Math.PI)) {
        this.mRotationInRad -= (2 * Math.PI);
    }
}
Transform.prototype.setRotationInDegree = function (rotationInDegree){
    this.setRotationInRad(rotationInDegree * Math.PI/180.0);
}

Transform.prototype.incRotationByDegree = function (deltaDegree) {
    this.incRotationByRad(deltaDegree * Math.PI / 180.0);
};
Transform.prototype.incRotationByRad = function (deltaRad) {
    this.setRotationInRad(this.mRotationInRad + deltaRad);
};
Transform.prototype.getRotationInRad = function () {  return this.mRotationInRad; };
Transform.prototype.getRotationInDegree = function () { return this.mRotationInRad * 180.0 / Math.PI; };

Transform.prototype.getXform = function() {
    //Creates a blank identity matrix
    var matrix = mat4.create();
    //computing translation for now z is always a 0.0
    mat4.translate(matrix, matrix, vec3.fromValues(this.getXPos(), this.getYPos(), 0.0));
    //concatenating with rotation
    mat4.rotateZ(matrix, matrix, this.getRotationInRad());
    //concatenating with scaling
    mat4.scale(matrix, matrix, vec3.fromValues(this.getWidth(), this.getHeight(), 1.0))
    return matrix;
}