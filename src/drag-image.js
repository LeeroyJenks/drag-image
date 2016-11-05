(function($) {
	$.fn.dragImage = function(options) {
		var defaults = {
			maxWidth: 0,
			onDragComplete: function() {},
			defaultClick: function() {},
			autoSize: true,
			offsetX: 0,
			offsetY: 0,
			maxImageWidth: '200%'
		};
		var settings = $.extend({}, defaults, options);
		var initialStyle = [];
		return this.each(function(index) {
			var iniX, iniY, elX, elY;
			var chosenElement = this;
			var dragged = false;
			var initialStyle, parentStyle;

			var destroy = function() {
				unbindIt();
				$(chosenElement).attr('style', initialStyle).removeData('index').removeAttr('data-index').parent().attr('style', parentStyle);
			};

			var bindIt = function() {
				$(chosenElement).on("mousedown.drag touchstart.drag", grabIt);
				$(chosenElement).on("mouseup.drag touchend.drag", dropIt);
				$(chosenElement).on("dragstart.drag", function(event) {
					event.preventDefault();
				});
				$(chosenElement).on("click.drag", function(event) {
					event.preventDefault();
					event.stopPropagation();
				});
				$(chosenElement).on("mouseenter.drag", function(event) {
					event.preventDefault();
					event.stopPropagation();
				});
				if (settings.autoSize) {
					$(chosenElement).css({
						'width': 'auto',
						'height': 'auto',
						'max-width': settings.maxImageWidth,
						'max-height': 'none'
					});
				}
				$(chosenElement).parent().css({
					'width': $(chosenElement).parent().outerWidth(),
					'height': $(chosenElement).parent().outerHeight()
				});
				$(chosenElement).css({
					'display': 'block',
					'position': 'absolute',
					'top': ($(chosenElement).parent().outerHeight() / 2) + (settings.offsetY) + 'px',
					'left': ($(chosenElement).parent().outerWidth() / 2) + (settings.offsetX) + 'px',
					'-webkit-transform': 'translate(-50%, -50%)',
					'-moz-transform': 'translate(-50%, -50%)',
					'transform': 'translate(-50%, -50%)'
				});
			};

			var unbindIt = function() {
				//console.log($(chosenElement));
				$(chosenElement).off(".drag");
			};

			var dragIt = function(event) {
				//console.log('dragging');
				var maxX = settings.offsetX;
				var maxY = settings.offsetY;
				var movedX = (event.originalEvent.touches) ? event.originalEvent.touches[0].pageX : event.clientX;
				var movedY = (event.originalEvent.touches) ? event.originalEvent.touches[0].pageY : event.clientY;
				var totalMoveX = elX + (movedX - iniX);
				var totalMoveY = elY + (movedY - iniY);
				if (totalMoveX >= maxX) {
					totalMoveX = maxX;
				} else if ((totalMoveX + $(chosenElement).outerWidth()) <= (maxX + $(chosenElement).parent().outerWidth())) {
					totalMoveX = (maxX + $(chosenElement).parent().outerWidth()) - $(chosenElement).outerWidth();
				}
				if (totalMoveY >= maxY) {
					totalMoveY = maxY;
				} else if ((totalMoveY + $(chosenElement).outerHeight()) <= (maxY + $(chosenElement).parent().outerHeight())) {
					totalMoveY = (maxY + $(chosenElement).parent().outerHeight()) - $(chosenElement).outerHeight();
				}
				$(chosenElement).css({
					'top': totalMoveY + 'px',
					'left': totalMoveX + 'px',
					'-webkit-transform': 'none',
					'-moz-transform': 'none',
					'transform': 'none'
				});
				dragged = true;
			};

			var grabIt = function(event) {
				//console.log('grabbed');
				event.preventDefault();
				event.stopPropagation();
				elX = $(chosenElement).position().left;
				elY = $(chosenElement).position().top;
				if (event.originalEvent.touches) {
					iniX = event.originalEvent.touches[0].pageX;
					iniY = event.originalEvent.touches[0].pageY;
				} else {
					iniX = event.clientX;
					iniY = event.clientY;
				}
				$(chosenElement).on("mousemove.drag touchmove.drag", dragIt);
				$(chosenElement).css({
					'top': elY + 'px',
					'left': elX + 'px',
					'-webkit-transform': 'none',
					'-moz-transform': 'none',
					'transform': 'none'
				});
				dragged = false;
			};

			var dropIt = function(event) {
				$(chosenElement).off("mousemove.drag touchmove.drag", dragIt);
				var endX = (event.originalEvent.changedTouches) ? event.originalEvent.changedTouches[0].pageX : event.clientX;
				var endY = (event.originalEvent.changedTouches) ? event.originalEvent.changedTouches[0].pageY : event.clientY;
				if (Math.abs(iniX - endX) < 15 && Math.abs(iniY - endY) < 15) {
					settings.defaultClick();
				} else {
					event.preventDefault();
					event.stopPropagation();
				}

			};

			var resizeWindow = function() {
				var $thisElement = $(chosenElement);
				//console.log('resizing');
				if ($(window).width() > settings.maxWidth) {
					destroy();
				} else {
					bindIt($thisElement);
				}
			};

			if (options == 'destroy') {
				destroy();
			} else {
				//console.log($(chosenElement));
				initialStyle = $(chosenElement).attr('style') || '';
				parentStyle = $(chosenElement).parent().attr('style') || '';
				$(chosenElement).attr('data-index', index);
				if (settings.maxWidth <= 0) {
					bindIt($(chosenElement));
				} else {
					if ($(window).width() > settings.maxWidth) {
						destroy();
					} else {
						bindIt($(chosenElement));
					}
					//$(window).resize({element : $thisElement, index : index}, resizeWindow);
				}

				//console.log(initialStyle);
			}
		});
	};
}(jQuery));