
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



  //sets the white Renderable object's transform
  this.mWhiteSq.getXform().setPosition(-0.25, 0.25);
  this.mWhiteSq.getXform().setRotationInRad(0.2); // In Radians
  this.mWhiteSq.getXform().setSize(1.2, 1.2);

  // Step F: draws the white square (transform behavior in the object)
  this.mWhiteSq.draw();

  //Step G: sets the red square transform
  this.mRedSq.getXform().setXPos(0.45);
  this.mRedSq.getXform().setYPos(-0.25);
  this.mRedSq.getXform().setRotationInDegree(45);
  this.mRedSq.getXform().setWidth(0.5);
  this.mRedSq.getXform().setHeight(0.8);

  this.mRedSq.draw();
};




