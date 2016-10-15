const startPathImg="assets/img/gabion";
const endPathImg=".jpg";
var indexImg=1;
var numImg=5;
function slideshowStart(){
	if (indexImg<numImg){
		indexImg++;
		document.getElementById("slideshow").src=startPathImg+indexImg+endPathImg;
	}
	else if (indexImg>=numImg){
		indexImg=1;
		document.getElementById("slideshow").src=startPathImg+indexImg+endPathImg;
	}
}
