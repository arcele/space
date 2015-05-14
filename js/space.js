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

		setTimeout(function() {
			$("#space .item").addClass("advance");
		}, 1075)

		setTimeout(function() {
			$("#space").append($('<div class="complete faded"></div>'));
		},31875)

		setTimeout(function() {
			$(".complete").removeClass('faded');
		},32000);
	}
);