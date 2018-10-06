var n = prompt("enter n");
var arr = new Array;

function getRand(a, b){
	var x = Math.random();
	return (b - a) * x + a;
}

var x = Math.round(getRand(0, 25));
var sum = 0;

for(var i = 0; i <= n; i++){
	arr.push(Math.round(getRand(1, 100)));
	if(i != 0){
		console.log("+" + arr[i] * Math.pow(x, i + 1));
		sum += arr[i] * x;
	}else{
		console.log(arr[i]);
		sum += arr[i];
	}
}

console.log("= " + sum)