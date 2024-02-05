class Submodule {

    constructor(obj, i) {
        let div = document.createElement('div');
        div.classList.add('submodule');
        div.innerHTML = submoduleDefaultText;
        bigModuleHolder.appendChild(div);

        let text = div.querySelector('h2');
        text.innerHTML = obj.module.submodules[i].title;

        this.parent = obj;
        this.module = obj.module.submodules[i];
        this.element = div;
        this.contentHolder = div.querySelector('.contentHolder');
        this.i = i;
        this.moveFromModule();

        div.addEventListener('click', this.clickListener);
        div.addEventListener('keydown', this.clickListener);
    }

    clickListener = (event) => {
        if(event.key === undefined) {
            if(event.target == this.element || event.target == this.contentHolder) {
                this.fillContent();
            }
        } else {
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
        let ref = this.parent.element.querySelector(`.divHolder > div:nth-child(${this.i+1})`).dataset.target;
        let textRef = this.parent.element.querySelector(`.divHolder > div:nth-child(${this.i+1}) > h3`).dataset.target;
        let divToMove = document.querySelector(`[data-ref='${ref}']`);
        let textToMove = document.querySelector(`[data-ref='${textRef}']`);

        divToMove.style.transition = 'all 1000ms ease-in-out';
        divToMove.style.top = `${this.element.getY()}px`;
        divToMove.style.left = `${this.element.getX()}px`;
        divToMove.style.width = `${this.element.offsetWidth - 4}px`;
        divToMove.style.height = `${this.element.offsetHeight - 4}px`;
        divToMove.style.backgroundColor = 'var(--backgroundColor)';
        divToMove.style.border = '2px solid var(--borderColor)';

        textToMove.style.transition = 'all 1000ms ease-in-out';
        textToMove.style.top = `${this.element.querySelector('h2').getY() - 1.5 * rem}px`;
        textToMove.style.left = `${this.element.querySelector('h2').getX()}px`;
        textToMove.style.width = `${this.element.querySelector('h2').offsetWidth + 1}px`;
        textToMove.style.height = `${this.element.querySelector('h2').offsetHeight}px`;
        textToMove.style.fontSize = '1.5rem';

        setTimeout(() => {
            divToMove.remove();
            textToMove.remove();
        }, 1050)
    }

    fillContent() {
        if(this.module.textType == 'bullet') {
            let bullet = document.createElement('div');
            bullet.classList.add('bullet');
            bullet.innerHTML = document.getElementById('bulletPointTemplate').innerHTML;
            this.contentHolder.appendChild(bullet);
        }
    }

}