var Shop = {
	constDOM:{
		categoryRange: document.getElementById('category'),
		maxPrice: document.getElementById('max'),
		minPrice: document.getElementById('min'),
		applyFilter: document.getElementById('applyFilter'),
		clearFilter: document.getElementById('clearFilter'),
		content: document.getElementById('content')
	},
	init(){
		//this.categoryRange = document.getElementById('category');
		Shop.constDOM.categoryRange.addEventListener('change',  () => Shop.getData(Shop.getParams()));

		//this.maxPrice = document.getElementById('max');
		//this.minPrice = document.getElementById('min');

		//this.applyFilter = document.getElementById('applyFilter');
		Shop.constDOM.applyFilter.addEventListener('click', () => Shop.getData(Shop.getParams()));
		//this.clearFilter = document.getElementById('clearFilter');
		Shop.constDOM.clearFilter.addEventListener('click', () => {Shop.getData(); Shop.clearFilters();});
		
		//this.content = document.getElementById('content');

		Shop.getData();
	},
	getData(params){
		if(!params){
			Shop.sendRequest()
				.then(function(data){
					Shop.addCategories(data);
					Shop.buildUI(data);
				})
				.catch((status) => console.log(status));
			return;
		}
		Shop.sendRequest(params)
			.then(data => Shop.buildUI(data))
			.catch((status) => console.log(status));
	},
	sendRequest(params){
		return new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest();
			
			xhr.open('GET', `http://localhost:8003/data?${params}`, true);
			xhr.onload = function(){
				resolve(JSON.parse(this.responseText));
			}
			xhr.send(null);
			xhr.onerror = function(){
				reject(xhr.status);
			}
		})
	},
	addCategories(data){
		var categories = new Set();
		data.forEach(cat => categories.add(cat.category));
		var iter = categories.values();
		var categoriesHTML = '<option>Choose pizza category</option>';

		for(var i = 0; i < categories.size; i++){
			categoriesHTML += `<option>${iter.next().value}</option>`;
		}

		Shop.constDOM.categoryRange.innerHTML = `${categoriesHTML}`;
	},
	buildUI(data){
		Shop.constDOM.content.innerHTML = '';
		var contentHTML = '';

		for(var i in data){
			contentHTML += `<li class='items'>
								<img src='${data[i].img}'>
								<h2>${data[i].title}</h2>
								<h4>${data[i].category}</h4>
								<h2>$${data[i].price}</h2>
							</li>`
		}

		Shop.constDOM.content.innerHTML = contentHTML;
	},
	getParams(){
		var result = '';
		if(Shop.constDOM.categoryRange.selectedIndex != 0){
			console.log(Shop.constDOM.categoryRange.selectedIndex)
			result += `category=${Shop.constDOM.categoryRange.options[Shop.constDOM.categoryRange.selectedIndex].text}&`;
		}
		if(Shop.constDOM.minPrice.value){
			result += `min=${Shop.constDOM.minPrice.value}&`;
		}
		if(Shop.constDOM.maxPrice.value){
			result += `max=${Shop.constDOM.maxPrice.value}`;
		}
		return result;
	},
	clearFilters(){
		Shop.constDOM.categoryRange.selectedIndex = 0;
		Shop.constDOM.minPrice.value = null;
		Shop.constDOM.maxPrice.value = null;
	}
}

Shop.init();