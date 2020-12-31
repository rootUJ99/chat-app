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

// export const useSocket = (event, param) => {
//   const socket = null;
//   const [data, setData ] = useState('');
//   if (typeof(param)=== 'function') {
//     useEffect(() => {
//       socket?.on(event, param);
//       return () => {
//         socket?.off(event);
//       }
//     }, [socket]);
//   }
//   if (typeof(param)=== 'String') {
//     socket?.emit(param);    
//   }
//   return {
//     data
//   }
// }