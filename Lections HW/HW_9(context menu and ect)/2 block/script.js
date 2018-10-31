var block = document.getElementById('block');
var blockPosition = block.offsetTop;

document.addEventListener('scroll', function(){
	if (window.scrollY >= blockPosition) {
        block.classList.add('fixed');
 	} else{
        block.classList.remove('fixed');
    }
})
