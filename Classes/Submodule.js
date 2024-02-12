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

        //Hitting tab or shift based on bullet points
        if(this.module.textType == 'checkbox') {

            //If they want an indent
            if(event.key == 'Tab') {

                event.preventDefault();
                let element = event.target.closest('.bulletCheckbox');
                let width = this.contentHolder.offsetWidth;

                //If it is a forward indent
                if(!event.shiftKey) {
                    let newValue = parseFloat(window.getComputedStyle(element).marginLeft) + width * 0.1;

                    //If you have already indented 5 times
                    if(newValue > 5 * width * 0.1) {
                        return;
                    }
                    element.style.marginLeft = `${newValue}px`;
                    element.style.width = `${element.offsetWidth - width * 0.1}px`;
                } else {
                    let newValue = parseFloat(window.getComputedStyle(element).marginLeft) - width * 0.1;
                    //No negative margin
                    if(newValue < 0) {
                        newValue = 0;
                    }
                    element.style.marginLeft = `${newValue}px`;
                    element.style.width = `${element.offsetWidth + width * 0.1}px`;
                }
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
            this.parent.element.querySelector(`.contentHolder > div:nth-child(${this.i+1})`).dataset.target = undefined;
            this.parent.element.querySelector(`.contentHolder > div:nth-child(${this.i+1}) > h3`).dataset.target = undefined;
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
        } else if(this.module.textType == 'bullet') {
            this.makeBullet();
        } else if(this.module.textType == 'bullet-date') {
            this.makeBullet('date');
        } else if(this.module.textType == 'bullet-time') {
            this.makeBullet('time');
        } else if(this.module.textType == 'checkbox') {
            this.makeBullet('checkbox');
        } else if(this.module.textType == 'textarea') {
            this.makeTextarea();
        }
    }

    /*
        Adds a bullet to contentHolder
        @param type {String} - Type of bullet (regular, date, etc.)
    */
    makeBullet(type = 'regular') {
        let bullet = document.createElement('div');
        if(type == 'regular') {
            bullet.classList.add('bullet');
            bullet.innerHTML = document.getElementById('bulletTemplate').innerHTML;
        } else if(type == 'date') {
            bullet.classList.add('bulletDate');
            bullet.innerHTML = document.getElementById('bulletDateTemplate').innerHTML;
            bullet.querySelector('.bulletHolder').addEventListener('click', (event) => {
                this.shiftBullet(event, bullet);
            });
        } else if(type == 'time') {
            bullet.classList.add('bulletTime');
            bullet.innerHTML = document.getElementById('bulletTimeTemplate').innerHTML;
            bullet.querySelector('.bulletHolder').addEventListener('click', (event) => {
                this.shiftBullet(event, bullet);
            });
        } else if(type == 'checkbox') {
            bullet.classList.add('bulletCheckbox');
            bullet.innerHTML = document.getElementById('bulletCheckboxTemplate').innerHTML;
        }
        this.contentHolder.appendChild(bullet);
        bullet.querySelector('textarea').focus();
    }

    /*
        Listener function for when a date or time is entered into a bullet
    */
    shiftBullet(event) {

    }

    /*
        Adds a textarea to contentHolder
    */
    makeTextarea() {
        let length = this.module.textInfo.names.length
        for(let i = 0; i < length; i++) {
            let factor = Math.ceil(length**0.5);
            let div = document.createElement('div');
            div.classList.add('textarea');
            div.innerHTML = document.getElementById('textareaTemplate').innerHTML;
            this.contentHolder.appendChild(div);
            div.style.width = `${100/factor - 1.5}%`;
            div.style.height = `${100/factor - 1.5}%`;
            div.querySelector('.titleHolder').innerHTML = this.module.textInfo.names[i];
            div.focus();
            if(this.module.textInfo.names[i] == '/noName') {
                div.querySelector('.titleHolder').style.display = 'none';
                div.querySelector('.textareaHolder').style.height = '100%';
            }
        }
    }
}