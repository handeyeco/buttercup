var comic = {
	first: 1,
	last: 143,
	current: null,
	buyURL: "https://www.topatoco.com/merchant.mvc?Screen=PROD&Store_Code=TO&Product_Code=BF-COMIC-PRINTS&Category_Code=BF&Product_Attributes%5b1%5d:value="
};

//Update current comic with the selected buton id
comic.update = function (action) {
	var spinner = $('.buttercup-spinner');
	var comicImg = $('#comic');
	var placeholder = $('#placeholder');

	// "Disable" comic and show spinner
	$(comicImg).css('opacity', 0.1);
	$(spinner).show();

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

	//Change comic
	//Create an image element
	var imgPreload = new Image();

	//Assign src to image element
	//Fix special cases 8, 12, 30 (non-comforming naming scheme)
	if (this.current === 8 || this.current === 12 || this.current === 30){
		imgPreload.src = "images/2-" + this.current + ".png";
	} else {
		imgPreload.src = "http://www.buttercupfestival.com/2-" + this.current + ".png";
	}

	//Drop comic onto page, "Enable" comic, and remove spinner
	$(imgPreload).load(function () {
		$(comicImg).attr('src', imgPreload.src);
		$(comicImg).css('opacity', 1);
		$(spinner).hide();
		$(placeholder).hide();
	});

	//Change comic label and buy link
	$("#comic-ID").text("Series 2 Comic " + this.current);
	$("#buy").attr("href", this.buyURL + this.current);

	//Disable buttons for first and last comics
	$('button').prop('disabled', false);
	if (this.current === this.first) {
		$('#FIRST, #PREVIOUS').prop('disabled', true);
	} else if (this.current === this.last) {
		$('#NEXT, #LAST').prop('disabled', true);
	}
};

$(function () {
	//Initialize page with latest comic
	comic.update("LAST");

	//Add handlers to the buttons
	var buttons = $('button');

	$(buttons).click(function () {
		$('button').prop('disabled', true);

		comic.update($(this).attr("id"));
	});
});
