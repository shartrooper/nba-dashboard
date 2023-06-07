import { renderHook } from '@testing-library/react-hooks';
import { useSessionTokenStore } from '../usersession';

test('Unsassigned token should be null', () => {
  const { result } = renderHook(() => useSessionTokenStore());

  expect(result.current.token).toBe(null);
});
