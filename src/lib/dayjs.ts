import 'dayjs/locale/de';
import 'dayjs/locale/en';
import 'dayjs/locale/fr';
import 'dayjs/locale/ar';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import calendar from 'dayjs/plugin/calendar';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

export default class DayjsManager {
	static instance = dayjs;

	static initialize() {
		DayjsManager.instance.extend(utc);
		DayjsManager.instance.extend(timezone);
		DayjsManager.instance.extend(advancedFormat);
		DayjsManager.instance.extend(isSameOrAfter);
		DayjsManager.instance.extend(relativeTime);
		DayjsManager.instance.extend(duration);
		DayjsManager.instance.extend(customParseFormat);
		DayjsManager.instance.extend(isBetween);
		DayjsManager.instance.extend(calendar);

		return DayjsManager.instance;
	}

	static getDayjs() {
		return DayjsManager.instance;
	}
}
