var form = document.querySelector('#search'),
	text = form.querySelector('#search-text'),
	flst = document.querySelector('#stage'),
	flob = new Flow(flst),
	play = document.querySelector('#play'),
	ptmp = document.querySelector('#play-template').innerHTML,
	stmp = document.querySelector('#slide-template').innerHTML,
	yrex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?.*?v=(.{11})(?:&.+)?/,
	plch = ['Aurally yours', 'Shiver me ear timbers', '3, 2, 1, dance!', 'Tickle the ivories', 'Phil Collins kind of night', 'Paaaaaartaaayyyyyy'],
	lhsh = {},
	lcnt = 0;

form.addEventListener('submit', function(e){
	e.preventDefault();

	var res = text.value.match(yrex);
	if (res !== null) {
		if (res[1] in lhsh) {
			console.log('Already in the list');
			return false;
		}

		lcnt++;
		lhsh[res[1]] = text.value;
		text.placeholder = plch[Math.round((plch.length - 1) * Math.random())]
		text.value = '';
		console.log(res[1]);
	} else {
		console.log('invalid url');
	}
});

form.addEventListener('keydown', function(e){
	var k = e.keyCode || e.which;
	if (k === 27) {
		text.value = '';
	}
});

flst.addEventListener('click', function(e){
	console.log(e);
	e.preventDefault();

	var t = e.target;
	if (t.nodeName === 'IMG') {
		t = t.parentNode;
	}

	if (t.nodeName === 'A' && t.hasAttribute('data-id')) {
		play.innerHTML = ptmp.replace(/{{id}}/g, t.getAttribute('data-id'));
	}
});

function resize(e) {
	document.body.style.height = window.innerHeight+'px';
}

window.addEventListener('resize', resize);
resize();