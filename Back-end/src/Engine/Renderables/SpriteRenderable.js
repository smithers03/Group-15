
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function SpriteRenderable(myTexture) {
    TextureRenderable.call(this, myTexture);
    Renderable.prototype._setShader.call(this, gEngine.DefaultResources.getSpriteShader());
    this.mTexLeft = 0.0;   // bounds of texture coordinate (0 is left, 1 is right)
    this.mTexRight = 1.0;  //
    this.mTexTop = 1.0;    //   1 is top and 0 is bottom of image
    this.mTexBottom = 0.0; //

    //
    this._setTexInfo();
}
gEngine.Core.inheritPrototype(SpriteRenderable, TextureRenderable);

//  [0] [1]: is u/v coordinate of Top-Right
//  [2] [3]: is u/v coordinate of Top-Left
//  [4] [5]: is u/v coordinate of Bottom-Right
//  [6] [7]: is u/v coordinate of Bottom-Left
// Convention: eName is an enumerated data type
SpriteRenderable.eTexCoordArray = Object.freeze({
    eLeft: 2,
    eRight: 0,
    eTop: 1,
    eBottom: 5
});

SpriteRenderable.prototype.setElementUVCoordinate = function (left, right, bottom, top) {
    this.mTexLeft = left;
    this.mTexRight = right;
    this.mTexBottom = bottom;
    this.mTexTop = top;
    this._setTexInfo();
};

// specify  region by pixel positions (between 0 to image resolutions)
SpriteRenderable.prototype.setElementPixelPositions = function (left, right, bottom, top) {
    var imageW = this.mTextureInfo.mWidth;
    var imageH = this.mTextureInfo.mHeight;

    this.mTexLeft = left / imageW;
    this.mTexRight = right / imageW;
    this.mTexBottom = bottom / imageH;
    this.mTexTop = top / imageH;
    this._setTexInfo();
};

SpriteRenderable.prototype.getElementUVCoordinateArray = function () {
    return [
        this.mTexRight,  this.mTexTop,          // x,y of top-right
        this.mTexLeft,   this.mTexTop,
        this.mTexRight,  this.mTexBottom,
        this.mTexLeft,   this.mTexBottom
    ];
};

SpriteRenderable.prototype.draw = function (aCamera) {
    this.mShader.setTextureCoordinate(this.getElementUVCoordinateArray());
    TextureRenderable.prototype.draw.call(this, aCamera);
};