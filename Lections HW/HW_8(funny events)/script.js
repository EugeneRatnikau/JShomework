//---------------------------------------------------------------decoder-------

const encr = document.getElementById('encrypt');
const decr = document.getElementById('decrypt');
const decrypted = document.getElementById('decrypted');
const encrypted = document.getElementById('encrypted');

var encryption = function () {
	var output = [];
	for(var i = 0; i < decrypted.value.length; i++){
		if(i % 3 == 0){
			output.push(String.fromCharCode(decrypted.value[i].charCodeAt() + 15));
		}
		else if(i % 3 == 1){
			output.push(String.fromCharCode(decrypted.value[i].charCodeAt() + 162));
		}
		else if(i % 3 == 2){
			output.push(String.fromCharCode(decrypted.value[i].charCodeAt() + 1903));
		}
	}
	encrypted.value = output.join("");
}

encr.addEventListener('click', encryption);

var decryption = function () {
	var input = [];
	var undone = [];
	for(var i = 0; i < encrypted.value.length; i++){
		if(i % 3 == 0){
			input.push(String.fromCharCode(encrypted.value[i].charCodeAt() - 15));
		}
		else if(i % 3 == 1){
			input.push(String.fromCharCode(encrypted.value[i].charCodeAt() - 162));
		}
		else if(i % 3 == 2){
			input.push(String.fromCharCode(encrypted.value[i].charCodeAt() - 1903));
		}
	}
	decrypted.value = input.join("");
}

decr.addEventListener('click', decryption);

//---------------------------------------table light up--------

var n = prompt("enter N for table NxN");


var table = document.createElement('table');
table.border = '1px';
table.setAttribute('align', 'center');
document.body.appendChild(table);

for(var i = 0; i < n; i++){
	var row = document.createElement('tr');
	table.appendChild(row);
	for(var j = 0; j < n; j++){
		var cell = document.createElement('td');
		cell.setAttribute('width', '10px');
		cell.setAttribute('height', '10px');
		cell.setAttribute('class','cells');
		cell.addEventListener('mouseover', handler);
		row.appendChild(cell);
	}
}

function handler() {
		event.target.style.background = 'pink';
		var timer = setTimeout(() => this.style.background = 'white', 3000);
}
	

//----------------------------------------currency change--------

var money = {
	USD: {USD: 1, EUR: 1.14, RUB: 65.68, BYN: 2.11},
	EUR: {USD: 0.88, EUR:1, RUB: 74.86, BYN: 2.40},
	RUB: {USD: 0.015, EUR: 0.013, RUB: 1, BYN: 0.032},
	BYN: {USD: 0.47, EUR: 0.42, RUB: 31.12, BYN: 1}
};

var value1 = document.getElementById('value1');
value1.addEventListener('input', convertation);
var currency1 = document.getElementById('currency1');
currency1.addEventListener('input', convertation);
var currency2 = document.getElementById('currency2');
currency2.addEventListener('input', convertation);
var value2 = document.getElementById('value2');
value2.addEventListener('input', convertation);

function convertation() {
	switch(event.target.id){
		case 'value1':
			value2.value = (Number(value1.value) * money[currency2.value][currency1.value]).toFixed(2);
			break;
		case 'value2':
			value1.value = (Number(value2.value) * money[currency2.value][currency1.value]).toFixed(2);
			break;
		case 'currency1':
			value1.value = (Number(value2.value) * money[currency1.value][currency2.value]).toFixed(2);
			break;
		case 'currency2':
			value2.value = (Number(value1.value) * money[currency1.value][currency2.value]).toFixed(2);
			break;
	}
}

//--------------------------calculator

var buttons = document.getElementsByClassName('buttons');
for(var i = 0; i < buttons.length; i++){
	buttons[i].addEventListener('click', calculator);
}

var memory = 0;
var value2ult = 0;
var operation = false;
var opertionLast;

function calculator() {
	var display = document.getElementById('input');
	var calculate = opertionLast == 'pls' || opertionLast == 'min' || opertionLast == 'mul' || opertionLast == 'div';

	if(event.target.id.match(/\d/)){
		if(Number(display.value) == 0 || operation == true){
			display.value = event.target.id;
			operation = false;
		}
		else{
			display.value += event.target.id;
		}
	}
	else{
		operation = true;
		switch(event.target.id){
			//clear
			case 'clear':
				value2ult = 0;
				display.value = 0;
				break;
			//operations
			case 'pls':
				if(calculate){
					value2ult += Number(display.value);
					display.value = value2ult;
				}else{
					value2ult = Number(display.value);
				}
				break;
			case 'min':
				if(calculate){
					value2ult -= Number(display.value);
					display.value = value2ult;
				}else{
					value2ult = Number(display.value);
				}
				break;
			case 'mul':
				if(calculate){
					value2ult *= Number(display.value);
					display.value = value2ult;
				}else{
					value2ult = Number(display.value);
				}
				break;
			case 'div':
				if(calculate){
					value2ult /= Number(display.value);
					display.value = value2ult;
				}else{
					value2ult = Number(display.value);
				}
				break;
			//memory
			case 'M+':
				memory += Number(display.value);
				break;
			case 'M-':
				memory -= Number(display.value);
				break;
			case 'MR':
				display.value = Number(memory);
				break;
			case 'MC':
				memory = 0;
				break;
			//equal
			case 'doit':
				switch(opertionLast){
					case 'pls':
						value2ult += Number(display.value);
						display.value = value2ult;
						break;
					case 'min':
						value2ult -= Number(display.value);
						display.value = value2ult;
						break;
					case 'mul':
						value2ult *= Number(display.value);
						display.value = value2ult;
						break;
					case 'div':
						value2ult /= Number(display.value);
						display.value = value2ult;
						break;
					case 'MR':
						display.value = Number(memory);
						break;

				}
			break;
		}
		if(event.target.id != 'MR'){
			opertionLast = event.target.id;
		}
	}
}