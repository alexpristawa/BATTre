class Info {

    constructor(i, parentModule) {

        //Parent module
        this.parentModule = parentModule;

        //Index for information storing
        this.i = i;

        this.parentModule.module.info.push({});

        this.div = document.createElement('div');

        this.div.addEventListener('keydown', this.generalKeydownHandler);
    }

    /*
        Keydown handler for all information types
    */
    generalKeydownHandler = (event) => {
        this.keydownHandler(event);
        setTimeout(() => {
            if(event.target.tagName == 'TEXTAREA') {
                this.parentModule.module.info[this.i] = this.getValueObj();
            }
            console.log(this.getValueObj());
        });
    }

    /*
        Blur handler for all information types
    */
    generalBlurHandler = (event) => {
        if(this.isEmpty() && this.parentModule.module.textType.substring(0, 6) == 'bullet' && this.parentModule.module.info.length > 1) {
            this.delete();
        }
        StorageManager.updateStorage();
    }

    /*
        Function that deletes the information type
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