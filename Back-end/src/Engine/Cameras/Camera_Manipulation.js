"use strict"



Camera.prototype.panBy = function (dx, dy) {
    this.mWCCenter[0] += dx;
    this.mWCCenter[1] += dy;
}

Camera.prototype.panTo = function (cx, cy) {
    this.setWCCenter(cx, cy);
}

Camera.prototype.panWith = function (aXform, zone) {
    var status = this.collideWCBound(aXform, zone);
    if(status !== BoundingBox.eboundCollideStatus.eInside){
        var pos = aXform.getPosition();
        var newC = this.getWCCenter();
        if ((status & BoundingBox.eboundCollideStatus.eCollideTop) !== 0)
            newC[1] = pos[1] + (aXform.getHeight() / 2) -
                (zone * this.getWCHeight() / 2);
        if ((status & BoundingBox.eboundCollideStatus.eCollideBottom) !== 0)
            newC[1] = pos[1] - (aXform.getHeight() / 2) +
                (zone * this.getWCHeight() / 2);
        if ((status & BoundingBox.eboundCollideStatus.eCollideRight) !== 0)
            newC[0] = pos[0] + (aXform.getHeight() / 2) -
                (zone * this.getWCHeight() / 2);
        if ((status & BoundingBox.eboundCollideStatus.eCollideLeft) !== 0)
            newC[0] = pos[0] - (aXform.getHeight() / 2) +
                (zone * this.getWCHeight() / 2);
    }
}

// zoom towards with respect of the center of the camera
Camera.prototype.zoomBy = function (zoom) {
    if (zoom > 0)
        this.mWCWidth *= zoom;
}

// zoom towards the certain point (hero)
Camera.prototype.zoomTowards = function (pos,zoom) {
    var delta = [];
    vec2.sub(delta,pos,this.mWCCenter);
    vec2.scale(delta,delta,zoom-1);
    vec2.sub(this.mWCCenter, this.mWCCenter, delta);
    this.zoomBy(zoom);
}


