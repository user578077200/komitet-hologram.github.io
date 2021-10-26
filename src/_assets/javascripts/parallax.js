// Parallax
// -------------------------
$(function () {
	function parallax() {
		$('[data-parallax]').each(function(i, c){
			$('[data-parallax-depth]', c).each(function (index, item) {
				var item = $(item);
				var e_pos = $(window).scrollTop() + $(window).height() - $(c).offset().top;
				item.css({
					'-webkit-transform': 'translate3d(0,' + -e_pos * item.data('parallax-depth') + 'px, 0)',
					'transform': 'translate3d(0,' + -e_pos * item.data('parallax-depth') + 'px, 0)'
				});
			});
		});
	}
	parallax();
	$(window).scroll(parallax);
});
