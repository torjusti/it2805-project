document.addEventListener('DOMContentLoaded', function(){
	if (window.matchMedia("(min-width: 960px)").matches){

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
	};
});
