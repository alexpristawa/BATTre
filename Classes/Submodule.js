class Submodule {

    constructor(obj, i) {
        let div = document.createElement('div');
        div.classList.add('submodule');
        div.innerHTML = submoduleDefaultText;
        bigModuleHolder.appendChild(div);

        let text = div.querySelector('h2');
        text.innerHTML = obj.module.submodules[i].title;

        this.parent = obj;
        this.module = obj.module.submodules[i];
        this.element = div;
        this.i = i;
        this.moveFromModule();
    }

    static fillModules(obj) {
        let OGParent = obj.element;
        console.log(OGParent)
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
        for(let i = 0; i < obj.module.submodules.length; i++) {
            new Submodule(obj, i);
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
        }, 1000);
    }

    moveFromModule() {
        let ref = this.parent.element.querySelector(`.divHolder > div:nth-child(${this.i+1})`).dataset.target;
        let textRef = this.parent.element.querySelector(`.divHolder > div:nth-child(${this.i+1}) > h3`).dataset.target;
        let divToMove = document.querySelector(`[data-ref='${ref}']`);
        let textToMove = document.querySelector(`[data-ref='${textRef}']`);

        divToMove.style.transition = 'all 1000ms ease-in-out';
        divToMove.style.top = `${this.element.getY()}px`;
        divToMove.style.left = `${this.element.getX()}px`;
        divToMove.style.width = `${this.element.offsetWidth - 4}px`;
        divToMove.style.height = `${this.element.offsetHeight - 4}px`;
        divToMove.style.backgroundColor = 'var(--backgroundColor)';
        divToMove.style.border = '2px solid var(--borderColor)';

        textToMove.style.transition = 'all 1000ms ease-in-out';
        textToMove.style.top = `${this.element.querySelector('h2').getY() - 1.5 * rem}px`;
        textToMove.style.left = `${this.element.querySelector('h2').getX()}px`;
        textToMove.style.width = `${this.element.querySelector('h2').offsetWidth + 1}px`;
        textToMove.style.height = `${this.element.querySelector('h2').offsetHeight}px`;
        textToMove.style.fontSize = '1.5rem';

        setTimeout(() => {
            divToMove.remove();
            textToMove.remove();
        }, 1050)
    }
}