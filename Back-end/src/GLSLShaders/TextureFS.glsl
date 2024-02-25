precision mediump float;

// object that fetches data from textrue.
// Must be set outside the shader
uniform sampler2D uSampler;


// coloe of pixel
uniform vec4 uPixelColor;

// The "varying" keyword is for singnifing that the texture coordinate will be interpolated and thus varies
varying vec2 vTextCoord;




void main (void) {
    // texel color look up based on interpolated UV value in vTexCoord
    vec4 c = texture2D(uSampler, vec2(vTextCoord.s, vTextCoord.t));


    //tint  the textured area and leave the trasparent area outside the texture

    vec3 r = vec3(c) * (1.0 - uPixelColor.a) + vec3(uPixelColor) * uPixelColor.a;
    vec4 result = vec4(r, c.a);

    gl_FragColor = result;
}