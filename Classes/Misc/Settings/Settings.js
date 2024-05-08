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

    static initialize = () => {
        Settings.width = Settings.animationLength*2 + window.innerHeight*0.09;
        Settings.div.style.transform = `translateX(${Settings.width * 1.1}px)`;
        
        let customizationsButton = Settings.div.querySelector("#customizationsButton");
        customizationsButton.addEventListener('click', () => {Settings.changeTextToComingSoon(customizationsButton)});

        let notificationsButton = Settings.div.querySelector("#notificationsButton");
        notificationsButton.addEventListener('click', () => {Settings.changeTextToComingSoon(notificationsButton)});
    }

    static changeTextToComingSoon(element) {
        let text = element.innerHTML;
        let i = 0;
        let interval = setInterval(() => {
            if(i > "Coming Soon!".length-1) {
                clearInterval(interval);
                text = "Coming Soon!";
            } else if(i > text.length-1) {
                text += "Coming Soon!"[i];
            } else {
                text = text.slice(0, i) + "Coming Soon!"[i] + text.slice(i + 1);
            }
            element.innerHTML = text;
            i++;
        }, 30);
    }
}