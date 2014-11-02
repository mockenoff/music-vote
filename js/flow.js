function Flow(el) {
	var self = this,
		wrap = document.createElement('div'),
		total = 0,
		current = 0,
		slides = el.querySelectorAll('li'),
		count = slides.length,
		xform = 'transform',
		size = {
			width: slides[0].clientWidth,
			height: slides[0].clientHeight
		};

	wrap.className = 'flow-wrapper';
	el.parentNode.insertBefore(wrap, el);

	el.className += ' flow-stage';
	el.style.height = size.height+'px';
	wrap.appendChild(el);

	total = size.width * (slides.length - 1);

	for (var i = 0; i < count; i++) {
		slides[i].className += ' flow-slide';
		slides[i].style.left = 'calc(50% - '+Math.round(size.width / 2)+'px)';
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

	self.getCurrent = function(){
		return current;
	};

	self.setCurrent = function(value){
		if (value < 0) {
			value = 0;
		} else if (value > total) {
			value = total;
		}
		current = value;
		self.update();
	};

	self.update = function(value){
		var diff = 0,
			slide = 0,
			mlide = 0,
			translateX = 0,
			translateZ = 0,
			rotateY = 0;

		if (value === undefined) {
			value = current;
		}

		for (var i = 0; i < count; i++) {
			diff = i * size.width - value;
			slide = diff / total;
			mlide = Math.abs(slide);

			translateX = diff * 0.65;
			translateZ = -1000 * mlide;
			rotateY = -90 * 60 * (slide / count);

			if (rotateY < -100) {
				rotateY = -100;
			} else if (rotateY > 100) {
				rotateY = 100;
			}

			slides[i].style[xform] = 'translateX('+translateX+'px) translateZ('+translateZ+'px) rotateY('+rotateY+'deg)';
			slides[i].style.zIndex = count - Math.round(mlide * count);
		}
	};

	var origin = {x: 0, y: 0},
		pressed = false,
		amplitude = 0,
		timestamp = null,
		timeConstant = 250;

	function autoScroll() {
		var elapsed, delta;

		if (amplitude) {
			elapsed = Date.now() - timestamp;
			delta = amplitude * Math.exp(-elapsed / timeConstant);
			if (delta > 4 || delta < -4) {
				update(target - delta);
				requestAnimationFrame(autoScroll);
			} else {
				update(target);
			}
		}
	}

	function xpos(e) {
		if ('targetTouches' in e && e.targetTouches.length >= 1) {
			return e.targetTouches[0].clientX;
		}
		return e.clientX;
	}

	function ypos(e) {
		if ('targetTouches' in e && e.targetTouches.length >= 1) {
			return e.targetTouches[0].clientY;
		}
		return e.clientY;
	}

	function tap(e) {
		e.preventDefault();

		if (pressed === false) {
			console.log('tap', xpos(e), ypos(e));
			pressed = true;
			timestamp = Date.now();
			origin = {x: xpos(e), y: ypos(e)};
		}
	}

	function drag(e) {
		e.preventDefault();

		if (pressed === true) {
			console.log('drag', xpos(e), origin.x, (xpos(e) - origin.x));
			self.update(current + (origin.x - xpos(e)));
		}
	}

	function release(e) {
		e.preventDefault();

		if (pressed === true) {
			console.log('release', xpos(e), ypos(e));
			pressed = false;
			current += origin.x - xpos(e);
			timestamp = Date.now();
		}

		if (Math.abs(origin.x - xpos(e)) > 5 || Math.abs(origin.y - ypos(e)) > 5) {
			e.stopPropagation();
		}
	}

	el.addEventListener('mousedown', tap);
	document.body.addEventListener('mouseup', release);
	document.body.addEventListener('mousemove', drag);

	if (typeof window.ontouchstart !== 'undefined') {
		el.addEventListener('touchstart', tap);
		document.body.addEventListener('touchmove', drag);
		document.body.addEventListener('touchend', release);
	}

	self.update();
}