setInterval(function () {
	jQuery.ajax({
       'type': 'POST',
       'url': '/ajaxservice/get',
       'data': {'from': 101, 'to': 102, 'message': 'bla­bla..'},
       'cache': false,
       'success': function (mess) {
                if (mess) {
                    render(mess);
                }
        }
	});
}, 30000);

function render(mess){
	mess.forEach(function(item, i, arr){
		$('#contener').append('<p> name: ' + item.name + ' data: ' + item.data + '</p>')
	});
}