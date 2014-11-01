function Flow(el) {
	var self = this,
		total = 0,
		current = 1280,
		slides = el.querySelectorAll('li'),
		count = slides.length,
		xform = 'transform',
		size = {
			width: slides[0].clientWidth,
			height: slides[0].clientHeight
		};

	el.className += ' flow-stage';
	el.style.height = size.height+'px';

	total = size.width * slides.length;

	for (var i = 0; i < count; i++) {
		slides[i].className += ' flow-slide';
		slides[i].style.left = 'calc(50% - '+Math.floor(size.width / 2)+'px)';
	}

	xform = 'transform';
	['webkit', 'Moz', 'O', 'ms'].every(function(prefix){
		var e = prefix + 'Transform';
		if (typeof document.body.style[e] !== 'undefined') {
			xform = e;
			return false;
		}
		return true;
	});

	self.update = function(){
		var diff = 0,
			slide = 0,
			mlide = 0,
			translateX = 0,
			translateZ = 0,
			rotateY = 0;

		for (var i = 0; i < count; i++) {
			diff = i * size.width - current;
			slide = diff / total;
			mlide = Math.abs(slide);

			translateX = diff * 0.65;
			translateZ = -800 * mlide;
			rotateY = -90 * 50 * (slide / count);

			if (rotateY < -90) {
				rotateY = -90;
			} else if (rotateY > 90) {
				rotateY = 90;
			}

			slides[i].style[xform] = 'translateX('+translateX+'px) translateZ('+translateZ+'px) rotateY('+rotateY+'deg)';
			slides[i].style.zIndex = Math.floor(mlide * -count);
			// slides[i].style.opacity = 1 - mlide;
		}
	};

	self.update();
}