import { useCallback, useState } from 'react';

export default function useToggle(
  initialState = false,
): [boolean, (value?: boolean) => void] {
  // Initialize the state
  const [state, setState] = useState(initialState);

  const toggle = useCallback(
    (value?: boolean) => setState((state: boolean) => value ?? !state),
    [],
  );

  return [state, toggle];
}
