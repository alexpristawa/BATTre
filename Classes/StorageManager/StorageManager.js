class StorageManager {

    static updateStorage() {
        localStorage['BATTre'] = JSON.stringify({
            modulesInfo: modulesInfo
        });
    }
}