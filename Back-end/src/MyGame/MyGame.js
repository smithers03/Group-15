
function MyGame(htmlCanvasID) {
  // Step A :  initialize the webGL Context
  gEngine.Core.initializeWebGL(htmlCanvasID);


  // Step B: Create the shader
  this.mConstColorShader = new SimpleShader(
      "src/GLSLShaders/SimpleVS.glsl",
      "src/GLSLShaders/SimpleFS.glsl");

  // creating a new identify transform operator
  var xform = mat4.create();

  // concatination matrices  to a single transform that implements TRS.

// Step C: Create the Renderable objects:
  this.mWhiteSq = new Renderable(this.mConstColorShader);
  this.mWhiteSq.setColor([1,1,1,1]);
  this.mRedSq = new Renderable(this.mConstColorShader);
  this.mRedSq.setColor([1,0,0,1]);
  //Step D: Draw!
  gEngine.Core.clearCanvas([0.3,0.8,0.8,1]); // clear canvas

  // Step d1: draw Renderable object with the white shader
  this.mWhiteSq.draw();

  // Step d2: Draw Renderable objects with red shader
  this.mRedSq.draw();

  //Step E: compute the white square transform
  mat4.translate(xform, xform, vec3.fromValues(-0.25, 0.25, 0.0));
  mat4.rotateZ(xform, xform, 0.2); // rotation in radians
  mat4.scale(xform, xform, vec3.fromValues(1.2, 1.2, 1.0));


  //Step F: draw the white square with the computed transform
  this.mWhiteSq.draw(xform);


  //Step G: compute the red square transform
  mat4.identity(xform); // restart
  mat4.translate(xform, xform, vec3.fromValues(0.25, -0.25, 0.0));
  mat4.rotateZ(xform, xform, -0.785);
  mat4.scale(xform, xform, vec3.fromValues(0.4, 0.4, 1.0));

  // Step H: draw the red square with the computed transform
  this.mRedSq.draw(xform);
};




