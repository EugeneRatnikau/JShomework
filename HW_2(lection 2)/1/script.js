function brackets(){
	var str = prompt("Enter some string with brackets");
	var k = 0;

	for(var i = 0; i <= str.length; i++){
		if(str[i] == '('){ k++ }
			else if(str[i] == ')'){ k-- }
	}


	if(k == 0){
		alert("it's ok");
	}else{
		alert("something is wrong");
	}
}

brackets();