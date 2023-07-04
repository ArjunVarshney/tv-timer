import { useState, useEffect } from "react";

type UseLocalPersist<T> = (
  key: string,
  initialValue: T
) => [T, (value: T) => void];

const useLocalPersist: UseLocalPersist<any> = (key, initialValue) => {
  const isClient = typeof window !== "undefined";
  const [state, setState] = useState(() => {
    if (isClient) {
      const storedValue = window.localStorage.getItem(key);
      return storedValue !== null ? JSON.parse(storedValue) : initialValue;
    }
    return initialValue;
  });

  useEffect(() => {
    if (isClient) {
      window.localStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state]);

  const setValue = (value: any) => {
    setState(value);
  };

  return [state, setValue];
};

export default useLocalPersist;
