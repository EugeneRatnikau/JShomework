var House = {
	flats:[{
		number: 1,
		square: 50,
		floor: 1,
		people:[{
			name:"Karl",
			age:20
		},{
			name:"Mary",
			age:19
		}]
	},{
		number: 2,
		square: 50,
		floor: 1,
		people:[{
			name:"Jack",
			age:16
		},{
			name:"John",
			age:16
		} ]
	},{
		number: 3,
		square: 50,
		floor: 2,
		people:[{
			name:"Nick",
			age:24
		},{
			name:"Kim",
			age:22
		} ]
	},{
		number: 4,
		square: 50,
		floor: 2,
		people:[]
	}],
	in: function(number, name, age){
		this.flats[number - 1] ? this.flats[number - 1].people.push({name, age})
		: console.log("Wrong number");
	},
	out: function(number, name){
		this.flats[number - 1] ? this.flats[number - 1].people = this.flats[number - 1].people.filter(elem => elem.name != name)
		 : console.log("Wrong number or name");
	},
	removeAll: function (number) {
		this.flats[number - 1] ? this.flats[number - 1].people = []
		 : console.log("Wrong number");
		
	},
	communal: function (cost){
		const totalSquare = this.flats.reduce((a,b) => (b.people[0]) ? (a + b.square) : a, 0);
		
		const personalCost = [];
		this.flats.forEach(el => personalCost.push(el.square / totalSquare * cost
			/ (el.people.filter(el => el.age >= 18)).length));

		for(var fl in this.flats){
			this.flats[fl].people.forEach(el => (el.age >= 18) ? 
				console.log(`#${Number(fl) + 1} ${el.name} - $${personalCost[fl].toFixed(2)}`) : ''); 
		}
		}


};
House.in(1, "Jane", 25);
House.out(1, "Karl")
//House.removeAll();
House.communal(5000);
console.log(House);