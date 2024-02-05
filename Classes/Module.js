class Module {

    static modules = [];

    constructor(obj, i) {
        let divs = document.querySelectorAll('#moduleHolder > .moduleShow');
        let div = divs[i];
        this.element = div;
        this.module = obj;
        this.i = i;
        this.submodules = [];


        let innerDivs = document.querySelectorAll(`#moduleHolder > .moduleShow:nth-child(${i+1}) > .divHolder > div`);
        let text = divs[i].querySelector('.textHolder > h2');
        text.innerHTML = obj.title;
        for(let j = 0; j < obj.submodules.length; j++) {
            innerDivs[j].querySelector('h3').innerHTML = obj.submodules[j].title;
        }

        div.addEventListener('click', () => {
            this.enlargeModule();
        });

        Module.modules.push(this);
    }

    static fillModules() {
        for(let i = 0; i < modulesInfo.length; i++) {
            new Module(modulesInfo[i], i);
        }
    }

    enlargeModule() {
        bigModuleHolder.style.display = 'grid';
        rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
        this.fillModules();
    }

    /*
        Makes the submodules for the parent module
    */
    fillModules() {
        let OGParent = this.element;
        let children = OGParent.querySelectorAll('*');
        let referenceNumber = 0;
        [...children, OGParent].forEach(child => {
            if((!child.classList.contains('textHolder')) && (!child.classList.contains('divHolder')) && child.tagName != "H2") {
                let newDiv = child.cloneNode(false);
                let heightFixer = 0;
                if(['H3'].indexOf(child.tagName) != -1) {
                    newDiv.style.zIndex = '2';
                    newDiv.innerHTML = child.innerHTML;
                    heightFixer = rem;
                } else if(!child.classList.contains('moduleShow')) {
                    newDiv.style.zIndex = '1';
                }
                newDiv.style.position = 'absolute';
                newDiv.style.left = `${child.getX()}px`;
                newDiv.style.top = `${child.getY() - heightFixer}px`;
                newDiv.style.width = `${child.offsetWidth}px`;
                newDiv.style.height = `${child.offsetHeight}px`;
                child.dataset.target = referenceNumber;
                newDiv.dataset.ref = referenceNumber;
                referenceNumber++;
                body.appendChild(newDiv);
            }
        })
        for(let i = 0; i < this.module.submodules.length; i++) {
            this.submodules.push(new Submodule(this, i));
        }

        let ref = OGParent.dataset.target;
        let divToMove = document.querySelector(`[data-ref='${ref}']`);
        divToMove.style.transition = 'all 1000ms ease-in-out';
        divToMove.style.top = `${bigModuleHolder.getY()}px`;
        divToMove.style.left = `${bigModuleHolder.getX()}px`;
        divToMove.style.width = `${bigModuleHolder.offsetWidth}px`;
        divToMove.style.height = `${bigModuleHolder.offsetHeight}px`;
        divToMove.style.backgroundColor = 'var(--darkerBackgroundColor)';
        divToMove.style.border = '4px solid var(--borderColor)';
        divToMove.style.borderRadius = '2vh';
        setTimeout(() => {
            bigModuleHolder.style.visibility = 'visible';
            this.fillContent();
        }, 1000);
    }


    /*

    */
    fillContent() {
        this.submodules.forEach(submodule => {
            submodule.fillContent();
        });
    }
}