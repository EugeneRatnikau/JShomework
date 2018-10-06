var names = ['Olivia','Oliver','Amelia','Harry','Isla','Jack',
'Emily','George','Ava','Noah','Lily','Charlie','Mia','Jacob',
'Sophia','Alfie','Isabella','Freddie','Grace','Oscar'];
var cities = ['New York', 'Los Angeles', 'Chicago', 'Houston',
'Philadelphia','Phoenix','San Antonio','San Diego'];

var arr = [], length = 21;

function getRand(a, b) {
	var x = Math.random();
	return Math.floor((b - a) * x) + a;
}


for(var i = 0; i < length; i++){
	arr.push({name: names[getRand(0, names.length - 1)], 
		age: getRand(18, 80),
		city:cities[getRand(0, cities.length - 1)],
		print: function() {
			console.log(`Name: ${this.name}, City: ${this.city}, Age: ${this.age}`);
		}});
}

arr.sort(function(a,b){
	return b.age - a.age;
});

for(var i = 0; i < arr.length; i++){
	console.log(arr[i]);
}




