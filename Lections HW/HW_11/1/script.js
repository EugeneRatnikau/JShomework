// var arr = new Array(10000).fill(0);
// for(var i = 0; i < arr.length; i++){
// 	arr[i] = Math.round( Math.random() * 99 + 1);
// }
// console.log(arr.join(' '));

var div = document.getElementById('num');

const xhr = new XMLHttpRequest();
xhr.open("GET", "numbers.txt", true);
xhr.onload = function(){
	div.innerText = this.responseText;
	var arr = div.innerText.split(' ');

	document.getElementById('avg')
	.addEventListener('click', function(){
		
		var result = arr.reduce(function(sum, current){
			return Number(sum) + Number(current);
		}, 0) / arr.length;

		alert("Average is: " + result);
	});

	document.getElementById('harm')
	.addEventListener('click', function(){
		var result = (1 / arr.reduce(function(harm, current){
			return harm + 1/current;
		}, 0) * arr.length).toFixed(4);
		
		alert("Harmonic is: " + result)
	});	
}

xhr.send(null);