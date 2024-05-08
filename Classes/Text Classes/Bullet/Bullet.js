class Bullet extends Info {

    static startingValues = {
        regular: {
            text: ''
        },
        date: {
            text: '',
            time0: '0',
            time1: '0'
        },
        time: {
            text: '',
            time0: '0',
            time1: '0'
        },
        checkbox: {
            text: '',
            checked: false
        }
    };

    /*
        Adds a bullet to parentModule.contentHolder
        @param type {String} - Type of bullet (regular, date, etc.)
        @param parentModule {Submodule} - Submodule object that the div is appended to
    */
    constructor(type = 'regular', parentModule, startingValue = undefined) {
        super(parentModule.module.info.length, parentModule);

        this.type = type;

        if(startingValue == undefined && !['date'].includes(this.type)) {
            console.log('here');
            startingValue = JSON.parse(JSON.stringify(Bullet.startingValues[this.type]));
        }
 
        //Only focuses on the textarea if it doesn't have date selection
        let focused = false;
        this.div.classList.add('bullet');
        if(this.type == 'regular') {
            this.div.classList.add('bulletRegular');
            this.div.innerHTML = document.getElementById('bulletTemplate').innerHTML;
        } else if(this.type == 'date') {
            this.div.classList.add('bulletDate');
            this.div.innerHTML = document.getElementById('bulletDateTemplate').innerHTML;

            //Sets this.timeTextboxes to an array of time textboxes (in order)
            this.storeTimeTextboxes(startingValue);
            if(startingValue == undefined) {
                startingValue = {
                    text: ''
                }
            }

            //focused = true;
            this.div.querySelector('.bulletHolder').addEventListener('click', this.shiftBullet);

        } else if(this.type == 'time') {
            this.div.classList.add('bulletTime');
            this.div.innerHTML = document.getElementById('bulletTimeTemplate').innerHTML;

            this.amOrPm = this.div.querySelector(".AMPM");

            //Sets this.timeTextboxes to an array of time textboxes (in order)
            this.storeTimeTextboxes(startingValue);

            console.log(this.amOrPm);

            focused = true;
            this.div.querySelector('.bulletHolder').addEventListener('click', this.shiftBullet);

        } else if(this.type == 'checkbox') {
            this.div.classList.add('bulletCheckbox');
            this.div.innerHTML = document.getElementById('bulletCheckboxTemplate').innerHTML;

            this.checkbox = this.div.querySelector('input[type="checkbox"]');
            if(startingValue.checked) {
                this.checkbox.checked = true;
            }
        }

        //Appends it to the holder
        parentModule.contentHolder.appendChild(this.div);
        
        //Instance variable for the actual textarea element
        this.textarea = this.div.querySelector('textarea');

        //Initial value for bullet (if a value was stored)
        this.textarea.value = startingValue.text;

        //Makes the x button (CSS hover makes it appear)
        this.xButton = document.createElement('div');
        this.xButton.classList.add('xButton');
        
        let icon = document.createElement('i');
        icon.classList.add('fas');
        icon.classList.add('fa-xmark');
        this.xButton.appendChild(icon);
        this.div.appendChild(this.xButton);

        //Adds an event listener for the x button to get rid of the bullet
        this.xButton.addEventListener('click', this.delete);

        if(!focused) {
            this.textarea.focus();
        }
        this.textarea.addEventListener('blur', this.generalBlurHandler);

        //Sets the initial value for the info array
        setTimeout(this.updateInfo(), 100);
    }

    /*
        Fills this.timeTextboxes with an array
        Sets up desired logic for the time textboxes
        Fills default or stored values for the time textboxes
    */
    storeTimeTextboxes(startingValue) {
        let arr = this.div.querySelectorAll('input');
        let newArr = [];
        arr.forEach(input => {
            newArr.push(input);
        });
        //setTimeout(() => {newArr[0].focus();});
        this.timeTextboxes = newArr;

        if(startingValue == undefined) {

            //Sets default values to current times if that is what you want
            let date = new Date();
            if(this.type == 'date') {
                this.timeTextboxes[0].value = `${date.getMonth()+1}`;
                this.timeTextboxes[1].value = `${date.getDate()}`;
            } else if(this.type == 'time') {
                this.timeTextboxes[0].value = `${date.getHours()}`;
                this.timeTextboxes[1].value = `${date.getMinutes()}`;
            }
        } else {
            console.log(startingValue);
            for(let i = 0; i < this.timeTextboxes.length; i++) {
                this.timeTextboxes[i].value = startingValue[`time${i}`].padStart(2, '0');
            }
            if(startingValue.amOrPm !== undefined) {
                this.amOrPm.innerHTML = startingValue.amOrPm;
            }
        }
        
        if(this.type == 'time') {
            this.amOrPm.addEventListener('mousedown', () => {
                this.amOrPm.innerHTML == "AM" ? this.amOrPm.innerHTML = "PM" : this.amOrPm.innerHTML = "AM";
                this.updateInfo();
            });
        }
        
        /*
            Function logic for when you click on a time textbox, and click off of it
        */
        this.timeTextboxes.forEach(textbox => textbox.addEventListener('focus', () => {

            //Initially clears the textbox
            let value = textbox.value;
            textbox.value = ''

            let keydownHandler = (event) => {
                if(event.key !== 'Enter') {
                    textbox.removeEventListener('blur', blurHandler);
                    document.removeEventListener('mousedown', clickHandler);
                    textbox.removeEventListener('keydown', keydownHandler);
                } else {
                    clickHandler();
                }
            }

            let clickHandler = () => {
                textbox.value = value;
                textbox.removeEventListener('blur', blurHandler);
                document.removeEventListener('mousedown', clickHandler);
                textbox.removeEventListener('keydown', keydownHandler);
            }

            let blurHandler = () => {
                clickHandler();
            }

            //Does it before the timeout because a blur can happen internally
            textbox.addEventListener('blur', blurHandler);
            
            setTimeout(() => {
                textbox.addEventListener('keydown', keydownHandler);
                document.addEventListener('mousedown', clickHandler);
            });
        }));
    }

    /*
        Keydown function for the entire bullet div
    */
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

        if(event.target.tagName == 'textarea') {
            this.parentModule.module.info[this.i] = event.target.value;
        }
    }

    /*
        Function to return whether or not a bullet has content inside of it
    */
    isEmpty() {
        if(this.textarea.value.replace(' ', '') == '') {
            return true;
        }
        return false;
    }

    getValueObj() {
        if(['regular'].includes(this.type)) {
            return {text: this.textarea.value};
        } else if(['date'].includes(this.type)) {
            return {text: this.textarea.value, time0: this.timeTextboxes[0].value, time1: this.timeTextboxes[1].value};
        } else if(['time'].includes(this.type)) {
            return {text: this.textarea.value, time0: this.timeTextboxes[0].value, time1: this.timeTextboxes[1].value, amOrPm: this.amOrPm.innerHTML};
        } else if(['checkbox'].includes(this.type)) {
            return {text: this.textarea.value, checked: this.checkbox.checked};
        }
    }

    /*
        Listener function for when a date or time is entered into a bullet
    */
    shiftBullet(event) {

    }
}