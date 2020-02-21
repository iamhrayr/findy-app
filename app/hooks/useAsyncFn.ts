import { useState } from 'react';

const useAsyncFn = fn => {
  const [state, setState] = useState({
    isLoading: false,
    err: null,
    res: null,
  });

  const mutate = (...args) => {
    setState({ isLoading: true, err: null, res: null });

    return fn(...args)
      .then(({ data }) => {
        setState({ ...state, isLoading: false, res: data });
        return data;
      })
      .catch(err => {
        setState({ ...state, isLoading: false, err });
        return err;
      });
  };

  return { ...state, mutate };
};

export default useAsyncFn;
