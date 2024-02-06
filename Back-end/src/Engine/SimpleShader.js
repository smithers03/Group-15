function SimpleShader(vertexShaderID, fragmentShaderID) {
  //instance variables (Convention: all instance variables: mVariables)
  this.mCompileShader = null;

  //reference to the pixelColor uniform in the fragment shader
  this.mPixelColor = null;

  // reference to the compiled shader in webGL context
  this.mShaderVertexPositionAttribute = null;
  // reference to SquareVertexPosition in shader
  var gl = gEngine.Core.getGL();

  // start of constructor code
  //
  // Step A: load and compile vertex and fragment shaders
  var vertexShader = this._loadAndCompileShader(vertexShaderID, gl.VERTEX_SHADER);
  var fragmentShader = this._loadAndCompileShader(fragmentShaderID,
    gl.FRAGMENT_SHADER);


  //Step B: Create and link the shaders into a program.
  this.mCompileShader = gl.createProgram();
  gl.attachShader(this.mCompileShader, vertexShader);
  gl.attachShader(this.mCompileShader, fragmentShader);
  gl.linkProgram(this.mCompileShader);


  //Step C: check for errors
  if (!gl.getProgramParameter(this.mCompileShader, gl.LINK_STATUS)) {
    alert("Error linking shader");
    return null;
  }

  // Step D: Gets a reference to the aSquareVertexPosition attribute
  this.mShaderVertexPositionAttribute = gl.getAttribLocation(this.mCompileShader, "aSquareVertexPosition");

  //Activating the vertex buffer loaded in Engine.Core_VertexBuffer
  gl.bindBuffer(gl.ARRAY_BUFFER, gEngine.VertexBuffer.getGLVertexRef());

  //Describing the characteristic of the vertex position attribute
  gl.vertexAttribPointer(this.mShaderVertexPositionAttribute,
    3,
    gl.FLOAT,
    false,
    0,
    0);

  // Gets a ref to the uniform variable uPixelColor in the fragment shader
  this.mPixelColor = gl.getUniformLocation(this.mCompileShader, "uPixelColor");

}


SimpleShader.prototype._loadAndCompileShader = function(filePath, shaderType) {
  var shaderText, shaderSource, compiledShader;
  var gl = gEngine.Core.getGL();

  // Step A: Get the shader source from index.html
  //shaderText = document.getElementById(id);
  // shaderSource = shaderText.firstChild.textContent;
  xmlReq = new XMLHttpRequest();
  xmlReq.open('GET', filePath, false);
  try{
    xmlReq.send();
  } catch (error) {
    alert("Failed to load shader: " + filePath);
    return null;
  }
  shaderSource = xmlReq.responseText;
  if (shaderSource === null) {
    alert("WARNING: Loading of: " + filePath + "Failed!");
    return null;
  }
  // Step B: Create the shader based on the shader type: vertex or fragment
  compiledShader = gl.createShader(shaderType);

  // Step C: Compile the created shader
  gl.shaderSource(compiledShader, shaderSource);
  gl.compileShader(compiledShader);

  // Step D: check for errors and return results (null if error)
  // The log info is how shader compilation errors are typically displayed.
  // This is useful for debugging the shaders.
  if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
    alert("A shader compiling error occurred: " +
      gl.getShaderInfoLog(compiledShader));
  }
  return compiledShader;
};




SimpleShader.prototype.activateShader = function(pixelColor) {
  var gl = gEngine.Core.getGL();
  gl.useProgram(this.mCompileShader);
  gl.enableVertexAttribArray(this.mShaderVertexPositionAttribute);
  gl.uniform4fv(this.mPixelColor, pixelColor);
};


