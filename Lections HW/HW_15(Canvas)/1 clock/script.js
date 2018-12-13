const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function drawClock() {
	requestAnimationFrame(this.drawClock);

	var date = new Date();
	var millisec = date.getMilliseconds();
	var sec = date.getSeconds();
	var min = date.getMinutes();
	var hrs = date.getHours();

	ctx.save();

	ctx.clearRect(0,0, 500, 500);

	ctx.strokeStyle = '#000'; 
	ctx.lineWidth = 2; 
	ctx.lineCap = 'round';

	ctx.translate(250, 250);
	ctx.beginPath();

	ctx.arc(0,0,108, 0, 2*Math.PI);
	ctx.moveTo(100,0);
	ctx.arc(0,0,100, 0, 2*Math.PI);
	ctx.moveTo(30, 0);
	ctx.lineTo(60, 0);
	ctx.moveTo(-30, 0);
	ctx.lineTo(-60,0);
	ctx.moveTo(0, 30);
	ctx.lineTo(0,60);
	ctx.moveTo(0, -30);
	ctx.lineTo(0, -60);

	ctx.stroke();

	ctx.fillStyle = '#000';

	ctx.beginPath();

	ctx.fill();

	ctx.textAlign = 'center';

	ctx.font = '20px Arial';
	ctx.fillText(12, 0, -77);
	ctx.fillText(3, 85, 6);
	ctx.fillText(6, 0, 88);
	ctx.fillText(9, -85, 6);

	ctx.restore();

	ctx.save();
    ctx.translate(250,250);
	for(var i = 0; i < 12; i++){
		ctx.rotate(Math.PI/6);
		ctx.moveTo(92,0);
        ctx.lineTo(100,0);
	}
	ctx.stroke();
	ctx.restore();

	ctx.save();
	ctx.translate(250, 250);
    ctx.beginPath();
    for (var i = 0; i < 60; i++) {
        ctx.rotate(Math.PI/30);
        ctx.moveTo(100,0);
        ctx.lineTo(108,0);
    }
    ctx.stroke();
    ctx.restore();
   

	ctx.save();
	ctx.translate(250,250);
	ctx.rotate(sec * Math.PI/30 + millisec * Math.PI/30000 - Math.PI/2);
	ctx.moveTo(-30,0);
	ctx.lineTo(90,0);
	ctx.stroke();
	ctx.restore();

	ctx.save();
	ctx.translate(250,250);
	ctx.rotate(min * (Math.PI/30) + sec * (Math.PI/1800) );
	ctx.fillRect(-2, 20, 4, -95);
	ctx.restore();

	ctx.save();
	ctx.translate(250,250);
	ctx.rotate(hrs * (Math.PI/6) + min * (Math.PI/360) + sec * (Math.PI/21600));
	ctx.fillRect(-2, 10 ,4,-45);
	ctx.restore();

}

requestAnimationFrame(drawClock);