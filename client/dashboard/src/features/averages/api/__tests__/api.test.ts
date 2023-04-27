import { GET_SIX_PLAYERS_AVERAGES, playersDocContent } from "../intex"

test('GET_SIX_PLAYERS_AVERAGES should be a valid string', () => {
	expect(playersDocContent.length).toBeGreaterThan(0);
	expect(GET_SIX_PLAYERS_AVERAGES).toBeTruthy();
});