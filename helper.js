// -- Helper functions -- //
 
// Compute for the days elapsed since January 1 (plus current day)
function daysFromStart(month, date, year) {
	var dayCount;

	dayCount = date;
	
	for(var i = 1; i < month; i++) {
		// Some months have 31 days...
		if(i == 1 || i == 3 || i == 5 || i == 7 || i == 8 || i == 10 || i == 12) {
			dayCount += 31;
		}
		
		// ... others have 30 ... 
		else if(i == 4 || i == 6 || i == 9 || i == 11) {
			dayCount += 30;
		}
		
		// ... then there's February :p
		else {
			if(year % 400 == 0) {
				dayCount += 29;
			}
			
			else if(year % 100 == 0) {
				dayCount += 28;
			}
			
			else if(year % 4 ==0) {
				dayCount += 29;
			}
			
			else {
				dayCount += 28;
			}
		}
	}
	
	return dayCount;
};

// Convert a decimal to a hex number, with padding
// Original code from: http://stackoverflow.com/a/1446578
function D2H(d, padding) {
	var hex = Number(d).toString(16);
	padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

	while (hex.length < padding) {
		hex = "0" + hex;
	}

	return hex;
};