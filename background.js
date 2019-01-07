
var data = {};

var Background = {

    start: function() {

        Background.stop();

		data = {
				this_tab	: null,
				inter_id	: null,
            	inter_sec	: 3,
				step		: 0,
			};

        chrome.tabs.query(
            { currentWindow: true, active: true },
            function (tabs) {

                data.this_tab = tabs[0];
                data.inter_id = setInterval((function hoge() {
                    Background.next();
                    return hoge;
                }()), data.inter_sec * 1000);
            }
        );
	},

    next : function(){

        if(data.step == 'end'){
            Background.stop();
            return;
        }

		chrome.tabs.executeScript(data.this_tab.id, {
			file: "vendor/jquery-2.2.4.min.js"
		});

        chrome.tabs.executeScript(data.this_tab.id, {
            file: "vendor/jquery.cookie.js"
        });

        chrome.tabs.executeScript(data.this_tab.id, {
            file: "actions/config.js"
        });

        chrome.tabs.executeScript(data.this_tab.id, {
            file: "actions/provider.js"
        });
        
        chrome.tabs.insertCSS(data.this_tab.id, {
        	file: 'styles.css'
        });
	},
    stop : function(){
        clearInterval(data.inter_id);
        data.inter_id = null;
    }
};

chrome.browserAction.onClicked.addListener(function () {
	Background.start();
});

chrome.extension.onRequest.addListener(
	function(request, sender, sendResponse) {

		if(request.get){
			if(request.get === true){
				sendResponse(data);
			}else{
				sendResponse(data[request.get]);
			}

		}else if(request.func){

			Background[request.func](request.opt);

		}else if(request.set){

			for (var key in request.set) {
				data[key] = request.set[key];
			}

			sendResponse(true);

		}else if(request.import){

			data.import = request.import;
            chrome.tabs.executeScript(data.this_tab.id, {
                file: request.import
            });
        }

	}
);
