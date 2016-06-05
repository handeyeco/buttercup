var comic = {
	first: 1,
	last: 143,
	current: null
}

comic.update = function (action) {
	switch (action) {
		case "FIRST":
			this.current = this.first;
			break;
		case "LAST":
			this.current = this.last;
			break;
		case "PREVIOUS":
			this.current = this.current - 1;
			break;
		case "NEXT":
			this.current = this.current + 1;
			break;
		case "RANDOM":
			this.current = Math.floor(Math.random() * (this.last - this.first + 1)) + this.first;
			break;
	} 

	//Fix special cases, 8, 30

	if (this.current === 30) { this.current = 31; }

	//Not done yet...

	$('#comic').attr("src", "http://www.buttercupfestival.com/2-" + this.current + ".png");
	$("#comic-ID").text("Series 2 Comic " + this.current + " by David Troupes");

	$('button').prop('disabled', false);
	if (this.current === this.first) {
		$('#FIRST, #PREVIOUS').prop('disabled', true);
	} else if (this.current === this.last) {
		$('#NEXT, #LAST').prop('disabled', true);
	}
};

$(function () {
	comic.update("LAST");

	$('button').click(function () {
		comic.update($(this).attr("id"));
	});
});


