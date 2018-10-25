var colons = true;

var clock = setInterval(function(){
	var date = new Date();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();
	if(colons == true){
		document.body.innerText = hours + ":" + minutes + ":" + seconds;
		colons = false;
	}else if(colons == false){
		document.body.innerText = hours + " " + minutes + " " + seconds;
		colons = true;
	}	
}, 500);