$(document).ready(
	function() {

		function Space() {
			this.universe = 1;
			this.items = [];
			this.target = $("#exploration_target");
			this.space = $("#space");
			this.setListeners();
			this.lastEvent = null;
			setTimeout( function() {
				this.getSpace();
			}.bind(this), 250);
		};

		Space.prototype.getSpace = function() {
			// Generate Random space for now.  This should be a $.get() call w/ popuplate space as the callback
			for(var i = 0; i < 50; i++) {
				var top = Math.random() * 300;
				var left = Math.random() * 875;
				var eId = 'space-it-' + i + Math.round(Math.random() * 1000);
				var className = (Math.round(Math.random() * 11) % 10 == 0) ? 'star' : ((Math.round(Math.random() * 5) % 2 == 0) ? 'unknown' : 'speck');
				var radius = -1;
				if(className == 'star') {
					radius = 1.85 + Math.random() * 3;
				} else if(className == 'unknown') {
					radius = 1 + Math.random();
				} else {
					radius = Math.random();
				}
				this.items.push($('<div id="'+eId+'" class="item ' +  className + '" style="top:' + top +'px;left:' + left +'px;" data-radius="'+radius+'"></div>'));
			}
			this.populateSpace();
		};

		Space.prototype.populateSpace = function() {
			$("#loading").addClass("faded");
			for(var i = 0; i < this.items.length; i++) {
				this.space.append(this.items[i]);
			}
		};

		Space.prototype.setTarget = function(e) {
			if(e) {
				if(this.target.css('top') == e.clientY +'px' && this.target.css('left') == e.clientX +'px') {
					this.target.removeClass("motion");
					return false;
				}
				this.target.addClass("motion").css('top', e.clientY).css('left', e.clientX);
				setTimeout(function() {
					this.target.removeClass("motion");
					this.setTarget(this.lastEvent);
				}.bind(this), 200)
			}
		};

		Space.prototype.explore = function(e) {
			this.explorationVector = e;
			var itemMultipler, pos, deltaX, deltaY, distance, angle, linearVelocity, newTop, newLeft;
			for(var i = 0; i < this.items.length; i++) {
				// Determine item's "distance" from explorationVector
				pos = this.items[i].position();
				deltaX = pos.left - e.clientX;
				deltaY = pos.top - e.clientY;
				distance = Math.sqrt(Math.pow(deltaX,2) + Math.pow(deltaY,2)); // quadradic, thanks pre-algebra
				// Determine star's angle from explorationVector
				angle = Math.atan(deltaY / deltaX);
				if(this.items[i].hasClass('star')) {
					linearVelocity = Math.pow(distance, 2) / 500; // The further from the exploration point the star, the faster it diverges from the current view
					itemMultiplier = 10
				} else if(this.items[i].hasClass('unknown')) {
					console.log('vel:', linearVelocity);
					itemMultiplier = 9
			    } else {
					linearVelocity = 1;//Math.pow(distance, 2) / 5000;
					itemMultiplier = 3
				}

				// This could be improved with some trig
				if(deltaY < 0) {
					newTop = pos.top - linearVelocity;
				} else {
					newTop = pos.top + linearVelocity;
				}
				if(deltaX < 0) {
					newLeft = pos.left - linearVelocity;
				} else {
					newLeft = pos.left + linearVelocity;
				}
				var finalRadius = this.items[i].data('radius') * itemMultiplier;

				console.log(this.items[i], finalRadius, newTop, newLeft);
				this.items[i].css('transition', 'width 30s linear, height 30s linear, top 30s linear, left 30s linear')
					.css('width',  finalRadius +'px')
					.css('height', finalRadius + 'px')
					.css('top', newTop)
					.css('left', newLeft);

			}

			$("#space").addClass("advance");
			setTimeout(function() {
				$("#space").append($('<div class="complete faded"></div>'));
			},31875)

			setTimeout(function() {
				$(".complete").removeClass('faded');
			},32000);

		};
		
		Space.prototype.setListeners = function() {
			$("body").on("mousemove", "#space:not(.advance)", function(e) {
				this.lastEvent = e;
				if(!this.target.hasClass("motion")) {
					this.setTarget(e);
				}
			}.bind(this));

			$("body").on("click", "#exploration_target", function(e) {
				if(!$("#space").hasClass('advance')) {
					this.explore(e);
				}
			}.bind(this));
		};

		space = new Space();

	}
);