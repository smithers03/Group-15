/* File: AnimatedGhost.js
 *
 * Creates and initializes an AnimatedGhost object with sprite animation
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteAnimateRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
function AnimatedGhost(originalSpriteTexture, flippedSpriteTexture , atX, atY) {
    this.kDelta = 0.3; // Define the speed of movement

    this.originalSpriteTexture = originalSpriteTexture;
    this.flippedSpriteTexture = flippedSpriteTexture;

    this.mGhost = new SpriteAnimateRenderable(originalSpriteTexture);
    this.mGhost.setColor([1, 1, 1, 0]);
    this.mGhost.getXform().setPosition(atX, atY);
    this.mGhost.getXform().setSize(10, 10); // Assuming you want a square frame, adjust if needed
    // Set the sprite sequence with the correct texture coordinates
    this.mGhost.setSpriteSequence(1024, 0,      // first element pixel position: top-left 512 is top of image, 0 is left of image
        341, 1024,   // widthxheight in pixels for each frame
        4,          // number of elements in this sequence
        16);         // horizontal padding in between
    this.mGhost.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mGhost.setAnimationSpeed(10);
    // show each element for mAnimSpeed updates

    GameObject.call(this, this.mGhost);

    this.lastDirection = null; // 'Right', 'Left', 'Up', 'Down'
}
gEngine.Core.inheritPrototype(AnimatedGhost, GameObject);

AnimatedGhost.prototype.update = function () {
    // control by Arrow Keys
    var xform = this.getXform();
    xform.setRotationInRad(0);


    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Up)) {
        this.lastDirection = 'Up';
        this.mGhost.setTexture(this.flippedSpriteTexture);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)) {
        this.lastDirection = 'Down';
        this.mGhost.setTexture(this.flippedSpriteTexture);

    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
        this.lastDirection = 'Left';
        this.mGhost.setTexture(this.originalSpriteTexture);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        this.lastDirection = 'Right';
        this.mGhost.setTexture(this.flippedSpriteTexture);
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

    this.mGhost.updateAnimation();
};





