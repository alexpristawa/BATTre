class Textarea extends Info {
    
    /**
     *   Makes a textarea and adds it to object.contentHolder
     *   @param length {int} - Designated length for the textarea used if there are more than one
     *   @param name {String} - Name of the textarea (if name = '/noName', the name div is set to display: none);
     *   @param object {Submodule} - Submodule where the thing is added to
    */
    constructor(length, i, parentModule, defaultValue = {text: ''}) {
        super(i, parentModule);
        let name = parentModule.module.textInfo.names[i];

        //Sizing and styling for the div and textarea
        let factor = Math.ceil(length**0.5);
        this.div.classList.add('textarea');
        this.div.innerHTML = document.getElementById('textareaTemplate').innerHTML;
        parentModule.contentHolder.appendChild(this.div);
        this.div.style.width = `${100/factor - 1.5}%`;
        this.div.style.height = `${100/factor - 1.5}%`;
        this.div.querySelector('.titleHolder').innerHTML = name;
        this.textarea = this.div.querySelector('textarea');

        //Sets the default value of the textarea
        this.textarea.value = defaultValue.text;

        this.parentModule.module.info[this.i] = defaultValue;

        //Focuses the textarea
        this.div.focus();

        //Makes it so the textarea has no name section to enlarge space
        if(name == '/noName') {
            this.div.querySelector('.titleHolder').style.display = 'none';
            this.div.querySelector('.textareaHolder').style.height = '100%';
        }
    }

    isEmpty() {
        if(this.textarea.value.replace(' ', '') == '') {
            return true;
        }
        return false;
    }

    getValueObj() {
        return {text: this.textarea.value};
    }

    /*
        Keydown event handler for the div
    */
    keydownHandler(event) {
        

    }

}