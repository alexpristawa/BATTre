class Bullet {

    /*
        Adds a bullet to parentModule.contentHolder
        @param type {String} - Type of bullet (regular, date, etc.)
        @param parentModule {Submodule} - Submodule object that the div is appended to
    */
    constructor(type = 'regular', parentModule) {
        //Used to access outer div
        this.bullet = document.createElement('div');

        this.type = type;

        //Only focuses on the textarea if it doesn't have date selection
        let focused = false;
        if(this.type == 'regular') {
            this.bullet.classList.add('bullet');
            this.bullet.innerHTML = document.getElementById('bulletTemplate').innerHTML;

        } else if(this.type == 'date') {
            this.bullet.classList.add('bulletDate');
            this.bullet.innerHTML = document.getElementById('bulletDateTemplate').innerHTML;

            //Sets this.timeTextboxes to an array of time textboxes (in order)
            this.storeTimeTextboxes();

            focused = true;
            this.bullet.querySelector('.bulletHolder').addEventListener('click', this.shiftBullet);

        } else if(this.type == 'time') {
            this.bullet.classList.add('bulletTime');
            this.bullet.innerHTML = document.getElementById('bulletTimeTemplate').innerHTML;

            //Sets this.timeTextboxes to an array of time textboxes (in order)
            this.storeTimeTextboxes();

            focused = true;
            this.bullet.querySelector('.bulletHolder').addEventListener('click', this.shiftBullet);

        } else if(this.type == 'checkbox') {
            this.bullet.classList.add('bulletCheckbox');
            this.bullet.innerHTML = document.getElementById('bulletCheckboxTemplate').innerHTML;
        }

        //Appends it to the holder
        parentModule.contentHolder.appendChild(this.bullet);
        
        //Instance variable for the actual textarea element
        this.textarea = this.bullet.querySelector('textarea');
        if(!focused) {
            this.textarea.focus();
        }

        //Parent module
        this.parentModule = parentModule;

        this.bullet.addEventListener('keydown', this.keydownHandler);
    }

    keydownHandler = (event) => {
        //Hitting tab or shift based on bullet points
        if(['checkbox'].includes(this.type)) {
            
            //If they want an indent
            if(event.key == 'Tab') {

                event.preventDefault();
                let element = event.target.closest('.bulletCheckbox');
                let width = this.parentModule.contentHolder.offsetWidth;

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

        //Brings you to the next element. Nothing happens if there is no next element in the sequence
        //This is for things like the time selection
        if(event.target.dataset.enter_target != undefined) {
            if(event.key == 'Enter') {
                event.preventDefault();
                event.target.getElementByDataset(event.target.dataset.enter_target, parseInt(event.target.dataset.parent_num)).focus();
                return;
            }
        }
    }

    /*
        Listener function for when a date or time is entered into a bullet
    */
    shiftBullet(event) {

    }


    storeTimeTextboxes() {
        let arr = this.bullet.querySelectorAll('input');
        let newArr = [];
        arr.forEach(input => {
            newArr.push(input);
        });
        newArr[0].focus();
        this.timeTextboxes = newArr;
    }
}