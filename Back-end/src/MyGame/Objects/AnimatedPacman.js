/* File: AnimatedPacman.js
 *
 * Creates and initializes an AnimatedPacman object with sprite animation
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteAnimateRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
function AnimatedPacman(originalSpriteTexture, flippedSpriteTexture , atX, atY) {
    this.kDelta = 1.2; // Define the speed of movement

    this.originalSpriteTexture = originalSpriteTexture;
    this.flippedSpriteTexture = flippedSpriteTexture;

    this.mPacman = new SpriteAnimateRenderable(originalSpriteTexture);
    this.mPacman.setColor([1, 1, 1, 0]);
    this.mPacman.getXform().setPosition(atX, atY);
    this.mPacman.getXform().setSize(35, 35); // Assuming you want a square frame, adjust if needed
    // Set the sprite sequence with the correct texture coordinates
    this.mPacman.setSpriteSequence(512, 0,      // first element pixel position: top-left 512 is top of image, 0 is left of image
        341, 512,   // widthxheight in pixels for each frame
        3,          // number of elements in this sequence
        0);         // horizontal padding in between
    this.mPacman.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mPacman.setAnimationSpeed(4);
    // show each element for mAnimSpeed updates

    GameObject.call(this, this.mPacman);

    this.lastDirection = null; // 'Right', 'Left', 'Up', 'Down'
}
gEngine.Core.inheritPrototype(AnimatedPacman, GameObject);

AnimatedPacman.prototype.update = function () {
    // control by Arrow Keys
    var xform = this.getXform();
    xform.setRotationInRad(0);


    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Up)) {
        this.lastDirection = 'Up';
        this.mPacman.setTexture(this.flippedSpriteTexture);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)) {
        this.lastDirection = 'Down';
        this.mPacman.setTexture(this.flippedSpriteTexture);

    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
        this.lastDirection = 'Left';
        this.mPacman.setTexture(this.originalSpriteTexture);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        this.lastDirection = 'Right';
        this.mPacman.setTexture(this.flippedSpriteTexture);
    }


    switch (this.lastDirection) {
        case 'Right':
            xform.incXPos(this.kDelta);
            xform.setRotationInRad(0);
            break;
        case 'Left':
            xform.incXPos(-this.kDelta);
            break;
        case 'Up':
            xform.incYPos(this.kDelta);
            xform.setRotationInRad(Math.PI / 2);
            break;
        case 'Down':
            xform.incYPos(-this.kDelta);
            xform.setRotationInRad(-Math.PI / 2);
            break;
    }

    this.mPacman.updateAnimation();
};





