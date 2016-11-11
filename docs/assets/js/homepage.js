// Når dokumentet laster...
document.addEventListener('DOMContentLoaded', function() {
	// Sjekk media-query - intet slideshow på mobil
	if (window.matchMedia('(min-width: 960px)').matches) {
		const PathImg = 'assets/img/carousel/'; // dir med bilder
		var indexImg = 0; // start-index
		var numImg = 5; // antall bilder
		var image = document.getElementById('slideshow');

		// viser det neste bildet
		function slideshow() {
			if (indexImg < numImg) {
				indexImg++;
				image.src = PathImg+indexImg + '.jpg';
			} else if (indexImg >= numImg) {
				indexImg = 1;
				image.src = PathImg+indexImg + '.jpg';
			}
		}

		setInterval(slideshow,2500)
	};
});
