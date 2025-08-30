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

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);
dayjs.extend(isSameOrAfter);
dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(customParseFormat);
dayjs.extend(isBetween);
dayjs.extend(calendar);

export default dayjs;
