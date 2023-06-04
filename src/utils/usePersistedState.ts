import {useState, useEffect, Dispatch, SetStateAction} from "react";

type TResponse<T> = [
  T,
  Dispatch<SetStateAction<T>>,
]

function usePersistedState<T>(key: string, initalState: T): TResponse<T> {
  const [state, setState] = useState(() => {
    const storageValue = localStorage.getItem(key);
    if (storageValue){
      return JSON.parse(storageValue);
    } else {
      return initalState;
    }
  });

  // useEffec para monitorar uma informação (state) e sempre que a mesma for alterada, executar uma ação (localStorage.setItem).
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state])

  return [state, setState];
}

export default usePersistedState;