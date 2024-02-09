import { useState } from "react";

type UseMutationResult<T> = [(data: any) => void, UseMutationState<T>];

interface UseMutationState<T> {
  loading: boolean;
  data?: T;
  error?: object;
}

export default function useMutation<T = any>(
  url: string,
  method: string
): UseMutationResult<T> {
  const [state, setState] = useState({
    loading: false,
    data: undefined,
    error: undefined,
  });
  function mutation(data: any) {
    setState((prev) => ({ ...state, loading: true }));
    fetch(url, {
      method,
      body: JSON.stringify(data),
    })
      .then((response) => response.json().catch(() => {}))
      .then((data) => setState((prev) => ({ ...prev, data })))
      .catch((error) => setState((prev) => ({ ...prev, error })))
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  }
  return [mutation, { ...state }];
}
