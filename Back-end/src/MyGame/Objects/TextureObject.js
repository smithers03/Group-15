"use strict";

function TextureObject(texture, x, y, w, h) {
    this.kDelta = 0.2;

    this.mRenderable = new TextureRenderable(texture);
    this.mRenderable.setColor([1, 1, 1, 0.1]);
    this.mRenderable.getXform().setPosition(x, y);
    this.mRenderable.getXform().setSize(w, h);
    GameObject.call(this, this.mRenderable);
}
gEngine.Core.inheritPrototype(TextureObject, GameObject);

TextureObject.prototype.update = function (up, down, left, right) {
    var xform = this.getXform();
    if (gEngine.Input.isKeyPressed(up)) {
        xform.incYPos(this.kDelta);
    }
    if (gEngine.Input.isKeyPressed(down)) {
        xform.incYPos(-this.kDelta);
    }
    if (gEngine.Input.isKeyPressed(left)) {
        xform.incXPos(-this.kDelta);
    }
    if (gEngine.Input.isKeyPressed(right)) {
        xform.incXPos(this.kDelta);
    }
};