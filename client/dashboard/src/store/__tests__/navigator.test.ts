import { renderHook } from "@testing-library/react-hooks";
import { useNavigatorStore } from "../navigator";

test('should initialize navigator state', () => {
	const { result } = renderHook(() => useNavigatorStore());
	expect(result.current.navigate).toMatchObject({ prev: 0, section: 0, next: 10 });
});