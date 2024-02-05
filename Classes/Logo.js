class Logo {

    static topLogo;

    constructor(size, percentage = 0, obj) {
        let element = document.createElement('div');
        element.classList.add('logoHolder');
        element.innerHTML = document.querySelector('#logoTemplate').innerHTML;
        let width = size;
        let height = size / 8 * 3;
        if(obj.position == 'absolute') {
            element.style.top = `${(100 * vh-height)/2}px`;
            element.style.left = `${(100 * vw-width)/2}px`;
            element.style.width = `${width}px`;
            element.style.height = `${height}px`;
        } else {
            element.style.position = 'relative';
            element.style.top = '0';
            element.style.left = '0';
            element.style.width = `${width}px`;
            element.style.height = `${height}px`;
        }
        element.style.fontSize = `${height / (30 * vh) * 4 * vh}px`;
        if(obj.parent !== undefined) {
            obj.parent.appendChild(element);
        }

        this.element = element;
        this.changePercentage(percentage);
        
        if(obj.topLogo === true) {
            Logo.topLogo = this;
        }
    }

    incrementPercentage(num) {
        this.changePercentage(num + this.percentage);
    }

    changePercentage(num) {
        this.percentage = num;
        let div = this.element.querySelector('.batteryPercentage');
        this.element.querySelector('.cap').style.backgroundColor = 'transparent';
        if(this.percentage < 0) {
            this.percentage = 0;
        } else if(this.percentage > 100) {
            this.percentage = 100;
        }
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