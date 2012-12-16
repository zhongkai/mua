$(window).load(function() {
	refresh();
	initEvents();
});
function refresh() {
	$('#ppw').html('<table id="options_table">' +
		'<tr>' +
			'<td class="icon">b</td><td class="btn" id="compare">' + chrome.i18n.getMessage("popStartCompare") + '</td>' +
		'</tr>' +
		'<tr>' +
			'<td class="icon">a</td><td class="btn" id="setting">' + chrome.i18n.getMessage("popSetting") + '</td>' +
		'</tr>' +
	'</table>');
}
function initEvents() {
	$('#compare').on('click', function() {
		chrome.extension.sendMessage({
			action: "getHref"
		}, function(href) {
			window.open('compare.html#' + encodeURIComponent(href), new Date().valueOf() + '');
		})
	});
	$('#setting').on('click', function() {
		window.open('setting.html');
	});
}