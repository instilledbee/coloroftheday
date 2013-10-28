// Initialize some stuff
today = new Date();
currDay = today.getDate();
currMonth = today.getMonth() + 1;
currYear = today.getFullYear();
datePickerEl = null;

// Simple container for a color with RGB values
function RGBObj(r, g, b) {
	this.red = r;
	this.green = g;
	this.blue = b;
	
	this.hex = "#" + D2H(parseInt(this.red), 2) + D2H(parseInt(this.green), 2) + D2H(parseInt(this.blue), 2);
	this.lum = (0.2126 * this.red) + (0.7152 * this.green) + (0.0722 * this.blue);
}

// The fun function!
// Month and day are assumed to be integers represeting a month and date value
// Returns a hex string representing a unique color for the specified date.
function dateToColor(month, date, year) {
	var red, green, blue, hex, color, dayFromStart;
	var _DELTA;

	// Number of possible colors divided among number of days in a year.
	_DELTA = (256 * 256 * 256) / 366;
	
	dayFromStart = daysFromStart(month, date, year);
	console.log("days from start: " + dayFromStart);
	
	// Raw color value
	color = dayFromStart * _DELTA;
	color += (year * year); // Ensure a unique color every year
	console.log("raw: " + color);

	red = (color % 65536) / 512;
	red = ((red * 32) - (red * 16)) % 256;
	red = (red + 512) % 256;
	console.log("red: " + red);
	
	green = (color % 65536) / 256;
	console.log("green: " + green);
	
	blue = color % 256;
	console.log("blue: " + blue);
	
	return new RGBObj(red, green, blue);
}

// Reusable function which updates the document colors
// Date specified will be used to get the color to use.
function updateColors(month, date, year) {
	var value; 
	value = dateToColor(month, date, year);
	
	console.log(value.hex);
	
	$("#the-current-date").html(month + " . " + date + " . " + year);
	$("#the-color-code").html(value.hex);
	$("body").css("background-color", value.hex);
	
	console.log("lum: " + value.lum);
	
	if(value.lum < 75) {
		$("body").css("color", "#F0F0F0");
	}
	
	else {
		$("body").css("color", "#080808");
	}
}

// Update the DOM
$(document).ready(function() {
	// Try to get date if specified
	var param;
	param = window.location.search.substring(1);
	
	if(param.length && isValidDate(param)) {
		dateParam = param.split('/');
		currMonth = dateParam[0];
		currDay = dateParam[1];
		currYear = dateParam[2];
	}
	
	updateColors(currMonth, currDay, currYear);
	
	$('#open-calendar').click(function() {
		$('#the-calendar').fadeToggle();
		
		$(this).fadeTo('fast', 0, function() {
			$('#date-selector').glDatePicker(
			{
				cssName: 'flatwhite',
				calendarOffset: { y: 10 },
				showAlways: true,
				onClick: (function(el, cell, date, data) {
					$.extend(datePickerEl.options, {
						showAlways: false
					});
					datePickerEl.render();
					datePickerEl.hide();
					updateColors(date.getMonth() + 1, date.getDate(), date.getFullYear());
					$('#the-calendar').fadeToggle();
					$('#open-calendar').css('visibility', 'visible');
					$('#open-calendar').fadeTo('fast', 1);
				})
			});
			
			datePickerEl = $('#date-selector').glDatePicker(true);
			
			datePickerEl.show();
			$('#open-calendar').css('visibility', 'hidden');
		});
	});
});