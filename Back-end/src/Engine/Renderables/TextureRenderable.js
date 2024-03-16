// derived and extends the Renderable object functionality to render the object with a texture mapped to it.
"use strict";


function TextureRenderable(myTexture){
    Renderable.call(this);
    Renderable.prototype.setColor.call(this, [1,1,1,0]);
    // Alpha 0: switch off tinting
    Renderable.prototype._setShader.call(this, gEngine.DefaultResources.getTextureShader())
    // these tow instance variables are to cache texture information
    // for supportin per-pixel accurate collision
    this.mTexture = null;
    this.mColorArray = null;
    // defind for sebclass to override
    this.mTexWidth = 0;
    this.mTexHeight = 0;
    this.mTexLeftIndex = 0;
    this.mTexBottomIndex = 0;

    this.setTexture(myTexture);
}
gEngine.Core.inheritPrototype(TextureRenderable, Renderable);

TextureRenderable.prototype.draw = function (aCamera) {
    // activate the texture
    gEngine.Textures.activateTexture(this.mTexture);
    Renderable.prototype.draw.call(this, aCamera);
};

TextureRenderable.prototype.getTexture = function() {return this.mTexture;}
TextureRenderable.prototype.setTexture = function(newTexture) {
    this.mTexture = newTexture;
    // these two instance variables are to cache texture information
    // for supporting per-pixel accurate collision
    this.mTextureInfo = gEngine.Textures.getTextureInfo(newTexture);
    this.mColorArray = null;
    // defined for subclass to override
    this.mTexWidth = this.mTextureInfo.mWidth;
    this.mTexHeight = this.mTextureInfo.mHeight;
    this.mTexLeftIndex = 0;
    this.mTexBottomIndex = 0;
}




