const PathImg="assets/img/carousel/";
var indexImg=1;
var numImg=5;
var image = document.getElementById("slideshow");
function slideshow(){

	if (indexImg<numImg){
		indexImg++;
		image.src=PathImg+indexImg+".jpg";
	}
	else if (indexImg>=numImg){
		indexImg=1;
		image.src=PathImg+indexImg+".jpg";
	}
}

setInterval(slideshow,2500)

/* Comment to Torjus.
The animations can be called by the name of slideshowIn and slideshowOut:
slideshowIn changes opacity from 0 to 1 and changes z-index to 1 at 50%
slideshowOut changes opacity from 1 to 0 and changes z-index to -1 at 50%
The animations can be changed in base.css ----ANIMATIONS---- section.
REMEMBER: At least two pictures must be downloaded on user's computer when the first change happens.
*/
