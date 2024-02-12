
function MyGame(htmlCanvasID) {
  // Step A :  initialize the webGL Context
  gEngine.Core.initializeWebGL(htmlCanvasID);


  // Step B: Create the shader
  this.mConstColorShader = new SimpleShader(
      "src/GLSLShaders/SimpleVS.glsl",
      "src/GLSLShaders/SimpleFS.glsl");


  // concatenation matrices  to a single transform that implements TRS.

// Step C: Create the Renderable objects:
  this.mWhiteSq = new Renderable(this.mConstColorShader);
  this.mWhiteSq.setColor([1,1,0.4,1]);
  this.mRedSq = new Renderable(this.mConstColorShader);
  this.mRedSq.setColor([1,0,0,1]);
  //Step D: Draw!
  gEngine.Core.clearCanvas([0.3,0.7,0.8,1]); // clear canvas

  // creating a new identify transform operator
  var xform = glMatrix.mat4.create();
  //Step E: compute the white square transform
  glMatrix.mat4.translate(xform, xform, vec3.fromValues(-0.25, 0.25, 0.0));
  glMatrix.mat4.rotateZ(xform, xform, 0.2); // rotation in radians
  glMatrix.mat4.scale(xform, xform, vec3.fromValues(2.4, 1.2, 1.0));

  // Step F: draw the white square with the computed transform
  this.mWhiteSq.draw(xform)
  //Step G: compute the red square transform
  glMatrix.mat4.identity(xform); // restart
  glMatrix.mat4.translate(xform, xform, vec3.fromValues(0.25, -0.25, 0.0));
  glMatrix.mat4.rotateZ(xform, xform, -0.785);
  glMatrix.mat4.scale(xform, xform, vec3.fromValues(0.4, 0.4, 1.0));

  // Step H: draw the red square with the computed transform
  this.mRedSq.draw(xform);
};




