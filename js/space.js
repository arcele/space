$(document).ready(
	function() {
		setTimeout(function() {
			$(".loading").addClass('faded');
			for(var i = 0; i < 50; i++) {
				var top = Math.random() * 300;
				var left = Math.random() * 875;
				var eId = 'space-it-' + i + Math.round(Math.random() * 1000);
				var className = (Math.round(Math.random() * 11) % 10 == 0) ? 'star' : ((Math.round(Math.random() * 5) % 2 == 0) ? 'unknown' : 'speck');
				var item = $('<div id="'+eId+'" class="item ' +  className + '" style="top:' + top +'px;left:' + left +'px;"></div>');
				$("#space").append(item);
			}
		//	$("#space .star").addClass("advance");
		}, 800)

		function Space() {
			this.universe = 1;
			this.target = $("#exploration_target");
			this.setListeners();
			this.lastEvent = null;
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
			$("#space").addClass("advance");
			setTimeout(function() {
				$("#space").append($('<div class="complete faded"></div>'));
			},31875)

			setTimeout(function() {
				$(".complete").removeClass('faded');
			},32000);

		};
		
		Space.prototype.setListeners = function() {
			$("#space").on("mousemove", function(e) {
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