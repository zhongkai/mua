(function() {
	var matchs = window.name.match(/^mua_(\d*)_(.*)$/);
    (matchs.length);
	if(matchs[0]) {
		document.addEventListener("beforeload", function (e) {
            var d = new function () {};
            var c;
            for (c in navigator) {
                d[c] = navigator[c]
            }
            d.userAgent = matchs[2];
            window.navigator = d;
        }, true);

		var a = document.createElement("script");
        a.type = "text/javascript";
        a.innerText += "var new_nav = new function() {};";
        a.innerText += "var x;";
        a.innerText += "for (x in navigator) {";
        a.innerText += 'eval("new_nav." + x + " = navigator." + x + ";");';
        a.innerText += "}";
        a.innerText += 'new_nav.userAgent = "' + matchs[2] + '";';
        a.innerText += "window.navigator = new_nav;";

        document.documentElement.insertBefore(a);
	}
})();
