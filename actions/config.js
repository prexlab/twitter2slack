chrome.extension.sendRequest({
    set: {
        config: {
            title: 'MY SLACK APP',
            menu: [
                '5f_toilet',
                'alert',
                'analysis',
                'backlog',
                'deployhq',
                'docbase',
                'lets-camp',
                'lsd-all',
                'onaoshi_photo_form',
                'opex',
                'opex-dev',
            ]
        }
    }
});