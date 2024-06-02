chrome.runtime.onInstalled.addListener(() => {
    console.log('SERP URL Cleaner Extension is installed.');
    chrome.storage.local.set({
        enabled: true
    });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'toggleEnabled') {
        chrome.storage.local.get('enabled', (data) => {
            const newStatus = !data.enabled;
            chrome.storage.local.set({
                enabled: newStatus
            }, () => {
                sendResponse({
                    enabled: newStatus
                });
            });
        });
        return true;
    }
});