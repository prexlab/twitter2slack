chrome.extension.sendRequest({get: true}, function (response) {

    var actionProvider = [
        {exp: '.twitter.com', file: 'actions/twitter/main.js'},
    ];

    if(response.import){

        chrome.extension.sendRequest({import: response.import});

    }else{

        for (var i in actionProvider) {
            if (document.location.href.match(new RegExp(actionProvider[i].exp))
            && (actionProvider[i].flag ? actionProvider[i].flag() : true)) {

                console.log('import: ' + actionProvider[i].file);
                chrome.extension.sendRequest({import: actionProvider[i].file});
                return;
            }
        }

        console.log('no task!');
        chrome.extension.sendRequest({set : {step : 'end'}});
    }

});

