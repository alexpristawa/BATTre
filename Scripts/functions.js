Array.prototype.toRGB = function(multiplier = 1) {
    if(this.length == 3) {
        return `rgb(${(this[0] * multiplier).toFixed(0)}, ${(this[1] * multiplier).toFixed(0)}, ${(this[2] * multiplier).toFixed(0)})`;
    } else if(this.length == 4) {
        return `rgba(${(this[0] * multiplier).toFixed(0)}, ${(this[1] * multiplier).toFixed(0)}, ${(this[2] * multiplier).toFixed(0)}, ${this[4]})`;
    }
}