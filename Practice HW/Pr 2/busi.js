var Company = {
	employees: [{
		name: "Alex",
		age: 17,
		salary: 320,
		department: "Cleaning",
		experience: 13*12,
		print: function(){
			console.log(`${this.name} - ${this.salary}`);
		}
	},{
		name: "Jack",
		age: 21,
		salary: 1500,
		department: "Development",
		experience: 3*12,
		print: function(){
			console.log(`${this.name} - ${this.salary}`);
		}
	},{
		name: "God",
		age: 27,
		salary: 3000,
		department: "Development",
		experience: 9*12,
		print: function(){
			console.log(`${this.name} - ${this.salary}`);
		}
	},{
		name: "Nastassia",
		age: 24,
		salary: 2000,
		department: "UI/UX Design",
		experience: 4*12,
		print: function(){
			console.log(`${this.name} - ${this.salary}`);
		}
	}],
	printAll: function(){
		for(var i in this.employees){
			this.employees[i].print();
		}
	},
	addEmployee: function(name, age, salary, department, experience){
		this.employees.push({name, age, salary, department, experience, print: function(){
				console.log(`${this.name} - ${this.salary}`);
			}});
	},
	removeEployee: function(name){
		for(var i in this.employees){
			if(this.employees[i].name == name)
				delete this.employees[i];
		}
		
	},
	minMaxAvgSalary: function(){
		var eMin = this.employees[0], eMax = this.employees[0];
		for(var i in this.employees){
			if(eMin.salary > this.employees[i].salary){
				eMin = this.employees[i];	
			}
			if(eMax.salary < this.employees[i].salary){
				eMax = this.employees[i]
			}


		}
		
		var avg, sum = 0;
		for(var i in this.employees){
			sum += this.employees[i].salary;				
		}
		++i;
		avg = sum / i;
		console.log(`min= ${eMin.name}-${eMin.salary}, max= ${eMax.name}-${eMax.salary}, avg= ${avg}`);
	},
	stats: function(){ 
		const deps = [];
		console.log(deps);
		this.employees.forEach(i => {deps.includes(i.department) ? '' : deps.push({dep: i.department, empl: this.employees.filter(x => x.department == i.department)})});

		for(var i in deps){
			var sumDepartmenSalary = deps[i].empl.reduce((a,b) => 
			(a + b.salary), 0); 
			var averageSalary = sumDepartmenSalary / deps[i].empl.length;
			var employeesCount = deps[i].empl.length;
			var avgAge = deps[i].empl.reduce((a,b) => (a + b.age), 0) / deps[i].empl.length; 
			var maxExp ;//= deps[i].empl.reduce((a,b) => (a.experience > b.experience) ? a = b : '', deps[i].empl[0]);
			console.log(`Sum salary = ${sumDepartmenSalary},\nAverage salary = ${averageSalary},\nNumber of employees = ${employeesCount},\nAverage age = ${avgAge},\nMax experience = ${maxExp}`);

		}
		

	}
};

//Company.addEmployee("Josh", 25, 800, "Development", 1*12);
//console.log(Company);
//Company.removeEployee("Alex");
console.log(Company);
//Company.printAll();
Company.minMaxAvgSalary();
Company.stats();