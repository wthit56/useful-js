
(function () {

	var _toString = Date.prototype.toString;
	var s = Date.prototype.toString = function (format) {
		if (!format) { return _toString.call(this); }

		var date = this;
		return format.replace(s.spec.find, function (match, escaped, key) {
			return (key && !escaped) ? s.spec[key].call(date) : match;
		});
	}

	s.days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	s.days.abbr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

	s.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	s.months.abbr = ["Jan", "Feb", "Mar", "Jun", "Jul", "Arug", "Sep", "Oct", "Nov", "Dec"];

	s.period = ["AM", "PM"]
	s.period.abbr = ["A", "P"];

	var toPadded = (function () {
		var str, len;

		return function toPadded(number, width) {
			str = number.toString();
			len = width - str.length;

			return (
				(len <= 0)
					? str
					: new Array(len + 1).join("0") + str
			);
		};
	})();

	var o, m;
	s.spec = {
		"tt": function () { return s.period[(this.getHours() < 12) ? 0 : 1]; },
		"t": function () { return s.period.abbr[(this.getHours() < 12) ? 0 : 1]; },

		"fff": function () { return toPadded(this.getMilliseconds(), 3); },
		"ff": function () { return toPadded(Math.floor(this.getMilliseconds() / 10), 2); },
		"f": function () { return toPadded(Math.floor(this.getMilliseconds() / 100), 1); },

		"ss": function () { return toPadded(this.getSeconds(), 2); },
		"s": function () { return this.getSeconds().toString(); },

		"mm": function () { return toPadded(this.getMinutes(), 2); },
		"m": function () { return this.getMinutes().toString(); },

		"hh": function () { return toPadded(this.getHours() % 12, 2); },
		"h": function () { return (this.getHours() % 12).toString(); },

		"HH": function () { return toPadded(this.getHours(), 2); },
		"H": function () { return (this.getHours()).toString(); },

		"zzz": function () {
			o = this.getTimezoneOffset(), m = o % 60;
			return toPadded((o - m) / 60, 2) + ":" + toPadded(m, 2);
		},
		"zz": function () {
			o = this.getTimezoneOffset(), m = o % 60;
			return toPadded(((o - m) / 60), 2);
		},
		"z": function () {
			o = this.getTimezoneOffset(), m = o % 60;
			return ((o - m) / 60).toString();
		},

		"dddd": function () { return s.days[this.getDay()]; },
		"ddd": function () { return s.days.abbr[this.getDay()]; },
		"dd": function () { return toPadded(this.getDate(), 2); },
		"d": function () { return this.getDate().toString(); },

		"MMMM": function () { return s.months[this.getMonth()]; },
		"MMM": function () { return s.months.abbr[this.getMonth()]; },
		"MM": function () { return toPadded(this.getMonth() + 1, 2); },
		"M": function () { return (this.getMonth() + 1).toString(); },

		"yyyyy": function () { return toPadded(this.getFullYear(), 5); },
		"yyyy": function () { return toPadded(this.getFullYear(), 4); },
		"yyy": function () { return toPadded(this.getFullYear(), 3); },
		"yy": function () { return toPadded(this.getFullYear() % 100, 2); },
		"y": function () { return (this.getFullYear() % 100).toString(); }
	};
	s.spec.find = null;

	var keys = [];
	s.spec.build = function () {

		for (key in s.spec) {
			if (key != "build" && key != "find") {
				keys.push(key);
			}
		}
		keys.sort(function (a, b) { return b.length - a.length });

		s.spec.find = new RegExp("\".*?\"|\'.*?\'|(\\\\)?(" + keys.join("|") + ")", "g");

		keys.splice(0);
	};

	s.spec.build();

})();
