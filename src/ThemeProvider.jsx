import { useEffect } from "react";
import { useSelector } from "react-redux";

import { themes } from "./theme/themes";

function ThemeProvider({ children }) {

  const mode = useSelector(
    (state) => state.theme.mode
  );

  useEffect(() => {

    const theme =
      mode === "dark"
        ? themes.dark
        : themes.ocean;

    document.documentElement.style.setProperty(
      "--primary",
      theme.primary
    );

    document.documentElement.style.setProperty(
      "--secondary",
      theme.secondary
    );

    document.documentElement.style.setProperty(
      "--background",
      theme.background
    );

    document.documentElement.style.setProperty(
      "--card",
      theme.card
    );

    document.documentElement.style.setProperty(
      "--text",
      theme.text
    );

  }, [mode]);

  return children;
}

export default ThemeProvider;