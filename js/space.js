$(document).ready(
	function() {
		setTimeout(function() {
			this.items = [];
			$(".loading").addClass('faded');		
		}, 800)

		function Space() {
			this.universe = 1;
			this.items = [];
			this.target = $("#exploration_target");
			this.space = $("#space");
			this.setListeners();
			this.lastEvent = null;
			this.populateSpace();
		};

		Space.prototype.populateSpace = function() {
			this.generateRandomSpace();
			for(var i = 0; i < this.items.length; i++) {
				this.space.append(this.items[i]);
			}
		};

		Space.prototype.generateRandomSpace = function() {
			for(var i = 0; i < 50; i++) {
				var top = Math.random() * 300;
				var left = Math.random() * 875;
				var eId = 'space-it-' + i + Math.round(Math.random() * 1000);
				var className = (Math.round(Math.random() * 11) % 10 == 0) ? 'star' : ((Math.round(Math.random() * 5) % 2 == 0) ? 'unknown' : 'speck');
				var radius = -1;
				if(className == 'star') {
					radius = 1.85 + Math.random() * 3;
				}
				this.items.push($('<div id="'+eId+'" class="item ' +  className + '" style="top:' + top +'px;left:' + left +'px;" data-radius="'+radius+'"></div>'));
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
			var starMultiplier = 10;
			for(var i = 0; i < this.items.length; i++) {
				if(this.items[i].hasClass('star')) {
					var finalRadius = this.items[i].data('radius') * starMultiplier;
					this.items[i].css('transition', 'width 30s linear, height 30s linear')
						.css('width',  finalRadius +'px')
						.css('height', finalRadius + 'px');
				}
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
					this.explore();
				}
			}.bind(this));
		};

		space = new Space();
	
	}
);