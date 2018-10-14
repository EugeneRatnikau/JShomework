var n = prompt("enter n");
var arr = new Array;
var x = prompt("enter x");
var sum = 0;

for(var i = 0; i < n; i++){
	arr.push(+prompt("enter coefficient"));
	if(i != 0){
		console.log("+" + arr[i] * Math.pow(x, i)); 
		sum += arr[i] * Math.pow(x, i);
	}else{
		console.log(arr[i]);
		sum += arr[i];
	}
}

console.log("= " + sum)