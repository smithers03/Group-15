// derived and extends the Renderable object functionality to render the object with a texture mapped to it.
"use strict";


function TextureRenderable(myTexture){
    Renderable.call(this);
    Renderable.prototype.setColor.call(this, [1,1,1,0]);
    // Alpha 0: switch off tinting
    Renderable.prototype._setShader.call(this, gEngine.DefaultResources.getTextureShader())
    this.mTexture = myTexture; // the Objects texture can't be null
}

TextureRenderable.prototype.draw = function () {
     // activate the texture
    gEngine.Textures.activateTexture(this.mTexture);
    Renderable.prototype.draw.call(this, vpMatrix);
}

TextureRenderable.prototype.getTexture = function() {return this.mTexture;}
TextureRenderable.prototype.setTexture = function(texture) {this.mTexture = t;}


gEngine.Core.inheritPrototype(TextureRenderable, Renderable);


