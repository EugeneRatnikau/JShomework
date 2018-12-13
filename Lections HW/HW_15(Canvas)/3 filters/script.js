var Filters ={
	constDOM:{
		canvas: document.getElementById('canvas'),
		ctx: this.canvas.getContext('2d'),
		img: document.getElementById('img'),
		// bwButton: document.getElementById('blackAndWhite'),
		// negativeButton: document.getElementById('negative'),
		// sepiaButton: document.getElementById('sepia'),
		// standartButton: document.getElementById('standart'),
		buttonsContainer: document.getElementById('buttonsContainer'),
		buttons: document.getElementsByClassName('buttons'),
		fileReader: document.getElementById('file')
	},
	init(){
		// canvas.addEventListener('dragenter', dragEnter);
		// canvas.addEventListener('dragleave', dragLeave);
		Filters.constDOM.canvas.addEventListener('dragover', Filters.dragOver);
		Filters.constDOM.canvas.addEventListener('drop', Filters.drop);
		Filters.constDOM.img.width = 400;
		Filters.constDOM.buttonsContainer.addEventListener('click', Filters.applyFilter);
		// for(var i = 0; i < Filters.constDOM.buttons.length; i++){
		// 	Filters.constDOM.buttons[i].addEventListener('click', Filters.applyFilter);
		// };
		
		Filters.constDOM.fileReader.addEventListener('change', function(){
			var file = Filters.constDOM.fileReader.files[0];
			Filters.readFile(file);
		});
	},
	// dragEnter(){

	// },
	// dragLeave(){

	// },
	dragOver(e){
		e.preventDefault();
	},
	drop(e){
		e.preventDefault();
		Filters.readFile(e.dataTransfer.files[0]);
	},
	readFile(file){
		const reader = new FileReader();
		reader.onload = function () {
			Filters.constDOM.img.src = this.result;
		}
		reader.readAsDataURL(file);
	},
	applyFilter(){
		Filters.constDOM.canvas.width = Filters.constDOM.img.width;
		Filters.constDOM.canvas.height = Filters.constDOM.img.height;
		Filters.constDOM.ctx.drawImage(Filters.constDOM.img, 0, 0, Filters.constDOM.img.width, Filters.constDOM.img.height);

		var imgData = Filters.constDOM.ctx.getImageData(0, 0, Filters.constDOM.img.width, Filters.constDOM.img.height);
		console.log(imgData);

		var pixels = imgData.data;
		if(event.target.id == 'blackAndWhite'){
			Filters.applyBlackAndWhiteFilter(pixels);
		}else if(event.target.id == 'negative'){
			Filters.applyNegativeFilter(pixels);
		}else if(event.target.id == 'sepia'){
			Filters.applySepiaFilter(pixels);
		}

		Filters.constDOM.ctx.putImageData(imgData, 0, 0);
	},
	applyBlackAndWhiteFilter(pixels){
		var len = pixels.length;
		for(var i = 0; i < len; i+=4){
			var grayscale = pixels[i] * 0.3 + pixels[i+1] * 0.59 + pixels[i+2] * 0.11;
			pixels[i] = grayscale;
			pixels[i+1] = grayscale;
			pixels[i+2] = grayscale;
		}
	},
	applyNegativeFilter(pixels){
		var len = pixels.length;
		for(var i = 0; i < len; i += 4){
			pixels[i] = 255 - pixels[i];
			pixels[i+1] = 255 - pixels[i+1];
			pixels[i+2] = 255 - pixels[i+2];
		}
	},
	applySepiaFilter(pixels){
		var len = pixels.length;
		for(var i = 0; i < len; i += 4){
			pixels[i] = Math.min(255,(pixels[i] * .393) + (pixels[i+1] * .769) + (pixels[i+2] * .189));
			pixels[i+1] = Math.min(255,(pixels[i] * .349) + (pixels[i+1] * .686) + (pixels[i+2] * .168));
			pixels[i+2] = Math.min(255,(pixels[i] * .272) + (pixels[i+1] * .534) + (pixels[i+2] * .131));
		}
	}
}


Filters.init();