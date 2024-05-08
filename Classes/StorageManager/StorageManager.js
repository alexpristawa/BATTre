class StorageManager {

    //Used in beginning so you don't need to constantly parse storage among different functions
    static storageClone;

    /**
     * Updates the storage to the current modulesInfo array
     */
    static updateStorage() {
        let obj = JSON.parse(localStorage['BATTre']);
        obj.archive[StorageManager.getDateFormatted()] = modulesInfo;
        localStorage['BATTre'] = JSON.stringify(obj);
    }

    /**
     * Formats a date in 'mm/dd/yyyy' format as used for a key in storage
     * @param {Date} today - Date you want to get the formatted date of (Default is current day)
     * @returns {String} - Date in 'mm/dd/yyyy' format
     */
    static getDateFormatted(today = new Date()) {
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const year = today.getFullYear();
        return `${month}/${day}/${year}`;
    }

    /**
     * Initializes modulesInfo object based on whether or not the current date has been accessed
     * If it hasn't, it goes through previous dates to see the last time each module was updated
     */
    static initializeModulesInfo = () => {
        if(localStorage.BATTre != undefined) {
            let obj = JSON.parse(localStorage.BATTre);
            StorageManager.storageClone = obj;
            let possibleObj = obj.archive[StorageManager.getDateFormatted()];

            //If something already exists for this date, it simply sets it to the thing
            if(possibleObj != undefined) {
                modulesInfo = possibleObj;
            } else { //If nothing exists for this date, it looks through previous dates to get things that haven't reset
                callOnSubmodules({submodules: modulesInfo}, StorageManager.getInfo);

            }
        } else {
            let obj = {
                archive: {}
            };
            obj.archive[StorageManager.getDateFormatted()] = modulesInfo;
            localStorage.BATTre = JSON.stringify(obj);
        }
        StorageManager.updateStorage();
    }

    /**
     * Goes through storage to find what the object's info array should be set to
     * @param {Object} obj - Sets the object's info array to its previous structure in storage
     * @returns {undefined}
     */
    static getInfo(obj) {

        //Checks if it is some special type
        if(typeof obj.refreshFrequency == "string" && obj.refreshFrequency.includes('special-')) {

            //Cuts off the "special-" part
            let newType = obj.refreshFrequency.substring(obj.refreshFrequency.indexOf('-')+1);

            if(newType == "todaysSchedule") {
                let yesterday = new Date();
                yesterday.setDate(yesterday.getDate()-1);

                //If yesterday's tomorrow's schedule existed, sets today's schedule to it
                //It doesn't matter if it was unused since schedule refreshes either way so it is an empty array either way
                let yesterdayObject = StorageManager.storageClone.archive[StorageManager.getDateFormatted(yesterday)];
                if(yesterdayObject !== undefined) {
                    let newObj = searchForTitle({submodules: yesterdayObject}, "Tomorrow's Schedule");
                    obj.info = [...newObj.info];
                } else {
                    obj.info = [];
                }
                return;
            }
        }
        //If it is a written word, translates it into the object equivalent
        if(typeof obj.refreshFrequency == "string" && obj.refreshFrequency !== "never") {
            obj.refreshFrequency = defaultRefreshFrequencies[obj.refreshFrequency];
        }

        if(obj.refreshFrequency !== undefined && obj.refreshFrequency !== 'never') {
            if(obj.refreshFrequency.type == 'd') {
                obj.info = [];
            } else if(['w', 'm', 'y'].includes(obj.refreshFrequency.type)) {
                let date = new Date();
                let condition = true;
                while(condition) {
                    let object = StorageManager.storageClone.archive[StorageManager.getDateFormatted(date)]
                    if(object != undefined) {
                        let newObj = searchForTitle({submodules: object}, obj.title);
                        console.log(newObj);
                        obj.info = newObj.info;
                        break;
                    }
                    if(obj.refreshFrequency.type == 'w') {
                        if(date.getDay() == 0) {
                            condition = false;
                        }
                    } else if(obj.refreshFrequency.type == 'm') {
                        if(date.getDate() == 1) {
                            condition = false;
                        }
                    } else if(obj.refreshFrequency.type == 'y') {
                        if(date.getDate() == 1 && date.getMonth() == 0) {
                            condition = false;
                        }
                    }
                    date.setDate(date.getDate()-1);
                }
            }
        }
    }

    /**
     * Removes a day from storage
     * @param {String} date - The day you want to remove from storage 'mm/dd/yyyy'. It could also be "future" to remove all dates past the current date
     */
    static removeDateFromStorage(date = 'all') {
        let storage = JSON.parse(localStorage.BATTre);
        if(date == 'future') {
            let date = StorageManager.getDateFormatted();
            Object.keys(storage.archive).forEach(key => {
                if(StorageManager.isFutureDate(key, date)) {
                    delete storage.archive[key];
                }
            });
        } else if(date == 'all') {
            storage.archive = {};
        } else {
            delete storage.archive[date];
        }
        localStorage.BATTre = JSON.stringify(storage);
    }

    /**
     * Checks if one date is later than another
     * @param {String} dateString1 - mm/dd/yyyy formatted date
     * @param {String} dateString2 - mm/dd/yyyy formatted date
     * @returns true if dateString1 is later than dateString2 and false otherwise
     */
    static isFutureDate(dateString1, dateString2) {
        const [month1, day1, year1] = dateString1.split('/');
        const [month2, day2, year2] = dateString2.split('/');
    
        // Note: Months are 0-indexed in JavaScript Date object, so we subtract 1
        const date1 = new Date(year1, month1 - 1, day1);
        const date2 = new Date(year2, month2 - 1, day2);
    
        return date1 > date2;
    }
}