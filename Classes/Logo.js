class Logo {

    //Static variable for the logo at the top of the page
    static topLogo;

    /*
        Creates all HTML for the logo
        @param size - Width in pixels of the logo
        @param percentage - Starting percentage of the battery
        @param obj.topLogo - Only used to fill the static variable with this object
        @param obj.position - Either absolute or relative
        @param obj.parent - Parent element if you want it appended
    */
    constructor(size, percentage = 0, obj) {

        //Creates div
        let element = document.createElement('div');
        element.classList.add('logoHolder');
        element.innerHTML = document.querySelector('#logoTemplate').innerHTML;

        //Sizes the div based on 
        let width = size;
        let height = size / 8 * 3;
        element.style.width = `${width}px`;
        element.style.height = `${height}px`;

        //Positions the element depending on obj parameter
        if(obj.position == 'absolute') {
            element.style.top = `${(100 * vh-height)/2}px`;
            element.style.left = `${(100 * vw-width)/2}px`;
        } else {
            element.style.position = 'relative';
            element.style.top = '0';
            element.style.left = '0';
        }
        element.style.fontSize = `${height / (30 * vh) * 4 * vh}px`;

        //Appends the element to the parent if you specified a parent
        if(obj.parent !== undefined) {
            obj.parent.appendChild(element);
        }

        this.element = element;

        //Calls the function to set up the green percentage bar
        this.changePercentage(percentage);
        
        //Fills out static variable if this is at the top of the page
        if(obj.topLogo === true) {
            Logo.topLogo = this;
        }
    }

    /*
        Calls changePercentage based on increment
    */
    incrementPercentage(num) {
        this.changePercentage(num + this.percentage);
    }

    /*
        Changes battery percentage and displays it on the battery
    */
    changePercentage(num) {

        //Updates percentage variable
        this.percentage = num;
        let div = this.element.querySelector('.batteryPercentage');

        //Defaults the cap to transparent if it is not full
        if(num < 100) {
            this.element.querySelector('.cap').style.backgroundColor = 'transparent';
        }

        //Maxes and mins for percentages
        if(this.percentage < 0) {
            this.percentage = 0;
        } else if(this.percentage > 100) {
            this.percentage = 100;
        }

        //Logic to position the battery percentage
        if(this.percentage == 0) {
            div.style.right = '110%';
        } else if(this.percentage == 100) {
            div.style.right = '-10%';
            this.element.querySelector('.cap').style.backgroundColor = 'green';
        } else {
            div.style.right = `${101 - num}%`;
        }
    }
}