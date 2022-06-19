import { useEffect, useState } from "react";
type Callback = (isVisible: boolean) => void;
interface TypesHook {
  counter: number;
  visible: boolean;
  onVisibilityChange: (callback: Callback) => void;
}

export const useDocumentVisibility = (): TypesHook => {
  const [counter, setCounter] = useState(0);
  const [visible, setVisible] = useState(true);
  const [callbacks, setCallbacks] = useState([]);

  const onVisibilityChange = (callback: Callback) => {
    setCallbacks((callbacks: Array<Callback>) => [...callbacks, callback]);
  };
  useEffect(() => {
    const handlerVisibilityChange = (): void => {
      setVisible(document.visibilityState === "visible");
      if (document.hidden) {
        setCounter((counter) => counter + 1);
      }
      callbacks.forEach((callback) => {
        callback(document.visibilityState === "visible");
      });
    };
    document.addEventListener("visibilitychange", handlerVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handlerVisibilityChange);
    };
  }, [callbacks]);
  return {
    counter,
    visible,
    onVisibilityChange,
  };
};
