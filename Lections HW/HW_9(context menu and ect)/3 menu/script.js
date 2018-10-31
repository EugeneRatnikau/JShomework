var tree = document.getElementsByTagName('ul')[0];

var Lis = document.getElementsByTagName('li');

for(var i = 0; i < Lis.length; i++){
	var li = Lis[i];

	var span = document.createElement('span');
	li.insertBefore(span, li.firstChild);
	span.appendChild(span.nextSibling);
}

tree.addEventListener('click', function (e) {
		var target = e.target;

		if(target.tagName != 'SPAN'){
			return;
		}

		var li = target.parentNode;

		var children = li.getElementsByTagName('ul')[0];

		if(!children) return;

		children.hidden = !children.hidden;
})