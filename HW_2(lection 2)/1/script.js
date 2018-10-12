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

// function correctBrackets(brs){
//     let opening = {
//       '[': ']',
//       '{': '}',
//       '(': ')',
//       '<': '>',
//     };

//     let stack = [];
//     let ret = '';

//     for(let i = 0; i < brs.length; i++){
//       let c = brs[i];

//       if(opening[c]){
//         stack.push(c);
//       } else {
//         if(stack.length === 0){
//             return null;
//         }

//         let br = stack.pop();

//         c = opening[br];
//       }

//       ret += c;
//     }
//     if (stack.length > 0){
//       return null;
//     }
// }

// console.log(correctBrackets("(())"));