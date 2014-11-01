var form = document.querySelector('#search'),
	text = form.querySelector('#search-text'),
	flst = new Flow(document.querySelector('#stage'));

form.addEventListener('submit', function(e){
	e.preventDefault();
});

form.addEventListener('keydown', function(e){
	var k = e.keyCode || e.which;
	if (k === 27) {
		text.value = '';
	}
});

function resize(e) {
	document.body.style.height = window.innerHeight+'px';
}

window.addEventListener('resize', resize);
resize();