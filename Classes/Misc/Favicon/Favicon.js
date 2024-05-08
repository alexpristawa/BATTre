class Favicon {

    //Favicon element (to change the href)
    static element = document.querySelector('link[rel="icon"]');
    
    /**
     * Function that changes battery percentage when the page is loaded
     */
    static loadupFunction() {
        let direction = 1;
        let i = 0;

        let interval = setInterval(() => {

            //Changes image
            Favicon.element.href = `Images/Favicons/favicon${i}.png?v=${new Date().getTime()}`;

            //Inc
            i += 2 * direction;

            //Makes it change direction if the battery is full
            if(i == 10) {
                direction = -1;
            }

            //Stops the interval when it gets back to 0
            if(i < 0) {
                clearInterval(interval);
                setTimeout(() => {

                    //Starting percentage here
                }, 500);
            }
        }, 250);
    }
}