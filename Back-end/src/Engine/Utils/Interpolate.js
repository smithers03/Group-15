"use strict"

function Interpolate(value, cycles, rate){
    this.mCurrentValue = value;
    this.mFinalValue = value;
    this.mCycles = cycles;
    this.mRate = rate;

    // number of cycles left for interpolation
    this.mCyclesLeft = 0;
}

Interpolate.prototype._interpolateValue = function() {
    this.mCurrentValue = this.mCurrentValue +
        this.mRate * (this.mFinalValue - this.mCurrentValue);
}

Interpolate.prototype.getValue = function () {return this.mCurrentValue;}

Interpolate.prototype.configInterpolation = function (stiffness, duration) {
    this.mRate = stiffness;
    this.mCycles = duration;
}

Interpolate.prototype.setFinalValue = function (v) {
    this.mFinalValue = v;
    this.mCyclesLeft = this.mCycles;
}

Interpolate.prototype.updateInterpolation = function() {
    if (this.mCycles <= 0)
        return;
    this.mCyclesLeft--;
    if(this.mCycles === 0)
        this.mCurrentValue = this.mFinalValue;
    else
        this._interpolateValue();
}

