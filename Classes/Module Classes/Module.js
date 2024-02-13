class Module {

    static modules = [];

    constructor(obj, i) {

        //obj is set to 'STUPID' if it is called from the Submodule subclass
        if(obj !== 'STUPID') {
            let divs = document.querySelectorAll('#moduleHolder > .moduleShow');
            let div = divs[i];
            this.element = div;

            //Object holding information
            this.module = obj;

            //Index of the module in the parent's module.submodules array
            this.i = i;

            //Blank array that gets filled when the submodules are initialized
            this.submodules = [];

            //Titles the module and submodule boxes
            let text = divs[i].querySelector('.textHolder > h2');
            text.innerHTML = obj.title;
            let innerDivs = document.querySelectorAll(`#moduleHolder > .moduleShow:nth-child(${i+1}) > .contentHolder > div`);
            for(let j = 0; j < obj.submodules.length; j++) {
                innerDivs[j].querySelector('h3').innerHTML = obj.submodules[j].title;
            }

            //Enlarges module when clicked (Has to be an arrow function)
            div.addEventListener('click', () => {
                this.enlargeModule();
            });

            //Adds to static variable
            Module.modules.push(this);
        }
    }

    /*
        Static method initializing initial modules
    */
    static fillModules() {

        for(let i = 0; i < modulesInfo.length; i++) {
            new Module(modulesInfo[i], i);
        }
    }

    /*
        Basically just calls fillModules() function
    */
    enlargeModule() {
        moduleHolder.style.display = 'grid';
        rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
        this.fillModules();
    }

    /*
        Makes the submodules for the parent module
        Makes a cloneNode of each child and makes them positioned absolutely
    */
    fillModules() {
        let OGParent = this.element;
        let children = OGParent.querySelectorAll('*');

        //Used to locate the absolute element later
        let referenceNumber = 0;

        //Makes a deep copy of the grid to keep it there for a second
        {
            let temporaryDisplay = moduleHolder.cloneNode(true);
            temporaryDisplay.style.position = 'absolute';
            temporaryDisplay.style.left = `${moduleHolder.getX()}px`;
            temporaryDisplay.style.top = `${moduleHolder.getY()}px`;
            temporaryDisplay.style.width = `${moduleHolder.offsetWidth}px`;
            temporaryDisplay.style.height = `${moduleHolder.offsetHeight}px`;
            temporaryDisplay.style.zIndex = 1;
            body.appendChild(temporaryDisplay);
            setTimeout(() => {
                temporaryDisplay.remove();
            }, 1000);
        }
        
        [...children, OGParent].forEach(child => {
            if((!child.classList.contains('textHolder')) && (!child.classList.contains('contentHolder')) && child.tagName != "H2") {

                //Copies the div and places it perfectly on top of the old div
                let newDiv = child.cloneNode(false);
                let heightFixer = 0;
                if(['H3'].indexOf(child.tagName) != -1) {
                    newDiv.style.zIndex = '5';
                    newDiv.innerHTML = child.innerHTML;
                    heightFixer = rem;
                    newDiv.classList.add('h3ToMove');
                } else if(!child.classList.contains('moduleShow') && !child.classList.contains('submodule')) {
                    newDiv.style.zIndex = '4';
                    newDiv.classList.add('divToMove');
                } else {
                    newDiv.style.zIndex = '2';
                }
                newDiv.style.position = 'absolute';
                newDiv.style.left = `${child.getX()}px`;
                newDiv.style.top = `${child.getY() - heightFixer}px`;
                newDiv.style.width = `${child.offsetWidth}px`;
                newDiv.style.height = `${child.offsetHeight}px`;


                //Used later referencing `newDiv`
                child.dataset.target = referenceNumber;

                //Used later to locate the div from `child`
                newDiv.dataset.ref = referenceNumber;

                referenceNumber++;
                body.appendChild(newDiv);
            }
        });

        moduleHolder.innerHTML = '';

        //After duplicating the elements, it then creates the submodules
        for(let i = 0; i < this.module.submodules.length; i++) {
            this.submodules.push(new Submodule(this, i));
        }

        //Moves the original box to take up the whole box
        let ref = OGParent.dataset.target;
        let divToMove = document.querySelector(`[data-ref='${ref}']`);
        divToMove.style.transition = 'all 1000ms ease-in-out';
        divToMove.style.top = `${moduleHolder.getY()}px`;
        divToMove.style.left = `${moduleHolder.getX()}px`;
        divToMove.style.width = `${moduleHolder.offsetWidth}px`;
        divToMove.style.height = `${moduleHolder.offsetHeight}px`;
        divToMove.style.backgroundColor = 'var(--darkerBackgroundColor)';
        divToMove.style.border = '4px solid var(--borderColor)';
        divToMove.style.borderRadius = '2vh';
        setTimeout(() => {
            moduleHolder.style.visibility = 'visible';
            divToMove.remove();
            this.fillSubmoduleContent();
        }, 1000);
    }


    /*
        Fills the content of submodules
        (Like bullets, etc.)
    */
    fillSubmoduleContent() {
        this.submodules.forEach(submodule => {
            submodule.fillContent();
        });
    }
}