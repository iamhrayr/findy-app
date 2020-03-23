import { useState, useCallback } from 'react';
// import { AxiosError } from 'axios';

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
        // TODO: error may be thrown before the response received. handle it proparly
        setState({ ...state, loading: false, error: error.response.data });
        return error.response.data;
      }
    },
    [], // eslint-disable-line
  );

  return [{ ...state }, mutate];
};

export default useAsyncFn;
