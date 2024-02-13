class Submodule extends Module  {

    constructor(obj, i) {

        //Has no function but to prevent syntax errors
        super("STUPID", 0);

        //Creates the submodule div and text
        let div = document.createElement('div');
        div.classList.add('submodule');
        div.innerHTML = submoduleDefaultText;
        moduleHolder.appendChild(div);

        let text = div.querySelector('h2');
        text.innerHTML = obj.module.submodules[i].title;

        this.parent = obj;
        this.module = obj.module.submodules[i];
        this.contentHolder = div.querySelector('.contentHolder');

        //If the submodules have more submodules
        if(this.module.submodules != undefined) {

            //More room for the previews
            this.contentHolder.style.width = '100%';

            //This gets filled up when they are initialized
            this.submodules = [];

            //Turns it into a div holder
            this.contentHolder.classList.remove('listHolder');
            this.contentHolder.classList.add('divHolder');

        } else {
            
            //Gives a padding-like effect on the sides if text is being stored
            this.contentHolder.style.width = '95%';

            if(this.module.textType == 'textarea') {
                this.contentHolder.classList.remove('listHolder');
                this.contentHolder.classList.add('textareaHolder');
            }

        }
        this.element = div;

        //Index in parent module
        this.i = i;
        this.moveFromModule();

        //Event listeners for when you click or hit enter
        div.addEventListener('click', this.clickListener);
        div.addEventListener('keydown', this.clickListener);
    }

    /*
        Function that handles when the big div was clicked on
    */
    clickListener = (event) => {

        //Hitting enter or clicking in a textarea should do nothing
        if(this.module.textType == 'textarea') {
            return;
        }

        //If the enter had a target, no additional content is added
        if(event.target.dataset.enter_target != undefined) {
            if(event.key == 'Enter') {
                return;
            }
        }

        //If the function was triggered from a click
        if(event.key === undefined) {

            //Creates more submodules if this.submodules is not undefined
            if(this.submodules != undefined) {
                super.fillModules();
            } else { //Makes bullet points if it is a text div
                if(event.target == this.element || event.target == this.contentHolder) {
                    this.fillContent();
                }
            }
        } else { //If the function was triggered from a keypress
            if(event.key == 'Enter' && !event.shiftKey) {
                event.preventDefault();
                this.fillContent();
            }
        }
    }



    /*
        Makes an individual submodule based on reference coordinates
    */
    moveFromModule() {

        //String values (NOT ELEMENTS) used to locate the div you want to move
        let ref = this.parent.element.querySelector(`.contentHolder > div:nth-child(${this.i+1})`).dataset.target;
        let textRef = this.parent.element.querySelector(`.contentHolder > div:nth-child(${this.i+1}) > h3`).dataset.target;

        //Uses ref and textRef to get the divs you want to move
        let divToMove = document.querySelector(`[data-ref='${ref}']`);
        let textToMove = document.querySelector(`[data-ref='${textRef}']`);

        //CSS for animating the divs to move to where they currently are
        //CSS changes for the div
        divToMove.style.transition = 'all 1000ms ease-in-out';
        divToMove.style.top = `${this.element.getY()}px`;
        divToMove.style.left = `${this.element.getX()}px`;
        divToMove.style.width = `${this.element.offsetWidth - 4}px`;
        divToMove.style.height = `${this.element.offsetHeight - 4}px`;
        divToMove.style.backgroundColor = 'var(--backgroundColor)';
        divToMove.style.border = '2px solid var(--borderColor)';

        //CSS changes for the text
        textToMove.style.transition = 'all 1000ms ease-in-out';
        textToMove.style.top = `${this.element.querySelector('h2').getY() - 1.5 * rem}px`;
        textToMove.style.left = `${this.element.querySelector('h2').getX()}px`;
        textToMove.style.width = `${this.element.querySelector('h2').offsetWidth + 1}px`;
        textToMove.style.height = `${this.element.querySelector('h2').offsetHeight}px`;
        textToMove.style.fontSize = '1.5rem';

        //Gets rid of unneeded divs and resets the datasets on elements
        setTimeout(() => {
            divToMove.remove();
            textToMove.remove();
            delete this.parent.element.querySelector(`.contentHolder > div:nth-child(${this.i+1})`).dataset.target;
            delete this.parent.element.querySelector(`.contentHolder > div:nth-child(${this.i+1}) > h3`).dataset.target;
        }, 1000)
    }

    /*
        Used to fill whatever you want in the small submodules
    */
    fillContent() {
        //Meaning the div has submodules
        if(this.module.submodules != undefined) {

            //Makes the submodules in the submodule
            for(let i = 0; i < this.module.submodules.length; i++) {
                let subDiv = document.createElement('div');
                subDiv.classList.add('submoduleDisplayInModule');
                this.contentHolder.appendChild(subDiv);

                let h3 = document.createElement('h3');
                h3.innerHTML = this.module.submodules[i].title;
                subDiv.appendChild(h3);
            }

        //Based on the type of bullet, it creates a new Bullet object
        } else if(this.module.textType == 'bullet-regular') {
            new Bullet('regular', this);
        } else if(this.module.textType == 'bullet-date') {
            new Bullet('date', this);
        } else if(this.module.textType == 'bullet-time') {
            new Bullet('time', this);
        } else if(this.module.textType == 'bullet-checkbox') {
            new Bullet('checkbox', this);

        //Creates a new Textarea object
        } else if(this.module.textType == 'textarea') {
            let length = this.module.textInfo.names.length;
            for(let i = 0; i < length; i++) {
                new Textarea(length, this.module.textInfo.names[i], this);
            }
        }
    }
}