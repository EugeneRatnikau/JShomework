function Scale() {
	this.height = Math.ceil(Math.random() * 200);
	this.color = `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
	this.id = Scale.prototype.id++;
	this.setAnimationParams();
}
Scale.prototype.id = 0;
Scale.prototype.setAnimationParams = function(){
	this.direction = Math.round(Math.random());
	(this.direction) ? this.distance = Math.ceil(Math.random() * (200 - this.height)) 
					 : this.distance = Math.ceil(Math.random() * this.height);
	this.speed = Math.ceil(Math.random() * 4);					 
}

var Equalizer = {
	init(){
		Equalizer.canvas = document.getElementById('canvas');
		Equalizer.ctx = canvas.getContext('2d');

		for(var i = 0; i < Equalizer.canvas.width/30; i++){
			var scale = new Scale();
			Equalizer.setAnimation(scale);
		}
	},
	redrawScale(scale){
		Equalizer.ctx.fillStyle = scale.color;
		Equalizer.ctx.clearRect(30 * scale.id, 0, 30, 200);
		Equalizer.ctx.fillRect(30 * scale.id, 200 - scale.height, 30, scale.height);
	},
	setAnimation(scale){
		var interval = setInterval(function(){
			if(scale.distance <= 0){
				scale.setAnimationParams();
			}
			(scale.direction) ? scale.height += scale.speed : scale.height -= scale.speed; 
			scale.distance -= scale.speed;
			Equalizer.redrawScale(scale);
		}, 1000/60);
	}
}

Equalizer.init();

