/* File: AnimatedGhost.js
 *
 * Creates and initializes an AnimatedGhost object with sprite animation
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteAnimateRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!
function AnimatedGhost(startTexture, downTexture, leftTexture, rightTexture,  atX, atY) {
    this.kDelta = 1.2; // Define the speed of movement


    this.startTexture = startTexture;
    this.leftTexture = leftTexture;
    this.rightTexture = rightTexture;
    this.downTexture = downTexture;


    this.mGhost = new SpriteRenderable(startTexture);
    this.mGhost.setColor([1, 1, 1, 0]);
    this.mGhost.getXform().setPosition(atX, atY);
    this.mGhost.getXform().setSize(40, 40); // Assuming you want a square frame, adjust if needed
    this.mGhost.setElementPixelPositions(0, 256, 0, 256);

    /* // Set the sprite sequence with the correct texture coordinates
    this.mGhost.setSpriteSequence(1024, 0,      // first element pixel position: top-left 512 is top of image, 0 is left of image
        341, 1024,   // widthxheight in pixels for each frame
        4,          // number of elements in this sequence
        16);         // horizontal padding in between
    this.mGhost.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mGhost.setAnimationSpeed(10);
    // show each element for mAnimSpeed updates*/

    GameObject.call(this, this.mGhost);

    this.setSpeed(0.3);
    this.lastDirection = null; // 'Right', 'Left', 'Up', 'Down'
    this.ogX = this.getXform().getXPos();
    this.ogY = this.getXform().getYPos();
}
gEngine.Core.inheritPrototype(AnimatedGhost, GameObject);

AnimatedGhost.prototype.checkCollisionBorder = function (arrBord, gX, gY) {
    const ghostX = gX;
    const ghostY = gY;
    this.bordArr = arrBord;
    //const pacmanWidth = this.pacManTransform.getWidth();
    //const pacmanHeight = this.pacManTransform.getHeight();

    // Check collision with each border
    for (let i = 0; i < this.bordArr.length; i++) {
        const borderX = this.bordArr[i].getXform().getXPos();
        const borderY = this.bordArr[i].getXform().getYPos();
        const borderWidth = this.bordArr[i].getXform().getWidth();
        const borderHeight = this.bordArr[i].getXform().getHeight();

        // Check for overlap
        if (
            ghostX < borderX + (borderWidth) &&
            ghostX + (17.5) > borderX &&
            ghostY < borderY + (borderHeight) &&
            ghostY + (17.5) > borderY
        ) {
            // Collision detected
            //console.log("Collision detected - obstacle")
            return true;
        }
    }

    // No collision detected
    return false;
}

AnimatedGhost.prototype.checkCollisionObstacles = function (arrObstacles, gX, gY) {
    const ghostX = gX;
    const ghostY = gY;
    this.ObsclArr = arrObstacles;
    //const pacmanWidth = this.pacManTransform.getWidth();
    //const pacmanHeight = this.pacManTransform.getHeight();

    // Check collision with each border
    for (let i = 0; i < this.ObsclArr.length; i++) {
        const obstacleX = this.ObsclArr[i].getXform().getXPos();
        const obstacleY = this.ObsclArr[i].getXform().getYPos();
        const obstacleWidth = this.ObsclArr[i].getXform().getWidth();
        const obstacleHeight = this.ObsclArr[i].getXform().getHeight();

        // Check for overlap
        if (
            ghostX /*- ghostWidth*/ < (obstacleX + obstacleWidth/3) &&
            ghostX + (17.5) > (obstacleX - (obstacleWidth/3)) &&
            ghostY /*- ghostHeight*/ < (obstacleY + obstacleHeight/3) &&
            ghostY + (17.5) > (obstacleY - (obstacleHeight/3))
        ) {
            // Collision detected
            //console.log("Collision detected - obstacle")
            return true;
        }
    }

    // No collision detected
    return false;
}

AnimatedGhost.prototype.update = function (bArray, oArray) {
    // control by Arrow Keys
    var xform = this.getXform();
    xform.setRotationInRad(0);
    this.bLoc = bArray;
    this.oLoc = oArray;
    var collide =0;
    var proceed = true
    //this.tempDirection = "Up";
    //this.randMove = Math.floor((Math.random() * 4) + 1);
    //var tempX =0;
    //var tempY =0;

    /*if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) {
        this.lastDirection = 'Up';
        this.mGhost.setTexture(this.startTexture);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
        this.lastDirection = 'Down';
        this.mGhost.setTexture(this.downTexture);

    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
        this.lastDirection = 'Left';
        this.mGhost.setTexture(this.leftTexture);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
        this.lastDirection = 'Right';
        this.mGhost.setTexture(this.rightTexture);
    }*/
    if(this.checkCollisionBorder(this.bLoc, xform.getXPos(), xform.getYPos()))
    {
        //use original x form values here
        xform.setXPos(this.ogX);
        xform.setYPos(this.ogY);
        collide = 1;
    }
    else
    {
        if(this.checkCollisionObstacles(this.oLoc, xform.getXPos(), xform.getYPos()))
        {
            xform.setXPos(this.ogX);
            xform.setYPos(this.ogY);
            collide = 1;
        }
        else
        {
            collide = 0;
        }
    }

    if(collide === 1) {
        while(proceed===true)
        {
            this.randMove = Math.floor((Math.random() * 4) + 1);

            //Ghost random movement Decider
            switch (this.randMove) {
                case 1:
                    //tempX = xform.getXPos();
                    //tempY = xform.getYPos()+this.kDelta;
                    /*if(this.lastDirection==="Up")
                    {
                        proceed = true;
                        break;
                    }*/
                    if(this.checkCollisionBorder(this.bLoc, xform.getXPos(), xform.getYPos()+this.kDelta))
                    {
                        proceed=true;
                    }
                    else if(this.checkCollisionObstacles(this.oLoc, xform.getXPos(), xform.getYPos()+this.kDelta))
                    {
                        proceed = true;
                    }
                    else{
                        proceed = false
                    }
                    break;
                case 2:
                    //tempX = xform.getXPos();
                    //tempY = xform.getYPos()-this.kDelta;
                    /*if(this.lastDirection==="Down")
                    {
                        proceed = true;
                        break;
                    }*/
                    if(this.checkCollisionBorder(this.bLoc, xform.getXPos(), xform.getYPos()-this.kDelta))
                    {
                        proceed=true;
                    }
                    else if(this.checkCollisionObstacles(this.oLoc, xform.getXPos(), xform.getYPos()-this.kDelta))
                    {
                        proceed = true;
                    }
                    else{
                        proceed = false
                    }
                    break;
                case 3:
                    //tempX = xform.getXPos()-this.kDelta;
                    //tempY = xform.getYPos();
                    /*if(this.lastDirection==="Left")
                    {
                        proceed = true;
                        break;
                    }*/
                    if(this.checkCollisionBorder(this.bLoc, xform.getXPos()-this.kDelta, xform.getYPos()))
                    {
                        proceed=true;
                    }
                    else if(this.checkCollisionObstacles(this.oLoc, xform.getXPos()-this.kDelta, xform.getYPos()))
                    {
                        proceed = true;
                    }
                    else{
                        proceed = false
                    }
                    break;
                case 4:
                    //tempX = xform.getXPos()+this.kDelta;
                    //tempY = xform.getYPos();
                    /*if(this.lastDirection==="Right")
                    {
                        proceed = true;
                        break;
                    }*/
                    if(this.checkCollisionBorder(this.bLoc, xform.getXPos()+this.kDelta, xform.getYPos()))
                    {
                        proceed=true;
                    }
                    else if(this.checkCollisionObstacles(this.oLoc, xform.getXPos()+this.kDelta, xform.getYPos()))
                    {
                        proceed = true;
                    }
                    else{
                        proceed = false
                    }
                    break;
                default:
                    break;
            }
        }

    }

    switch (this.randMove) {
        case 1:
            this.lastDirection = 'Up';
            this.mGhost.setTexture(this.startTexture);
            break;
        case 2:
            this.lastDirection = 'Down';
            this.mGhost.setTexture(this.downTexture);
            break;
        case 3:
            this.lastDirection = 'Left';
            this.mGhost.setTexture(this.leftTexture);
            break;
        case 4:
            this.lastDirection = 'Right';
            this.mGhost.setTexture(this.rightTexture);
            break;
        default:
            this.lastDirection = 'Up';
            this.mGhost.setTexture(this.startTexture);
            break;
    }

    this.ogX = xform.getXPos();
    this.ogY = xform.getYPos();

    switch (this.lastDirection) {
        case 'Right':
            xform.incXPos(this.kDelta);
            //xform.setRotationInRad(0);
            break;
        case 'Left':
            xform.incXPos(-this.kDelta);
            break;
        case 'Up':
            xform.incYPos(this.kDelta);
            //xform.setRotationInRad(Math.PI / 2);
            break;
        case 'Down':
            xform.incYPos(-this.kDelta);
            //xform.setRotationInRad(-Math.PI / 2);
            break;
    }

    //this.prevForm = xform;

    //this.mGhost.updateAnimation();
};