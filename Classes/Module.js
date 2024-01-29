class Module {

    static modules = [];

    constructor(obj, i) {
        let divs = document.querySelectorAll('#moduleHolder > .moduleShow');
        let div = divs[i];
        this.element = div;
        this.module = obj;
        this.i = i;


        let innerDivs = document.querySelectorAll(`#moduleHolder > .moduleShow:nth-child(${i+1}) > .divHolder > div`);
        let text = divs[i].querySelector('.textHolder > h2');
        text.innerHTML = obj.title;
        for(let j = 0; j < obj.submodules.length; j++) {
            innerDivs[j].querySelector('h3').innerHTML = obj.submodules[j].title;
        }

        div.addEventListener('click', () => {
            this.enlargeModule();
        });

        Module.modules.push(this);
    }

    static fillModules() {
        for(let i = 0; i < modulesInfo.length; i++) {
            new Module(modulesInfo[i], i);
        }
    }

    enlargeModule() {
        bigModuleHolder.style.display = 'grid';
        rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
        Submodule.fillModules(this);
    }
}