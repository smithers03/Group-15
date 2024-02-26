
attribute vec3 aSquareVertexPosition; // ecpect one vertex Poition
attribute vec2 aTextureCoordinate;


// texture coordinate that well map the entire image to the entire square
varying vec2 vTextCoord;

// to thransform the vetex position
uniform mat4 uModelTransform;
uniform mat4 uViewProjTransform;

void main(void) {
    gl_Position = uViewProjTransform * uModelTransform *
            vec4(aSquareVertexPosition, 1.0);

    // the texture coordinate to the fragment shader
    vTextCoord = aTextureCoordinate;
}