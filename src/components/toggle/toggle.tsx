import { useState } from "react";

export const useToggle = (initialVal = false) => {
  const [state, setState] = useState(initialVal);

  const toggle = () => {
    setState((prev) => !prev);
    window.scrollTo(0, 0);
  };

  return { state, toggle };
};

export const useChangeLanguage = (initialVal = false) => {
  const [state, setState] = useState(initialVal);

  const change = () => {
    setState((prev) => !prev);
  };

  return { state, change };
};

export const useSuccess = (initialVal = false) => {
  const [state, setState] = useState(initialVal);

  const success = () => {
    setState((prev) => !prev);
  };

  return { state, success };
};
