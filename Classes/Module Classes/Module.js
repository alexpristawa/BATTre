class Module {

    static modules = [];
    static activeModule;

    constructor(obj, i) {

    }

    /*
        Static method initializing initial modules
    */
    static fillModules() {

        for(let i = 0; i < modulesInfo.length; i++) {
            Module.modules.push(new Submodule(modulesInfo[i], undefined));
            Module.modules[i].i = i;
        }
    }

    /**
     * Basically just calles this.fillModules()
     */
    enlargeModule() {
        moduleHolder.style.display = 'grid';
        rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
        this.fillModules();
    }

    /**
     * Makes the submodules for the parent module
     * Makes a cloneNode of each child and makes them positioned absolutely
     * @param {boolean} exiting - The function either zooms in or out
     * @returns 
     */
    fillModules() {
        let OGParent = this.element;
        let children = OGParent.querySelectorAll('*');

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

                child.dataset.left = child.getX();
                child.dataset.top = child.getY();
                child.dataset.width = child.offsetWidth;
                child.dataset.height = child.offsetHeight;


                if(['H2', 'H3'].includes(child.tagName)) {
                    let style = window.getComputedStyle(child);
                    child.dataset.fontSize = style.fontSize;
                }
            }
        });

        moduleHolder.innerHTML = '';

        Module.activeModule = this;
        //After assigning dataset values to the elements, it then creates the submodules
        for(let i = 0; i < this.module.submodules.length; i++) {
            this.submodules.push(new Submodule(this, i));
        }

        //Moves the original box to take up the whole box
        let divToMove = OGParent.cloneForAnimation();
        let referenceElement = moduleHolder;

        divToMove.style.transition = 'all 1000ms ease-in-out';
        divToMove.style.top = `${referenceElement.getY()}px`;
        divToMove.style.left = `${referenceElement.getX()}px`;
        divToMove.style.width = `${referenceElement.offsetWidth}px`;
        divToMove.style.height = `${referenceElement.offsetHeight}px`;
        divToMove.style.backgroundColor = 'var(--darkerBackgroundColor)';
        divToMove.style.border = '4px solid var(--borderColor)';
        divToMove.style.borderRadius = '2vh';
        divToMove.style.zIndex = 2;
        setTimeout(() => {
            moduleHolder.style.visibility = 'visible';
            divToMove.remove();
            this.fillSubmoduleContent();
        }, 1000);
    }

    /**
     * 
     */
    exitModule() {
        let children = moduleHolder.querySelectorAll('*');
        [...children, moduleHolder].forEach(child => {
            child.dataset.left = child.getX();
            child.dataset.top = child.getY();
            child.dataset.width = child.offsetWidth;
            child.dataset.height = child.offsetHeight;

            if(['H2', 'H3'].includes(child.tagName)) {
                let style = window.getComputedStyle(child);
                child.dataset.fontSize = style.fontSize;
            }
        });

        Module.activeModule = this.parent;
        moduleHolder.innerHTML = '';
        //After assigning dataset values to the elements, it then creates the submodules
        if(this.parent == undefined) {
            Module.modules = [];
            Module.fillModules();
        } else {
            this.parent.submodules = [];
            for(let i = 0; i < this.parent.module.submodules.length; i++) {
                this.parent.submodules.push(new Submodule(this.parent, i, false));
            }
        }

        let module = moduleHolder.querySelectorAll('.submodule')[this.i];
        let HTMLElements = module.querySelectorAll("*");
        let i = -1;
        [module, ...HTMLElements].forEach(child => {
            if((!child.classList.contains('textHolder')) && (!child.classList.contains('contentHolder')) && child.tagName != "H2") {
                let divToMove;
                if(child.classList.contains('submodule')) {
                    divToMove = moduleHolder.cloneForAnimation();
                    divToMove.style.zIndex = 2;
                    divToMove.goTo(child, {
                        backgroundColor: 'var(--backgroundColor)',
                        borderRadius: '1vh'
                    });
                } else if(child.classList.contains('submoduleDisplayInModule')) {
                    i++;
                    divToMove = this.submodules[i].element.cloneForAnimation();
                    divToMove.style.zIndex = 3;
                    divToMove.goTo(child, {
                        backgroundColor: 'var(--darkerBackgroundColor)',
                        borderRadius: '1vh',
                        border: '0px'
                    });
                } else if(child.tagName == 'H3') {
                    divToMove = this.submodules[i].element.querySelector('h2').cloneForAnimation();
                    divToMove.style.zIndex = 4;
                    divToMove.goTo(child, {
                        fontSize: '1rem'
                    });
                }
            }
        });
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