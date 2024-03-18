
"use strict";


function Camera(wcCenter, wcWidth, viewportArray) {
    // WC is the center
    this.mCameraState = new CameraState(wcCenter,wcWidth);
    this.mCameraShake = null;
    this.mViewport = viewportArray;  // [x, y, width, height]
    this.mNearPlane = 0;
    this.mFarPlane = 1000;

    // transformation matrices
    this.mViewMatrix = mat4.create();
    this.mProjMatrix = mat4.create();
    this.mVPMatrix = mat4.create();

    // background color
    this.mBgColor = [0.8, 0.8, 0.8, 1]; // RGB and Alpha
}

Camera.prototype.setWCCenter = function (xPos, yPos) {
    this.mWCCenter[0] = xPos;
    this.mWCCenter[1] = yPos;
};

Camera.prototype.getWCCenter = function () { return this.mWCCenter; };
Camera.prototype.setWCWidth = function (width) { this.mWCWidth = width; };
Camera.prototype.getWCWidth = function () { return this.mWCWidth; };
Camera.prototype.getWCHeight = function () { return this.mWCWidth * this.mViewport[3] / this.mViewport[2]; };
// viewportH/viewportW

Camera.prototype.setViewport = function (viewportArray) { this.mViewport = viewportArray; };
Camera.prototype.getViewport = function () { return this.mViewport; };
Camera.prototype.setBackgroundColor = function (newColor) { this.mBgColor = newColor; };
Camera.prototype.getBackgroundColor = function () { return this.mBgColor; };

Camera.prototype.getVPMatrix = function () {
    return this.mVPMatrix;
};

// Initializes the camera to begin drawing
Camera.prototype.setupViewProjection = function () {
    var gl = gEngine.Core.getGL();
    gl.viewport(this.mViewport[0],  // x position of bottom-left corner of the area to be drawn
        this.mViewport[1],  // y position of bottom-left corner of the area to be drawn
        this.mViewport[2],  // width of the area to be drawn
        this.mViewport[3]); // height of the area to be drawn
    // Step A2: set up the corresponding scissor area to limit the clear area
    gl.scissor(this.mViewport[0], // x position of bottom-left corner of the area to be drawn
        this.mViewport[1], // y position of bottom-left corner of the area to be drawn
        this.mViewport[2], // width of the area to be drawn
        this.mViewport[3]);// height of the area to be drawn
    // Step A3: set the color to be clear
    gl.clearColor(this.mBgColor[0], this.mBgColor[1], this.mBgColor[2], this.mBgColor[3]);  // set the color to be cleared
    // Step A4: enable the scissor area, clear, and then disable the scissor area
    gl.enable(gl.SCISSOR_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.disable(gl.SCISSOR_TEST);

    // Step B1: define the view matrix
    var center = [];
    if (this.mCameraShake !== null) {
        center = this.mCameraShake.getCenter();
    } else{
        center = thyis.getWCCenter();
    }
    mat4.lookAt(this.mViewMatrix,
        [this.mWCCenter[0], this.mWCCenter[1], 10],   // WC center
        [this.mWCCenter[0], this.mWCCenter[1], 0],    // 
        [0, 1, 0]);     // orientation

    // Step B2: define the projection matrix
    var halfWCWidth = 0.5 * this.mWCWidth;
    var halfWCHeight = 0.5 * this.getWCHeight(); // 
    mat4.ortho(this.mProjMatrix,
        -halfWCWidth,   // distance to left of WC
        halfWCWidth,   // distance to right of WC
        -halfWCHeight,  // distance to bottom of WC
        halfWCHeight,  // distance to top of WC
        this.mNearPlane,   // z-distance to near plane
        this.mFarPlane  // z-distance to far plane
    );

    // Step B3: concatenate view and project matrices
    mat4.multiply(this.mVPMatrix, this.mProjMatrix, this.mViewMatrix);
};

Camera.prototype.collideWCBound = function (aXform, zone) {
    var bbox = new BoundingBox(aXform.getPosition(), aXform.getWidth(), aXform.getHeight());
    var w = zone * this.getWCWidth();
    var h = zone * this.getWCHeight();
    var cameraBound = new BoundingBox(this.getWCCenter(), w, h);
    return cameraBound.boundCollideStatus(bbox);
};

// prevents the xform from moving outside of the WC boundary.
// by clamping the aXfrom at the boundary of WC, 
Camera.prototype.clampAtBoundary = function (aXform, zone) {
    var status = this.collideWCBound(aXform, zone);
    if (status !== BoundingBox.eboundCollideStatus.eInside) {
        var pos = aXform.getPosition();
        if ((status & BoundingBox.eboundCollideStatus.eCollideTop) !== 0) {
            pos[1] = (this.getWCCenter())[1] + (zone * this.getWCHeight() / 2) - (aXform.getHeight() / 2);
        }
        if ((status & BoundingBox.eboundCollideStatus.eCollideBottom) !== 0) {
            pos[1] = (this.getWCCenter())[1] - (zone * this.getWCHeight() / 2) + (aXform.getHeight() / 2);
        }
        if ((status & BoundingBox.eboundCollideStatus.eCollideRight) !== 0) {
            pos[0] = (this.getWCCenter())[0] + (zone * this.getWCWidth() / 2) - (aXform.getWidth() / 2);
        }
        if ((status & BoundingBox.eboundCollideStatus.eCollideLeft) !== 0) {
            pos[0] = (this.getWCCenter())[0] - (zone * this.getWCWidth() / 2) + (aXform.getWidth() / 2);
        }
    }
    return status;
};