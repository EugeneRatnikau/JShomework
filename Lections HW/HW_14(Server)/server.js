// const http = require('http'); //загружает модуль. модуль это объект, в котором находится какойт перечень методов

// const server = http.createServer(function (request, response) { //воздали сервер и записали. метод криейт сервер принимает одну функцию
// 	response.write(`Hello there! from ${request.url}`);//при каждом апросе функция будет вызываться. она асинхронная, значит, что никому не нужно будет ждать
// 	response.end(); //говорим, что данная сессия завершена. если этого не сделать, то запрос будет выполняться бесконечно
// })

// server.listen(8003, function(){ //задаем серверу прослушивать порт(желательно брать больше 5000 до 65 к и желательно с 8 к)
// 	console.log('Server started at port 8003');
// })

//staic server

//на заопрос может отдавать файл, если он существует


//dinamic server
//сервер, который может принимать в себя какие-то параметры и на основе них возвращать какие-то параметры
//сделать интернет магазин по фильтрации чет кококо. по ajax не брать все сразу на сервере осуществлять фильтрацию и на страницу 
//вставлять то, что выдал сервер

//дома записать в файлик да-да

// const Items = [{title:'socks', price:100, img:'1.png'},
// 			   {title:'bots', price:200, img:'2.png'},
// 			   {title:'sweater', price:150, img:'3.png'},
// 			   {title:'coat', price:350, img:'4.png'},
// 			   {title:'shirt', price:50, img:'5.png'},
// 			   {title:'bad', price:700, img:'6.png'},
// 			   {title:'TV', price:800, img:'7.png'},];

const http = require('http');
const fs = require('fs');

const server = http.createServer(function (request, response) { 
	if(request.url.indexOf('/data?') == 0){
		const params = request.url.split('?')[1].split('&')  //все это предназначено, чтобы получить параметры
		.reduce((prev, curr) => {
			curr = curr.split('=');
			return Object.assign(prev, {
				[curr[0]]:curr[1]
			})
		},{})
		fs.readFile('goods.json', function(arr, text){
			let result = JSON.parse(text);
			if(params.category){
				result = result.filter(item => item.category == params.category);
			}
			if(params.min){
				result = result.filter(item => item.price >= params.min);
			}
			if(params.max){
				result = result.filter(item => item.price <= params.max);
			}

			// response.write(buildUI());
			response.setHeader('Access-Control-Allow-Origin', 'http://localhost');
			response.write(JSON.stringify(result));
			response.end();
		})
	}
})

server.listen(8003, function(){
	console.log('Server started at port 8003');
})

// function buildUI(){
// 	var body = document.getElementsByTagName('body');
// 	console.log(body);
// }

// buildUI();