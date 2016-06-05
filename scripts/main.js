var comic = {
	first: 1,
	last: 143,
	current: null,
	buyURL: "https://www.topatoco.com/merchant.mvc?Screen=PROD&Store_Code=TO&Product_Code=BF-COMIC-PRINTS&Category_Code=BF&Product_Attributes%5b1%5d:value="
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

	$('#comic').attr("src", "http://www.buttercupfestival.com/2-" + this.current + ".png");
	$("#comic-ID").text("Series 2 Comic " + this.current);
	$("#buy").attr("href", this.buyURL + this.current)

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


