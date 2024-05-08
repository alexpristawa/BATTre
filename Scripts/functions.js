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

HTMLElement.prototype.goTo = function(ref, obj = {}) {

    //CSS for animating the divs to move to where they currently are
    if(['H2', 'H3'].includes(this.tagName)) {

        let topAdjust = 0;
        //If it is shrinking, slight adjust
        if(this.tagName == "H2") {
            topAdjust = rem/5;
        }

        if(obj.fontSize == undefined) {
            obj.fontSize = '1.5rem';
        }

        //CSS changes for the text
        this.style.transition = 'all 1000ms ease-in-out';

        /* 
         * This adjuster is annoying. If you get rid of it, the text element transitions to a little under where you want it, but then
         * at the end it teleports up to where you want it. By adding the adjuster in, it transitions where you want it, but then teleports up.
         * In this case, we delete it before it teleports up, so it doesn't matter.
        */
        this.style.top = `${ref.getY() - parseFloat(obj.fontSize, 10) * rem + topAdjust}px`;

        this.style.left = `${ref.getX()}px`;
        this.style.width = `${ref.offsetWidth + 1}px`;
        this.style.height = `${ref.offsetHeight}px`;
        Object.keys(obj).forEach(key => {
            this.style[key] = obj[key];
        });
    } else if(this.tagName == 'DIV') {

        let border = parseFloat(window.getComputedStyle(ref).borderWidth, 10);
                
        //CSS changes for the div
        this.style.transition = 'all 1000ms ease-in-out';
        this.style.top = `${ref.getY()}px`;
        this.style.left = `${ref.getX()}px`;
        this.style.width = `${ref.offsetWidth - border/2}px`;
        this.style.height = `${ref.offsetHeight - border/2}px`;
        this.style.borderWidth = `${border}px`;

        Object.keys(obj).forEach(key => {
            this.style[key] = obj[key];
        });
    }

    setTimeout(() => {
        this.remove();
    }, 1000);
}

/**
 * Shallow clones a div for the animation but makes it positioned absolutely
 * @param {HTMLElement} child - Element that you want to clone
 * @returns Clone of child
 */
HTMLElement.prototype.cloneForAnimation = function() {
    //Copies the div and places it perfectly on top of the old div
    let newDiv = this.cloneNode(false);
    let heightFixer = 0;
    if(['H3', 'H2'].indexOf(this.tagName) != -1) {
        newDiv.style.zIndex = '5';
        newDiv.innerHTML = this.innerHTML;
        heightFixer = rem;
        newDiv.classList.add('h3ToMove');
        newDiv.style.fontSize = this.dataset.fontSize;
    } else if(!this.classList.contains('moduleShow') && !this.classList.contains('submodule')) {
        newDiv.style.zIndex = '4';
        newDiv.classList.add('divToMove');
    } else {
        newDiv.style.zIndex = '2';
    }
    newDiv.style.position = 'absolute';
    this.dataset.left != undefined ? newDiv.style.left = `${this.dataset.left}px`: newDiv.style.left = `${this.getX()}px`;
    this.dataset.top != undefined ? newDiv.style.top = `${this.dataset.top- heightFixer}px` : newDiv.style.top = `${this.getY() + heightFixer}px`;
    this.dataset.width != undefined ? newDiv.style.width = `${this.dataset.width}px` : newDiv.style.width = `${this.offsetWidth}px`;
    this.dataset.height != undefined ? newDiv.style.height = `${this.dataset.height}px` : newDiv.style.height = `${this.offsetHeight}px`;
    body.appendChild(newDiv);
    return newDiv;
}

callOnSubmodules = function(obj, callback) {
    console.log(obj);
    if(obj.submodules != undefined) {
        for(let i = 0; i < obj.submodules.length; i++) {
            callOnSubmodules(obj.submodules[i], callback);
        }
    } else {
        callback(obj);
    }
}

searchForTitle = function(obj, title) {
    if(obj.submodules != undefined) {
        for(let i = 0; i < obj.submodules.length; i++) {
            let test = searchForTitle(obj.submodules[i], title);
            if(test !== null) {
                return test;
            }
        }
    } else {
        if(obj.title == title) {
            return obj;
        }
    }
    return null;
}