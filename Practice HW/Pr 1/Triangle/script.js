// var n = +prompt("n?");
// var arr = [];

// for(var i = 0; i <= n; i++){
// 	if(i == 0 || i == n){

// 	}
// }

// function triangle(){
// 	var arr = [];
// 	var size = +prompt("size");
// 	var i, j;

// 	for(i = 0; i <= size; i++){
// 		arr[i] = 0;
// 	}

// 	arr[0] = 1;

// 	for(i = 1; i <= size; i++){
// 		for(i = j; i >= 1; j--){
// 			document.write (arr[i - 1]);
// 			arr[i] = arr[i - 1] + arr[i];
// 		}
// 	}

// 	for(i = 0; i <= size; i++){
// 		document.write (arr[i]);
// 	}

// }

function pascalTriangle(){
    var arr =[50];
    var i, j;
    var size = prompt('Введите размер',size);
    //alert('Размер '+size+' штук =)')
 
    for(i = 1; i <= size ; i++)
    {
        arr[i] = 0;
    }
 
    arr[0] = 1;
    for(j = 1; j <= size; j++)
    {
        for(i = j; i >= 1 ; i--)
        {
            document.write (arr[i-1]);
            arr[i] = arr[i-1] + arr[i];
            
        }
        document.write('<br/>');
 
    }
    for(i = 0; i <= size ; i++)
    {
        //document.write (arr[i]);
    }
 
}


pascalTriangle();