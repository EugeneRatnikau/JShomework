document.addEventListener('contextmenu', function(){
	event.preventDefault();

	var e = e || window.event;
	var pageX = e.pageX;
    var pageY = e.pageY;

	if(e.pageX > window.innerWidth - 140)
		pageX = e.pageX - 140;

	if(e.pageY > window.innerHeight - 100)
		pageY = e.pageY - 100;
   
	contextMenu(event.target, pageX, pageY);
});

function contextMenu(RMBon, x, y){
	if(document.getElementById('menu'))
		return;

	var menu = document.createElement('ul');
	menu.id = 'menu';
	menu.innerHTML = `<li id="left">Text align left</li>
					 <li id="center">Text align center</li>
					 <li id="right">Text align right</li>
					 <li id="day">Day theme</li>
					 <li id="night">Night theme</li>`;




	document.body.appendChild(menu);
	menu.style['top'] = y - 3 + 'px';
	menu.style['left'] = x - 3 + 'px';

	menu.addEventListener('click', function(){
		if(event.target.id == 'left'){
			window.getComputedStyle(RMBon).textAlign;
			RMBon.style['text-align'] = 'left';
		}
		if(event.target.id == 'center'){
			window.getComputedStyle(RMBon).textAlign;
			RMBon.style['text-align'] = 'center';
		}
		if(event.target.id == 'right'){
			window.getComputedStyle(RMBon).textColor;
			RMBon.style['text-color'] = 'right';
		}
		if(event.target.id == 'day'){
			RMBon.style['color'] = 'black'
			RMBon.style['background-color'] = 'white';
		}
		if(event.target.id == 'night'){
			RMBon.style['color'] = 'gray'
			RMBon.style['background-color'] = 'black';
		}
	});

	menu.addEventListener('mouseleave', function(){
		if(event.target == this)
			this.remove();
	});

}
