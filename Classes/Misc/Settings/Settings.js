class Settings {

    static active = false;
    static iconHolder = document.querySelector('.settingsHolder');
    static icon = Settings.iconHolder.querySelector('i');
    static radius = Settings.icon.offsetHeight/2;
    static animationLength = Settings.radius*Math.PI*(4/3);
    static div = document.querySelector('.settingsDiv');

    static click = () => {
        Settings.width = Settings.animationLength*2 + window.innerHeight*0.09;
        Settings.div.style.width = `${Settings.width}px`;
        Settings.icon.classList.toggle('settingsRotate');
        Settings.icon.classList.toggle('settingsUnrotate');
        Settings.active = !Settings.active;

        if(Settings.active) {
            Settings.iconHolder.style.transform = `translateX(-${Settings.animationLength}px)`;
            Settings.div.style.transform = `translateX(0)`;

        } else {
            Settings.iconHolder.style.transform = 'translateX(0)';
            Settings.div.style.transform = `translateX(${Settings.width * 1.1}px)`;

        }
    }

    static initializeDimensions = () => {
        Settings.width = Settings.animationLength*2 + window.innerHeight*0.09;
        Settings.div.style.transform = `translateX(${Settings.width * 1.1}px)`;
    }
}