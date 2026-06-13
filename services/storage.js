// services/storage.js

const StorageService = {

    get(keys) {
        return new Promise((resolve) => {
            chrome.storage.local.get(keys, resolve);
        });
    },

    set(data) {
        return new Promise((resolve) => {
            chrome.storage.local.set(data, resolve);
        });
    },

    remove(keys) {
        return new Promise((resolve) => {
            chrome.storage.local.remove(keys, resolve);
        });
    },

    clear() {
        return new Promise((resolve) => {
            chrome.storage.local.clear(resolve);
        });
    },

    async update(key, updater) {

        const current = await this.get([key]);

        const nextValue = await updater(current[key]);

        await this.set({
            [key]: nextValue
        });

        return nextValue;
    }

};