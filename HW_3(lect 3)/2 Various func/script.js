function garm(...args) {
	var gar = 0;
	for(var i in arguments){
		gar += 1/arguments[i];
	}
	return gar;
}

console.log("Harmonic: " + garm(1,2,3,4,5,6,7,8));

//---------------------------------------------------------------

 function compareNumeric(a, b) {
   if (a > b) return 1;
   if (a < b) return -1;
 }

// function sortArgs(...args) {
//   return args.sort(function (a, b) { return a - b; });
// }
//ES6

var arr = [];
var med, x;

function median(...args) {
	for(var i in arguments){
		arr.push(arguments[i]);
	}
	arr.sort(compareNumeric);

	if(arr.length % 2 != 0){
		x = Math.floor(arr.length / 2);
		return med = arr[x];
	}else{
		x = arr.length / 2;
		return med = (arr[x] + arr[x-1]) / 2;
	}
	
}
median(11,9,3,5,5);
console.log("Sorted array: " + arr + ", Median: " + med);

//---------------------------------------------------------------

var arr2 = [];

function dispersion(...args) {
	var sum = 0, dispers;

	for(var i in arguments){
		arr2.push(arguments[i]);
	}
	arr2.sort(compareNumeric);

	if(arr.length % 2 != 0){
		x = Math.floor(arr2.length / 2);
		med = arr2[x];
	}else{
		x = arr2.length / 2;
		med = (arr2[x] + arr2[x-1]) / 2;
	}

	for(var i = 0; i < arr2.length; i++){
		arr2[i] = arr2[i] - med;
		arr2[i] = Math.pow(arr2[i], 2);
		sum += arr2[i];
	}

	dispers = sum / arr2.length;

	return dispers;
}

console.log("Dispersion: " + dispersion(1,2,3,4,5,6,7));

//---------------------------------------------------------------

// function charming(str){
// 	for(var i = 0; i < str.length; i++){
// 		arguments[i] = str.charCodeAt(i);
// 	}
// 	console.log(arguments);
// 	for(var i = 0; i < arguments.length; i++){
// 		console.log(String.fromCharCode(arguments[i]));
// 	}
// }

// charming("dfkjnvdkf");

//---------------------------------------------------------------

function poly(...args){
	var arr = [];
	var sum = 0;
	for(var i = 0; i < arguments.length; i++){
		arr.push(arguments[i]);
	}
	return function (x) {
		for(var i = 0; i < arr.length; i++){
			if(i != 0){
				console.log("+" + arr[i] * Math.pow(x, i));
				sum += arr[i] * Math.pow(x, i);
			}else{
				console.log(arr[i]);
				sum += arr[i];
			}
		}
		//console.log(sum);
		return sum;
	}
}

console.log(poly(1,2,3)(2));