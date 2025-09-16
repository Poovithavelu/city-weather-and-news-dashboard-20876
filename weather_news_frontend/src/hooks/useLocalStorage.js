import { useEffect, useState } from 'react';

const PREFIX = 'wn_';

/**
 * React hook for syncing a state value with localStorage.
 * @param {string} key 
 * @param {any} initialValue 
 * @returns {[any, Function]}
 */
// PUBLIC_INTERFACE
export default function useLocalStorage(key, initialValue) {
  const storageKey = PREFIX + key;

  const [value, setValue] = useState(() => {
    try {
      const json = localStorage.getItem(storageKey);
      if (json != null) {
        return JSON.parse(json);
      }
    } catch {
      // ignore parsing errors
    }
    return typeof initialValue === 'function' ? initialValue() : initialValue;
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(value));
    } catch {
      // ignore quota errors
    }
  }, [storageKey, value]);

  return [value, setValue];
}
