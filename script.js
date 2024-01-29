const root = document.querySelector(':root');
const body = document.querySelector('body');
let moduleDefaultText = document.getElementById('moduleShowTemplate').innerHTML;
let submoduleDefaultText = document.getElementById('submoduleTemplate').innerHTML;
let bigModuleHolder = document.getElementById('bigModuleHolder');
let vh = window.innerHeight/100;
let vw = window.innerWidth/100;
let rem = parseFloat(getComputedStyle(document.documentElement).fontSize);

document.querySelectorAll('#moduleHolder > div').forEach(el => el.innerHTML = moduleDefaultText);

let backgroundColors = [
    [32, 32, 32],
    [92, 74, 99], 
    [94, 90, 110], 
    [85, 108, 128], 
    [16, 130, 121],
    [73, 99, 90], 
    [97, 59, 59], 
    [107, 76, 93], 
    [99, 114, 117]
];

let rootVariableNames = {
    '--backgroundColor': 1,
    '--veryCloseBackgroundColor': 0.95,
    '--middleBackgroundColor': 0.85,
    '--darkerBackgroundColor': 0.7,
    '--darkerBackgroundColorHalf': 0.7,
    '--borderColor': 1.45
}

let modulesInfo = [
    {
        title: 'Looking Back',
        submodules: [
            {
                title: 'What To Improve On'
            },
            {
                title: 'What I Am Proud Of'
            },
            {
                title: "How Far I've Come"
            },
            {
                title: 'Discoveries'
            }
        ]
    },
    {
        title: 'Looking Ahead',
        submodules: [
            {
                title: 'Intentions'
            },
            {
                title: "What I'm Looking Forward To"
            },
            {
                title: 'Goals And Processes'
            },
            {
                title: 'Vision Board'
            }
        ]
    },
    {
        title: 'Plans',
        submodules: [
            {
                title: 'Schedule'
            },
            {
                title: "Habit Builder"
            },
            {
                title: 'To-Do'
            },
            {
                title: 'Mindmaps'
            }
        ]
    },
    {
        title: 'Journals',
        submodules: [
            {
                title: 'Positive Failures'
            },
            {
                title: 'Compliments'
            },
            {
                title: 'Key Takeaways'
            },
            {
                title: 'Thought Dumps'
            }
        ]
    }
];

let changeColorScheme = (arr) => {
    Object.keys(rootVariableNames).forEach(key => {
        root.style.setProperty(key, arr.toRGB(rootVariableNames[key]));
    });
}

let createLogo = () => {
    new Logo(10 * vw, 0, {
        parent: document.querySelector('#bodyTop'),
        position: 'relative',
        topLogo: true
    });
}

window.onload = () => {
    changeColorScheme(backgroundColors[0]);
    createLogo();
    Module.fillModules();
}