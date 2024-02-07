/*function  MyGame(htmlCanvasID) {
  // The shader for drawing
  this.mShader = null;

  gEngine.Core.initializeWebGL(htmlCanvasID);

  this.mShader = new SimpleShader(
    "src/GLSLShaders/SimpleVS.glsl",
    "src/GLSLShaders/SimpleFS.glsl");

  // Clearing the canvas
  gEngine.Core.clearCanvas([0, 0.9, 0, 1]);

  // Activate the proper shader
  this.mShader.activateShader([0,0,1,1]);

  // Draw with the currently activated geometry and the activated shader
  var gl = gEngine.Core.getGL();
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}
 */
function MyGame(htmlCanvasID) {
  // Step A :  initialize the webGL Context
  gEngine.Core.initializeWebGL(htmlCanvasID);

  // Step B: Create the shader
  this.mConstColorShader = new SimpleShader(
      "src/GLSLShaders/SimpleVS.glsl",
      "src/GLSLShaders/SimpleVS.glsl");
  // Step C: Create the Renderable objects:
  this.mWhiteSq = new Renderable(this.mConstColorShader);
  this.mWhiteSq.setColor([1,1,1,1]);
  this.mRedSq = new Renderable(this.mConstColorShader);
  this.mRedSq.setColor([1,0,0,1]);
  //Step D: Draw!
  gEngine.Core.clearCanvas([0.3,0.2,0,1]); // clear canvas

  // Step d1: draw Renderable object with the white shader
  //this.mWhiteSq.draw();

  // Step d2: Draw Renderable objects with red shader
  //this.mRedSq.draw();
};




