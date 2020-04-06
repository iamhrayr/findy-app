import { useState, useCallback } from 'react';

// TODO: somehow this fucking hook is not working when chrome debugger is active but working if `React native debugger` is active

type State = {
  loading: boolean;
  error: any | null;
  res: any | null;
};
type Fn = (...args: any[]) => Promise<any>;
type Return = [State, Fn];

const useAsyncFn = (fn: Fn, initialLoading?: boolean): Return => {
  const [state, setState] = useState({
    loading: !!initialLoading,
    error: null,
    res: null,
  });

  const mutate = useCallback(
    async (...args: any[]) => {
      setState({ loading: true, error: null, res: null });

      try {
        const { data } = await fn(...args);
        setState({ ...state, loading: false, res: data });
        return data;
      } catch (error) {
        setState({ ...state, loading: false, error: error.response.data });
        return error.response.data;
      }
    },
    [], // eslint-disable-line react-hooks/exhaustive-deps
  );

  return [{ ...state }, mutate];
};

export default useAsyncFn;
