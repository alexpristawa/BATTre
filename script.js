const root = document.querySelector(':root');
const body = document.querySelector('body');
let moduleDefaultText = document.getElementById('moduleShowTemplate').innerHTML;
let submoduleDefaultText = document.getElementById('submoduleTemplate').innerHTML;
let moduleHolder = document.getElementById('moduleHolder');
let vh = window.innerHeight/100;
let vw = window.innerWidth/100;
let rem = parseFloat(getComputedStyle(document.documentElement).fontSize);

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
                textType: 'bullet-regular'
            },
            {
                title: 'What I Am Proud Of',
                textType: 'bullet-regular'
            },
            {
                title: "How Far I've Come",
                textType: 'textarea',
                textInfo: {
                    names: ['Day', 'Week', 'Month', 'Year']
                }
            },
            {
                title: 'Discoveries',
                textType: 'bullet-regular'
            }
        ]
    },
    {
        title: 'Looking Ahead',
        submodules: [
            {
                title: 'Intentions',
                textType: 'bullet-regular'
            },
            {
                title: "What I'm Looking Forward To",
                textType: 'textarea',
                textInfo: {
                    names: ['Day', 'Week', 'Month', 'Year']
                }
            },
            {
                title: 'Goals And Processes',
                textType: 'bullet-checkbox'
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
                title: 'Schedule',
                submodules: [
                    {
                        title: "Today's Schedule",
                        textType: 'bullet-time'
                    },
                    {
                        title: "Tomorrow's Schedule",
                        textType: 'bullet-time'
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
                textType: 'bullet-checkbox'
            },
            {
                title: 'To-Do'
            },
            {
                title: 'Mindmaps',
                textType: 'textarea',
                textInfo: {
                    names: ['/noName']
                }
            }
        ]
    },
    {
        title: 'Journals',
        submodules: [
            {
                title: 'Positive Failures',
                textType: 'bullet-date'
            },
            {
                title: 'Compliments',
                textType: 'bullet-date'
            },
            {
                title: 'Key Takeaways',
                textType: 'bullet-date'
            },
            {
                title: 'Thought Dumps',
                textType: 'bullet-date'
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
        parent: document.querySelector('#bodyTop'),
        position: 'relative',
        topLogo: true
    });
}

//onload function to fill modules and stuff
window.onload = () => {
    changeColorScheme(backgroundColors[0]);
    createLogo();
    Module.fillModules();
}