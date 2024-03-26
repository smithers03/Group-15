/* File: AnimatedPacman.js
 *
 * Creates and initializes an AnimatedPacman object with sprite animation
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteAnimateRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
function AnimatedPacman(originalSpriteTexture, flippedSpriteTexture , atX, atY) {
    this.kDelta = 0.2; // Define the speed of movement

    this.originalSpriteTexture = originalSpriteTexture;
    this.flippedSpriteTexture = flippedSpriteTexture;

    this.mPacman = new SpriteAnimateRenderable(originalSpriteTexture);
    this.mPacman.setColor([1, 1, 1, 0]);
    this.mPacman.getXform().setPosition(atX, atY);
    this.mPacman.getXform().setSize(10, 10); // Assuming you want a square frame, adjust if needed
    // Set the sprite sequence with the correct texture coordinates
    this.mPacman.setSpriteSequence(512, 0,      // first element pixel position: top-left 512 is top of image, 0 is left of image
        341, 512,   // widthxheight in pixels for each frame
        3,          // number of elements in this sequence
        0);         // horizontal padding in between
    this.mPacman.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mPacman.setAnimationSpeed(20);
    // show each element for mAnimSpeed updates

    GameObject.call(this, this.mPacman);
}
gEngine.Core.inheritPrototype(AnimatedPacman, GameObject);

AnimatedPacman.prototype.update = function () {
    // control by Arrow Keys
    var xform = this.getXform();
    xform.setRotationInRad(0);

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        // Change to the flipped sprite
            this.mPacman.setTexture(this.flippedSpriteTexture);
    } else if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
        // Change back to the original sprite
            this.mPacman.setTexture(this.originalSpriteTexture);
    }

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Up)) {
        this.mPacman.setTexture(this.originalSpriteTexture);
        xform.setRotationInRad(-Math.PI / 2);
        xform.incYPos(this.kDelta);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)) {
        xform.setRotationInRad(-Math.PI / 2);
        this.mPacman.setTexture(this.flippedSpriteTexture);
        xform.incYPos(-this.kDelta);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
        xform.incXPos(-this.kDelta);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        xform.incXPos(this.kDelta);
    }

    this.mPacman.updateAnimation();
};





