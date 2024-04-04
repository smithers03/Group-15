/* File: AnimatedGhost.js
 *
 * Creates and initializes an AnimatedGhost object with sprite animation
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteAnimateRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
function AnimatedGhost(startTexture, downTexture, leftTexture, rightTexture,  atX, atY) {
    this.kDelta = 1.2; // Define the speed of movement


    this.startTexture = startTexture;
    this.leftTexture = leftTexture;
    this.rightTexture = rightTexture;
    this.downTexture = downTexture;


    this.mGhost = new SpriteRenderable(startTexture);
    this.mGhost.setColor([1, 1, 1, 0]);
    this.mGhost.getXform().setPosition(atX, atY);
    this.mGhost.getXform().setSize(40, 40); // Assuming you want a square frame, adjust if needed
    this.mGhost.setElementPixelPositions(0, 256, 0, 256);

    /* // Set the sprite sequence with the correct texture coordinates
    this.mGhost.setSpriteSequence(1024, 0,      // first element pixel position: top-left 512 is top of image, 0 is left of image
        341, 1024,   // widthxheight in pixels for each frame
        4,          // number of elements in this sequence
        16);         // horizontal padding in between
    this.mGhost.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mGhost.setAnimationSpeed(10);
    // show each element for mAnimSpeed updates*/

    GameObject.call(this, this.mGhost);

    this.setSpeed(0.3);
    this.lastDirection = null; // 'Right', 'Left', 'Up', 'Down'
}
gEngine.Core.inheritPrototype(AnimatedGhost, GameObject);

AnimatedGhost.prototype.update = function () {
    // control by Arrow Keys
    var xform = this.getXform();
    xform.setRotationInRad(0);


    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) {
        this.lastDirection = 'Up';
        this.mGhost.setTexture(this.startTexture);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
        this.lastDirection = 'Down';
        this.mGhost.setTexture(this.downTexture);

    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
        this.lastDirection = 'Left';
        this.mGhost.setTexture(this.leftTexture);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
        this.lastDirection = 'Right';
        this.mGhost.setTexture(this.rightTexture);
    }


    switch (this.lastDirection) {
        case 'Right':
            xform.incXPos(this.kDelta);
            //xform.setRotationInRad(0);
            break;
        case 'Left':
            xform.incXPos(-this.kDelta);
            break;
        case 'Up':
            xform.incYPos(this.kDelta);
            //xform.setRotationInRad(Math.PI / 2);
            break;
        case 'Down':
            xform.incYPos(-this.kDelta);
            //xform.setRotationInRad(-Math.PI / 2);
            break;
    }

    //this.mGhost.updateAnimation();
};