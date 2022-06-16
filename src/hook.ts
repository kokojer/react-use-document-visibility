import { useEffect, useState } from "react";

interface TypesHook {
  counter: number;
  visible: boolean;
  onVisibilityChange: (callback: (isVisible: boolean) => void) => void;
}

const callbacks: Array<(isVisible: boolean) => void> = [];
export const useDocumentVisibility = (): TypesHook => {
  const [counter, setCounter] = useState(0);
  const [visible, setVisible] = useState(true);
  const onVisibilityChange = (callback: (isVisible: boolean) => void) => {
    callbacks.push(callback);
  };
  useEffect(() => {
    const handlerVisibilityChange = (): void => {
      document.visibilityState === "visible"
        ? setVisible(true)
        : setVisible(false);
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
  }, []);
  return {
    counter,
    visible,
    onVisibilityChange,
  };
};
