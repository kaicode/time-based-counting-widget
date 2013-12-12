function TimeBasedCountingWidget(configIn) {

	var config = {
		targetClassName: 'counting-widget',
		prefix: '',
		postfix: '',
		startDate: 'now',
		countTimeUnit: 'second',
		countMultiplier: 1,
		updateIntervalSeconds: 1,
		spanWrap: true
	};

	var startDate, unitDivision;

	function updateSelection() {
		var elements = document.getElementsByClassName(config.targetClassName);
		if (elements.length > 0) {
			var count = getCount() + '';
			var html;
			if (!config.spanWrap) {
				html = config.prefix + getCount() + config.postfix
			} else {
				html = config.prefix;
				for (var numberIndex = 0; numberIndex < count.length; numberIndex++) {
					html += '<span class="count">' + count[numberIndex] + '</span>';
				}
				html += config.postfix;
			}
			for (var a = 0; a < elements.length; a++) {
				var element = elements[a];
				element.innerHTML = html;
			}
		}
	}

	function getCount() {
		var count = 0;
		var secondsSinceStartDate = Math.round(((new Date().getTime()) - (startDate.getTime())) / 1000);
		count = Math.floor(secondsSinceStartDate / unitDivision);
		count = count * config.countMultiplier;
		return count;
	}

	function getStartDate() {
		if (config.startDate == 'now') {
			return new Date();
		} else {
			return new Date(config.startDate);
		}
	}

	function getUnitDivision() {
		var unitDivision;
		if (config.countTimeUnit == 'second') {
			unitDivision = 1;
		} else if (config.countTimeUnit == 'minute') {
			unitDivision = 60;
		} else if (config.countTimeUnit == 'hour') {
			unitDivision = 60 * 60;
		} else if (config.countTimeUnit == 'day') {
			unitDivision = 60 * 60 * 24;
		} else if (config.countTimeUnit == 'week') {
			unitDivision = 60 * 60 * 24 * 7;
		} else {
			throw new Error('Unrecognised countTimeUnit \'' + config.countTimeUnit + '\'');
		}
		return unitDivision;
	}

	function copyPredefinedProperties(source, destination) {
		for (var propertyName in destination) {
			if (typeof configIn[propertyName] != 'undefined') {
				config[propertyName] = configIn[propertyName];
			}
		}
	}

	function init(configIn) {
		copyPredefinedProperties(configIn, config);
		startDate = getStartDate();
		unitDivision = getUnitDivision();
		updateSelection();
		setInterval(updateSelection, config.updateIntervalSeconds * 1000);
	}

	init(configIn);
}
