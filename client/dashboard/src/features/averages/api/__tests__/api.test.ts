import { seasonAveragesQueryFields } from "../../types";
import { GET_SIX_PLAYERS_AVERAGES, playersDocContent } from "../index";

test('GET_SIX_PLAYERS_AVERAGES should be a valid string', () => {
	//expect(playersDocContent).toBe(null);
	expect(playersDocContent.length).toBeGreaterThan(0);
	expect(GET_SIX_PLAYERS_AVERAGES).toBeTruthy();
});

test('SeasonAverageQueryFields returns a string that matches testing pattern', () => {
	expect(seasonAveragesQueryFields[0]).toMatch(/^data\s+{\s+.+\s+}$/g);
})