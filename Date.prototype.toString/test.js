var d = new Date(1, 2, 3, 16, 5, 6, 617);
function test(format) {
	console.log(d, d.toString(format));
}

test();

var f = "\"string d\" \'string M\' \\tt t tt fff ff f s ss m mm h hh H HH z zz zzz d dd ddd dddd M MM MMM MMMM y yy yyy yyyy yyyyy";
console.log(f);
test(f);

d.setFullYear(1);
d.setHours(4);
d.setMilliseconds(50);
test(f);
