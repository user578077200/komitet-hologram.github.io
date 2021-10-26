// Img | Loading: Lazy
// -------------------------
if ("loading" in HTMLImageElement.prototype) {
	var lazyEls = document.querySelectorAll("[loading=lazy]");
	lazyEls.forEach(function(lazyEl) {
		lazyEl.setAttribute(
			"src",
			lazyEl.getAttribute("data-src")
		);
	});
} else {
	var script = document.createElement('script');
	script.async = true;
	script.src = 'https://cdn.jsdelivr.net/npm/vanilla-lazyload@17.3.1/dist/lazyload.min.js';
	window.lazyLoadOptions = {
		elements_selector: '[loading=lazy]'
	};
	document.body.appendChild(script);
}