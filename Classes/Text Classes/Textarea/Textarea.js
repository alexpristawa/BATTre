class Textarea {

    /*
        Makes a textarea and adds it to object.contentHolder
        @param length {int} - Designated length for the textarea used if there are more than one
        @param name {String} - Name of the textarea (if name = '/noName', the name div is set to display: none);
        @param object {Submodule} - Submodule where the thing is added to
    */
    constructor(length, name, object) {
        let factor = Math.ceil(length**0.5);
        let div = document.createElement('div');
        div.classList.add('textarea');
        div.innerHTML = document.getElementById('textareaTemplate').innerHTML;
        object.contentHolder.appendChild(div);
        div.style.width = `${100/factor - 1.5}%`;
        div.style.height = `${100/factor - 1.5}%`;
        div.querySelector('.titleHolder').innerHTML = name;
        div.focus();
        if(name == '/noName') {
            div.querySelector('.titleHolder').style.display = 'none';
            div.querySelector('.textareaHolder').style.height = '100%';
        }
    }

}