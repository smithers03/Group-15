attribute vec3 aSquareVertexPosition; // Expect one vertex position
uniform mat4 uModelTransform; // to transform vertex position
void main(void) {
  gl_Position = uModelTransform * vec4(aSquareVertexPosition, 1.0);
}
