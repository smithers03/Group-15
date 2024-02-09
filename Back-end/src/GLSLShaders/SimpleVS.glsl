attribute vec3 aSquareVertexPosition; // Expect one vertex position
uniform mat4 uModelTransform;
void main(void) {
  gl_Position = vec4(aSquareVertexPosition, 1.0);

}
