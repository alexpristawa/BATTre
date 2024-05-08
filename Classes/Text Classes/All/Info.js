//Superclass for all information types like bullets or textareas
class Info {

    /**
     * Constructor for the Info class. General constructor
     * @param {int} i - Index in the parent's array of information
     * @param {Module} parentModule - Parent's Module object 
     */
    constructor(i, parentModule) {

        //Parent module
        this.parentModule = parentModule;

        //Index for information storing
        this.i = i;

        this.parentModule.module.info.push({});

        this.div = document.createElement('div');

        this.div.addEventListener('keydown', this.generalKeydownHandler);
    }

    /**
     * Keydown handler for all information types
     * @param {Event} event - Mouse event object
     */
    generalKeydownHandler = (event) => {
        this.keydownHandler(event);
        this.updateInfo(event);
    }

    /**
     * Updates the parent's info object (Called from a keydown handler)
     * Does not update storage until element is blurred
     * @param {Event} event - Mouse event object
     */
    updateInfo(event) {
        setTimeout(() => {
            if(event == undefined || ['TEXTAREA', 'INPUT'].includes(event.target.tagName)) {
                console.log(this.getValueObj());
                console.log(this);
                console.log('\n');
                this.parentModule.module.info[this.i] = this.getValueObj();
            }
        });
    }

    /**
     * Blur handler for any information type
     * @param {Event} event - Mouse event object
     */
    generalBlurHandler = (event) => {
        if(this.isEmpty() && this.parentModule.module.textType.substring(0, 6) == 'bullet' && this.parentModule.module.info.length > 1) {
            this.delete();
        }
        StorageManager.updateStorage();
    }

    /**
     * Deletes the information type and removes it from the parent's info array
     */
    delete = () => {
        this.div.remove();
        this.parentModule.module.info.splice(this.i, 1);
        this.parentModule.children.splice(this.i, 1);

        //Subtracts 1 from following elements because their indexes went down after splicing
        for(let i = this.i; i < this.parentModule.children.length; i++) {
            this.parentModule.children[i].i = i;
        }
    }
}