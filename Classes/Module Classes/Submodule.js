class Submodule extends Module  {

    constructor(obj, i, animate = true) {

        //Has no function but to prevent syntax errors
        super("STUPID", 0);

        //Creates the submodule div and text
        let div = document.createElement('div');
        div.classList.add('submodule');
        div.innerHTML = submoduleDefaultText;
        moduleHolder.appendChild(div);

        let text = div.querySelector('h2');

        if(i != undefined) {
            this.parent = obj;
            this.module = obj.module.submodules[i];
            text.innerHTML = obj.module.submodules[i].title;
        } else {
            this.parent = undefined;
            this.module = obj;
            text.innerHTML = obj.title;
        }
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

            //Stores inner-information holders like bullets
            this.children = [];

            if(this.module.textType == 'textarea') {
                this.contentHolder.classList.remove('listHolder');
                this.contentHolder.classList.add('textareaHolder');
            }

        }
        this.element = div;

        //Index in parent module
        this.i = i;

        //Not called if it is a module
        if(i != undefined) {
            if(animate) {
                this.moveFromModule();
            } else {
                this.fillContent();
            }
        } else {
            this.fillContent();
        }

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

        //Uses ref and textRef to get the divs you want to move
        let divToMove = this.parent.element.querySelector(`.contentHolder > div:nth-child(${this.i+1})`).cloneForAnimation();
        let textToMove = this.parent.element.querySelector(`.contentHolder > div:nth-child(${this.i+1}) > h3`).cloneForAnimation();

        divToMove.goTo(this.element, {
            backgroundColor: 'var(--backgroundColor)',
            border: '2px solid var(--borderColor)',
            zIndex: 3
        });
        textToMove.goTo(this.element.querySelector('h2'), {
            fontSize: '1.5rem',
            zIndex: 4
        });
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
        } else if(['bullet-regular', 'bullet-date', 'bullet-time', 'bullet-checkbox'].includes(this.module.textType)) {
            if(this.children.length == 0) {
                if(this.module.info.length > 0) {
                    const info = [...this.module.info];
                    this.module.info = [];
                    for(let i = 0; i < info.length; i++) {
                        this.children.push(new Bullet(this.module.textType.substring(this.module.textType.indexOf('-')+1), this, info[i]));
                    }
                } else {
                    this.children.push(new Bullet(this.module.textType.substring(this.module.textType.indexOf('-')+1), this));
                }
            }  else {
                this.children.push(new Bullet(this.module.textType.substring(this.module.textType.indexOf('-')+1), this));
            }
        //Creates a new Textarea object
        } else if(this.module.textType == 'textarea') {

            let length = this.module.textInfo.names.length;
            let info = JSON.parse(JSON.stringify(this.module.info));
            this.module.info = [];

            for(let i = 0; i < length; i++) {
                new Textarea(length, i, this, info[i]);
            }
        }
    }
}