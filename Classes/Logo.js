class Logo {

    constructor(size, percentage = 0, obj) {
        let element = document.createElement('div');
        element.classList.add('logoHolder');
        element.innerHTML = document.querySelector('#logoTemplate').innerHTML;
        let width = size;
        let height = (size/vw) / 4 * 3 * vh;
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

        this.percentage = percentage;
        this.element = element;
    }
}