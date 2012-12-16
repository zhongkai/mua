D = {
	//default list
	L: [
		{
			n: 'IPHONE - IOS5',
			ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3'
		},
		{
			n: 'IPHONE - IOS4',
			ua: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_3_2 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8H7 Safari/6533.18.5'
		},
		{
			n: 'Androi 2.3 - Nexus S',
			ua: 'Mozilla/5.0 (Linux; U; Android 2.3.6; en-us; Nexus S Build/GRK39F) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1'
		},
		{
			n: 'Android 4.1 - Nexus ',
			ua: 'Mozilla/5.0 (Linux; Android 4.1.1; Nexus 7 Build/JRO03D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Safari/535.19'
		},
		{
			n: 'IPAD',
			ua: 'Mozilla/5.0 (iPad; U; CPU OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B334b Safari/531.21.10'
		},
		{
			n: 'Android 2.1 - SonyEricsson E10a',
			ua: 'Mozilla/5.0 (Linux; U; Android 2.1-update1; es-mx; SonyEricssonE10a Build/2.0.A.0.504) AppleWebKit/530.17 (KHTML, like Gecko) Version/4.0 Mobile Safari/530.17'
		},
		{
			n: 'S60 Nokia Browser 7.2.6',
			ua: 'Mozilla/5.0 (SymbianOS/9.4; Series60/5.0 NokiaC6-00/20.0.042; Profile/MIDP-2.1 Configuration/CLDC-1.1; zh-hk) AppleWebKit/525 (KHTML, like Gecko) BrowserNG/7.2.6.9 3gpp-gba'
		}
	]
};

if(!window.localStorage.getItem('mua-data') && window.localStorage.getItem('mua-data') === 'undefined') {
	window.localStorage.setItem('mua-data', JSON.stringify(D.L));
}