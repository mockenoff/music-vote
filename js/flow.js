function Flow(el) {
	var self = this,
		wrap = document.createElement('div');

	wrap.className = 'flow-wrapper';
	el.className += ' flow-stage';

	el.parentNode.insertBefore(wrap, el);
	wrap.appendChild(el);
}