import dayjs from "dayjs";
import { getWeekInterval } from "../helpers";


test('should return a valid date collection', () => {
	const date = dayjs();
	const weekInterval = getWeekInterval(date);
	expect(weekInterval[0]).toBeTruthy();
	expect(weekInterval[1]).toBeTruthy();
});

test('should return some 2023 April week sunday and saturday respectively', () => {
	const date = '2023-04-12'
	const weekInterval = getWeekInterval(date);
	const sunday = '2023-04-09';
	const saturday = '2023-04-15';
	expect(weekInterval[0]).toBe(sunday);
	expect(weekInterval[1]).toBe(saturday);
});

test('should return some 2023 December week sunday and saturday respectively', () => {
	const date = '2023-12-06'
	const weekInterval = getWeekInterval(date);
	const sunday = '2023-12-03';
	const saturday = '2023-12-09';
	expect(weekInterval[0]).toBe(sunday);
	expect(weekInterval[1]).toBe(saturday);
});