const xhr = new XMLHttpRequest();
xhr.open("GET", "countries.txt", true);
xhr.onload = function(){
	var arr = this.responseText.split("\r\n").map(el => el.split(','));
	var countries = [];

	for(var i = 1; i < arr.length; i++){
		countries.push({});
		for(var j in arr[i]){
			countries[i-1][arr[0][j]] = arr[i][j];
		}
	}

	console.log(countries);

	countries.sort((a,b) => b.population - a.population);

	var table = document.createElement('table');
	table.align = 'center';
	table.border = '1px';
	document.body.appendChild(table);

	var header = document.createElement('thead');
	table.appendChild(header);

	var row = document.createElement('tr');
	header.appendChild(row);

	for(var i = 0; i < 4; i++){
		var headerContent = row.appendChild(document.createElement('td'));
		headerContent.innerText = Object.keys(countries[0])[i];
	}

	var tBody = document.createElement('tbody');
	table.appendChild(tBody);



	for(var i = 0; i < countries.length; i++){
		var rows = document.createElement('tr');
		tBody.appendChild(rows);

		var countryName = document.createElement('td');
		countryName.innerText = countries[i].country;
		rows.appendChild(countryName);

		var countryFlag = document.createElement('td');
		var countryFlagImg = document.createElement('img');
		countryFlagImg.setAttribute('src', `flags/${countries[i].flag}`);
		countryFlag.appendChild(countryFlagImg);
		rows.appendChild(countryFlag);

		var countryCode = document.createElement('td');
		countryCode.innerText = countries[i].code;
		rows.appendChild(countryCode);

		var countryPopulation = document.createElement('td');
		countryPopulation.innerText = countries[i].population;
		rows.appendChild(countryPopulation);
	}
}

xhr.send(null);