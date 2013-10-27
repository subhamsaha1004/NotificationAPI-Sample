(function(window){
	// General utilities
	var doc = window.document,
			$ = function(selector){
				var result = doc.querySelectorAll(selector);
				return (result.length > 1) ? result : result[0];
			};

	Node.prototype.on = Node.prototype.addEventListener;
	NodeList.prototype.on = function(type, func, async) {
		[].forEach.call(this, function(node, index) {
			node.on(type, func, async);
		});
	};

	// Start app code here
	var notifier = $('#notifier');

	// generate the notification
	function generateNotification(note) {
		var n = new Notification(note.title, {
			icon: 'icon-48.png',
			tag: 'note',
			body: note.content
		});
	}

	// Event handler
	notifier.on('click', function(e) {
		var title = $('#title').value;
		var content = $('#noteContent').value;
		// if notifications are granted then show the notification
		if(Notification && Notification.permission === 'granted') {
			generateNotification({ title: title, content: content });
		} else if(Notification && Notification.permission !== 'denied') { // if they are not denied that is default
			Notification.requestPermission(function(status) {
				// change based on the user's descision
				if(Notification.permission !== status) {
					Notification.permission = status;
				}

				if(status === 'granted') {
					generateNotification({ title: title, content: content });
				} else {
					alert('You have to grant permission to see the notification');
				}
			});
		} else {
			alert('You have to grant permission to see the notification');
		}
	}, false);

}(this));