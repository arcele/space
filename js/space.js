$(document).ready(
	function() {
		setTimeout(function() {
			$(".loading").addClass('faded');
			for(var i = 0; i < 25; i++) { // 5 Random stars for now
				var top = Math.random() * 300;
				var left = Math.random() * 875;
				var star = $('<div id="'+eId+'" class="' +  (Math.round(Math.random() * 10) % 4 == 0 ? 'star' : 'unknown') + '" style="top:' + top +'px;left:' + left +'px;"></div>');
				$("#space").append(star);
			}
		//	$("#space .star").addClass("advance");
		}, 800)

		setTimeout(function() {
			$("#space .star").addClass("advance");
		}, 1075)

		setTimeout(function() {
			$("#space").append($('<div class="complete faded"></div>'));
		},31875)

		setTimeout(function() {
			$(".complete").removeClass('faded');
		},32000);
	}
);