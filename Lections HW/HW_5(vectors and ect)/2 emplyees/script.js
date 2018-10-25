var employees = [
	{
		name: "John",
		salary: 1500,
		department: "Development",
		age: 24
	},
	{
		name: "Jack",
		salary: 2500,
		department: "Development",
		age: 27
	},
	{
		name: "Penny",
		salary: 1300,
		department: "Design",
		age: 22
	},
	{
		name: "Kale",
		salary: 1600,
		department: "Design",
		age: 23
	},
	{
		name: "Peter",
		salary: 1000,
		department: "Sales",
		age: 25
	},
	{
		name: "Michael",
		salary: 1700,
		department: "Sales",
		age: 28
	},];

var departments = [];

employees.forEach(empl => departments.every(depart => depart.department != empl.department) ? 
	departments.push({department: empl.department, maxSalary: empl, sumSalary: empl.salary, sumAge: empl.age, emplCount: 1})
	: departments.map(depart => depart.department == empl.department ? 
	(depart.sumSalary += empl.salary, depart.sumAge += empl.age, depart.emplCount++, (empl.salary > depart.maxSalary.salary) ? 
	depart.maxSalary = empl : '') : ''));

console.log(departments);

 departments.forEach(depart => console.log(`${depart.department}, ${depart.maxSalary.name} has max salary. Average salary is
  ${depart.sumSalary/depart.emplCount}. Average age is ${depart.sumAge/depart.emplCount}`));

console.log("Average of max salaries:", departments.reduce((a, b) => a + b.maxSalary.salary, 0) / departments.length);