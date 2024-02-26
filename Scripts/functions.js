/*
    Array Prototype method with the multiplier for each value as parameter
*/
Array.prototype.toRGB = function(multiplier = 1) {
    if(this.length == 3) {
        return `rgb(${(this[0] * multiplier).toFixed(0)}, ${(this[1] * multiplier).toFixed(0)}, ${(this[2] * multiplier).toFixed(0)})`;
    } else if(this.length == 4) {
        return `rgba(${(this[0] * multiplier).toFixed(0)}, ${(this[1] * multiplier).toFixed(0)}, ${(this[2] * multiplier).toFixed(0)}, ${this[4]})`;
    }
}

//Keydown functions
document.addEventListener('keydown', (event) => {
    if(event.key == 'ArrowLeft') {
        Logo.topLogo.incrementPercentage(-10);
    }
    if(event.key == 'ArrowRight') {
        Logo.topLogo.incrementPercentage(10);
    }
});

HTMLElement.prototype.getElementByDataset = function(query, parentNum) {
    let element = this;
    for(let i = 0; i < parentNum; i++) {
        element = element.parentElement;
    }
    return element.querySelector(query);
}