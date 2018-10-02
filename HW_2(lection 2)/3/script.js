function tomorrow(){
	var now = new Date();
	var end = new Date();

	end.setHours(24);
	end.setMinutes(0);
	end.setSeconds(0);

	var left = (end - now) / 1000 / 60;

	return Math.round(left);
}

function tomorrow2(){
	var now = new Date();
	var left = (24 * 60) - (now.getHours() * 60 + now.getMinutes());

	return left;
}

function tomorrow3(){
	var now = new Date();
	var end = new Date(now.getFullYear(), now.getMonth(), now.getDay() + 1)

	var diff = (end - now) / 1000 / 60;

	return Math.round(diff);
}

alert ("First version. Time left: " + tomorrow() );
alert ("Second version. Time left: " + tomorrow2() );
alert ("Third version. Time left: " + tomorrow3() );