chrome.extension.sendRequest({
    set: {
        config: {
            title: 'MY SLACK APP',
            menu: [
                'random',
                'general',
            ]
        }
    }
});