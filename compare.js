(function() {

	var cols = 0;

	window.isMultipleUACompare = 1;

	$(window).load(function() {
		$('h1').html(chrome.i18n.getMessage("compareTitle"));

		init();

        var d = $("#dialog").dialog({
            modal: true,
            autoOpen: false,
            show: "blind",
            hide: "explode",
            buttons: {
                'OK': function() {
                    $(this).dialog( "close" );
                }
            }
        });

        $('#cpw').on('click', function(e) {
        	if(e.srcElement.className == 'ua') {
	        	$('#dialog p').html(e.srcElement.getAttribute('data_ua'));
	        	d.dialog('open');
        	}
        });
	});

	$(window).on('resize', function() {
		init();
	}).on('hashchange', function() {
		init();
	});

	function init() {
		prepare(function() {
			/*
			console.info(chrome.extension.getURL('empty.html'));
			chrome.tabs.query({
				url: chrome.extension.getURL('empty.html')
			}, function(a) {
				console.info(a);
			});
			return;
			*/
			chrome.extension.sendMessage({
				action: 'setTab',
			}, function() {
				refresh();
			});
		});
	}

	function creatDom(n, cb) {
		var h = '';
		chrome.extension.sendMessage({
			action: 'getList'
		}, function(list) {
			list.forEach(function(item, index) {
				if(index % n <= 0) {
					h += !h ? '<li>' : '</li><li>';
				}
				h += '<section><div class="hd"><span class="ua" data_ua="' + item.ua +
				'">UA</span><b>' + item.n + '</b></div><iframe id="mua_' + index + '_' +
				item.ua + '" border=0 src="empty.html"></iframe></section>' 
			});
			h += !h ? '' : '</li>';
			$('#cpl').html(h);
			cb();
		});
	}

	function prepare(cb) {
		var cs;
		if(window.innerWidth < 740) {
			cs = 1;
		}
		else if(window.innerWidth < 1090) {
			cs = 2;
		}
		else if(window.innerWidth < 1440) {
			cs = 3;
		}
		else if(window.innerWidth < 1790) {
			cs = 4;
		}
		else {
			cs = 5;
		}
		if(cs == cols) return;
		creatDom(cs, cb);
		cols = cs;
	}

	function refresh() {
		$('iframe').each(function(index, item) {
			$(item).attr('src', decodeURIComponent(location.hash.substr(1)));
		});
	}

})();