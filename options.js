$(document).ready(function() {
	var length = 0, currentElement = null, slice = Array.prototype.slice;

	$('#addrow').on('click', function() {
		$('#option').dataTable().fnAddData( [
	        "Default",
	        navigator.userAgent
	    ] );
	    save();
	});
	$('#reset').on('click', function() {
		chrome.extension.sendMessage({
			action: 'reset'
		}, function() {
			location.href = location.href;
		});
	});
	$("#ow").click( function( e ) {
		if(e.srcElement.tagName !== 'TD' || e.srcElement.parentNode.tagName !== 'TR') return;
		var $el = $(e.srcElement.parentNode);
        if ( $el.hasClass('row_selected') ) {
            $el.removeClass('row_selected');
        }
        else {
            $('#option').dataTable().$('tr.row_selected').removeClass('row_selected');
            $el.addClass('row_selected');
        }
        $('<textarea style="width: 100%; height: 100%; position: absolute; top: 0; left: 0;">' + $(e.srcElement).html() + '</textarea>').appendTo($(e.srcElement)).on('blur', function() {
        	var ta = $(this).parent(), va = $(this).val();
        	$(this).remove();
        	if(!(va.trim())) return;
        	ta.html(va);
        	$('#option').dataTable().fnUpdate(va, slice.call(e.srcElement.parentNode.parentNode.childNodes, 0).indexOf(e.srcElement.parentNode),
        		slice.call(e.srcElement.parentNode.childNodes).indexOf(e.srcElement));
        	save();
        });
        if(currentElement != e.srcElement && currentElement && $('textarea', currentElement)) {
        	var ta = $(currentElement), va = $('textarea', currentElement).val();
        	$('input', currentElement).remove();
        	if(!(va.trim())) return;
        	ta.html(va);
        	$('#option').dataTable().fnUpdate(va, slice.call(currentElement.parentNode.parentNode.childNodes).indexOf(currentElement.parentNode),
        		slice.call(currentElement.parentNode.childNodes).indexOf(currentElement));
        	save();
        }
        currentElement = e.srcElement;
    });
	$('#delete').click( function() {
        var anSelected = $('#option').dataTable().$('tr.row_selected');
        if ( anSelected.length !== 0 ) {
        	if($('#ow tbody tr').length <= 1) {
        		alert('大哥啊，别删了，留个种吧！Please don\'t delete all! by stefan');
        		return;
        	}
            $('#option').dataTable().fnDeleteRow( anSelected[0] );
            save();
        }
    } );
	chrome.extension.sendMessage({
		action: 'getList'
	}, function(arr) {
		var aadata = [];
		arr.forEach(function(item, index) {
			length++;
			aadata.push([item.n, item.ua]);
		});
		$('#option').dataTable({
			aaData: aadata,
			aoColumns: [{sTitle: 'Name'}, {sTitle: 'User Agent'}],
			bSort: false
		});
	});

	function save() {
		chrome.extension.sendMessage({
			action: 'save',
			data: $('#option').dataTable().fnGetData()
		})
	}
});