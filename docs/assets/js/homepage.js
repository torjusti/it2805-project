document.addEventListener('DOMContentLoaded', function() {
	// Slideshow container element.
	const container = document.getElementById('picture');

	// Number of images in folder.
	const imageCount = 5;

	// The current image index.
	let curImg = 0;

	// Store information about images which have already been loaded.
	let loadedImages = [true];

	function loadImage(index) {
		if (!loadedImages[index]) {
			let img = new Image();
			img.src = `assets/img/gabion/${index}.jpg`;
			img.style.visibility = 'hidden';
			img.className = 'slideshow';
			container.appendChild(img);
			loadedImages[index] = true;
		}
	}

	function tick() {
		let nextImg = (curImg + 1) % imageCount;

		let images = container.getElementsByTagName('img');

		for (let i = 0; i < images.length; i++) {
			images[i].style.visibility = 'hidden';
			images[i].classList.remove('slideAnimIn');
		}

		images[curImg].style.visibility = 'visible';
		images[curImg].style.zIndex = '-9000'
		images[curImg].classList.add('slideAnimIn');

		// Begin loading the next image.
		curImg = nextImg;
		loadImage(curImg);

		setTimeout(tick, 2000);
	}

	tick();
});



/* Comment to Torjus.
The animations can be called by the name of slideshowIn and slideshowOut:
slideshowIn changes opacity from 0 to 1 and changes z-index to 1 at 50%
slideshowOut changes opacity from 1 to 0 and changes z-index to -1 at 50%
The animations can be changed in base.css ----ANIMATIONS---- section.
REMEMBER: At least two pictures must be downloaded on user's computer when the first change happens.
*/
