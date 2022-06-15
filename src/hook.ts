import { useEffect, useState } from "react";

interface TypesHook {
  counter: number;
  visible: boolean;
  onVisibilityChange: (callback: (isVisible?: boolean) => void) => void;
}

export const useDocumentVisibility = (): TypesHook => {
  const [counter, setCounter] = useState(0);
  const [visible, setVisible] = useState(true);
  const callbacks: Array<(isVisible?: boolean) => void> = [];
  const onVisibilityChange = (callback: () => void) => {
    callbacks.push(callback);
  };
  useEffect(() => {
    const handlerVisibilityChange = (): void => {
      document.visibilityState === "visible"
        ? setVisible(true)
        : setVisible(false);
      if (document.hidden) {
        setCounter((counter) => ++counter);
      }
      callbacks.forEach((callback) => {
        callback(document.visibilityState === "visible");
      });
    };
    document.addEventListener("visibilitychange", handlerVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handlerVisibilityChange);
      callbacks.splice(0, callbacks.length);
    };
  }, []);
  return {
    counter,
    visible,
    onVisibilityChange,
  };
};
