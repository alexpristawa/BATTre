const root = document.querySelector(':root');
const body = document.querySelector('body');
let moduleDefaultText = document.getElementById('moduleShowTemplate').innerHTML;
let submoduleDefaultText = document.getElementById('submoduleTemplate').innerHTML;
let moduleHolder = document.getElementById('moduleHolder');
let vh = window.innerHeight/100;
let vw = window.innerWidth/100;
let rem = parseFloat(getComputedStyle(document.documentElement).fontSize);

const defaultRefreshFrequencies = {
    day: {
        type: "d",
        resetTime: {
            h: 0,
            m: 0,
        }
    },
    week: {
        type: 'w',
        resetTime: {
            d: 0,
            h: 0,
            m: 0
        }
    },
    month: {
        type: 'm',
        resetTime: {
            d: 0,
            h: 0,
            m: 0
        }
    },
    year: {
        type: 'y',
        resetTime: {
            m: 0,
            d: 0,
            h: 0,
            m: 0
        }
    }
}

//Gives all modules their default values
document.querySelectorAll('#moduleHolder > div').forEach(el => el.innerHTML = moduleDefaultText);

//Options for background (Used for CSS root variables) function -> changeColorSceme(arr)
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

//CSS root variable names and the multiplier on the color
let rootVariableNames = {
    '--backgroundColor': 1,
    '--veryCloseBackgroundColor': 0.95,
    '--middleBackgroundColor': 0.85,
    '--darkerBackgroundColor': 0.7,
    '--darkerBackgroundColorHalf': 0.7,
    '--borderColor': 1.45
}

//Outline for all default outlines
let modulesInfo = [
    {
        title: 'Looking Back',
        submodules: [
            {
                title: 'What To Improve On',
                textType: 'bullet-regular',
                refreshFrequency: 'month',
                info: []
            },
            {
                title: 'What I Am Proud Of',
                textType: 'bullet-regular',
                refreshFrequency: 'day',
                info: []
            },
            {
                title: "How Far I've Come",
                textType: 'textarea',
                refreshFrequency: 'week',
                textInfo: {
                    names: ['Day', 'Week', 'Month', 'Year']
                },
                info: []
            },
            {
                title: 'Discoveries',
                textType: 'bullet-regular',
                refreshFrequency: 'never',
                info: []
            }
        ]
    },
    {
        title: 'Looking Ahead',
        submodules: [
            {
                title: 'Intentions',
                textType: 'bullet-regular',
                refreshFrequency: 'day',
                info: []
            },
            {
                title: "What I'm Looking Forward To",
                textType: 'textarea',
                refreshFrequency: 'week',
                textInfo: {
                    names: ['Day', 'Week', 'Month', 'Year']
                },
                info: []
            },
            {
                title: 'Goals And Processes',
                textType: 'bullet-checkbox',
                info: []
            },
            {
                title: 'Vision Board',
                refreshFrequency: 'never'
            }
        ]
    },
    {
        title: 'Plans',
        submodules: [
            {
                title: 'Schedule',
                submodules: [
                    {
                        title: "Today's Schedule",
                        textType: 'bullet-time',
                        refreshFrequency: 'special-todaysSchedule',
                        info: []
                    },
                    {
                        title: "Tomorrow's Schedule",
                        textType: 'bullet-time',
                        refreshFrequency: "daily",
                        info: []
                    },
                    {
                        title: "Routine"
                    },
                    {
                        title: "Placeholder"
                    }
                ]
            },
            {
                title: "Habit Builder",
                textType: 'bullet-checkbox',
                info: []
            },
            {
                title: 'To-Do'
            },
            {
                title: 'Mindmaps',
                textType: 'textarea',
                textInfo: {
                    names: ['/noName']
                },
                refreshFrequency: 'never',
                info: []
            }
        ]
    },
    {
        title: 'Journals',
        submodules: [
            {
                title: 'Positive Failures',
                textType: 'bullet-date',
                refreshFrequency: 'year',
                info: []
            },
            {
                title: 'Compliments',
                textType: 'bullet-date',
                refreshFrequency: 'year',
                info: []
            },
            {
                title: 'Key Takeaways',
                textType: 'bullet-date',
                refreshFrequency: 'never',
                info: []
            },
            {
                title: 'Thought Dumps',
                textType: 'bullet-date',
                refreshFrequency: 'year',
                info: []
            }
        ]
    }
];

//Changes CSS root variables with a color arr [r, g, b]
let changeColorScheme = (arr) => {
    Object.keys(rootVariableNames).forEach(key => {
        root.style.setProperty(key, arr.toRGB(rootVariableNames[key]));
    });
}

//Function used to make the logo at the top
let createLogo = () => {
    new Logo(10 * vw, 0, {
        parent: document.querySelector('#bodyTop > div:nth-child(2)'),
        position: 'relative',
        topLogo: true
    });
}

//onload function to fill modules and stuff
window.onload = () => {
    Settings.initialize();
    Favicon.loadupFunction();
    StorageManager.initializeModulesInfo();
    changeColorScheme(backgroundColors[0]);
    createLogo();
    Module.fillModules();
}

window.addEventListener('beforeunload', (event) => {
    if(modulesInfo != undefined) {
        StorageManager.updateStorage();
    }
});