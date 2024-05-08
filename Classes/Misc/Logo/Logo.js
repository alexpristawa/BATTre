class Logo {

    //Static variable for the logo at the top of the page
    static topLogo;

    /*
        Creates all HTML for the logo
        @param size - Width in pixels of the logo
        @param percentage - Starting percentage of the battery
        @param obj.topLogo - Only used to fill the static variable with this object
        @param obj.position - Either absolute or relative
        @param obj.parent - Parent element if you want it appended
    */
    constructor(size, percentage = 0, obj) {

        //Creates div
        let element = document.createElement('div');
        element.classList.add('logoHolder');
        element.innerHTML = document.querySelector('#logoTemplate').innerHTML;

        //Sizes the div based on 
        let width = size;
        let height = size / 8 * 3;
        element.style.width = `${width}px`;
        element.style.height = `${height}px`;

        //Positions the element depending on obj parameter
        if(obj.position == 'absolute') {
            element.style.top = `${(100 * vh-height)/2}px`;
            element.style.left = `${(100 * vw-width)/2}px`;
        } else {
            element.style.position = 'relative';
            element.style.top = '0';
            element.style.left = '0';
        }
        element.style.fontSize = `${height / (30 * vh) * 4 * vh}px`;

        //Appends the element to the parent if you specified a parent
        if(obj.parent !== undefined) {
            obj.parent.appendChild(element);
        }

        this.div = element;
        this.body = element.querySelector('.body');
        this.bodyText = this.body.querySelector('h2');
        this.cap = element.querySelector('.cap');
        this.capText = this.cap.querySelector('h3');

        //Calls the function to set up the green percentage bar
        this.changePercentage(percentage);
        
        this.topLogo = false;
        //Fills out static variable if this is at the top of the page
        if(obj.topLogo === true) {
            Logo.topLogo = this;
            this.topLogo = true;
        }

        this.div.addEventListener('click', this.clickHandler);
    }

    /**
     * Click handler for logos
     */
    clickHandler = () => {
        if(this.topLogo) {
            if(Module.activeModule != undefined) {
                Module.activeModule.exitModule(true);
            } else {
                this.animate();
            }
        } else {
            this.animate();
        }
    }

    /*
        Calls changePercentage based on increment
    */
    incrementPercentage(num) {
        this.changePercentage(num + this.percentage);
    }

    /*
        Changes battery percentage and displays it on the battery
    */
    changePercentage(num) {

        //Updates percentage variable
        this.percentage = num;
        let div = this.div.querySelector('.batteryPercentage');

        //Defaults the cap to transparent if it is not full
        if(num < 100) {
            this.div.querySelector('.cap').style.backgroundColor = 'transparent';
        }

        //Maxes and mins for percentages
        if(this.percentage < 0) {
            this.percentage = 0;
        } else if(this.percentage > 100) {
            this.percentage = 100;
        }

        //Logic to position the battery percentage
        if(this.percentage == 0) {
            div.style.right = '110%';
        } else if(this.percentage == 100) {
            div.style.right = '-10%';
            this.div.querySelector('.cap').style.backgroundColor = 'green';
        } else {
            div.style.right = `${101 - num}%`;
        }
    }

    /*
        Animation function for the battery
    */
    async animate() {
        //Makes everything but the cap text fade out
        {
            let divClone = this.body.cloneForAnimation();
            divClone.style.backgroundColor = 'transparent';
            divClone.style.width = '2em';
            divClone.style.borderTopRightRadius = '0';
            divClone.style.borderBottomRightRadius = '0';
            divClone.style.boxSizing = 'border-box';
            divClone.style.border = '0px solid white';
            [this.body, this.cap].forEach(element => {
                element.applyStyles({
                    transition: 'border 350ms cubic-bezier(.57,0,.85,.2)',
                    border: '1px solid rgb(255, 255, 255, 0)'
                });
            });
            this.bodyText.querySelectorAll('span').forEach(element => element.applyStyles({
                transition: 'opacity 350ms cubic-bezier(.57,0,.85,.2)',
                opacity: '0.1' 
            }));
            
            let fontSize = parseFloat(window.getComputedStyle(this.capText).fontSize);

            //Creates word divs
            let div = document.createElement('div');
            div.classList.add('animationWordHolder');
            div.style.opacity = '0';

            // *1.2 compensates for line height
            div.style.height = `${fontSize*1.2*4}px`;

            let newDiv = document.createElement('div');
            newDiv.classList.add('animationWords');
            newDiv.style.fontSize = `${fontSize}px`;
            newDiv.style.transform = `translateY(${-fontSize*0.6}px)`;

            body.appendChild(div);
            div.appendChild(newDiv);

            //Formats the text from the word array
            let words = ['invent', 'view', 'design', 'vamp', 'style', 'think', 'form', 'build', 'fine', 'charge', 'align', 'vise'];
            let text = "<p>" + words.map(word => word.toUpperCase()).join("</p><p>") + "</p>";
            newDiv.innerHTML = text;

            //Sets the word div next to the "re"
            div.style.left = `${this.div.getX() + this.div.offsetWidth}px`;
            div.style.top = `${this.div.getY() + this.div.offsetHeight/2 - parseFloat(fontSize)*1.2*2}px`;

            await delay(500);

            newDiv.applyStyles({
                transition: 'transform 1300ms cubic-bezier(.39,.17,.52,1.2)',
                transform: `translateY(-${fontSize*1.2*(words.length-5) + fontSize*0.35}px`
            });

            await delay(150);

            div.applyStyles({
                transition: 'opacity 400ms ease-out',
                opacity: 1
            });

            await delay(750);

            newDiv.querySelectorAll('p').forEach(p => {
                if(p.innerHTML != 'CHARGE') {
                    p.applyStyles({
                        transition: 'color 300ms ease-in',
                        color: 'rgba(255, 255, 255, 0)'
                    });
                }
            });

            //Makes the text drops for the next await

            let texts = ["etter", "ll", "he", "ime"];
            let elements = [];
            let spans = [...this.bodyText.querySelectorAll('span')];
            {
                let i = 0;
                spans.forEach(element => {
                    let div = document.createElement('div');
                    div.classList.add('animationDrop');
                    let str = texts[i];
                    let innerhtml = '';
                    for(let j = 0; j < str.length; j++) {
                        innerhtml += `<span>${str[j].toUpperCase()}</span>`;
                    }
                    div.innerHTML = innerhtml;
                    div.style.top = `${this.div.getY() + this.div.offsetHeight - rem/2}px`;
                    div.style.left = `${element.getX()}px`;
                    div.style.width = `${element.offsetWidth}px`;
                    div.style.opacity = '0';
                    body.appendChild(div);
                    elements.push(div);
                    setTimeout(() => {
                        div.querySelectorAll('span').forEach(element => element.style.fontSize = `${fontSize * 1.5}px`);
                    });


                    i++;
                });
            }

            await delay(450);

            div.fadeOut(100);
            this.capText.querySelectorAll('span').forEach(span => span.applyStyles({
                transition: 'opacity 100ms ease',
                opacity: 0
            }));

            setTimeout(() => {
                divClone.applyStyles({
                    transition: 'border 300ms ease',
                    borderLeft: '1px solid white',
                    borderTop: '1px solid white',
                    borderBottom: '1px solid white'
                });
            }, 900);

            setTimeout(() => {
                divClone.applyStyles({
                    transition: 'width 1000ms ease-in-out',
                    width: `${this.body.offsetWidth}px`
                });
                setTimeout(() => {
                    divClone.remove();
                    this.body.style.transition = '';
                    this.body.style.border = '1px solid white';
                },1400);
            }, 1300);

            for(let i = 0; i <= elements.length; i++) {
                if(i > 0) {
                    elements[i-1].fadeOut(100, false);
                    spans[i-1].applyStyles({
                        transition: 'opacity 100ms',
                        opacity: '0.1' 
                    });
                    if(i == elements.length) {
                        break;
                    }
                }

                elements[i].fadeIn(100);
                spans[i].fadeIn(100, 'inline-block');
                await delay(500);
            }


            let borderRadius = window.getComputedStyle(this.div).fontSize;
            setTimeout(() => {
                divClone.applyStyles({
                    transition: 'border 300ms ease',
                    border: '1px solid white',
                    borderRadius: borderRadius
                });
            }, 200);

            spans.push(this.capText.querySelectorAll('span')[0]);
            spans.push(this.capText.querySelectorAll('span')[1]);

            for(let i = 0; i < spans.length; i++) {
                if(i == 4) {
                    this.cap.applyStyles({
                        transition: 'border 800ms ease',
                        border: '1px solid white'
                    })
                }
                spans[i].applyStyles({
                    transition: 'opacity 200ms',
                    opacity: '0.7'
                });
                await delay(400);
            }

            spans[1].applyStyles({
                transition: 'opacity 100ms',
                opacity: '1'
            });

            await delay(200);

            spans[4].applyStyles({
                transition: 'opacity 100ms',
                opacity: '1'
            });

            await delay(125);

            spans[3].applyStyles({
                transition: 'opacity 100ms',
                opacity: '1'
            });

            await delay(75);

            spans[1].applyStyles({
                transition: 'opacity 100ms',
                opacity: '0.5'
            });

            await delay(50);
            
            spans[1].applyStyles({
                transition: 'opacity 100ms',
                opacity: '1'
            });

            await delay(150);

            spans[0].applyStyles({
                transition: 'opacity 100ms',
                opacity: '1'
            });

            await delay(200);

            spans[0].applyStyles({
                transition: 'opacity 100ms',
                opacity: '0.5'
            });

            await delay(25);

            spans[2].applyStyles({
                transition: 'opacity 100ms',
                opacity: '1'
            });

            await delay(25);

            spans[0].applyStyles({
                transition: 'opacity 100ms',
                opacity: '1'
            });

            await delay(25);

            spans[4].applyStyles({
                transition: 'opacity 100ms',
                opacity: '0.5'
            });

            await delay(75);

            spans[4].applyStyles({
                transition: 'opacity 100ms',
                opacity: '1'
            });

            spans[0].applyStyles({
                transition: 'opacity 100ms',
                opacity: '1'
            });

            await delay(50);

            spans[5].applyStyles({
                transition: 'opacity 100ms',
                opacity: '1'
            });
            
            await delay(25);

            spans[0].applyStyles({
                transition: 'opacity 100ms',
                opacity: '0.5'
            });

            await delay(100);

            spans[0].applyStyles({
                transition: 'opacity 100ms',
                opacity: '1'
            });
        }
    }
}