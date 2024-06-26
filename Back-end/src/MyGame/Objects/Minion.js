/* File: Minion.js
 *
 * Creates and initializes a Minion object
 * overrides the update function of GameObject to define
 * simple sprite animation behavior behavior
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteAnimateRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Minion(spriteTexture, atX, atY) {
    this.kDelta = 0.2;
    this.mMinion = new SpriteAnimateRenderable(spriteTexture);
    this.mMinion.setColor([1, 1, 1, 0]);
    this.mMinion.getXform().setPosition(atX, atY);
    this.mMinion.getXform().setSize(12, 9.6);
    this.mMinion.setSpriteSequence(512, 0,      // first element pixel position: top-left 512 is top of image, 0 is left of image
        204, 164,   // widthxheight in pixels
        5,          // number of elements in this sequence
        0);         // horizontal padding in between
    this.mMinion.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mMinion.setAnimationSpeed(30);
    // show each element for mAnimSpeed updates

    GameObject.call(this, this.mMinion);
}
gEngine.Core.inheritPrototype(Minion, GameObject);

Minion.prototype.update = function () {
    // remember to update this.mMinion's animation
    this.mMinion.updateAnimation();
};