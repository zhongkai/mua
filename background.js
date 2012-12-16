(function() {
    var cTab = 0, uaHash = [],
        cIndex = 0, cWindow = null;
    chrome.tabs.onUpdated.addListener(function(tabId) {
        chrome.pageAction.show(tabId);
    });
    chrome.tabs.onActivated.addListener(function(o) {
        chrome.pageAction.show(o.tabId);
    });
    chrome.pageAction.onClicked.addListener(function(tab) {
        uaHash = [];
        cIndex = 0;
        cWindow && cWindow.close();
        cWindow = window.open('compare.html#' + encodeURIComponent(tab.url), 'muacompare');
    });
    chrome.extension.onMessage.addListener(function(c, b, a) {
        switch(c.action) {
            case "reset":
                window.localStorage.clear();
                a();
                break;
            case "getUA":
                a(getList()[+c.data].ua);
                break;
            case "getList":
                a(getList());
                break;
            case "save":
                var sd = [];
                c.data.forEach(function(item) {
                    sd.push({
                        n: item[0],
                        ua: item[1]
                    })
                });
                window.localStorage.setItem('mua-data', JSON.stringify(sd));
                cWindow && cWindow.close();
                break;
            case "setTab":
                cTab = b.tab.id;
                a();
                break;
            default:
                return true;
        }
        //The chrome.extension.onMessage listener must return true if you want to send a response after the listener returns
        return true;
    });

    //omnibox
    chrome.omnibox.onInputEntered.addListener(function(text) {
        uaHash = [];
        cIndex = 0;
        cWindow && cWindow.close();
        cWindow = window.open('compare.html#' + encodeURIComponent('http://' + text), 'muacompare');
    });


    function getList() {
        var d = window.localStorage.getItem('mua-data');
        return d && d !== 'undefined' ? JSON.parse(d) : D.L;
    }

    function getUA(info) {
        if(uaHash[info.frameId]) return uaHash[info.frameId];
        if(info.tabId > -1 && info.tabId == cTab && info.type == 'sub_frame') {
            console.info(112233);
            var l = getList();
            if(++cIndex > l.length) {
                cIndex = 1;
                uaHash = []
            }
            uaHash[info.frameId] = l[cIndex - 1].ua;
            return l[cIndex - 1].ua;
        }
        return navigator.userAgent;
    }

    var listener = null;

    function replaceHeader(a, e) {
        if (!a || !e) {
            return {}
        }
        var d = [];
        for (var c = 0; c < e.length; c++) {
            if (e[c].name != "User-Agent") {
                d.push(e[c])
            } else {
                var b = e[c].value;
                b = a;
                d.push({
                    name: "User-Agent",
                    value: b
                })
            }
        }
        return {
            requestHeaders: d
        };
    }

    function updateListeners() {
        if (listener != null) {
            chrome.webRequest.onBeforeSendHeaders.removeListener(listener);
        }
        listener = function(e) {
            return replaceHeader(getUA(e), e.requestHeaders)
        };
        chrome.webRequest.onBeforeSendHeaders.addListener(listener, {
            urls: ["http://*/*", "https://*/*"]
        },
        ["requestHeaders", "blocking"]);
    }
    updateListeners();
})();
