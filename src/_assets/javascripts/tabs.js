// Tabs
// -------------------------
function Tabs() {
	var bindAll = function() {
		var menuElements = document.querySelectorAll('[data-tab]');
		for(var i = 0; i < menuElements.length ; i++) {
			menuElements[i].addEventListener('click', change, false);
		}
	}
	var clear = function() {
		var menuElements = document.querySelectorAll('[data-tab]');
		for(var i = 0; i < menuElements.length ; i++) {
			menuElements[i].removeAttribute('hidden');
			var id = menuElements[i].getAttribute('data-tab');
			document.getElementById(id).removeAttribute('hidden');
		}
	}
	var change = function(e) {
		clear();
		e.target.addAttribute('hidden');
		var id = e.currentTarget.getAttribute('data-tab');
		document.getElementById(id).addAttribute('hidden');
	}
	bindAll();
}
