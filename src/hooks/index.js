import { useState } from 'react';
export const useLocalStorage = (key, initialValue) => {
  const [localStore, setLocalStore] = useState(()=>{
    const storedItem = localStorage.getItem(key);
    return storedItem ? JSON.parse(storedItem) : initialValue;
  });
  const setValue = (value) => {
    setLocalStore(value);
    localStorage.setItem(key, JSON.stringify(value));
  }
  return [localStore, setValue];
}

